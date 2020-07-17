
// 监听器 
// 监听所有属性变化
// 核心方法 用Object.defineProperty()劫持数据，  
class KVue {
  constructor(options){
    console.log(options)
    this.$options = options;
    
    // 处理data选项
    this.$data = options.data;

    // 响应化
    this.observe(this.$data);

    new Compile(options.el, this);

    if (options.created) {
      options.created.call(this);
    }

  }

  observe(val){
    if(!val || typeof val!=='objdect') return;

    // 遍历对象
    Object.keys(val).forEach(key => {
      // 添加数据劫持
      this.defineReactive(val, key, val[key]);
      // 深度递归，保证子属性的值也被劫持
      this.observe(val[key])
    })
  
  }

  // 进行数据劫持，给每个属性设置 set 和 get 方法
  defineReactive(obj, key, val){
    console.log(obj, key, val)
    let _this = this;
    let dep = new Dep();
    Object.defineProperty(obj, key, {
      enumerable: true,
      configurable: true,
      // get 取值
      get(){
        // 将 Dep.target 添加到 dep 中
        console.log('Dep', Dep)
        console.log('Dep.target', Dep.target)
        Dep.target && dep.addDep(Dep.target);
        return val;
      },
      // set 设置值
      set(newval){
        console.log('newval', newval)
        if(newval !== val) {
          console.log(`监听到数据变化，新值${newval} --> 旧值${val}`)

          // 如果是对象 继续劫持
          _this.observe(newVal );
          val = newval;

          // 通知所有人 数据更新
          dep.notify()
        }
      }
    })
  }

}

// 消息订阅器 主要负责收集订阅者
// 在监听器Observer和订阅者Watcher之间进行统一管理,
// 监听到数据变化时需要消息订阅器通知订阅者
class Dep {
  constructor(){
    this.subs = [];
  }
  addSub(watcher){
    this.subs.push(watcher)
  }

  notify(){
    this.subs.forEach(watcher => watcher.update())
  }
}

// 订阅者 收到属性的变化通知并执行相应的函数，从而更新视图
class Watcher {
  constructor(vm, key, cb){
    this.vm = vm
    this.key = key
    this.cb = cb

    this.value = this.get();
  }

  get(){
    Dep.target = this  // 获取当前订阅者
    let value = this.vm[this.key]  // 强制执行监听器里的get函数
    Dep.target = null;
    return value;
  }

  // 更新方法
  update() {
    console.log(`update属性更新了: ${this.vm} , ${this.vm[this.key]}`)
    this.cb.call(this.vm, this.vm[this.key])
  }
}