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
    overflow: auto;
    width: 300px;
    height: calc(100vh - 61px);
    border-right: 1px solid #11418d;
  }
  .main {
    overflow: auto;
    margin-left: 300px;
  }
}
</style>
