<template>
 <div class="up-load">
    <div class="tits">
      <span class="category" v-show="title">{{title}}</span>
      <div class="arrangement-content">
        <ul class="arrangement-pictures">
          <li class="up-load-img" v-for="(imageUrl,index) in dataImageArr" v-show="typeof(dataImageArr)=='object'"><img :src="imageUrl" class="avatar"><i class="delete" @click="deleteBig(type,index)"></i></li>
          <li class="up-load-img" v-show="isShow"><img :src="dataImageArr" class="avatar"><i class="delete" @click="deleteBig(type)"></i></li>
        </ul>
        <div class="upLoad" v-show="strCount">
            <el-upload
              class="avatar-uploader"
              ref="upload"
              :action='this.headerCommon+"/Goods/uploadImg"'
              :headers = "headers" 
              :limit="limit"
              :show-file-list="false"
              :data="upLoadData"
              :on-success="successUpLoad"
              :on-exceed="onExceed">
              <i class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </div>
        <ul class="categoryExplain" v-show="explain">
            <li v-for="(item,index) in explain">{{item.value}}</li>
        </ul>
      </div>
    </div>
 </div>
</template>
<script>
import publicImage from '../js/publicImage';
/*
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
       isActive:true,
       goodid:'',
       isShow:false,
       dataImageArr:'',
       strCount:true
     }
   },
   props:["title","explain","upLoadData","limit","imageArr","type","isNewProduct"],
   components: {

   },
   created(){
       this.goodid = this.$route.query.orderid;
        this.dataImageArr = this.imageArr;
       if(this.type=="detailsImg"){
            this.isShow = false;
            this.dataImageArr = [];
       }else if(this.type=='list'||this.type=='main'){
          if(this.isNewProduct=='newProduct'){
            this.isShow = false;
          }else{
           this.isShow = true;
          }
       }
   },
   watch:{
     imageArr(newVal,oldVal){
       this.dataImageArr = newVal;
       if(this.type=="detailsImg"){
         if(this.dataImageArr.length==''){
          this.isShow = false;
          this.dataImageArr = [];
         }
       }else if(this.type=='main'||this.type=='list'){
         if(this.imageArr==''||this.imageArr==undefined){
              this.isShow = false;
              this.strCount = true;
         }else{
            this.isShow = true;
            this.strCount = false;
         }
       }
     }
   },
   methods:{
     deleteBig(val,index){
       if(typeof(this.dataImageArr)=="object"){
         this.dataImageArr.splice(index,1);
          this.strCount = true;      
       }else if(typeof(this.dataImageArr)=="string"){
         this.dataImageArr = '';
         this.isShow = false;
            this.strCount = true;
       }
     },
      successUpLoad(response, file, fileList){
          if(response.code == '200'){
              this.$message({
                type:'success',
                message:response.msg 
              })
               if(this.type=='detailsImg'){
                 if(this.dataImageArr==undefined){
                    this.dataImageArr=[];
                    this.dataImageArr.push(response.data);
                  }else{
                    this.dataImageArr.push(response.data);
                    if(this.dataImageArr.length>=20){
                        this.strCount = false;
                    }else {
                      this.strCount = true;
                    }
                  }
                  this.$emit("changeGoodsContent",this.dataImageArr)
               }else if(this.type=='main'){
                 this.isShow = true;
                 this.dataImageArr = response.data;
                 this.strCount = false;
                  this.$emit("changeOriginalImg",this.dataImageArr)
               }else if(this.type=='list'){
                 this.isShow = true;
                 this.dataImageArr = response.data;
                 this.strCount = false;
                  this.$emit("changeListImg",this.dataImageArr)
               }
          }else{
              this.$message.warning(`${ response.msg }`);
          }
          this.$refs.upload.clearFiles();
      },
      onExceed(files, fileList){
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
