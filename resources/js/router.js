import { createWebHistory, createRouter } from  'vue-router';

import home from './pages/home.vue';
import login from './pages/login.vue';
import register from './pages/register.vue';
import dashboard from './pages/dashboard.vue';

const routes = [
    {
        path: '/',
        name: 'Home',
        component: home,
        meta: {
            requiresAuth:true
        }
    },
    {
        path: '/login',
        name: 'Login',
        component: login,
        meta: {
            requiresAuth:false
        }
    },
    {
        path: '/register',
        name: 'Register',
        component: register,
        meta: {
            requiresAuth:false
        }
    },
    {
        path: '/dashboard',
        name: 'Dashboard',
        component: dashboard,
        meta: {
            requiresAuth:true
        }
    }
]




const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to,from)=>{

    if(to.meta.requiresAuth && !localStorage.getItem('token')){
        return { name: 'Login' }
    }

    if(to.meta.requiresAuth == false && localStorage.getItem('token')){
        return { name: 'Dashboard' }
    }

})


export default router;
