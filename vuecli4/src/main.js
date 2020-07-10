import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
import vkDatePicker from './components/DatePicker/index'
import IragDatePicker from './components/DateTimePicker/index'

import axios from 'axios'
Vue.prototype.$axios= axios

Vue.config.productionTip = false
Vue.use(axios);
Vue.use(vkDatePicker)
Vue.use(IragDatePicker)
Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
