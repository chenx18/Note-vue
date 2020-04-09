import 'vant/lib/index.css';
import 'lib-flexible';

import { Button, Col, Dialog, Field, Icon, ImagePreview, Lazyload, List, Notify, 
  Panel, Row, Tabbar, TabbarItem,Swipe,SwipeItem,Tab, Tabs, } from 'vant';

import App from "./App.vue";
import Vue from "vue";
import router from "./router";
import store from "./vuex/store";

Vue.config.productionTip = false;
Vue.use(Row)
.use(Col)
.use(Button)
.use(List)
.use(Field)
.use(Tabbar)
.use(TabbarItem)
.use(Dialog)
.use(Notify)
.use(Panel)
.use(Lazyload)
.use(Icon)
.use(Swipe)
.use(SwipeItem)
.use(Tab)
.use(Tabs)
.use(ImagePreview);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
