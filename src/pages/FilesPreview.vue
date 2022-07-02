<template>
	<suspense>
		<preview/>
		<template #fallback>
			<div class="h-main flex justify-center items-center">
				<loading>Loading</loading>
			</div>
		</template>
	</suspense>
</template>

<script>
import Preview from "./Preview.vue";
import Loading from "../components/Loading.vue";
export default {
	name: "FilesPreview",
	components: {Loading, Preview}
}
</script>