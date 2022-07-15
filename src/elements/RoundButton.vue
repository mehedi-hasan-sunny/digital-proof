<template>
	<button class="bg-white inline-flex items-center justify-center rounded-full h-14 w-14 p-3 active:bg-gray-200">
		<slot></slot>
	</button>
</template>

<script>
export default {
	name: "RoundButton"
}
</script>
