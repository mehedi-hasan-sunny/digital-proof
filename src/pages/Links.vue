<template>
	<div class="h-main flex justify-center items-center" v-if="loading">
		<loading>Loading</loading>
	</div>
	
	<div class="container  md:w-6/12 mx-auto" v-else>
		<h1 class="font-bold text-2xl mt-5 mb-3 px-4">Links</h1>
		<div class="grid grid-cols-3 gap-3 px-3 justify-center">
			<template v-for="(link, index) in links" :key="{index}">
				<div class="col-span-3 md:col-span-1">
					<router-link :to="{name: 'preview', params: {documentId: link.id}}"
					             class="text-indigo-600">
						{{ link.id }}
					</router-link>
				</div>
				<span class="col-span-2 md:col-span-1 md:text-right">{{ getDateTime(link.timestamp) }}</span>
				<div class="text-center mb-3">
					<button class="text-red-500 hover:text-red-700" @click="selectDeleteLink(link)">
						<svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path
									d="M12 3.5C12 2.96957 11.7893 2.46086 11.4142 2.08579C11.0391 1.71071 10.5304 1.5 10 1.5C9.46957 1.5 8.96086 1.71071 8.58579 2.08579C8.21071 2.46086 8 2.96957 8 3.5H12ZM6.5 3.5C6.5 3.04037 6.59053 2.58525 6.76642 2.16061C6.94231 1.73597 7.20012 1.35013 7.52513 1.02513C7.85013 0.700121 8.23597 0.442313 8.66061 0.266422C9.08525 0.0905302 9.54037 0 10 0C10.4596 0 10.9148 0.0905302 11.3394 0.266422C11.764 0.442313 12.1499 0.700121 12.4749 1.02513C12.7999 1.35013 13.0577 1.73597 13.2336 2.16061C13.4095 2.58525 13.5 3.04037 13.5 3.5H19.25C19.4489 3.5 19.6397 3.57902 19.7803 3.71967C19.921 3.86032 20 4.05109 20 4.25C20 4.44891 19.921 4.63968 19.7803 4.78033C19.6397 4.92098 19.4489 5 19.25 5H17.93L17.428 10.195C16.9656 9.96123 16.4768 9.78395 15.972 9.667L16.424 5H3.576L4.734 16.967C4.78794 17.5236 5.04724 18.0403 5.46137 18.4161C5.87549 18.792 6.41475 19.0001 6.974 19H8.732C9.0183 19.5486 9.38128 20.0537 9.81 20.5H6.974C6.04186 20.5001 5.1431 20.153 4.45295 19.5265C3.7628 18.8999 3.33073 18.0388 3.241 17.111L2.07 5H0.75C0.551088 5 0.360322 4.92098 0.21967 4.78033C0.0790175 4.63968 0 4.44891 0 4.25C0 4.05109 0.0790175 3.86032 0.21967 3.71967C0.360322 3.57902 0.551088 3.5 0.75 3.5H6.5ZM20 16C20 17.4587 19.4205 18.8576 18.3891 19.8891C17.3576 20.9205 15.9587 21.5 14.5 21.5C13.0413 21.5 11.6424 20.9205 10.6109 19.8891C9.57946 18.8576 9 17.4587 9 16C9 14.5413 9.57946 13.1424 10.6109 12.1109C11.6424 11.0795 13.0413 10.5 14.5 10.5C15.9587 10.5 17.3576 11.0795 18.3891 12.1109C19.4205 13.1424 20 14.5413 20 16ZM12.854 13.646C12.7601 13.5521 12.6328 13.4994 12.5 13.4994C12.3672 13.4994 12.2399 13.5521 12.146 13.646C12.0521 13.7399 11.9994 13.8672 11.9994 14C11.9994 14.1328 12.0521 14.2601 12.146 14.354L13.793 16L12.146 17.646C12.0521 17.7399 11.9994 17.8672 11.9994 18C11.9994 18.1328 12.0521 18.2601 12.146 18.354C12.2399 18.4479 12.3672 18.5006 12.5 18.5006C12.6328 18.5006 12.7601 18.4479 12.854 18.354L14.5 16.707L16.146 18.354C16.1925 18.4005 16.2477 18.4374 16.3084 18.4625C16.3692 18.4877 16.4343 18.5006 16.5 18.5006C16.5657 18.5006 16.6308 18.4877 16.6916 18.4625C16.7523 18.4374 16.8075 18.4005 16.854 18.354C16.9005 18.3075 16.9374 18.2523 16.9625 18.1916C16.9877 18.1308 17.0006 18.0657 17.0006 18C17.0006 17.9343 16.9877 17.8692 16.9625 17.8084C16.9374 17.7477 16.9005 17.6925 16.854 17.646L15.207 16L16.854 14.354C16.9479 14.2601 17.0006 14.1328 17.0006 14C17.0006 13.8672 16.9479 13.7399 16.854 13.646C16.7601 13.5521 16.6328 13.4994 16.5 13.4994C16.3672 13.4994 16.2399 13.5521 16.146 13.646L14.5 15.293L12.854 13.646Z"
									fill="currentColor"/>
						</svg>
					</button>
				</div>
			</template>
		</div>
		
		<modal v-model="toggleModal" header="Please confirm!">
			<h2 class="text-red-500 text-lg mb-4">Are you sure, you want to delete this link?</h2>
			
			<router-link v-if="selectedLink" :to="{name: 'preview', params: {documentId: selectedLink.id}}"
			             class="text-indigo-600 col-span-3 md:col-span-1">
				{{ selectedLink.id }}
			</router-link>
			
			<template #action>
				<button data-modal-toggle="defaultModal" type="button" @click="deleteLink"
				        class="text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
					I accept
				</button>
				<button data-modal-toggle="defaultModal" type="button" @click="closeModal"
				        class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10">
					Decline
				</button>
			</template>
		</modal>
		
		<Toaster v-model="toaster.toggle" :type="toaster.type">
			<div class="ml-3 text-sm font-semibold dark:text-white mr-2">{{ toaster.message }}</div>
		</Toaster>
	
	</div>
