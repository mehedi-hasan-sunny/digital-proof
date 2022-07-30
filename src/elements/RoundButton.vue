<template>
	<button
			class="bg-white inline-flex items-center justify-center rounded-full h-14 w-14 p-3 hover:bg-violet-50
			 active:bg-gray-200 shadow btn disabled:bg-gray-300"
	:data-loading="loading" :disabled="loading">
		<slot></slot>
	</button>
</template>

<script>
export default {
	name: "RoundButton",
	props: {
		loading: Boolean
	}
}
</script>

<style>
.btn {
	position: relative;
}

.btn[data-loading="true"]:before {
	content: '';
	width: 60%;
	height: 60%;
	position: absolute;
	z-index: 0;
	background: url("/loading-buffering.gif") no-repeat center;
	background-size: contain;
	
}

</style>
