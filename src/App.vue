<script setup lang="ts">
import Navbar from './components/layout/Navbar.vue'
</script>

<template>
	<Navbar/>
	<main class="container mx-auto">
		<router-view></router-view>
	</main>
</template>