### 组件化常用技术

### 组件传值、通信

#### 父组件 => 子组件：
- 属性props
```js
// child
props: { msg: String }
// parent
<HelloWorld msg="Welcome to Your Vue.js App"/>
```

- 引用refs
```js
// parent
<HelloWorld ref="hw"/>
this.$refs.hw.xx = 'xxx'
```

- 子组件chidren
```js
// parent
this.$children[0].xx = 'xxx'
```

#### 子组件 => 父组件：自定义事件
```js
// child
this.$emit('add', good)
// parent
<Cart @add="cartAdd($event)"></Cart>
```
#### 兄弟组件：通过共同祖辈组件
> 通过共同的祖辈组件搭桥，$parent或$root。
```js
// brother1
this.$parent.$on('foo', handle)
// brother2
this.$parent.$emit('foo')
```

#### 祖先和后代之间
- provide/inject：能够实现祖先给后代传值
```js
// ancestor
provide() {
  return {foo: 'foo'}
} 
// descendant
inject: ['foo']
```


#### 任意两个组件之间：事件总线 或 vuex
- **事件总线**：创建一个Bus类负责事件派发、监听和回调管理
- **vuex**：创建唯一的全局数据管理者store，通过它管理数据并通知组件状态变更

```js
// Bus：事件派发、监听和回调管理
class Bus{
  constructor(){
  // {
  // eventName1:[fn1,fn2],
  // eventName2:[fn3,fn4],
  // }
    this.callbacks = {}
  } 
  $on(name, fn){
    this.callbacks[name] = this.callbacks[name] || []
    this.callbacks[name].push(fn)
  }
  $emit(name, args){
    if(this.callbacks[name]){
      this.callbacks[name].forEach(cb => cb(args))
    }
  }
} 
// main.js
Vue.prototype.$bus = new Bus()

// child1
this.$bus.$on('foo', handle)

// child2
this.$bus.$emit('foo')
```