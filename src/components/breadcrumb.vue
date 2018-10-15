<style lang="less">
@import "./../less/config.less";
.breadcrumb{
	padding:16px 0 0 0;
}
</style>
<template>
 <div class="breadcrumb">
	<el-breadcrumb separator="/">
	  <el-breadcrumb-item :to="{ path: '/store' }">首页</el-breadcrumb-item>
	  <el-breadcrumb-item v-show="content.path1" :to="{ path: content.path1 }">{{content.title1}}</el-breadcrumb-item>
	  <el-breadcrumb-item >{{content.title2}}</el-breadcrumb-item>
	</el-breadcrumb>
 </div>
</template>

<script>
export default{
	data(){
		return{
			
		}
	},
	props:["content"]
}
</script>