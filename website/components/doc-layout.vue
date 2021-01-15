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
  display: flex;
  .sidebar {
    overflow: auto;
    width: 300px;
    border-right: 1px solid #11418d;
  }
  .main {
    overflow: auto;
    flex: 1;
  }
}
</style>
