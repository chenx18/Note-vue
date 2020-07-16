### 递归组件
> 递归组件是可以在它们自己模板中调用自身的组件。

```vue

// Node.vue
<template>
  <div>
    <h3>{{data.title}}</h3>
    <!-- 必须有结束条件 -->
    <Node v-for="d in data.children" :key="d.id" :data="d"></Node>
  </div>
</template>
<script>
  export default {
    name: 'Node', // name对递归组件是必要的
    props: {
      data: {
        type: Object,
        require: true
      },
    },
  }
</script>

// 使用
<Node :data="{id:'1',title:'递归组件',children:[{...}]}"></Node>

```

### 实现Tree组件
> Tree组件是典型的递归组件，其他的诸如菜单组件都属于这一类，也是相当常见的。

### 组件设计
Tree组件最适合的结构是⽆无序列列表ul，创建一个递归组件Item表示Tree选项，如果当前Item存在
children，则递归渲染子树，以此类推；同时添加一个标识管理理当前层级item的展开状态。