<template>
	<label for="select-files" class="bg-violet-900 text-center hover:cursor-pointer text-white rounded w-72 px-5 py-2"
	       :class="$attrs.class">
		<input id="select-files" type="file" accept="image/*,application/pdf" multiple hidden @change="selectFiles">
		<slot></slot>
	</label>
</template>

<script lang="ts">
import {defineComponent, inject} from "vue";
import {makeInitialFiles} from "../helpers/canvasDrawer";

export default defineComponent({
	name: "FileUploadButton",
	inheritAttrs: false,
	setup() {
		const addFiles = inject('addFiles') as any
		const selectFiles = async (event: Event) => {
			const target = event.target as HTMLInputElement;
			const files = await makeInitialFiles(target.files as FileList)
			addFiles(files)
		}
		return {
			selectFiles
		}
	},
})
</script>