<template>
	<div class="w-5/12 mx-auto min-w-min">
		<object data="./src/assets/Rectangle.svg" type="" class="mx-auto my-4 h-52"></object>
		<file-upload-status class="mb-4" file-name="Image.png" file-size="10mb" :upload-percentage="40"/>
	</div>
</template>

<script lang="ts">
import FileUploadStatus from "../components/FileUploadStatus.vue";
import {inject} from "vue";

export default {
	name: "Upload",
	components: {FileUploadStatus},
	setup() {
		const canvasFiles = inject("canvasFiles")
		console.log(canvasFiles)
	}
}
</script>