# 快速开始

一、引入组件

可以注册为全局组件：

```js
import { gtExample } from 'legoland'
Vue.use(gtExample)
```

或者局部引入：

```js
import { gtExample } from 'legoland'
export default {
  components: { gtExample }
}
```

二、使用组件

```html
<template>
  <gt-example v-model="num"></gt-example>
</template>
```
