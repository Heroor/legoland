<template lang="pug">
doc-layout.document__page
  template(#sidebar)
    | sidebar
  | document
</template>

<script>
import DocLayout from './components/doc-layout'
export default {
  components: { DocLayout },
  name: 'Doc'
}
</script>

<style lang="less" scoped>
.document__page {
}
</style>
