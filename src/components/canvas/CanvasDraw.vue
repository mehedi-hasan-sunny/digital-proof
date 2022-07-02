<template>
	<file-info class="my-3 max-w-sm" :file-count="files.length" :file-height="imageSizeInch.height"
	           :file-width="imageSizeInch.width"/>
	
	<div class="flex justify-center gap-5 max-w-5xl mb-3" style="min-height: 25rem">
		<canvas ref="canvas" class="block border border-gray-500 ml-20 max-w-full" style="max-height: 25rem"/>
		<canvas-side-button :currentImageIndex="currentImageIndex"/>
	</div>
	
	<div class="flex justify-between items-center gap-3 mb-3">
		<button @click.prevent="slideAction('left')">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-left" viewBox="0 0 16 16">
				<path fill-rule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
			</svg>
		</button>
		
		<canvas-preview/>
		
		<button @click.prevent="slideAction('right')">
			<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-right" viewBox="0 0 16 16">
				<path fill-rule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
			</svg>
		</button>
	</div>
	<Button class="w-80 mb-3">Upload</Button>
</template>

<script lang="ts">
import {inject, onMounted, reactive, ref, computed, provide, watch} from "vue";
import FileInfo from "./FileInfo.vue";
import CanvasPreview from "./CanvasPreview.vue";
import Button from "../../elements/Button.vue";
import CanvasSideButton from "./CanvasSideButton.vue";

interface InjectFiles {
	value: FileList
}

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
	components: {CanvasSideButton, CanvasPreview, FileInfo, Button},
	setup() {
		
		const canvas = ref(null) as unknown as RefCanvasElement;
		
		const files = inject("files") as unknown as InjectFiles;
		
		const imageSize: ImageSizeType = reactive({width: 0, height: 0});
		
		const currentImageIndex: NumberRefType = ref(0);
		
		const lastDeletedIndex = inject("lastDeletedIndex") as unknown as NumberRefType;
		
		const deleteFile = inject("deleteFile");
		
		
		const canvasDraw = (file: File) => {
			
			const ctx = canvas.value.getContext("2d") as unknown as CanvasRenderingContext2D;
			
			const image: HTMLImageElement = new Image();
			
			const reader = new FileReader();
			
			reader.onload = function () {
				if (typeof reader.result === "string") {
					image.src = reader.result;
				}
			};
			reader.readAsDataURL(file);
			
			image.onload = function () {
				canvas.value.width = imageSize.width = image.width;
				canvas.value.height = imageSize.height = image.height;
				
				//draw background image
				ctx.drawImage(image, 0, 0, image.width, image.height, 0, 0, canvas.value.width, canvas.value.height);
				
				ctx.beginPath();
				// canvas.moveTo(10, 10);
				const bleed = 0.125 * 96;
				ctx.strokeStyle = "#FF0000";
				ctx.strokeRect(bleed, bleed, canvas.value.width - bleed * 2, canvas.value.height - bleed * 2);
				ctx.strokeStyle = "#0000FF";
				ctx.strokeRect(bleed * 2, bleed * 2, canvas.value.width - bleed * 4, canvas.value.height - bleed * 4);
				ctx.fill();
				ctx.stroke();
			};
		}
		
		onMounted(() => {
			if (files.value.length) {
				currentImageIndex.value = 0;
				changeCanvas();
			}
		})
		
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
			canvasDraw(files.value[currentImageIndex.value])
		}
		
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
			slideAction,
			changeCanvas,
			deleteFile,
			currentImageIndex
		}
	}
}
</script>