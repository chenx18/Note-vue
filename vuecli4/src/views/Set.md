# Set数据结构
## Set1
### 基本 1
#### 方法1

## Se t2
### 基 本2
#### 方 法2

- Set是Es6提供的新的数据结构，类似数组，成员唯一，没有重复值
- 允许存储任何类型的唯一值
- 本身是一个构造函数，用来生成 set 数据结构
- 特殊值：
  - +0与-0 在存储判断唯一性的时候是恒等的，所以不重复
  - undefined 与 undefined 是恒等，所以不重复
  - NaN 与 NaN 不恒等，但在set中只能存在一个， 不重复；
- 属性：
  - Set.prototype.constructor：构造函数，默认就是Set函数。
  - Set.prototype.size：返回Set实例的成员总数

```js
// 参数可以接受一个数组，size 属性
const sets = new Set([1,14,25,36,12,45,315])
console.log([...sets])  //  [1, 14, 25, 36, 12, 45, 315]
console.log(sets.size)  //  7
```

### set方法
#### set444

- Set.prototype.add(value)：添加某个值，返回 Set 结构本身。
- Set.prototype.delete(value)：删除某个值，返回一个布尔值，表示删除是否成功。
- Set.prototype.has(value)：返回一个布尔值，表示该值是否为Set的成员。
- Set.prototype.clear()：清除所有成员，没有返回值。

```js
// 添加 add()
let addVals = new Set();
// addVals.add(1);
// addVals.add(NaN);
addVals.add(1).add(NaN).add({c1: 1, c2: 2})   // 或者链式编程写法
console.log(addVals)      // {1, NaN,{c1: 1, c2: 2}}
console.log(addVals.size) // 3

```

### set遍历

- Set.prototype.keys()：    返回键名的遍历器
- Set.prototype.values()：  返回键值的遍历器
- Set.prototype.entries()： 返回键值对的遍历器
- Set.prototype.forEach()： 使用回调函数遍历每个成员
- 注： 由于Set结构没有键名，只有键值（或者说键名和键值是同一个值），所以keys方法和values方法的行为完全一致。

## WeakSet

### 基本用法

- 与 Set 类似，也是不重复值的集合；
- 不同在于 WeakSet 的成员只能是对象，而不能是其它类型的值；
- const ws = new WeakSet();

### 方法

- WeakSet.prototype.add(value)：向 WeakSet 实例添加一个新成员。
- WeakSet.prototype.delete(value)：清除 WeakSet 实例的指定成员。
- WeakSet.prototype.has(value)：返回一个布尔值，表示某个值是否在。
