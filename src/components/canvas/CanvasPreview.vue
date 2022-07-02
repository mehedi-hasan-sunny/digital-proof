<template>
	<div class="flex gap-2 items-center flex-wrap">
		
		<file-upload-button
				@change="getFiles"
				class="h-20 w-16 inline-flex justify-center text-gray-900 items-center bg-gray-300 rounded-2xl">
			+
		</file-upload-button>
		
		<button class="h-20 w-16 bg-gray-300 rounded-2xl overflow-hidden inline-flex items-center"
		        v-for="(image, index) in images"
		        :key="index" @click.prevent="changeCanvas(index)">
			
			<img :src="image" class="w-full" alt="">
		</button>
	
	</div>
</template>

<script setup lang="ts">
import {computed, inject} from "vue";
import FileUploadButton from "../../elements/FileUploadButton.vue";

interface InjectFiles {
	value: FileList
}

const files = inject("files") as unknown as InjectFiles;
const changeCanvas = inject("changeCanvas");
const addFiles = inject("addFiles") as any;

const images = computed(() => {
	return Array.from(files.value).map((file) => URL.createObjectURL(file))
})
const getFiles = (files: FileList) => {
	addFiles(files);
}
</script>