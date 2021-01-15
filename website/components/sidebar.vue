<template lang="pug">
ul.sidebar__wrap
  li(v-for="item in data", @click="clickMenu(item)") {{ item[nameProp] }}
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
  mounted() {
    if (this.data && this.data.length) {
      this.clickMenu(this.data[0])
    }
  },
  methods: {
    clickMenu(menu) {
      console.log(menu)
      this.$router.resolve({
        query: {
          sub: menu[this.nameProp],
        },
      })
      this.$emit('input', menu[this.nameProp])
    },
  },
}
</script>

<style lang="less" scoped>
.sidebar__wrap {
}
</style>
