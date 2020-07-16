### 插槽
> Vue 2.6.0之后采用全新v-slot语法取代之前的slot、slot-scope

#### 匿名插槽
```js

// comp1
<div>
  <slot></slot>
</div>

// parent
<comp>hello</comp>

```

#### 具名插槽
```js
// comp2
<div>
  <slot></slot>
  <slot name="content"></slot>
</div>

// parent
<Comp2>
  <!-- 默认插槽用default做参数 -->
  <template v-slot:default>具名插槽</template>
  <!-- 具名插槽用插槽名做参数 -->
  <template v-slot:content>内容...</template>
</Comp2>
```

#### 作用域插槽
```html
<!-- comp3 -->
<div>
  <slot :foo="foo"></slot>
</div>

<!-- parent -->
<Comp3>
  <!--把v-slot的值指定为作用域上下文对象 -->
  <template v-slot:default="ctx">
    来自子组件数据：{{ctx.foo}}
  </template>
</Comp3>
```


