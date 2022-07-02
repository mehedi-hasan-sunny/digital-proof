<template>
	<div class="w-5/12 mx-auto min-w-min">
		<object data="./src/assets/Rectangle.svg" type="" class="mx-auto my-4 h-52"></object>
		
		<file-upload-status
				v-for="(progressCount, index) in progress"
				class="mb-4"
				:file-name="fileName[index]"
				:file-size="fileSize[index]"
				:upload-percentage="progressCount"/>
	</div>
</template>

<script lang="ts">
import FileUploadStatus from "../components/FileUploadStatus.vue";
import {inject, reactive, toRefs} from "vue";
import {ref as storageRef, uploadBytesResumable} from "@firebase/storage";
import {storage} from "../firebase";
import {InjectFileListType} from "../types";

export default {
	name: "Upload",
	components: {FileUploadStatus},
	setup() {
		const canvasFiles = inject("canvasFiles") as InjectFileListType;
		const canvasFilesUploadProgress = reactive({
			progress: [] as Array<number>,
			fileName: [] as Array<string>,
			fileSize: [] as Array<string>
		});
		
		
		const bytesToSize = (bytes: number): string => {
			const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
			if (bytes == 0) return '0 Byte';
			const i = parseInt(String(Math.floor(Math.log(bytes) / Math.log(1024))));
			return (bytes / Math.pow(1024, i)).toFixed(2) + ' ' + sizes[i];
		}
		
		if (canvasFiles.value.length) {
			
			Array.from(canvasFiles.value).forEach((file, key) => {
				canvasFilesUploadProgress.progress[key] = 0;
				canvasFilesUploadProgress.fileName[key] = file.name;
				canvasFilesUploadProgress.fileSize[key] = bytesToSize(file.size);
				const fileStorageRef = storageRef(storage, `images/${file.name}`);
				const uploadProcess = uploadBytesResumable(fileStorageRef, file);
				uploadProcess.on("state_changed", (snapshot) => {
					snapshotProgress(snapshot, key);
				})
			})
			
			const snapshotProgress = (snapshot: any, key: number) => {
				canvasFilesUploadProgress.progress[key] = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
			}
			
		}
		
		return {
			...toRefs(canvasFilesUploadProgress)
		}
	}
}
</script>