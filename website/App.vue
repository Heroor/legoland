<template lang="pug">
#app(:class="{ home: $route.name === 'home' }")
  .top-bar
    router-link.logo(to="/")
      img(src="@website/assets/images/logo_400x108.png")
    el-menu.menu(mode="horizontal", :default-active="$route.path", router)
      el-menu-item(
        v-for="route in routes",
        :key="route.name",
        :index="route.path"
      ) {{ route.label }}
  router-view.page__container
</template>
<script>
import { routes } from '@website/router'
export default {
  data() {
    return {
      routes,
    }
  },
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
      transition: border 0s;
      background: none;
      border-color: transparent;
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
  border-bottom: 1px solid #11418d;
  background: rgba(255, 255, 255, 0.9);
  transition: border 0.4s;
  .menu {
    border: none;
    background: none;
    /deep/ .el-menu-item {
      color: #11418d;
      &:hover,
      &:focus {
        color: #11418d;
        background: none;
      }
    }
  }
  .logo {
    height: 36px;
    margin-top: -5px;
    img {
      height: 100%;
    }
  }
}
.page__container {
  flex: 1;
  overflow: auto;
}
</style>
