<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title"></router-view>
    <lg-preview></lg-preview>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style lang="less">
@import "./less/config.less";
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  height:100%;
  color: #2c3e50;
  font-size:14px;
  // background:#f9f9f9;
}
*{
	margin:0;
	padding:0;
}
body,html{
  height:100%;
}
span.count{
  color:@colorCash;
}
a{
  text-decoration:none;
  color:@colorTitle;
}
</style>
