<template lang="pug">
.doc__layout
  .sidebar
    slot(name='sidebar')
  .main
    slot
</template>

<script>
export default {
  name: 'DocLayout'
}
</script>

<style lang="less" scoped>
.doc__layout {
  display: flex;
  .sidebar {
    position: fixed;
    top: 60px;
    left: 0;
    bottom: 0;
    overflow: auto;
    width: 300px;
    border-right: 1px solid #ddd;
  }
  .main {
    overflow: auto;
    flex: 1;
    margin-left: 300px;
  }
}
</style>
