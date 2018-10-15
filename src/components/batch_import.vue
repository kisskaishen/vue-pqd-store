<template>
 <div class="up-load">
	<el-upload
	  class="avatar-uploader"
	  ref="upload"
	  :action='this.headerCommon+"/Orderservice/batchShip"'
  	  :data="upLoadDatas"
	  :headers = "headers" 
	  :limit="limit"
	  :before-upload="beforeUpload"
	  :name = 'order_file'
	  :show-file-list="false"
	  :on-success="successUpLoad"
	  :on-exceed="onExceed">
	  <el-button size="small" type="primary">{{title}}</el-button>
	</el-upload>
 </div>
</template>
<script>
import Vue from 'vue'
import publicImage from '../js/publicImage';
import batch from '../js/batch_delivery';
import { Loading } from 'element-ui';
/*
 *  :data="upLoadData"
	  :action='this.headerCommon+"/Orderservice/batchShip"'
title  上传时标题
explain  详情说明数组
upLoadData  上传时附带的额外参数
limit  限制数量
imageArr  图片数组

一开始默认不显示  或者如果有 直接赋值
一个开关控制 判断是否有  如果有 显示 如果没有 隐藏 

* */
 export default {
   data () {
     return {
     	order_file:"order_file",
     	upLoadDatas:{},
     	fileList2:[],
       isActive:true,
       goodid:'',
       isShow:false,
       dataImageArr:'',
       strCount:true,
       loading:'',
     }
   },
   props:["title","explain","upLoadData","limit","imageArr","type","isNewProduct"],
   components: {

   },
   created(){
   },
   watch:{

   },
   methods:{
	   	beforeUpload(file){ 
	   		this.loading = this.$loading({
	          lock: true,
	          text: 'Loading',
	          spinner: 'el-icon-loading',
	          background: 'rgba(0, 0, 0, 0.7)'
	        });
	   		this.upLoadDatas.order_file = file;
	   	},
      successUpLoad(response, file, fileList){
//              Vue.nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
//                  loadingInstance.close();
//              });
		this.loading.close();
          if(response.code == '200'){
              this.$message({
                type:'success',
                message:response.msg 
              })
          }else{
              this.$message.warning(`${ response.msg }`);
          }
          this.$refs.upload.clearFiles();
      },
      onExceed(files, fileList){
		this.loading.close();
        this.$message.warning(files.length)
        var res = fileList[0].response;
              this.$message({
                type:'info',
                message:response.msg 
              })
          this.$refs.upload.clearFiles();
      }
   }
 }
</script>

<style lang="less" scoped>
@import '../less/config.less';
.up-load{
  .tits{
    margin:0 0 20px 0;
    overflow: hidden;
    .arrangement-content{
      overflow: hidden;
      .arrangement-pictures{
        float:left;
        overflow: hidden;
          li{
            float:left;
            margin-right:10px;
            margin-bottom:10px;
          }
      }
      .upLoad{
        float:left;
        width:178px;
        height:178px;
        border:1px solid @borderddd;
        border:1px solid #ddd;
        background:@backgroundeee;
      }
      .categoryExplain{

      }
    }
    .category{
      text-align: right;
      width:110px;
      margin-left:20px;
      height:40px;
      line-height: 40px;
      float:left;
    }
    .categoryExplain{
      float:left;
      margin-left:20px;
    }
  }
}
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    display: block;
  }
 
</style>
