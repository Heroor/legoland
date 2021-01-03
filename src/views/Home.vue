<template lang="pug">
.home
  .title
    h1 Legoland
    p.title__desc Lego components ecosystem
  .copyright &copy;2021 GLAB-FE
</template>

<script>
export default {
  name: 'Home'
}
</script>
<style lang="less" scoped>
.home {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  overflow: hidden;
}
.title {
  padding-right: 20%;
  margin-top: 120px;
  text-align: right;
  font-family: xhh;
  // color: #0d4da3;
  color: #11418d;
}

h1 {
  line-height: 1.8;
  padding-right: 2%;
  margin: 0;
  margin-right: -50px;
  font-size: 70px;
}
.title__desc {
  line-height: 1.6;
  padding-right: 2%;
  margin: 0;
  margin-right: -50px;
  font-size: 18px;
}
.copyright {
  line-height: 5;
  text-indent: 3em;
  font-size: 15px;
  color: #dc9948;
}
</style>
