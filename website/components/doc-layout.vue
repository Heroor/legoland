<template lang="pug">
.doc__layout
  nav.sidebar
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
  display: flex;
  .sidebar {
    width: 300px;
    background: #11418d;
    box-sizing: border-box;
  }
  .main {
    flex: 1;
    overflow: auto;
  }
}
</style>
