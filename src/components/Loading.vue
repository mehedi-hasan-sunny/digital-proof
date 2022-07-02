<template>
	<div class="inline-flex items-center justify-center gap-3">
		<div class="spinner text-violet-900 inline-block p-3 rounded-full border border-violet-900 relative">
			<img src="../assets/logo-small.png" alt="">
		</div>
		<slot></slot>
	</div>
</template>

<script>
export default {
	name: "Loading"
}
</script>
<style>
.spinner:before {
	content: "";
	position: absolute;
	top: -1px;
	left: -1px;
	right: -1px;
	bottom: -1px;
	display: block;
	border-radius: 100%;
	border: 3px solid currentColor;
	animation: 01s spin ease-in-out infinite;
}

@keyframes spin {
	0%, 100% {
		top: -1px;
		left: -1px;
		right: -1px;
		bottom: -1px;
	}
	50% {
		top: -5px;
		left: -5px;
		right: -5px;
		bottom: -5px;
	}
}
</style>