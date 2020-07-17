class Compile {
  constructor(el, vm) {
    console.log(el, vm)
    // 判断是否是元素节点，是=》取该元素 否=》取文本
    this.el = this.isElementNode(el) ? el:document.querySelector(el)
    this.vm = vm
    // 如果这个元素能获取到 我们才开始编译
    if(this.el) {
      // 1. 先把真实DOM移入到内存中 fragment
      let fragment = this.node2fragment(this.el)
      // 2. 编译 =》 在fragment中提取想要的元素节点 v-model 和文本节点
      this.compile(fragment)
      // 3. 把编译好的fragment在放回到页面中
      this.el.appendChild(fragment)
    }
  }
  // 判断是否是元素节点
  isElementNode(node) {
    return node.nodeType === 1
  }
  // 是不是指令
  isDirective(name) {
    return name.includes('v-')
  }
  // 将el中的内容全部放到内存中
  // 为提高性能和效率，先将vue实例根节点的el转换成文档碎片fragment进行解析编译操作，解析完成，再将fragment添加回原来的真实dom节点中
  node2fragment(el) {
    let fragment = document.createDocumentFragment()
    let firstChild
    // 遍历取出firstChild，直到firstChild为空
    while (firstChild = el.firstChild) {
      fragment.appendChild(firstChild)
    }
    return fragment // 内存中的节点
  }

  //编译 =》 提取想要的元素节点 v-model 和文本节点
  compile(fragment) {
    // 需要递归
    let childNodes = fragment.childNodes
    Array.from(childNodes).forEach(node => {
      // 是元素节点 直接调用文本编译方法 还需要深入递归检查
      if(this.isElementNode(node)) {
        this.compileElement(node)
        // 递归深入查找子节点
        this.compile(node)
      // 是文本节点 直接调用文本编译方法
      } else {
        this.compileText(node)
      }
    })
  }

  // 编译元素方法
  compileElement(node) {
    let attrs = node.attributes
    Array.from(attrs).forEach(attr => {
      let attrName = attr.name
      // 判断属性名是否包含 v-指令
      if(this.isDirective(attrName)) {
        // 取到v-指令属性中的值（这个就是对应data中的key）
        let expr = attr.value
        // 获取指令类型
        let [,type] = attrName.split('-')
        // node vm.$data expr
        compileUtil[type](node, this.vm, expr)
      }
    })
  }
  // 这里需要编译文本
  compileText(node) {
    //取文本节点中的文本
    let expr = node.textContent
    let reg = /\{\{([^}]+)\}\}/g
    if(reg.test(expr)) {
      // node this.vm.$data text
      compileUtil['text'](node, this.vm, expr)
    }
  }
}
// 解析不同指令或者文本编译集合
const compileUtil = {
  text(node, vm, expr) { // 文本
    let updater = this.updater['textUpdate']
    updater && updater(node, getTextValue(vm, expr))
  },
  // 在compile中解析不同指令或者文本编译集合的时候绑定watcher.
  model(node, vm, expr){ // 输入框
    let updater = this.updater['modelUpdate']
    // 加一个监控 数据变化了 应该调用这个watcher 的 callback
    new Watcher(vm,expr,(newValue) => {
      // 当值变化后 会调用cb，将新值传递过来
      updater && updater(node, this.getValue(vm, expr))
    })
    node.addEventListener('input',(e) => {
      let newValue = e.target.value
      this.setVal(vm, expr, newValue)
    })
    updater && updater(node, getValue(vm, expr))
  },
  // 更新函数
  updater: {
    // 文本赋值
    textUpdate(node, value) {
      node.textContent = value
    },
    // 输入框value赋值
    modelUpdate(node, value) {
      node.value = value
    }
  }
}
// 辅助工具函数
// 绑定key上对应的值，从vm.$data中取到
const getValue = (vm, expr) => {
  expr = expr.split('.') // [message, a, b, c]
  return expr.reduce((prev, next) => {
    return prev[next]
  }, vm.$data)
}

// 获取文本编译后的对应的数据
const getTextValue = (vm, expr) => {
  return expr.replace(/\{\{([^}]+)\}\}/g, (...arguments) => {
    return getValue(vm, arguments[1])
  })
}