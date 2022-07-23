<script setup lang="ts">
import DragNDrop from '../components/DragNDrop.vue'
import {ref, provide, onMounted, inject, reactive} from "vue";
import CanvasDraw from "../components/canvas/CanvasDraw.vue";
import {InjectFileListType} from "../types";


const files = inject("files") as unknown as InjectFileListType;
const lastDeletedIndex = ref(-1);

const addFiles = (imageFiles: FileList): void => {
	files.value = [...files.value, ...imageFiles] as unknown as FileList
}

const deleteFile = (deleteIndex: number) => {
	lastDeletedIndex.value = deleteIndex
	files.value = Array.from(files.value).filter((item, index) => index !== deleteIndex) as unknown as FileList
}
const canvasFiles = inject("canvasFiles") as any;

const canvasOptions = reactive({
	bleedSize: 0.125,
	showFoldedArea: "no",
});


provide('addFiles', addFiles)
provide('deleteFile', deleteFile)
provide('lastDeletedIndex', lastDeletedIndex)
provide('canvasOptions', canvasOptions)

// const setTrimSize = (event: Event) => {
// 	const element = event.target as  HTMLSelectElement
// 	// canvasOptions.bleedSize = Number(element.value);
// }
// const setShowFoldedArea = (event: Event) => {
// 	const element = event.target as  HTMLSelectElement
// 	// canvasOptions.showFoldedArea = element.value === "Yes";
// }

onMounted(() => {
	canvasFiles.value = [] as unknown as FileList;
})

</script>

<template>
	<div class="flex flex-col justify-center items-center h-main w-100">
		<div class="flex gap-2 w-[28rem] p-4 bg-white border rounded-2xl" v-if="!files.length">
			<div class="w-full">
				<label for="countries" class="block mb-2 text-sm font-semibold text-gray-700">Select trim size</label>
				<select v-model="canvasOptions.bleedSize"
				        class="bg-gray-50 border border-gray-300 text-gray-900 font-semibold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
					<option value="0.125" selected>0.125 inch</option>
					<option value="1">1 inch</option>
				</select>
			</div>
			<div class="w-full">
				<label for="countries" class="block mb-2 text-sm font-semibold text-gray-700">Show folded area</label>
				<select v-model="canvasOptions.showFoldedArea"
				        class="bg-gray-50 border border-gray-300 text-gray-900 font-semibold text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5">
					<option value="no" selected>No</option>
					<option value="yes">Yes</option>
				</select>
			</div>
		</div>
		
		<drag-n-drop v-if="!files.length" v-model="files"/>
		<canvas-draw v-else-if="files.length"/>
	</div>
</template>