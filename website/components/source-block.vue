<template lang="pug">
.source-block
  .source-container(v-show="isShow")
    slot
  .source-toggle-bar(@click="toggle")
    i(:class="[isShow ? 'el-icon-caret-top' : 'el-icon-caret-bottom']")
    | code
</template>
<script>
export default {
  data() {
    return {
      isShow: false,
    }
  },
  methods: {
    toggle() {
      this.isShow = !this.isShow
    },
  },
}
</script>
<style lang="less" scoped>
.source-block {
  border-radius: 0 0 6px 6px;
  border: 2px solid #eee;
  border-top: none;
  .source-container {
    border-bottom: 2px solid #eee;
    pre {
      border-radius: 0;
      border-bottom: none;
      margin: 0;
    }
  }
}
.source-toggle-bar {
  line-height: 2.2em;
  text-align: center;
  border-radius: 0 0 6px 6px;
  background: #f8f8f8;
  color: #bbb;
  cursor: pointer;
  &:hover {
    transition: 0.2s;
    background: rgba(248, 248, 248, 0.618);
  }
}
</style>
