<template lang="pug">
.demo-block
  .demo-desc
    slot(name="desc")
  .demo-container
    slot
</template>

<style lang="less" scoped>
.demo-block {
  .demo-container {
    padding: 20px;
    border: 2px solid #eee;
    border-radius: 6px 6px 0 0;
  }
}
</style>
