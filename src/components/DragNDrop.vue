<script lang="ts">
import {defineComponent} from "vue";
import Button from "../elements/Button.vue";
import FileUploadButton from "../elements/FileUploadButton.vue";
import {makeInitialFiles} from "../helpers/canvasDrawer";

interface DropEvent<T = Element> extends DragEvent {
	dataTransfer: DataTransfer;
}

export default defineComponent({
	name: 'DragNDrop',
	components: {FileUploadButton, Button},
	props: {
		modelValue: Array
	},
	emits: ['update:modelValue'],
	data() {
		return {
			files: [] as unknown as FileList
		}
	},
	methods: {
		dropImage(event: DropEvent) {
			event.preventDefault();
			event.stopPropagation();
			this.files = event.dataTransfer.files
		},
		dragHandler(event: DragEvent) {
			event.preventDefault();
			event.stopPropagation();
		},
		getFiles(files: FileList) {
			this.files = files
		}
	},
	watch: {
		async files(newFiles: FileList) {
			const files = await makeInitialFiles(newFiles)
			this.$emit('update:modelValue', files);
		}
	}
})
</script>

<template>
	<div
			class="border-2 border-violet-900 rounded-xl h-72 md:h-80 px-5 md:px-20 py-5 md:py-10 border-dashed bg-white flex flex-col justify-center items-center my-3"
			@drop.prevent="dropImage"
			@dragover="dragHandler" @dragend="dragHandler" @dragenter="dragHandler"
			@drag="dragHandler" @dragleave="dragHandler" @dragstart="dragHandler">
		<svg class="text-violet-900 mb-8" width="98" height="70" viewBox="0 0 98 70" fill="none"
		     xmlns="http://www.w3.org/2000/svg">
			<path d="M80.9193 30.1613L80.2848 31.8171L82.0229 32.1683C90.2785 33.8364 96.5 41.1484 96.5 49.8999C96.5 59.8974
			 88.3975 67.9999 78.4 67.9999H22.05C10.705 67.9999 1.5 58.7949 1.5 47.4499C1.5 38.49 7.23499 30.8672 15.2284
			  28.0552L16.2705 27.6886L16.2296 26.5847C16.2141 26.1666 16.2 25.7809 16.2 25.3999C16.2 12.6921 26.4922 2.3999
			   39.2 2.3999C47.7224 2.3999 55.1544 7.02518 59.1393 13.9303L59.9415 15.3204L61.2743 14.4261C63.3629 13.0245
			    65.891 12.1999 68.6 12.1999C75.8872 12.1999 81.8 18.1127 81.8 25.3999C81.8 27.0789 81.4835 28.6889 80.9193
			     30.1613ZM27.9606 41.5999H36.475V57.2499C36.475 59.4258 38.2491 61.1999 40.425 61.1999H47.775C49.9509 61.1999 51.725 59.4258 51.725 57.2499V41.5999H60.2394C63.7433 41.5999 65.5266 37.3552 63.0304 34.8589L46.891 18.7196C45.3558 17.1844 42.8442 17.1844 41.309 18.7196L25.1697 34.8589C22.6804 37.3481 24.4313 41.5999 27.9606 41.5999Z"
			      stroke="currentColor" stroke-width="3"/>
		</svg>
		<span class="mb-3 text-sm">Drag and drop files to upload</span>
		<span class="mb-3 text-xs text-gray-500">OR</span>
		<FileUploadButton @change="getFiles">Select Files</FileUploadButton>
	</div>
</template>
