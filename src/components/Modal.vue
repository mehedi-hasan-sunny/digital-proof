<template>
	<Teleport to="body">
		<div id="defaultModal" tabindex="-1" aria-hidden="true"
		     class="overflow-y-auto overflow-x-hidden fixed z-50 w-full inset-0 h-modal md:h-full justify-center items-start bg-[#0000003b] "
		     :class="modelValue ? 'flex' : 'hidden'"
		>
			<div class="relative md:mt-16 p-4 w-full max-w-2xl h-full md:h-auto">
				<!-- Modal content -->
				<div class="relative bg-white rounded-lg shadow">
					<!-- Modal header -->
					<div class="flex justify-between items-start p-4 rounded-t border-b">
						<h3 class="text-xl font-semibold text-gray-900">
							{{header}}
						</h3>
						
						<button type="button" @click="closeModal"
						        class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center"
						        data-modal-toggle="defaultModal">
							<svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
							     xmlns="http://www.w3.org/2000/svg">
								<path fill-rule="evenodd"
								      d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
								      clip-rule="evenodd"></path>
							</svg>
							<span class="sr-only">Close modal</span>
						</button>
						
					</div>
					<!-- Modal body -->
					<div class="p-6 space-y-6">
						<slot></slot>
					</div>
					<!-- Modal footer -->
					<div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200" v-if="!hideAction">
						<slot name="action"></slot>
					</div>
				</div>
			</div>
		</div>
	</Teleport>
</template>

<script>
export default {
	name: "Modal",
	props: {
		modelValue: Boolean,
		header: String,
		hideAction: {
			type: Boolean,
			required: false
		}
	},
	emits: ['update:modelValue'],
	methods: {
		closeModal() {
			this.$emit('update:modelValue', false);
		}
	}
}
</script>