<template lang="pug">
doc-layout.document__page
  template(#sidebar)
    sidebar(
      v-model="activeMenu",
      name-prop="title",
      activeProp="title",
      :data="menus",
      @click="onClickMenu"
    )
  .doc-container
    component.markdown-page(v-if="activeMenu", :is="curModule")
    .no-data-tip(v-else) 暂无内容，请使用 "npm run add" 创建
</template>

<script>
import DocLayout from '@website/components/doc-layout'
import Sidebar from '@website/components/sidebar'
import getDocs from '@website/utils/getDocs'

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
      menus: [],
      modules: [],
      activeMenu: this.$route.params.sub,
    }
  },
  created() {
    const modules = getDocs(this.$route.name)
    this.modules = modules.map(({ path, module, name: title }) => {
      this.menus.push({
        title,
      })
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
      this.renderHtml(menu.title)
    },
    renderHtml(title) {
      const target = this.modules.find(m => m.title === title)
      if (target) {
        this.curModule = target.module
      }
    },
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      // if (!from.name || from.name === 'home') {
      vm.renderHtml(to.params.sub)
      // }
    })
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
  .no-data-tip {
    text-align: center;
    margin-top: 40px;
  }
  .doc-container {
    padding: 0 3em;
    .markdown-page {
      margin-bottom: 2em;
    }
  }
}
</style>
