<template>
	<div class="h-80" ref="lottieAnimation"></div>
</template>

<script>
import uploadAnimation from "../assets/upload-animation.json";
import lottie from "lottie-web";
import {onMounted, ref, watch} from "vue";

export default {
	name: "UploadAnimation",
	props: {
		stopAnimation: Boolean
	},
	setup(props) {
		const lottieAnimation = ref(null);
		
		onMounted(() => {
			lottie.loadAnimation({
				name: 'upload-animation',
				container: lottieAnimation.value,
				renderer: "svg",
				loop: true,
				autoplay: true,
				animationData: uploadAnimation
			});
		});
		
		watch(props, function ({stopAnimation}) {
			if (stopAnimation === true) {
				lottie.stop('upload-animation')
			} else {
				lottie.play('upload-animation')
			}
		})
		
		return {
			lottieAnimation
		}
	}
}
</script>