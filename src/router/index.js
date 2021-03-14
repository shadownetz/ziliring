import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import firebase from "../firebase/firebase"

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/dashboard',
        component: ()=>import('../views/dashboard/dashboardContainer'),
        meta: {
            requiresAuth: true
        },
        children: [
            {
                path: '',
                name: 'Dashboard',
                component: ()=>import('../views/dashboard/dashboard')
            },
            {
                path: '/new-contribution',
                name: 'NewContribution',
                component: ()=>import('../views/dashboard/contributions/contribution')
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

router.beforeEach((to, from, next) => {
    let loggedUser = firebase.auth().currentUser;
    let requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if(requiresAuth && !loggedUser) next({name: 'Home'});
    else next()
})

export default router
