<template lang="pug">
ul.sidebar__wrap
  li(v-for="item in data", :class="{ active: value === item[activeProp] }")
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
    activeProp: {
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
  position: sticky;
  top: 60px;
  list-style: none;
  padding: 2em 0;
  margin: 0;
  li {
    line-height: 1.4;
    padding: 0 1em 0 2em;
    margin-bottom: 0.6em;
    a {
      color: #fff;
      text-decoration: none;
    }
    &.active a {
      color: #79b8ff;
    }
  }
}
</style>
