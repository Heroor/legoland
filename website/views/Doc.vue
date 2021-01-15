<template lang="pug">
doc-layout.document__page
  template(#sidebar)
    sidebar(v-model="activeManu", name-prop="title", :data="menus")
  div docType: {{ docType }}
  div activeManu: {{ activeManu }}
</template>

<script>
import DocLayout from '@website/components/doc-layout'
import Sidebar from '@website/components/sidebar'

export default {
  name: 'Doc',
  components: { DocLayout, Sidebar },
  data() {
    return {
      num: 0,
      activeManu: '',
      menus: [
        {
          title: 'example',
        },
        {
          title: 'example2',
        },
      ],
    }
  },
  computed: {
    docType() {
      return this.$route.name
    },
  },
  watch: {
    '$route.name': {
      immediate: true,
      handler(name) {
        console.log(name)
      },
    },
  },
}
</script>

<style lang="less" scoped>
.document__page {
}
</style>
