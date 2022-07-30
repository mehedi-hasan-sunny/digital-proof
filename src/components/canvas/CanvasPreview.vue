<template>
	<div class="flex gap-2 items-center flex-wrap">
		
		<file-upload-button v-if="addFilesEnabled"
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

<script lang="ts">
import {computed, inject} from "vue";
import FileUploadButton from "../../elements/FileUploadButton.vue";
import {InjectFileListType} from "../../types";
import {makeInitialFiles} from "../../helpers/canvasDrawer";


export default {
	name: "CanvasPreview",
	props: {
		imageLinks: {
			type: Array,
			default: [],
			require: false
		},
		addFilesEnabled: {
			type: Boolean,
			require: false,
			default: false
		}
	},
	components: {FileUploadButton},
	setup(props: any, context: any) {
		
		if (props.addFilesEnabled) {
			const files = inject("files") as unknown as InjectFileListType;
			const addFiles = inject("addFiles") as any;
			const changeCanvas = inject("changeCanvas");
			
			const getFiles = async (files: FileList) => {
				
				const fileList = await makeInitialFiles(files)
				addFiles(fileList)
				
				// const filesArray = Array.from(files).reduce(async (acc: any, file, index) => {
				// 	if (file.type === "application/pdf") {
				// 		acc = [...acc, ...(await getFilesFromPDF(file))]
				// 	} else {
				// 		acc.push(file)
				// 	}
				// 	return acc
				// }, []);
				// console.log(filesArray, "filesArray")
				// addFiles(await filesArray);
			}
			const images = computed(() => {
				return Array.from(files.value).map((file) => URL.createObjectURL(file))
			})
			return {
				images,
				getFiles,
				changeCanvas
			}
		} else {
			const images = computed(() => {
				return props.imageLinks;
			})
			const getFiles = null
			const changeCanvas = (index: number) => {
				context.emit("changeImageSrc", index)
			}
			return {
				images,
				changeCanvas,
				getFiles
			}
		}
		
	}
}
</script>