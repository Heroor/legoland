# GtInput 输入框

`el-input` 与 `el-form-item` 的封装

## 基础用法
<el-form>
  <gt-input v-model="name" label="姓名"></gt-example>
</el-form>

```html
<template>
  <el-form>
    <gt-input v-model="name" label="姓名"></gt-example>
  </el-form>
</template>

<script>
export default {
  data () {
    return {
      name: ''
    }
  },
}
</script>
```

## Attributes

| 参数            | 说明   | 类型   | 可选值 | 默认值 |
| --------------- | ------ | ------ | ------ | ------ |
| value / v-model | 绑定值 | Number | -      | ''     |

## Events

| 事件名 | 说明                   | 参数   |
| ------ | ---------------------- | ------ |
| input  | 绑定值变化时触发的事件 | 绑定值 |
