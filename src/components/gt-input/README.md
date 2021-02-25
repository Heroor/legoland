# GtInput 输入框

`el-input` 与 `el-form-item` 的封装

## 示例

### 基础用法

:::demo 这是用法描述
<template>
  <el-form>
    <gt-input label="姓名" v-model="name"></gt-input>
  </el-form>
</template>
<script>
  export default {
    data () {
      return {
        name: 'Tom'
      }
    }
  }
</script>
:::

## Props

| 参数            | 说明                                                             | 类型   | 可选值 | 默认值     |
| --------------- | ---------------------------------------------------------------- | ------ | ------ | ---------- |
| value / v-model | 绑定值                                                           | Number | -      | `''`       |
| label           | form-item 的 label，没有传 placeholder 时，当做 placeholder 使用 | String | -      | `''`       |
| placeholder     | input 的 placeholder                                             | String | -      | `"请输入"` |

## Events

| 事件名 | 说明                   | 参数   |
| ------ | ---------------------- | ------ |
| input  | 绑定值变化时触发的事件 | 绑定值 |
