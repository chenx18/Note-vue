import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Element from 'element-ui'
import './plugins/element.js'
import vkDatePicker from './components/DatePicker/index'

import axios from 'axios'
Vue.prototype.$axios= axios

Vue.config.productionTip = false
Vue.use(axios);
Vue.use(vkDatePicker)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
