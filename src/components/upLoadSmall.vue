<template>
 <div class="up-load-img">
        <div class="show-img" v-show="isImageUrl">
            <img :src="imageUrlStr" class="avatar">
            <i class="delete-small" @click="deleteSmall()"></i>
        </div>
        <el-upload
            class="avatar-uploader"
            ref="upload"
            :action='this.headerCommon+"/Goods/uploadImg"'
            :headers = "this.headers"
            :limit="limit"
            :show-file-list="false"
            :data="upLoadData"
            :on-success="successUpLoad"
            :on-exceed="onExceed">
            <i class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
 </div>
</template>
<script>
import publicImage from '../js/publicImage';
import routers from '../router/index.js';
/*
title  上传时标题
explain  详情说明数组
upLoadData  上传时附带的额外参数
limit  限制数量
imageArr  图片数组
* */
 export default {
   data () {
     return {
         goodid:'',
         isImageUrl:false,
         imageUrlStr:''
     }
   },
   props:["title","explain","upLoadData","limit","imageUrl","keys","childArr"],
   components: {

   },
   created(){
    //    alert(JSON.stringify(this.childArr.img))
       this.goodid = this.$route.query.orderid;
    //    this.imageUrlStr = this.imageUrl;
        this.imageUrlStr = this.childArr.img;
       if(this.imageUrlStr){
            this.isImageUrl = true;
       }
   },
   methods:{
       /*
       删除图片
       * */
       deleteSmall(){
           this.imageUrlStr = '';
           this.isImageUrl = false;
           this.$emit("deleteSmall","");
        //    var data = {
        //         Goodid:this.goodid,
        //         Imgtype:"sku",
        //         Imgurl:this.imageUrlStr
        //    }
        //    publicImage.delimg("/api/goods/delimg",data,this,"small",this.keys);
       },
      successUpLoad(response, file, fileList){
          if(response.code == 200){
              this.$message({
                type:'success',
                message:response.msg
              })
              var info = response.data;
              var keys = this.keys
              this.$emit("changeSmall",{info,keys});
              this.imageUrlStr = response.data;
              this.isImageUrl = true;
          }else{        	
            if(response.code == 8100){
            		routers.push({path : "/login"});
            	}else{
            		this.$message.warning(`${ response.msg }`);
            	}
          }
          this.$refs.upload.clearFiles();
      },
      onExceed(files, fileList){
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
.up-load-img{
    width:100px;
    height:100px;
    line-height: 100px;
    overflow: hidden;
    .show-img{
        width:100px;
        height:100px;
        position: relative;
        .avatar{
            width:80px;
            height:80px;
        }
        i.delete-small{
            cursor: pointer;
            position: absolute;
            right:2px;
            top:-4px;
            width:14px;
            height:14px;
            background:url(../img/delete.png) no-repeat;
            background-size:contain;
        }
        .avatar-uploader-icon{
            cursor: pointer;
        }
    }
}

</style>
