import DatePicker from './date-input';
const picker = {
  install:function(Vue){
    Vue.component('vk-date-picker', DatePicker)
  }
}

export default picker;