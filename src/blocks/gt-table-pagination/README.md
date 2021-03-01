# GtTablePagination 分页表格

`gt-table` 与分页的封装，支持自动请求数据，回填请求参数

## 示例

### 基础用法

:::demo 表格组件的基础用法
<template>
  <gt-table-pagination :tableOption="tableOption"></gt-table-pagination>
</template>

<script>
export default {
  data () {
    return {
      tableOption: {
        columns: [
          {
            label: '姓名',
            prop: 'name',
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
        actions: [
          {
            label: '详情',
            click: row =>
              this.$router.push({
                name: 'home',
                params: { id: row.id },
              }),
          },
          {
            label: '按钮禁用',
            disabled: () => true,
          },
          {
            label: '操作提示',
            confirm: '是否确定操作？',
            click: row => {
              this.$message.success('操作成功!')
            },
          },
        ],
        data: [{ name: 'Tom', status: 1, }, { name: 'Jerry', status: 0, }],
      },
    }
  },
}
</script>
:::

## Props

| 参数           | 说明                                            | 类型    | 可选值        | 默认值                                            |
| -------------- | ----------------------------------------------- | ------- | ------------- | ------------------------------------------------- |
| query          | 列表请求参数                                    | Object  | -             | `'{}'`                                            |
| tableOption    | 表格配置项，见下表                              | Object  | -             | -                                                 |
| router         | 是否在 URL 中记录表格参数                       | Boolean | true \| false | `true`                                            |
| name           | 命名空间                                        | String  | -             | `'table'`                                         |
| layout         | 表格布局                                        | String  | -             | `'->, total, prev, pager, next, jumper'`          |
| pageSizes      | 分页配置                                        | Array   | -             | `[10, 20, 30, 40, 50, 100]`                       |
| pagerCount     | 分页按钮的数量                                  | Number  | -             | `7`                                               |
| props          | 分页字段 `page size total` 属性名的配置         | Object  | -             | `{ page: 'page', size: 'count', total: 'total' }` |
| showBadge      | 传入 `true` 则表格会增加 `badge-table` CSS 类名 | Boolean | -             | `false`                                           |
| fetchImmediate | 是否在表格 created 时立即请求数据源             | Boolean | -             | `true`                                            |

### *tableOption*

| 参数           | 说明                                | 类型    | 可选值 | 默认值 |
| -------------- | ----------------------------------- | ------- | ------ | ------ |
| columns        | 列配置                              | Array   | -      | -      |
| actions        | 操作列配置                          | Array   | -      | `[]`   |
| headers        | 表头配置                            | Object  | -      | `{}`   |
| fetch          | 数据请求                            | Promise | -      | -      |
| data           | 操作列配置                          | Array   | -      | -      |
| id             | 行的唯一标识字段                    | String  | -      | `'id'` |
| selectedIdList | 已选择的行的唯一标识                | Array   | -      | -      |
| selectedList   | 已选择的行                          | Array   | -      | -      |
| serviceUrl     | GET 数据源请求地址                  | String  | -      | -      |
| loading        | 加载状态                            | Boolean | -      | `true` |
| tableEvents    | 表格事件配置                        | Object  | -      | `{}`   |
| tableProps     | `gt-table` 表格的 `tableProps` 配置 | Object  | -      | `{}`   |

## Methods

| 方法名                | 说明                                     | 参数  |
| --------------------- | ---------------------------------------- | ----- |
| tableOption.reset     | 获取数据，重置 query                     | query |
| tableOption.reload    | 获取数据，不改变 query                   | -     |
| tableOption.fetchData | 获取数据，传入的 query 与原有 query 合并 | query |

## Events

| 事件名    | 说明                                | 参数                      |
| --------- | ----------------------------------- | ------------------------- |
| init      | 组件挂载完毕事件                    | 组件示例, elTable组件示例 |
| select    | 选中行时触发的时间                  | -                         |
| fetchData | 数据请求成功后的事件                | Response                  |
| reset     | 调用 tableOption.reset 时触发的事件 | -                         |
