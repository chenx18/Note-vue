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

// router.beforeEach((to,from,next)=> {
//   console.log(to)
//   alert(to.name)
//   if(to.name !=='auth'){
    
//     return;
//     // 判断当前是否新建的auth路由空白页面
//     let _token = sessionStorage.getItem('wechataccess_token');
//     if(!_token) {
//       // 如果没有token，则让它授权
//       // 保存当前路由地址，授权还会跳到此地址
//       sessionStorage.setItem('beforeUrl',to.fullPath);
//       // 授权请求，并跳转http://192.168.14.17/auth 路由页面
//       window.location.href = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx777aaa1aaaaa7a77&redirect_uri=http%3A%2F%2Fm.water.ui-tech.cn%2Fauth&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect';
//     }else {
//       next();
//     }
//   }else {
//     next();
//   }
// })

export default router;