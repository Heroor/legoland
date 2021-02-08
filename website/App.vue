<template lang="pug">
#app(:class="{ home: $route.name === 'home' }")
  .top-bar
    .logo-wrap
      router-link.logo(to="/")
        img(src="@website/assets/images/logo_400x108.png")
    el-menu.menu(mode="horizontal", :default-active="active", router)
      el-menu-item(
        v-for="route in routes",
        :key="route.name",
        :index="'/' + route.name"
      ) {{ route.label }}
  router-view.page__container(:key="$route.name")
</template>
<script>
import { routes } from '@website/router'
export default {
  data() {
    return {
      routes,
    }
  },
  computed: {
    active() {
      return '/' + this.$route.name
    },
  },
}
</script>

<style lang="less" scoped>
#app {
  min-height: 100%;
  display: flex;
  flex-direction: column;
  background-position: bottom right, 0, 0;
  background-size: 500px, 550px, 16px 14px;
  background-repeat: no-repeat, no-repeat, repeat;
  transition: 0.5s;
  @media screen and (min-width: 1366px) {
    background-size: 600px, 700px, 16px 14px;
  }
  &.home {
    background-image: url(./assets/images/lego-bg1.png),
      url(./assets/images/lego-bg2.png), url(./assets/images/lego-bg0.png);
    .top-bar {
      transition: border 0s;
      background: none;
      border-color: transparent;
      .logo-wrap {
        background: none;
        .logo {
          filter: none;
        }
      }
    }
    @media screen and (min-width: 1366px) {
      background-size: 600px, 700px, 16px 14px;
    }
  }
}
.top-bar {
  position: sticky;
  top: 0px;
  display: flex;
  justify-content: space-between;
  padding-right: 30px;
  background: rgba(255, 255, 255, 0.95);
  transition: border 0.4s;
  z-index: 1;
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
  .logo-wrap {
    width: 300px;
    display: flex;
    align-items: center;
    background: #11418d;
    .logo {
      height: 36px;
      margin-left: 2em;
      filter: brightness(50);
      img {
        height: 100%;
      }
    }
  }
}
.page__container {
  flex: 1;
  overflow: auto;
}
</style>
