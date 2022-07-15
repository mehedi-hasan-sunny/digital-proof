<template>
	<nav class="bg-white border-gray-200 p-4 sticky top-0 z-50 bg-white">
		<div class="container flex flex-wrap justify-center items-center mx-auto">
			<router-link to="/" @click="clearFiles">
				<img alt="Digital proof logo" src="../../assets/logo.png"/>
			</router-link>
		</div>
	</nav>
</template>
<script lang="ts" setup>
import {inject} from "vue";
import {InjectFileListType} from "../../types";

const files = inject("files") as unknown as InjectFileListType;
const canvasFiles = inject("canvasFiles") as unknown as InjectFileListType;

const clearFiles = () => {
	files.value = [] as unknown as FileList
	canvasFiles.value = [] as unknown as FileList
}
</script>