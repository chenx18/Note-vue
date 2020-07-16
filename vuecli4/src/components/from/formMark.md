### 手写Form、 FormItem、 Input实现
- From、FormItem、Input 组件
- FormItem 中使用 async-validator 校验
- 组件传值、通信：
  - slot
  - props $ref 
  - $on $emit 
  - $parent $root
  - provide inject
  
#### .sync和v-model的异同
```html
v-model和.sync

<!--v-model是语法糖-->
<Input v-model="username">
<!--默认等效于下⾯面这⾏行行-->
<Input :value="username" @input="username=$event">

// 但是你也可以通过设置model选项修改默认⾏行行为， Checkbox.vue
{
  model: {
    prop: 'checked',
    event: 'change'
  }
}

// 上面这样设置会导致上级使用v-model时行行为变化，相当于
<KCheckBox :checked="model.remember" @change="model.remember = $event">
</KCheckBox>

// 场景： v-model通常⽤用于表单控件，它有默认⾏行行为，同时属性名和事件名均可在⼦子组件定义
<!-- sync修饰符添加于v2.4，类似于v-model，它能⽤用于修改传递到⼦子组件的属性，如果像下面这样写 -->
<Input :value.sync="model.username">
<!-- 等效于下⾯面这⾏行行，那么和v-model的区别只有事件名称的变化 -->
<Input :value="username" @update:value="username=$event">
<!-- 这⾥里里绑定属性名称更更改，相应的属性名也会变化 -->
<Input :foo="username" @update:foo="username=$event">

// 场景：父组件传递的属性⼦子组件想修改
// 所以sync修饰符的控制能⼒力力都在⽗父级，事件名称也相对固定update:xx
// 习惯上表单元素⽤用v-model
```