<template lang="pug">
#app(:class='{ home: $route.name === "home" }')
  .top-bar
    router-link.logo(to='/') LEGOLAND
    el-menu.menu(mode='horizontal', :default-active='active', router)
      el-menu-item(
        v-for='route in routes',
        :key='route.name',
        :index='route.name'
      ) {{ route.label }}
  router-view.page__container
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
  min-height: 100%;
  display: flex;
  flex-direction: column;
  &.home {
    background: url(./assets/images/lego-bg1.png) bottom right ~'/' 500px no-repeat,
      url(./assets/images/lego-bg2.png) 0 ~'/' 500px no-repeat,
      url(./assets/images/lego-bg0.png) 0 ~'/' 16px 14px;
    .top-bar {
      background: none;
    }
  }
}
.top-bar {
  position: sticky;
  top: 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 30px;
  background: rgba(255, 255, 255, 0.9);
  .menu {
    border: none;
    background: none;
    /deep/ .el-menu-item {
      color: #11418d;
      &:hover,
      &:focus {
        background: none;
      }
    }
  }
  .logo {
    line-height: 60px;
    font-family: xhh;
    font-size: 18px;
    text-decoration: none;
    color: #11418d;
  }
}
.page__container {
  flex: 1;
  overflow: auto;
}
</style>
