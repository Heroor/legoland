<template lang="pug">
ul.sidebar__wrap
  li(v-for="item in data", :class="{ active: value === item[nameProp] }")
    a(href="javascript:(0)", @click="clickMenu(item)") {{ item[nameProp] }}
</template>

<script>
export default {
  name: 'sidebar',
  props: {
    value: {
      type: String,
      default: '',
    },
    data: {
      type: Array,
      default: () => [],
    },
    nameProp: {
      type: String,
      default: 'name',
    },
  },
  methods: {
    clickMenu(menu) {
      const menuName = menu[this.nameProp]
      console.log(menu, menuName)
      if (this.value === menuName) return

      this.$emit('input', menuName)
      this.$emit('click', menu)
    },
  },
}
</script>

<style lang="less" scoped>
.sidebar__wrap {
  list-style: none;
  padding-left: 0;
  li {
    line-height: 1.5;
    padding-left: 2em;
    a {
      color: #383838;
      text-decoration: none;
    }
    &.active a {
      font-weight: bold;
      color: #11418d;
    }
  }
}
</style>
