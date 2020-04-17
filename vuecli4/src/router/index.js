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
        FunId: 0,
        path: '/index',
        component: resolve => require(['@/views/home/home'], resolve),
        name: 'Home',
        meta: {
          FunId: 0,
          menuName: '主页',
          name: 'Home',
          affix: true
        },
        children: []
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
