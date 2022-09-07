<template>
	<div
			class="border border-gray-200 text-center rounded w-11/12 md:w-1/2 p-2 bg-white flex justify-between items-center">
		<div class="w-full h-full border-r border-gray-300 inline-flex justify-center flex-col items-center">
			<span class="text-xs font-semibold mb-2 text-gray-600">
				Trim size of your file
			</span>
			<span class="font-bold">
				{{ imageSize.height }} x {{ imageSize.width }} inch
			</span>
		</div>
		<div class="w-full h-full inline-flex justify-center flex-col items-center min-h-min">
			<span class="text-xs font-semibold mb-2 text-gray-600">
				Pages of your file
			</span>
			<span class="font-bold">
				{{ fileCount }}
			</span>
		</div>
	</div>
</template>

<script>
export default {
	name: "FileInfo",
	props: {
		fileHeight: {
			type: Number
		},
		fileWidth: {
			type: Number
		},
		fileCount: {
			type: Number
		}
	},
	computed: {
		imageSize() {
			const DPI = this.fileHeight > 96 || this.fileWidth > 96 ? 300 : 96;
			return {
				height: Number((this.fileHeight / DPI).toFixed(3)),
				width: Number((this.fileWidth / DPI).toFixed(3))
			}
		}
	}
}
</script>