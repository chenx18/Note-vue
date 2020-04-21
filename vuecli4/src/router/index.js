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
        path: '/doecs',
        component: resolve => require(['@/views/note'], resolve),
        name: 'doecs',
        children: [
          { 
            path: '/detail/:url*',
            component: resolve => require(['@/views/detailed/detail'], resolve),
            name: 'detail',
          }
        ]
      },
      {
        path: '/editor',
        component: resolve => require(['@/views/editor/editor'], resolve),
        name: 'editor',
      },
    ]
  },
 
]

function beforeRouteUpdate (to, from, next) {
  console.log('routeUpdate：to=' + to.fullPath + ';from=' + from.fullPath)
  next()
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
