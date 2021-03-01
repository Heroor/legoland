# DatePicker 时间范围选择器

对 `el-date-picker` 的封装，使用两个独立的选择器对时间范围进行选择，默认支持选择范围的禁用。

## 示例


### 基础用法

:::demo 双向绑定的 `query` 是搜索参数对象，`query` 需包含 `startTime` 与 `endTime` 字段。
<template>
  <date-picker :query.sync="query"/>
</template>

<script>
export default {
  data () {
    return {
      query: {
        startTime: '',
        endTime: '',
      }
    }
  },
}
</script>
:::


## Props

| 参数              | 说明            | 类型     | 可选值 | 默认值         |
| ----------------- | --------------- | -------- | ------ | -------------- |
| startKey          | 开始时间 key 值 | String   | -      | `'start_time'` |
| endKey            | 结束时间 key 值 | String   | -      | `'end_time'`   |
| query             | 查询参数对象    | Object   | -      | `{}`           |
| disabledStartDate | 禁用开始时间    | Function | -      | -              |
| disabledEndDate   | 禁用结束时间    | Boolean  | -      | `false`        |
| valueFormat       | 日期值格式      | String   | -      | `'yyyy-MM-dd'` |
| dateType          | 日期控件类型    | String   | -      | `'date'`       |


## Methods

| 方法名 | 说明                   | 参数 |
| ------ | ---------------------- | ---- |
| reset  | 重置开始时间与结束时间 | -    |

## Events

| 事件名          | 说明             | 参数              |
| --------------- | ---------------- | ----------------- |
| changeStartTime | 开始时间改变事件 | value（所选时间） |
| changeEndTime   | 结束时间改变事件 | value（所选时间） |
