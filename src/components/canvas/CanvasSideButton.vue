<template>
	<div class="flex flex-col gap-5">
		<div class="text-center mb-5">
			<round-button class="text-violet-900" @click="downloadPdf" :loading="downloadLoading">
				<svg width="22" height="20" viewBox="0 0 22 20" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
							d="M11 13V1M11 13L7 9M11 13L15 9M1 15L1.621 17.485C1.72915 17.9177 1.97882 18.3018 2.33033 18.5763C2.68184 18.8508 3.11501 18.9999 3.561 19H18.439C18.885 18.9999 19.3182 18.8508 19.6697 18.5763C20.0212 18.3018 20.2708 17.9177 20.379 17.485L21 15"
							stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
				</svg>
			</round-button>
			<span class="block text-xs font-semibold mt-1">
				Download
			</span>
		</div>
		<div class="text-center" v-if="isDeletable">
			<round-button class="text-red-500" @click="deleteFile(currentImageIndex)">
				<svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
					<path
							d="M12 3.5C12 2.96957 11.7893 2.46086 11.4142 2.08579C11.0391 1.71071 10.5304 1.5 10 1.5C9.46957 1.5 8.96086 1.71071 8.58579 2.08579C8.21071 2.46086 8 2.96957 8 3.5H12ZM6.5 3.5C6.5 3.04037 6.59053 2.58525 6.76642 2.16061C6.94231 1.73597 7.20012 1.35013 7.52513 1.02513C7.85013 0.700121 8.23597 0.442313 8.66061 0.266422C9.08525 0.0905302 9.54037 0 10 0C10.4596 0 10.9148 0.0905302 11.3394 0.266422C11.764 0.442313 12.1499 0.700121 12.4749 1.02513C12.7999 1.35013 13.0577 1.73597 13.2336 2.16061C13.4095 2.58525 13.5 3.04037 13.5 3.5H19.25C19.4489 3.5 19.6397 3.57902 19.7803 3.71967C19.921 3.86032 20 4.05109 20 4.25C20 4.44891 19.921 4.63968 19.7803 4.78033C19.6397 4.92098 19.4489 5 19.25 5H17.93L17.428 10.195C16.9656 9.96123 16.4768 9.78395 15.972 9.667L16.424 5H3.576L4.734 16.967C4.78794 17.5236 5.04724 18.0403 5.46137 18.4161C5.87549 18.792 6.41475 19.0001 6.974 19H8.732C9.0183 19.5486 9.38128 20.0537 9.81 20.5H6.974C6.04186 20.5001 5.1431 20.153 4.45295 19.5265C3.7628 18.8999 3.33073 18.0388 3.241 17.111L2.07 5H0.75C0.551088 5 0.360322 4.92098 0.21967 4.78033C0.0790175 4.63968 0 4.44891 0 4.25C0 4.05109 0.0790175 3.86032 0.21967 3.71967C0.360322 3.57902 0.551088 3.5 0.75 3.5H6.5ZM20 16C20 17.4587 19.4205 18.8576 18.3891 19.8891C17.3576 20.9205 15.9587 21.5 14.5 21.5C13.0413 21.5 11.6424 20.9205 10.6109 19.8891C9.57946 18.8576 9 17.4587 9 16C9 14.5413 9.57946 13.1424 10.6109 12.1109C11.6424 11.0795 13.0413 10.5 14.5 10.5C15.9587 10.5 17.3576 11.0795 18.3891 12.1109C19.4205 13.1424 20 14.5413 20 16ZM12.854 13.646C12.7601 13.5521 12.6328 13.4994 12.5 13.4994C12.3672 13.4994 12.2399 13.5521 12.146 13.646C12.0521 13.7399 11.9994 13.8672 11.9994 14C11.9994 14.1328 12.0521 14.2601 12.146 14.354L13.793 16L12.146 17.646C12.0521 17.7399 11.9994 17.8672 11.9994 18C11.9994 18.1328 12.0521 18.2601 12.146 18.354C12.2399 18.4479 12.3672 18.5006 12.5 18.5006C12.6328 18.5006 12.7601 18.4479 12.854 18.354L14.5 16.707L16.146 18.354C16.1925 18.4005 16.2477 18.4374 16.3084 18.4625C16.3692 18.4877 16.4343 18.5006 16.5 18.5006C16.5657 18.5006 16.6308 18.4877 16.6916 18.4625C16.7523 18.4374 16.8075 18.4005 16.854 18.354C16.9005 18.3075 16.9374 18.2523 16.9625 18.1916C16.9877 18.1308 17.0006 18.0657 17.0006 18C17.0006 17.9343 16.9877 17.8692 16.9625 17.8084C16.9374 17.7477 16.9005 17.6925 16.854 17.646L15.207 16L16.854 14.354C16.9479 14.2601 17.0006 14.1328 17.0006 14C17.0006 13.8672 16.9479 13.7399 16.854 13.646C16.7601 13.5521 16.6328 13.4994 16.5 13.4994C16.3672 13.4994 16.2399 13.5521 16.146 13.646L14.5 15.293L12.854 13.646Z"
							fill="currentColor"/>
				</svg>
			</round-button>
			<span class="block text-xs font-semibold mt-1">
				Delete
			</span>
		</div>
	</div>