</template>

<script lang="ts">
import {database, storage} from "../firebase";
import {collection, getDocs, doc, deleteDoc, query, orderBy} from "@firebase/firestore";
import {reactive, ref, watch} from "vue";
import Loading from "../components/Loading.vue";
import Modal from "../components/Modal.vue";
import Toaster from "../components/Toaster.vue";
import {deleteObject, ref as storageRef} from "firebase/storage";

export default {
	name: "Links",
	components: {Toaster, Loading, Modal},
	
	setup() {
		const toggleModal: { value: boolean } = ref(false);
		const toaster: { toggle: boolean, message: string, type: string } = reactive({
			toggle: false,
			message: '',
			type: '',
		});
		const links: { value: any } = ref([]);
		const loading: { value: boolean } = ref(true);
		const selectedLink: { value: any } = ref("");
		/*setDoc(doc(database, "links", document.id), {
				timestamp: serverTimestamp()
			}, {merge: true})*/
		const getData = async () => {
			const docRef = collection(database, "links");
			const docQueried = await query(docRef, orderBy("timestamp", "desc"));
			const docData = await getDocs(docQueried);
			links.value = docData.docs.map((document) => {
				return {
					id: document.id,
					...document.data()
				}
			});
			loading.value = false;
		}
		
		getData();
		const closeModal = () => {
			toggleModal.value = false;
		}
		const getDateTime = (timestamp: { seconds: number, nanoseconds: number }) => {
			return new Date(timestamp.seconds * 1000).toString().slice(0, 21)
		}
		const selectDeleteLink = (link: string) => {
			selectedLink.value = link;
			toggleModal.value = true;
		}
		const deleteLink = async () => {
			{
				try {
					
					//delete doc
					const docRef = doc(database, "links", selectedLink.value.id);
					await deleteDoc(docRef);
					
					//delete files
					const deleteFiles = selectedLink.value.fileNames.map(async (fileName: string) => {
						const desertRef = storageRef(storage, `images/${fileName}`);
						await deleteObject(desertRef)
					})
					await Promise.all(deleteFiles)
					
					//remove from ui
					links.value = links.value.filter((item: { id: string, fileNames: Array<string>, timestamp: string }) => item.id !== selectedLink.value.id)
					
					toaster.toggle = true;
					toaster.message = "Link deleted successfully";
					toaster.type = "success";
					
					closeModal();
				} catch (e) {
					toaster.toggle = true;
					toaster.message = "Please try again after sometime";
					toaster.type = "error";
				}
			}
		}
		
		watch(toggleModal, function (value) {
			if (!value) {
				selectedLink.value = '';
			}
		})
		
		return {
			toggleModal,
			loading,
			links,
			getDateTime,
			selectDeleteLink,
			selectedLink,
			deleteLink,
			closeModal,
			toaster
		}
	}
}
</script>