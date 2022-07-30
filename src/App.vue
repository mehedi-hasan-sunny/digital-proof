<script setup lang="ts">
import Navbar from './components/layout/Navbar.vue'
import {provide, reactive, ref} from "vue";

const files = ref([] as unknown as FileList);
const canvasFiles = ref([] as unknown as FileList);
const lastDeletedIndex = ref(-1);

const deleteFile = (deleteIndex: number) => {
	lastDeletedIndex.value = deleteIndex
	files.value = Array.from(files.value).filter((item, index) => index !== deleteIndex) as unknown as FileList
}

const canvasOptions = reactive({
	bleedSize: 0.125,
	showFoldedArea: "no",
});

provide("canvasFiles", canvasFiles);
provide('files', files)
provide('lastDeletedIndex', lastDeletedIndex)
provide('deleteFile', deleteFile)

provide('canvasOptions', canvasOptions)


</script>

<template>
	<Navbar/>
	<main class="container mx-auto">
		<router-view></router-view>
	</main>
</template>

