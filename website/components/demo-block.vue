<template lang="pug">
.demo
  slot
  slot.code-block(name="code")
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.code-block {
}
</style>
