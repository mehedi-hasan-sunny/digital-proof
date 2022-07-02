<script setup lang="ts">
import Navbar from './components/layout/Navbar.vue'
import {provide, ref} from "vue";

const canvasFiles = ref([] as unknown as FileList);
provide("canvasFiles", canvasFiles);
</script>

<template>
	<Navbar/>
	<main class="container mx-auto">
		<router-view></router-view>
	</main>
</template>

