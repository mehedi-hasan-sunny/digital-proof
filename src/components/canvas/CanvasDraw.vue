<template>
	<file-info class="mb-4 md:mt-3 md:max-w-sm" :file-count="files.length" :file-height="imageSizeInch.height"
	           :file-width="imageSizeInch.width"/>
	
	<div class="flex justify-center items-end gap-5 max-w-5xl mb-3">
		<div class="inline-flex items-center" style="min-height: 25rem">
			<canvas ref="canvas" class="block border border-gray-500 ml-20 max-w-full" style="max-height: 25rem"/>
		</div>
		<canvas-side-button :current-image-index="currentImageIndex" :is-deletable="true"/>
	</div>
	
	<div class="flex justify-between items-center gap-3 mb-3">
		<direction-button @click.prevent="slideAction('left')" direction="left"/>
		
		<canvas-preview :add-files-enabled="true"/>
		
		<direction-button @click.prevent="slideAction('right')" direction="right"/>
	
	</div>
	<Button class="w-80 mb-3" @click="uploadFiles">Upload</Button>
</template>

<script lang="ts">
import {inject, onMounted, reactive, ref, computed, provide, watch, nextTick} from "vue";
import {useRouter} from "vue-router";
import FileInfo from "./FileInfo.vue";
import CanvasPreview from "./CanvasPreview.vue";
import Button from "../../elements/Button.vue";
import CanvasSideButton from "./CanvasSideButton.vue";
import {InjectFileListType} from "../../types";
import DirectionButton from "../../elements/DirectionButton.vue";
import {canvasDrawer, makeFileFromCanvas} from "../../helpers/canvasDrawer";

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
	components: {DirectionButton, CanvasSideButton, CanvasPreview, FileInfo, Button},
	setup() {
		const router = useRouter();
		const canvas = ref(null) as unknown as RefCanvasElement;
		const currentImageIndex: NumberRefType = ref(0);
		
		const imageSize: ImageSizeType = reactive({width: 0, height: 0});
		
		const files = inject("files") as unknown as InjectFileListType;
		const lastDeletedIndex = inject("lastDeletedIndex") as unknown as NumberRefType;
		const deleteFile = inject("deleteFile");
		const canvasFiles = inject("canvasFiles") as unknown as InjectFileListType;
		
		const imageSizeInch = computed(() => {
			return {
				width: Number((imageSize.width / 96 - 0.125).toFixed(3)),
				height: Number((imageSize.height / 96 - 0.125).toFixed(3)),
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
		
		const changeCanvas = (index: number = -1) => {
			if (index > -1) {
				currentImageIndex.value = index;
			}
			canvasDrawer(files.value[currentImageIndex.value], canvas, undefined,
					({width, height}: { width: number, height: number }) => {
						imageSize.width = width;
						imageSize.height = height;
					})
		}
		
		
		
		
		const uploadFiles = async () => {
			const drawnCanvases = await Promise.all(
					Array.from(files.value).map(async (file) => {
						const canvas: HTMLCanvasElement = document.createElement('canvas');
						canvas.title = file.name;
						return await canvasDrawer(file, null, canvas);
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
		onMounted(() => {
			if (files.value.length) {
				currentImageIndex.value = 0;
				changeCanvas();
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
			uploadFiles
		}
	}
}
</script>