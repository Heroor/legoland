<template lang="pug">
.home
  .title
    h1 Legoland
    .title__desc Lego components ecosystem
    .link-button-group
      router-link.link-button(to="/docs/description") 介绍
      router-link.link-button(to="/docs/start") 快速开始
  .copyright &copy;2021 GLAB-FE
</template>

<script>
export default {
  name: 'Home',
}
</script>
<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow-x: hidden !important;
}
.title {
  padding-right: 46%;
  margin: 100px -250px 200px 0;
  text-align: right;
  font-family: xhh;
  color: #11418d;
}

h1 {
  line-height: 1.8;
  margin: 0;
  font-size: 70px;
}
.title__desc {
  line-height: 1.6;
  font-size: 18px;
}
.link-button-group {
  margin-top: 12px;
}
.link-button {
  display: inline-block;
  line-height: 2.4em;
  text-decoration: none;
  padding: 0 1.5em;
  border-radius: 4px;
  color: #fdcc01;
  background: #11418d;
  transition: 0.3s;
  &:hover {
    opacity: 0.9;
  }
  &:not(:last-child) {
    margin-right: 12px;
  }
}
.copyright {
  line-height: 5;
  text-indent: 3em;
  font-size: 15px;
  color: #fdcc00;
  text-shadow: 1px 1px 1px rgba(255, 223, 94, 0.522),
    -1px -1px 1px rgba(220, 150, 52, 0.8);
}
</style>
