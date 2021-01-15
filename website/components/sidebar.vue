<template lang="pug">
ul.sidebar__wrap
  li(
    v-for="item in data",
    :class="{ active: value === item[nameProp] }",
    @click="clickMenu(item)"
  ) {{ item[nameProp] }}
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
  li {
    &.active {
      color: #11418d;
    }
  }
}
</style>
