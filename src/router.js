import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Routing from './views/Routing.vue'
import OpenSpaces from "./views/OpenSpaces";
import Loading from "./components/Loading";
import StaircaseConfig from "./components/StaircaseConfig"
import OpenSpaceDetail from "./views/OpenSpaceDetail";
import IndoorMapDetail from "./views/IndoorMapDetail";
import IndoorMaps from "./views/IndoorMaps";

Vue.use(Router);

export default new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '/',
            name: 'home',
            component: Home
        },
        {
            path: '/about',
            name: 'about',
            // route level code-splitting
            // this generates a separate chunk (about.[hash].js) for this route
            // which is lazy-loaded when the route is visited.
            component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
        },
        {
            path: '/routing',
            name: 'Routing',
            component: Routing
        },
        {
            path: '/open-spaces',
            name: 'OpenSpaces',
            component: OpenSpaces
        }, {
            path: '/open-space',
            name: 'OpenSpaceDetail',
            component: OpenSpaceDetail,
            props: true
        },
        {
            path: '/buildings',
            name: 'IndoorMaps',
            component: IndoorMaps
        }, {
            path: '/building',
            name: 'IndoorMapDetail',
            component: IndoorMapDetail,
            props: true
        },
        {
            path: '/building/staircase',
            name: 'StaircaseConfig',
            component: StaircaseConfig,
            props: true
        },
        {
            path: '/wait',
            name: 'Loading',
            component: Loading
        },
    ]
})
