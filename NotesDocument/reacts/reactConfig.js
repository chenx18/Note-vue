const data = { 
  name: 'HTML', 
  path: 'HTML', 
  component: () => import ('@/views/01_HCSS/html.vue'), 
  redirect: {name: 'html-01'},
  children: [ 
    { name: 'html-01', path: 'html-01', title: '介绍', component: () => import ('@/views/01_HCSS/html-01.md')},
    { name: 'html-02', path: 'html-02', title: '认识HTML', component: () => import ('@/views/01_HCSS/html-02.md')},
    { name: 'html-03', path: 'html-03', title: 'HTML4 和 HTML5', component: () => import ('@/views/01_HCSS/html-03.md')},
    { name: 'html-04', path: 'html-04', title: '认识HTML标签', component: () => import ('@/views/01_HCSS/html-04.md')},
    { name: 'html-05', path: 'html-05', title: '物理路径、绝对路径、相对路径', component: () => import ('@/views/01_HCSS/html-05.md')},
  ]
};
export default data;