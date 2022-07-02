import {createRouter, createWebHistory} from "vue-router";
import Home from "./pages/Home.vue"

const Upload = () => import(/* webpackChunkName: "upload" */ './pages/Upload.vue');

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
        }
    ]
});

export default router;