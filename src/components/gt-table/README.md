# GtTable 累加示例

`el-table` 表格的封装

## 示例

### 基础用法

:::demo 表格的基础用例
<template>
  <gt-table :columns="columns" :data="data"></gt-table>
</template>

<script>
export default {
  data () {
    return {
      data: [{
        id: '1',
        name: 'Tom',
        age: 12,
        address: '西湖区',
        status: 1,
      }, {
        id: '2',
        name: 'Jerry',
        age: 10,
        address: '拱墅区',
        status: 0,
      }],
      columns: [
        {
          label: '序号',
          type: 'index',
        },
        {
          label: '姓名',
          prop: 'name',
        },
        {
          label: '年龄',
          prop: 'age',
        },
        {
          label: '地址',
          prop: 'address',
        },
        {
          label: '状态枚举',
          prop: 'status',
          enums: [
            {
              label: '禁用',
              value: 0,
              class: 'text-danger',
            },
            {
              label: '启用',
              value: 1,
              class: 'text-success',
            },
          ],
        },
      ],
    }
  },
}
</script>
:::

## Props

| 参数        | 说明                       | 类型   | 可选值 | 默认值 |
| ----------- | -------------------------- | ------ | ------ | ------ |
| data        | el-table 表格展示的数据    | Array  | -      | -      |
| columns     | 列配置                     | Array  | -      | -      |
| actions     | 操作列配置                 | Array  | -      | `[]`   |
| headers     | 表头配置                   | Object | -      | `{}`   |
| tableEvents | 传递给 el-table 的事件对象 | Object | -      | `{}`   |
| tableProps  | 传递给 el-table 的 props   | Object | -      | `{}`   |

## Events

| 事件名 | 说明                 | 参数          |
| ------ | -------------------- | ------------- |
| init   | 组件挂载时触发的事件 | el-table 示例 |
