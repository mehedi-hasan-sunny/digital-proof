import {createRouter, createWebHistory} from "vue-router";
import Home from "./pages/Home.vue"

const Upload = () => import(/* webpackChunkName: "upload" */ './pages/Upload.vue');

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/",
            component: Home
        },
        {
            path: "/upload",
            component: Upload
        }
    ]
});

export default router;