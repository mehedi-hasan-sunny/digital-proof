<template>
	<div class="flex flex-col justify-center items-center h-main w-100">
		
		<template v-if="fileStats.loading === false">
			<file-info class="my-3 max-w-sm"
			           :file-count="fileStats.length"
			           :file-height="fileStats.height"
			           :file-width="fileStats.width"/>
			
			<div class="flex justify-center items-end gap-5 max-w-5xl mb-3">
				<div class="inline-flex items-center" style="min-height: 25rem">
					<img class="block border border-gray-500 ml-20 max-w-full" :src="fileStats.img.src"
					     style="max-height: 25rem"/>
				</div>
				<canvas-side-button
						:current-image-index="currentImageIndex"
						:is-shareable="true"
						:link="fullPath"
				/>
			</div>
			
			<div class="flex justify-between items-center gap-3 mb-3">
				<direction-button @click.prevent="slideAction('left')" direction="left"/>
				<canvas-preview :image-links="imageLinks" @changeImageSrc="changeImageSrc" class="my-5"/>
				<direction-button @click.prevent="slideAction('right')" direction="right"/>
			</div>
		</template>
		
		<NotFound v-else-if="fileStats.loading === null"/>
	
	</div>
</template>

<script lang="ts">
import {useRoute} from "vue-router";
import {database} from "../firebase";
import {getDoc} from "@firebase/firestore"
import {doc} from "firebase/firestore";
import FileInfo from "../components/canvas/FileInfo.vue";
import CanvasPreview from "../components/canvas/CanvasPreview.vue"
import {computed, inject, reactive, ref} from "vue";
import DirectionButton from "../elements/DirectionButton.vue";
import CanvasSideButton from "../components/canvas/CanvasSideButton.vue";
import NotFound from "./404.vue"
import {makeFileFromCanvas} from "../helpers/canvasDrawer";

export default {
	name: "Preview",
	components: {NotFound, FileInfo, CanvasPreview, DirectionButton, CanvasSideButton},
	
	async setup() {
		const route = useRoute();
		const filesToBeDownloaded: any = ref([]);
		const currentImageIndex = ref(0);
		const imageLinks = ref([]) as any;
		const files: any = inject("files");
		
		const fileStats = reactive({
			img: {} as any,
			height: 0,
			width: 0,
			length: 0,
			loading: true as any
		})
		const generateLink = (fileName: string) => {
			return `https://firebasestorage.googleapis.com/v0/b/digital-proof-7e1ef.appspot.com/o/images%2F${fileName}?alt=media&token=c474eb67-fcd5-4067-bf40-cffad38bd780`
		}
		
		const getData = async () => {
			const docRef = doc(database, "links/" + route.params.documentId);
			const docData = await getDoc(docRef);
			filesToBeDownloaded.value = await docData.data();
			
			if (filesToBeDownloaded.value) {
				fileStats.length = filesToBeDownloaded.value.fileNames.length;
				const img = new Image();
				img.src = generateLink(filesToBeDownloaded.value.fileNames[0]);
				img.onload = () => {
					fileStats.img = img;
					fileStats.width = img.width
					fileStats.height = img.height
					fileStats.loading = false;
				}
				
				filesToBeDownloaded.value.files = filesToBeDownloaded.value.fileNames.map((fileName: string) => {
					return new Promise((resolve, reject) => {
						try {
							const img2 = new Image();
							img2.crossOrigin="anonymous"
							img2.src = generateLink(fileName);
							img2.onload = async () => {
								const canvas = document.createElement("canvas");
								canvas.width = img2.width;
								canvas.height = img2.height;
								const ctx: any = canvas.getContext("2d");
								ctx.drawImage(img2, 0, 0);
								resolve(canvas);
							}
						} catch (e) {
							reject(e)
						}
					})
				})
				
				const canvases = await Promise.all(filesToBeDownloaded.value.files);
				
				files.value = await Promise.all(
						canvases.map(async (drawnCanvas: any) => {
							return await makeFileFromCanvas(drawnCanvas);
						})
				);
				
			} else {
				fileStats.loading = null;
			}
		}
		
		await getData()
		
		
		imageLinks.value = filesToBeDownloaded.value?.fileNames.map((fileName: string) => generateLink(fileName)) ?? [];
		
		const changeImageSrc = (index: number) => {
			currentImageIndex.value = index;
			fileStats.img.src = imageLinks.value[index] as string;
		}
		
		const slideAction = (direction: string) => {
			if (direction === 'left') {
				if (currentImageIndex.value > 0) {
					changeImageSrc(currentImageIndex.value - 1)
				}
			} else {
				if (currentImageIndex.value < imageLinks.value.length - 1) {
					changeImageSrc(currentImageIndex.value + 1)
				}
			}
		}
		
		const fullPath = computed(() => {
			return window.location.origin + route.fullPath
		})
		
		return {
			fileStats,
			imageLinks,
			changeImageSrc,
			slideAction,
			currentImageIndex,
			fullPath
		}
	}
}
</script>