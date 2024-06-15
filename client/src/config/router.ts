import { createRouter, createWebHistory } from "vue-router";
import IndexView from "./../views/IndexView.vue"
import AuthView from "../views/AuthView/AuthView.vue"

export const router = createRouter({
    routes: [
        {
            path: "/",
            component: IndexView
        },
        {
            path: "/auth",
            component: AuthView
        }
    ],
    history: createWebHistory()
})