import Vue from 'vue'
import VueRouter from 'vue-router'
import trees from './../utils/tree.json'

Vue.use(VueRouter)

export const routes = [
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
        redirect: '/Idatepicker',
        children: [
          { 
            path: '/Idatepicker',
            component: resolve => require(['@/views/Idatepicker'], resolve),
            name: 'Idatepicker',
            meta: {
              FunId: 0,
              menuName: '日期时间选择',
              name: 'Idatepicker',
              affix: true
            },
          },
          { 
            path: '/IFrom',
            component: resolve => require(['@/views/IFrom'], resolve),
            name: 'IFrom',
            meta: {
              FunId: 1,
              menuName: '表单组件',
              name: 'IFrom',
              affix: true
            },
          },
          { 
            path: '/Notice',
            component: resolve => require(['@/components/Notice'], resolve),
            name: 'Notice',
            meta: {
              FunId: 2,
              menuName: '弹窗',
              name: 'Notice',
              affix: true
            },
          }
        ]
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
 
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由守卫 操作动态添加路由
// router.beforeEach((to, from, next) => {
//   console.log('to', to)
//   if(to.path === '/doecs'){
//     let tempRouter = routerFormat(filterRouter(trees,[]));
//     console.log(tempRouter)
//     let accessRoutes = routes[0].children[1].children=[...tempRouter];
//     console.log(accessRoutes)
//     router.addRoutes(accessRoutes)
//     console.log(router)
//   }
//   next()
// })

//获取可访问的路由
function getAccessRoute(val) {
  console.log(val)
  console.log(routes[0].children[1].children);
  return routes[0].children[1].children.splice(1,0,...val);
}

// 格式化路由
function routerFormat(routers) {
  //简单检查是否是可以处理的数据
  if (!(routers instanceof Array)) return false;
  //处理后的容器
  let fmRouters = [];
  routers.forEach(router => {
    let { name, path, url, size } = router;
    
    let fmRouter = {
      path: url,
      component(resolve) {
        //拼出相对路径，由于component无法识别变量  
        //利用Webpack 的 Code-Splitting 功能
        // return import(`@/views/${Component}.vue`)
        // require(['@/views/' + Component], resolve);
        if(process.env.NODE_ENV == "production"){
          require(['@/views/' + Component], resolve);
        }else{
          // return import(`../../../NotesDocument${url}`)
        }
      },
      name: name,
      menuName: name,
    };
    fmRouters.push(fmRouter);
  });
  return fmRouters;
}

//过滤路由,去掉目录层级的路由
function filterRouter(data, arr) {
  let result = arr;
  data.forEach(item => {
    if (item.children && item.children.length > 0) {
      filterRouter(item.children, result)
    } else if (!item.children){
      result.push(item)
    }
  })
  return result;
}




export default router
