import { createRouter, createWebHistory } from "vue-router";
import store from "./store/index";
import Register from "./components/Register.vue"
import Login from "./components/Login.vue"
import TodoList from "./components/TodoList.vue"
const routes = [{
        path: '/',
        redirect: { name: "login" }
    },
    { path: "/register", component: Register },
    { path: "/login", component: Login, name: 'login', meta: { auth: false } },
    {
        path: "/todolist",
        component: TodoList,
        name: 'todolist',
        meta: { auth: true }
    }
]
const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, form, next) => {
    console.log(store.getters['mainStore/LoggedIn'])
    if ('auth' in to.meta && to.meta.auth == true && !store.getters['mainStore/LoggedIn']) {
        next({ name: 'login' });
    } else if ('auth' in to.meta && !to.meta.auth && store.getters['mainStore/LoggedIn']) {
        next({ name: 'todolist' });
    } else {
        next();
    }
});
export default router