<script setup lang="ts">
import DragNDrop from '../components/DragNDrop.vue'
import {ref, provide, watch, onMounted, inject} from "vue";
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



provide('addFiles', addFiles)
provide('deleteFile', deleteFile)
provide('lastDeletedIndex', lastDeletedIndex)


onMounted(() => {
	canvasFiles.value = [] as unknown as FileList;
})

</script>

<template>
	<div class="flex flex-col justify-center items-center h-main w-100">
		<drag-n-drop v-if="!files.length" v-model="files"/>
		<canvas-draw v-else-if="files.length"/>
	</div>
</template>