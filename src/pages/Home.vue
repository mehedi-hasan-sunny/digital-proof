<script setup lang="ts">
import DragNDrop from '../components/DragNDrop.vue'
import {ref, provide, watch} from "vue";
import CanvasDraw from "../components/CanvasDraw.vue";

Array.prototype
const files = ref([] as unknown as FileList);

provide('files', files)

watch(files, function (newValue) {
	console.log(newValue)
})
</script>

<template>
	<div class="flex flex-col justify-center items-center h-main w-100">
		<drag-n-drop v-if="!files.length" v-model="files"/>
		<canvas-draw v-else-if="files.length"/>
	</div>
</template>