import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: resolve => require(['@/layout/index'], resolve),
    redirect: '/index',
    children: [
      {
        path: '/index',
        component: resolve => require(['@/views/home/home'], resolve),
        name: 'Home',
        children: []
      },
      {
        path: '/javascript',
        component: resolve => require(['@/views/note'], resolve),
        name: 'javascript',
      },
      {
        path: '/editor',
        component: resolve => require(['@/views/editor/editor'], resolve),
        name: 'editor',
      },
    ]
  },
 
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
