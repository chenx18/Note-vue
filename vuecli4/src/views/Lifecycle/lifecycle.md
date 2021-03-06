# vue 生命周期过程
> beforeCreate > Created > beforeMount > mounted > beforeUpdate > Update > beforeDestroy > Destroyed

[Vue的生命周期及源码实现](https://blog.csdn.net/u011068996/article/details/80970284)     
[生命周期](https://blog.csdn.net/haochangdi123/article/details/80943829)     

1. new Vue()    
> 初始化Vue实例 var app = new Vue({}); 


2. init event & Lifecyle  
> 初始化实例、事件和生命周期
  - **执行 beforeCreate** --> callHook(vm, 'beforeCreate')；
  - **beforeCreate** 是拿不到数据


3. init Injections & reactivity
> 初始数据 进行数据注入 data：{...}
  - **执行created** --> callHook(vm, 'created')
  - **created** 是可以拿到数据的的，因为他在initState(vm)之后执行
  - **此时挂载阶段还没开始，$el 属性目前不可见**

- 总结： **beforeCreate** 和 **created** 函数都是在实例化 Vue 的阶段，在 _init 方法中执行的

```js
  // src/core/instance/init.js
  // _init 函数分为3步
  // 1：合并options
  // 2. 调用初始化函数
  // 3. 挂载到DOM — $mount
  Vue.proptype._init = function(options?: Object){
    ...
    // 主要就是给vm对象添加了$parent、$root、$children属性，以及一些其它的生命周期相关的标识。
    initLifecycle(vm)
    // 初始化事件相关的属性
    initEvents(vm)
    // vm添加了一些虚拟dom、slot等相关的属性和方法
    initRender(vm)

// A. 执行 beforeCreate
    callHook(vm, 'beforeCreate')   

    // 面initInjections(vm)和 initProvide(vm) 两个配套使用，
    // 用于将父组件_provided中定义的值，通过inject注入到子组件，且这些属性不会被观察
    initInjections(vm) 
    
    // 主要就是操作数据了，props、methods、data、computed、watch，
    // 从这里开始就涉及到了Observer、Dep和Watcher
    initState(vm)

    initProvide(vm) 

// B. 执行created
    callHook(vm, 'created')
  }
```

4. create钩子后，**Vue 开始进行DOM挂载**，执行vm.$mount(vm.$options.el), 
  - 在 vue 中 DOM 挂载是通过 Vue.prototype.$mount 这个原型方法实现（/src/platforms/web/entry-runtime-with-compiler.js）
  - **Vue.prototype.$mount**
    - 主要作用 进行 template 模板解析
    1. 判断 是否有 **el**，
    2. 如果没有 就等待 **vm.$mount(el)** 挂载，
    3. 检测到 **element** 挂载后，会检测是否通过 **template** 引入的模板
      - 如果不是则解析 **el** 作为 **template**
    4. 最终都会通过**render**函数的形式来进行整个模板的解析；

5. 在执行 **vm._render()** 函数渲染 VNode 之前,会调用 **beforeMount** 钩子;
  - 拿不到DOM的,此时还没有生成 HTML 到页面中

6. 在执行完 **vm._update()** 把 VNode patch 到真实 DOM 后，执行 **mounted** 钩子
  - 挂载完成，模板中的 HTML 渲染到了 html页面中，**mounted 只会执行一次**

7. beforeUpdate 发生在数据变化的前，初始化数据并不会触发;

8. Update 只要数据变化的就会调用，容易死循环，初始化数据并不会触发

- beforeUpdate 和 update 都只会在mounted以后调用

9. beforeDestroy 和 destroyed 是在 Vue.prototype.$destroy 中：
  1. 在执行销毁操作之前调用了 **callHook(vm, 'beforeDestroy')**
  2. 然后执行了一系列的销毁操作，包括删除掉所有的自身（self）、_watcher、数据引用等等；
  3. 会执行 vm.__patch__(vm._vnode, null) 触发它子组件的销毁钩子函数，这样一层层的递归调用
  4. 执行完毕后再调用 **callHook(vm, 'destroyed')**

```js
Vue.prototype.$destroy = function () {
    const vm: Component = this
    if (vm._isBeingDestroyed) {
      return
    }
    // 调用beforeDestroy钩子
    callHook(vm, 'beforeDestroy')
    vm._isBeingDestroyed = true

   // 一些销毁工作
    const parent = vm.$parent
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm)
    }

    // watchers
    if (vm._watcher) {
      vm._watcher.teardown()
    }
    let i = vm._watchers.length
    while (i--) {
      vm._watchers[i].teardown()
    }

    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--
    }
    // call the last hook...
    vm._isDestroyed = true

    // 发现子组件，会先去销毁子组件
    vm.__patch__(vm._vnode, null)

    // 执行destroyed钩子
    callHook(vm, 'destroyed')

    vm.$off()
    if (vm.$el) {
      vm.$el.__vue__ = null
    }
    if (vm.$vnode) {
      vm.$vnode.parent = null
    }
```

## keep-alive
