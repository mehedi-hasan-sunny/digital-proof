<template>
	<file-info class="mb-4 md:mt-3 md:max-w-sm" :file-count="files.length" :file-height="imageSizeInch.height"
	           :file-width="imageSizeInch.width"/>
	
	<div class="flex justify-center items-end gap-5 max-w-5xl mb-3">
		<div class="inline-flex items-center justify-center min-w-[15rem] min-h-[24rem]">
			<spinner v-if="spinner"/>
			<canvas v-show="!spinner" ref="canvas" class="block border border-gray-500 ml-20 max-w-full max-h-full md:max-h-[25rem]"/>
		</div>
		<canvas-side-button :current-image-index="currentImageIndex" :is-deletable="true"/>
	</div>
	
	<div class="flex justify-between items-center gap-3 mb-3">
		<direction-button @click.prevent="slideAction('left')" direction="left"/>
		
		<canvas-preview :add-files-enabled="true"/>
		
		<direction-button @click.prevent="slideAction('right')" direction="right"/>
	
	</div>
	<Button class="w-80 mb-3" @click="uploadFiles" :disabled="spinner">Get Shareable Link</Button>
</template>

<script lang="ts">
import {computed, inject, nextTick, onMounted, provide, reactive, ref, watch} from "vue";
import {useRouter} from "vue-router";
import FileInfo from "./FileInfo.vue";
import CanvasPreview from "./CanvasPreview.vue";
import Button from "../../elements/Button.vue";
import CanvasSideButton from "./CanvasSideButton.vue";
import {CanvasSelectedOptions, InjectFileListType, YesOrNo} from "../../types";
import DirectionButton from "../../elements/DirectionButton.vue";
import {canvasDrawer, getFilesFromPDF, makeFileFromCanvas} from "../../helpers/canvasDrawer";
import Loading from "../Loading.vue";
import Spinner from "../Spinner.vue";

interface RefCanvasElement {
	value: HTMLCanvasElement
}

interface ImageSizeType {
	width: number,
	height: number
}

interface NumberRefType {
	value: number
}

export default {
	name: "CanvasDraw",
	components: {Spinner, Loading, DirectionButton, CanvasSideButton, CanvasPreview, FileInfo, Button},
	setup() {
		const router = useRouter();
		const canvas = ref(null) as unknown as RefCanvasElement;
		const spinner: { value: boolean } = ref(true);
		const currentImageIndex: NumberRefType = ref(0);
		
		const imageSize: ImageSizeType = reactive({width: 0, height: 0});
		
		const files = inject("files") as unknown as InjectFileListType;
		const lastDeletedIndex = inject("lastDeletedIndex") as unknown as NumberRefType;
		
		const canvasFiles = inject("canvasFiles") as unknown as InjectFileListType;
		
		const addFiles = inject("addFiles") as Function;
		const deleteFile = inject("deleteFile") as Function;
		
		const canvasOptions = inject("canvasOptions") as CanvasSelectedOptions;
		
		
		const imageSizeInch = computed(() => {
			return {
				width: imageSize.width,
				height: imageSize.height,
			}
		})
		
		const slideAction = (direction: string) => {
			if (direction === 'left') {
				if (currentImageIndex.value > 0) {
					currentImageIndex.value--;
					changeCanvas();
				}
			} else {
				if (currentImageIndex.value < files.value.length - 1) {
					currentImageIndex.value++;
					changeCanvas();
				}
			}
		}
		
		const changeCanvas = async (index: number = -1) => {
			if (index > -1) {
				currentImageIndex.value = index;
			}
			spinner.value = true;
			await canvasDrawer(files.value[currentImageIndex.value], canvas, undefined,
					({width, height}: { width: number, height: number }) => {
						imageSize.width = width;
						imageSize.height = height;
					},
					canvasOptions.bleedSize,
					canvasOptions.showFoldedArea as YesOrNo
			)
			await nextTick(()=>{
				spinner.value = false
			});
		}
		
		
		const uploadFiles = async () => {
			
			const drawnCanvases = await Promise.all(
					Array.from(files.value).map(async (file: File, index: number) => {
						if (currentImageIndex.value === index) {
							return canvas.value
						}
						const canvasElement: HTMLCanvasElement = document.createElement('canvas');
						canvasElement.title = file.name.toLowerCase();
						canvasElement.dataset.type = file.type;
						return await canvasDrawer(file, null, canvasElement, null, canvasOptions.bleedSize, canvasOptions.showFoldedArea as YesOrNo);
					})
			);
			
			const canvasDrawnFiles = await Promise.all(
					drawnCanvases.map(async (drawnCanvas: any) => {
						return await makeFileFromCanvas(drawnCanvas);
					})
			);
			
			canvasFiles.value = canvasDrawnFiles as unknown as FileList;
			
			await nextTick(() => {
				router.push("/upload");
			});
			
		}
		
		onMounted(async () => {
			if (files.value.length) {
				
				// console.log(files.value)
				if (files.value[0].type === "application/pdf") {
					const pdfFiles = await getFilesFromPDF(files.value[0])
					
					addFiles(pdfFiles)
					
					deleteFile(0)
				}
				await changeCanvas();
				
				currentImageIndex.value = 0;
			}
		})
		
		watch(lastDeletedIndex, function (newValue: any) {
			if (newValue > -1) {
				if (currentImageIndex.value === newValue) {
					const c = newValue - 1;
					currentImageIndex.value = c < 0 ? 0 : c;
					if (files.value.length > 0) {
						changeCanvas()
					}
				}
				lastDeletedIndex.value = -1
			}
		})
		
		provide("changeCanvas", changeCanvas)
		
		return {
			files,
			canvas,
			imageSizeInch,
			deleteFile,
			currentImageIndex,
			slideAction,
			changeCanvas,
			uploadFiles,
			spinner
		}
	}
}
</script>