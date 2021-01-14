<template lang="pug">
doc-layout.document__page
  template(#sidebar)
    | sidebar
  | docType: {{ docType }}
</template>

<script>
import DocLayout from '@website/components/doc-layout'

export default {
  name: 'Doc',
  components: { DocLayout },
  data() {
    return {}
  },
  computed: {
    docType() {
      return this.$route.name
    }
  }
}
</script>

<style lang="less" scoped>
.document__page {
}
</style>
