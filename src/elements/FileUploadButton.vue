<template>
	<label for="select-files" class="bg-violet-900 text-center hover:cursor-pointer text-white rounded w-72 px-5 py-2" :class="$attrs.class">
		<input id="select-files" type="file" accept="image/*" multiple hidden @change="selectFiles">
		<slot></slot>
	</label>
</template>

<script lang="ts">
import {defineComponent} from "vue";

export default defineComponent({
	name: "FileUploadButton",
	inheritAttrs: false,
	methods: {
		selectFiles(event: Event) {
			const target = event.target as HTMLInputElement;
			const files = target.files;
			this.$emit("change", files);
		}
	}
})
</script>