</template>

<script lang="ts">
import {inject, nextTick, reactive, ref, toRefs} from "vue";
import RoundButton from "../../elements/RoundButton.vue";
import {jsPDF} from "jspdf";
import {CanvasSelectedOptions, InjectFileListType, YesOrNo} from "../../types";
import {canvasDrawer} from "../../helpers/canvasDrawer";
import {useRoute} from "vue-router";

export default {
	name: "CanvasSideButton",
	components: {RoundButton},
	props: {
		currentImageIndex: Number,
		isDeletable: {
			type: Boolean,
			required: false
		},
		isShareable: {
			type: Boolean,
			required: false
		},
		link: {
			type: String,
			required: false
		}
	},
	setup(props: any) {
		const route = useRoute();
		const files = inject("files") as unknown as InjectFileListType;
		const deleteFile = inject("deleteFile");
		const canvasOptions = inject("canvasOptions") as CanvasSelectedOptions;
		
		const loadingButtons = reactive({
			downloadLoading: false
		})
		
		const APP_NAME = import.meta.env.VITE_APP_TITLE;
		
		
		const downloadableItem = (drawnCanvas: HTMLCanvasElement | HTMLImageElement) =>{
			if (drawnCanvas instanceof HTMLImageElement)
			{
				return drawnCanvas
			}
			return drawnCanvas.toDataURL('image/jpeg')
		}
		
		
		
		const downloadPdf = async () => {
			
			let drawnCanvases: any;
			let fromCanvas: boolean = false;
			loadingButtons.downloadLoading = true;
			if (route.name === "preview") {
				drawnCanvases = await Promise.all(
						Array.from(files.value).map(async (file) => {
							const image: HTMLImageElement = new Image();
							image.title = file.name;
							image.dataset.type = file.type;
							image.loading = "lazy";
							image.src = await fileToBase64(file) as string
							return image
						})
				);
				
			} else {
				drawnCanvases = await Promise.all(
						Array.from(files.value).map(async (file) => {
							const canvas: HTMLCanvasElement = document.createElement('canvas');
							canvas.title = file.name;
							canvas.dataset.type = file.type;
							return await canvasDrawer(file, null, canvas, null, canvasOptions.bleedSize, canvasOptions.showFoldedArea as YesOrNo);
						})
				);
				fromCanvas = true;
			}
			createPDF(drawnCanvases, fromCanvas)
			
		}
		
		const createPDF = (drawnCanvases: any, fromCanvas: boolean = false) =>{
			const doc = new jsPDF({
				orientation: drawnCanvases[0].width > drawnCanvases[0].height ? "l" : "p",
				unit: 'in',
				format: [drawnCanvases[0].width / 300, drawnCanvases[0].height / 300]
			});
			
			drawnCanvases.forEach((drawnCanvas: any, index: number) => {
				if(!fromCanvas) {
					drawnCanvas.onload = () =>{
						addPagesToPdfDoc(doc, drawnCanvas, index, drawnCanvases.length - 1)
					}
				}
				else{
					addPagesToPdfDoc(doc, drawnCanvas, index, drawnCanvases.length - 1)
				}
			});
			
		}
		
		const addPagesToPdfDoc = (doc: jsPDF, drawnCanvas: HTMLImageElement | HTMLCanvasElement | any, index: number, downloadAt: number) =>{
			if (index !== 0) {
				doc.addPage(
						[drawnCanvas.width  / 300, drawnCanvas.height  / 300],
						drawnCanvas.width > drawnCanvas.height ? "l" : "p"
				)
			}
			
			// const fileType = drawnCanvas.dataset.type.replace("image/", '').toUpperCase();
			doc.addImage(
					downloadableItem(drawnCanvas),
					'JPEG',
					0,
					0,
					drawnCanvas.width / 300,
					drawnCanvas.height / 300,
					drawnCanvas.title
			);
			
			if(index === downloadAt){
				doc.save(`${APP_NAME.replace(" ", '-').toLowerCase()}-${(new Date().getTime())}`);
				loadingButtons.downloadLoading = false;
			}
		}
		
		
		const fileToBase64 = (file: File) => {
			return new Promise((resolve, reject) => {
				const reader: any = new FileReader();
				reader.readAsDataURL(file);
				reader.onload = () => resolve(reader.result);
				reader.onerror = (error: any) => reject(error);
			});
		}
		return {
			deleteFile,
			downloadPdf,
			...toRefs(loadingButtons)
		}
	}
}
</script>