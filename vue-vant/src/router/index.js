import Router from "vue-router";
import Vue from "vue";

Vue.use(Router);

//静态路由
export let constantRoutes = [
    {
      name: 'login',
      path: "/login",
      component: resolve => require(['@/views/login/login'], resolve)
    },
    {
      name: 'register',
      path: "/register",
      component: resolve => require(['@/views/login/register'], resolve)
    },
    { 
      name: '云图漫步',
      path: "/",
      component: resolve => require(['@/views/layout/index'], resolve),
      redirect: '/index',
      children:[
        {
          path: "/index",
          name: "home",
          meta: {
            auth: true
          },
          component: resolve => require(['@/views/home/home'], resolve)
        },
        {
          name: "todos",
          path: "/todos",
          meta: {
            auth: true
          },
          component: resolve => require(['@/views/todos/todos'], resolve)
        },
        {
          name: "about",
          path: "/about",
          meta: {
            auth: true
          },
          component: resolve => require(['@/views/about/about'], resolve)
        },
      ]
    }
  ];

const createRouter = () => new Router({
  routes: constantRoutes
});
const router = createRouter();

export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router;