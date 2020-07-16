// 创建一个bus 类 负者事件派发、监听和回调管理

class Bus {
  constructor(){

    this.callback={}
  }
  // 监听
  $on(name,fn){
    this.callback[name] = this.callback[name] || []
    this.callback[name].push(fn)
  }

  // 事件派发
  $emit(name, args) {
    if(this.callback[name]){
      this.callback[name].forEach(cb => cb(args))
    }
  }
}