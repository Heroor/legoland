# GtExample *components*
## 基础用法

<gt-example v-model="num" @change="onChange"></gt-example>

```html
<template>
  <gt-example v-model="num" @change="onChange"></gt-example>
</template>

<script>
export default {
  data () {
    return {
      num: 1
    }
  },
  methods: {
    onChange (num) {
      console.log(num)
    }
  }
}
</script>
```

## Attributes

| 参数            | 说明   | 类型   | 可选值 | 默认值 |
| --------------- | ------ | ------ | ------ | ------ |
| value / v-model | 绑定值 | Number | -      | `0`    |

## Events

| 事件名 | 说明                   | 参数   |
| ------ | ---------------------- | ------ |
| change | 绑定值变化时触发的事件 | 绑定值 |
