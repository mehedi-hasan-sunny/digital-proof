<template>
	<div class="border border-gray-200 text-center rounded w-1/2 p-4 bg-white flex justify-between items-center mb-5">
		<div class="w-full h-full border-r border-gray-300 inline-flex justify-center flex-col items-center">
			<span class="text-sm font-medium my-2">
				Trim size of your file
			</span>
			<span class="font-bold mb-2">
				7.127 x 5.127
			</span>
		</div>
		<div class="w-full h-full inline-flex justify-center flex-col items-center">
			<span class="text-sm font-medium my-2">
				Pages of your file
			</span>
			<span class="font-bold mb-2">
				{{files.length}}
			</span>
		</div>
	</div>
	<canvas ref="canvas" class="block border border-gray-500 max-w-sm"/>
</template>

<script lang="ts">
import {inject, onMounted, ref} from "vue";

interface InjectFiles {
	value: FileList
}

interface RefCanvasElement {
	value: HTMLCanvasElement
}

export default {
	name: "CanvasPreview",
	setup() {
		
		const canvas = ref(null) as unknown as RefCanvasElement;
		
		const files = inject("files") as unknown as InjectFiles;
		
		
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
				canvas.value.width = image.width;
				canvas.value.height = image.height;
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
				canvasDraw(files.value[0])
			}
		})
		
		
		
		return {
			files,
			canvas
		}
	}
}
</script>

<style scoped>

</style>