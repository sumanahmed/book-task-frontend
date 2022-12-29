import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter);

const authChildRoutes = (prop) => [
    {
        path:'login',
        name: prop + '.login',
        component:() => import('@/components/auth/Login.vue')
    },
    {
        path:'register',
        name: prop + '.login',
        component:() => import('@/components/auth/Register.vue')
    }
]

const otherRoutes = () => [
    {
        path:'/',
        name:'book',
        component:() => import('./components/Book.vue'),
        meta: {  requiresAuth:true }
    }
    
]

const routes = [
    {
        path: '/auth',
        name: 'auth',
        component: () => import('@/components/layouts/AuthLayout.vue'),
        meta: { auth: false },
        children: authChildRoutes('auth')
    },    
    {
        path: '/',
        name: 'main',
        component: () => import('@/components/layouts/MainLayout.vue'),
        meta: { auth: false },
        children: otherRoutes()
    },    
    {
        path: '*',
        component: () => import('@/components/NotFoundPage.vue'),
        meta: { hideNavigation: true }
    }
];

export const router = new VueRouter({
    mode: "history",
    hash: false,
    base: process.env.BASE_URL,
    hashbang: false,
    routes
})
  
router.beforeEach((to, from, next) => {  
    if (to.matched.some(record => record.meta.requiresAuth)) {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            next({
                path: '/auth/login',
                query: { redirect: to.fullPath }
            })
        } else {
            next();
        }
    } else {
      next();
    }
})

export default router
