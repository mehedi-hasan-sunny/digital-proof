import {createRouter, createWebHistory} from "vue-router";
import Home from "./pages/Home.vue"

const Upload = () => import(/* webpackChunkName: "upload" */ './pages/Upload.vue');
const FilesPreview = () => import(/* webpackChunkName: "files-preview" */ './pages/FilesPreview.vue');
const NotFound = () => import(/* webpackChunkName: "404" */ './pages/404.vue');
const Links = () => import(/* webpackChunkName: "404" */ './pages/Links.vue');

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            name: "home",
            component: Home
        },
        {
            path: "/upload",
            name: "upload",
            component: Upload
        },
        {
            path: "/preview/:documentId",
            name: "preview",
            component: FilesPreview
        },
        {
            path: "/links",
            name: "links",
            component: Links
        },
        {
            path: "/:pathMatch(.*)*",
            name: "404",
            component: NotFound
        }
    ]
});

export default router;