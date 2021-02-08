<template lang="pug">
doc-layout.document__page
  template(#sidebar)
    sidebar(
      v-model="activeMenu",
      name-prop="title",
      :data="menus",
      @click="onClickMenu"
    )
  .markdown-body
    component(v-if="activeMenu", :is="curModule")
    .no-data-tip(v-else) 暂无内容，请使用 "npm run add" 创建
</template>

<script>
import DocLayout from '@website/components/doc-layout'
import Sidebar from '@website/components/sidebar'
import getDocs from '@website/utils/getDocs'
import docRoutes from '@website/docs'

export default {
  name: 'Doc',
  components: {
    DocLayout,
    Sidebar,
  },
  data() {
    return {
      mdHTML: '',
      curModule: null,
      menus: docRoutes,
      modules: [],
      activeMenu: this.$route.params.sub,
    }
  },
  watch: {
    '$route.params.sub': {
      immediate: true,
      handler(name) {
        console.log(name)
      },
    },
  },
  created() {
    const modules = getDocs(this.$route.name)
    console.log(modules)
    this.modules = modules.map(({ path, module, name: title }) => {
      return {
        path,
        module,
        title,
      }
    })
  },
  mounted() {
    if (!this.activeMenu && this.menus && this.menus.length) {
      const menu = this.menus[0]
      this.activeMenu = menu.name
      this.onClickMenu(menu, true)
    }
  },
  methods: {
    onClickMenu(menu, isReplace) {
      this.$router[isReplace ? 'replace' : 'push']({
        params: {
          sub: menu.name,
        },
      })
      this.renderHtml(menu.name)
    },
    renderHtml(title) {
      const target = this.modules.find(m => m.title === title)
      if (target) {
        this.curModule = target.module
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    console.log('beforeRouteEnter doc')
    next(vm => {
      // if (!from.name || from.name === 'home') {
      vm.renderHtml(to.params.sub)
      // }
    })
  },
  beforeRouteUpdate(to, from, next) {
    console.log('beforeRouteUpdate doc')
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
  .no-data-tip {
    text-align: center;
    margin-top: 40px;
  }
  .markdown-body {
    padding: 0 40px;
  }
}
</style>
