import DatePicker from './date-input';
const picker = {
  install:function(Vue){
    Vue.component('irag-date-picker', DatePicker)
  }
}

export default picker;