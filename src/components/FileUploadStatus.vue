<template>
	<div class="bg-white p-3.5 rounded border">
		<h6 class="text-sm">{{fileName}}</h6>
		<div class="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-300 my-2">
			<div class="bg-blue-600 h-1.5 rounded-full" :style="`width: ${uploadPercentage}%`"></div>
		</div>
		<div class="flex justify-between items-center">
			<span class="text-xs text-gray-500">{{fileSize}}</span>
			<span class="text-xs text-gray-500">{{uploadPercentage}}%</span>
		</div>
	</div>
</template>

<script>
export default {
	name: "FileUploadStatus",
	props: {
		fileName: String,
		uploadPercentage: Number,
		fileSize: String,
	}
}
</script>