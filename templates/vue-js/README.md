# {{LIB_NAME}} 累加示例

这是一个示例组件，请按照以下格式书写组建文档。

## 示例


### 基础用法

:::demo 这里是此种示例的描述信息
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
      this.$message(String(num))
    }
  }
}
</script>
:::


## Props

| 参数            | 说明   | 类型   | 可选值 | 默认值 |
| --------------- | ------ | ------ | ------ | ------ |
| value / v-model | 绑定值 | Number | -      | `0`    |


## Events

| 事件名 | 说明                   | 参数   |
| ------ | ---------------------- | ------ |
| change | 绑定值变化时触发的事件 | 绑定值 |
