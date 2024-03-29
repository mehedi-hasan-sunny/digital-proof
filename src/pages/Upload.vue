<template>
	<div class="w-5/12 mx-auto min-w-min">
		<upload-animation :stopAnimation="stopAnimation"/>
		
		<file-upload-status
				v-for="(progressCount, index) in progress"
				class="mb-4"
				:file-name="fileName[index]"
				:file-size="fileSize[index]"
				:upload-percentage="progressCount"/>
		
		<Button class="mx-auto w-80 block" v-if="showDoneButton" @click="previewFiles">Next</Button>
	</div>
</template>

<script lang="ts">
import FileUploadStatus from "../components/FileUploadStatus.vue";
import {computed, inject, reactive, ref, toRefs} from "vue";
import {ref as storageRef, uploadBytesResumable, getDownloadURL} from "@firebase/storage";
import {storage, database} from "../firebase";
import {InjectFileListType} from "../types";
import {addDoc, collection, serverTimestamp} from "firebase/firestore";
import Button from "../elements/Button.vue"
import {useRouter} from "vue-router";
import UploadAnimation from "../components/UploadAnimation.vue";

export default {
	name: "Upload",
	components: {UploadAnimation, FileUploadStatus, Button},
	setup() {
		const router = useRouter();
		const canvasFiles = inject("canvasFiles") as InjectFileListType;
		const stopAnimation = ref(false);
		
		if(!canvasFiles.value.length){
			router.push({name: "home"})
		}
		
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
		
		let documentId = "";
		
		const writeData = async (fileNames: Array<string>) => {
			try {
				const dbCollection = collection(database, "links");
				return await addDoc(dbCollection, {fileNames, timestamp: serverTimestamp()})
			} catch (e) {
				console.error("Error adding document: ", e);
			}
		}
		
		if (canvasFiles.value.length) {
			Array.from(canvasFiles.value).forEach((file, key) => {
				stopAnimation.value = false;
				
				canvasFilesUploadProgress.progress[key] = 0;
				canvasFilesUploadProgress.fileName[key] = new Date().getTime() +'_'+ file.name;
				canvasFilesUploadProgress.fileSize[key] = bytesToSize(file.size);
				const fileStorageRef = storageRef(storage, `images/${new Date().getTime() +'_'+file.name}`);
				const uploadProcess = uploadBytesResumable(fileStorageRef, file);
				
				uploadProcess.on("state_changed",
						(snapshot) => {
							snapshotProgress(snapshot, key);
						},
						(err: any) => {
							console.log(err)
						},
						() => {
							getDownloadURL(uploadProcess.snapshot.ref).then((url) => {
								// console.log(url)
								
							})
							canvasFiles.value.splice(key, 1);
							stopAnimation.value = true;
							
						});
			});
			
			const snapshotProgress = (snapshot: any, key: number) => {
				canvasFilesUploadProgress.progress[key] = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
			}
			
			writeData(canvasFilesUploadProgress.fileName)
					.then((response: any) => {
						documentId = response.id;
					});
		}
		
		const showDoneButton = computed(() => {
			return canvasFilesUploadProgress.progress.every((item) => item === 100)
		})
		
		const previewFiles = () => {
			router.push({name: 'preview', params: {documentId}})
		}
		
		return {
			...toRefs(canvasFilesUploadProgress),
			showDoneButton,
			previewFiles,
			stopAnimation
		}
	}
}
</script>