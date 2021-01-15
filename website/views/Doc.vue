<template lang="pug">
doc-layout.document__page
  template(#sidebar)
    sidebar(
      v-model="activeMenu",
      name-prop="title",
      :data="menus",
      @click="onClickMenu"
    )
  div docType: {{ docType }}
  div activeMenu: {{ activeMenu }}
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
      activeMenu: this.$route.params.sub,
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
  mounted() {
    if (!this.activeMenu && this.menus && this.menus.length) {
      const menu = this.menus[0]
      this.activeMenu = menu.title
      this.onClickMenu(menu, true)
    }
  },
  methods: {
    onClickMenu(menu, isReplace) {
      this.$router[isReplace ? 'replace' : 'push']({
        params: {
          sub: menu.title,
        },
      })
    },
  },
  beforeRouteUpdate(to, from, next) {
    const fromPaths = from.path.substr(1).split('/')
    const toPaths = to.path.substr(1).split('/')
    if (toPaths.length < fromPaths.length) {
      return
    } else {
      this.activeMenu = to.params.sub
    }
    next()
  },
}
</script>

<style lang="less" scoped>
.document__page {
}
</style>
