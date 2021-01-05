# {{ELEMENT_NAME}} {{ELEMENT_TYPE}}

## 基础用法

```html
<example-component v-model="num" @change="onChange"></example-component>
```

```js
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
```

## Attributes

| 参数            | 说明   | 类型   | 可选值 | 默认值 |
| --------------- | ------ | ------ | ------ | ------ |
| value / v-model | 绑定值 | Number | -      | `0`    |

## Events

| 事件名 | 说明                   | 参数   |
| ------ | ---------------------- | ------ |
| change | 绑定值变化时触发的事件 | 绑定值 |

## Methods

## Slots
