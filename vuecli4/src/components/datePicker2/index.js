import dateinput from './src/input';
const picker = {
  install:function(Vue){
    Vue.component('vk-date-picker2', dateinput)
  }
}

export default picker;