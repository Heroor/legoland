<template lang="pug">
.doc__layout
  .sidebar
    slot(name="sidebar")
  .main
    slot
</template>

<script>
export default {
  name: 'DocLayout',
}
</script>

<style lang="less" scoped>
.doc__layout {
  .sidebar {
    position: fixed;
    top: 0;
    overflow: auto;
    width: 300px;
    height: 100%;
    padding-top: 60px;
    background: #11418d;
    box-sizing: border-box;
  }
  .main {
    overflow: auto;
    margin-left: 300px;
  }
}
</style>
