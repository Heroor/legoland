<template lang="pug">
  #app
    .top-bar
      .logo Legoland
      el-menu.menu(mode="horizontal", :default-active="active", router)
        el-menu-item(v-for="route in routes", :key="route.name",
          :index="route.name") {{route.label}}
    router-view.page-container
</template>
<script>
import { routes } from '@/router'
export default {
  data() {
    return {
      routes,
      active: ''
    }
  },
  watch: {
    '$route.name': {
      handler(name) {
        this.active = name ? name.split('.')[0] : 'home'
      },
      immediate: true
    }
  }
}
</script>

<style lang="less" scoped>
#app {
  height: 100%;
  display: flex;
  flex-direction: column;
}
.top-bar {
  display: flex;
  align-items: center;
  border-bottom: solid 1px #e6e6e6;
  padding: 0 20px;
  .menu {
    border: none;
  }
  .logo {
    flex: 1;
  }
}
.page-container {
  flex: 1;
}
</style>
