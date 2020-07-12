import dateinput from './src/input';
const picker = {
  install:function(Vue){
    Vue.component('vk-date-picker', dateinput)
  }
}

export default picker;