# 贡献

> 将系统中复用性较高的组件进行抽离、复用，利于提高开发效率以及产品的统一性。

本篇教你如何在 Legoland 中开发你的公用组件。

## 开发组件

### 一、启动 Legoland

```
git clone legoland_repo_url
npm install
npm run serve
```


### 二、在 Legoland 中新增组件

执行 `npm run add` 后根据提示操作：

1. 填入组件名称
2. 选择组件类型
3. 选择组件模板

![add](./add-step.png)

之后 Legoland 会自动创建组件文件，目录位于 `/src` 中对应的组件类型文件夹下（例如：`/src/blocks/my-block`），然后即可开始编写组件代码。

### 三、编写文档

文档用来展示组件的使用方式，可以让开发者更直观的感受到组件的 UI 与用法。

Legoland 支持使用 README.md 文件编写组件文档，只需在 `:::demo 描述信息` 与 `:::` 中编写 `Vue` 单文件组件代码即可进行组件示例的展示：

```md
// example/README.md

:::demo 这是一个文档示例
<template>
   <el-button type="primary" @click="alert">{{text}}</el-button>
</template>
<script>
export default {
  data () {
    return {
      text: 'Legoland'
    }
  },
  methods: {
    alert () {
      this.$alert('Hello Legoland')
    }
  }
}
</script>
:::
```

以上渲染结果如下：

:::demo 这是一个文档示例
<template>
   <el-button type="primary" @click="alert">{{text}}</el-button>
</template>
<script>
export default {
  data () {
    return {
      text: 'Legoland'
    }
  },
  methods: {
    alert () {
      this.$alert('Hello Legoland')
    }
  }
}
</script>
:::

## 新增组件模板

通过脚手架新增组件时，可以选择模板来快速初始化组件文件，Legoland 已经内置了 `vue-js` 模板，我们也可以添加额外的模板。

在 `/templates` 下新建模板的目录以及文件；模板文件中可使用变量，在模板被使用时，变量会替换为对应的值：

| 变量           | 释义     |
| -------------- | -------- |
| `{{LIB_NAME}}` | 组件名   |
| `{{LIB_TYPE}}` | 组件类型 |
