<template>
	<Teleport to="body" v-if="modelValue">
		<div class="absolute bottom-10 right-8">
			<div id="toast-success"
			     class="flex items-center w-full max-w-xs p-4 mb-4 text-gray-500 bg-white rounded-lg shadow dark:text-gray-400 dark:bg-gray-800"
			     role="alert">
				<div v-if="type === 'success'"
				     class="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg dark:bg-green-600 dark:text-green-200">
					<svg class="w-5 h-5" fill="#ffffff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd"
						      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
						      clip-rule="evenodd"></path>
					</svg>
				</div>
				<div v-if="type === 'error'"
				     class="inline-flex flex-shrink-0 justify-center items-center w-8 h-8 text-red-500 bg-red-500 rounded-lg dark:bg-red-800 dark:text-red-200">
					<svg aria-hidden="true" class="w-5 h-5" fill="#ffffff" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd"
						      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
						      clip-rule="evenodd"></path>
					</svg>
					<span class="sr-only">Error icon</span>
				</div>
				
				<slot></slot>
				
				<button type="button" @click="closeToaster"
				        class="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
				        data-dismiss-target="#toast-success" aria-label="Close">
					<span class="sr-only">Close</span>
					<svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
						<path fill-rule="evenodd"
						      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
						      clip-rule="evenodd"></path>
					</svg>
				</button>
			</div>
		</div>
	</Teleport>
</template>

<script>
export default {
	name: "Toaster",
	props: {
		modelValue: Boolean,
		type: String,
		timer: {
			type: Number,
			required: false,
			default: 1200
		}
	},
	emits: ['update:modelValue'],
	methods: {
		closeToaster() {
			this.$emit('update:modelValue', false);
		}
	},
	watch: {
		modelValue(value) {
			if (value) {
				setTimeout(() => {
					this.closeToaster()
				}, this.timer)
			}
		}
	}
}
</script>