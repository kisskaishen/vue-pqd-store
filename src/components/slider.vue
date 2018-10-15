<template>
 <div class="up-load">
    <div class="tits">
      <span class="category" v-show="title">{{title}}</span>
      <div class="arrangement-content">
        <ul class="arrangement-pictures" >
		    <draggable v-model="dataImageArrs" @update="datadragEnd" :options = "{animation:500}">
		            <transition-group>
		                <div v-for="(element,index) in dataImageArrs" :key="element" class = "drag-item up-load-img">
		                    <img :src="element" class="avatar"><i class="delete" @click="deleteBig(type,index)"></i>
		                </div>
		            </transition-group>
		    </draggable>
          <!--<li class="up-load-img" v-for="(imageUrl,index) in dataImageArrs"><img :src="imageUrl" class="avatar"><i class="delete" @click="deleteBig(type,index)"></i></li>-->
        </ul>
        <div class="upLoad" v-show="strCount" style="margin-top:10px">
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
        <ul class="categoryExplain" v-show="explain">
            <li v-for="(item,index) in explain">{{item.value}}</li>
        </ul>
      </div>
    </div>
 </div>
</template>
<script>
import publicImage from '../js/publicImage';
    import draggable from 'vuedraggable'
/*
title  上传时标题
explain  详情说明数组
upLoadData  上传时附带的额外参数
limit  限制数量
imageArr  图片数组1111
* */
 export default {
   data () {
     return {
       dataImageArrs:[],
       isActive:true,
       goodid:'',
       count:0,
       flag:false,
       strCount:true
     }
   },
   props:["title","explain","upLoadData","limit","imageArr","type"],
   components: {
   	draggable
   },
   watch:{
     imageArr(newVal,oldVal){
       if(!this.flag){
          this.dataImageArrs = newVal;
       }
     }
   },
   created(){
       this.goodid = this.$route.query.orderid;
//     console.log(this.imageArr)
       if(this.imageArr==undefined){
         this.dataImageArrs = [];
       }else{
         this.dataImageArrs = this.imageArr;
       }
   },
   methods:{
    datadragEnd (evt) {
        evt.preventDefault();
//      console.log('拖动前的索引 :' + evt.oldIndex)
//      console.log('拖动后的索引 :' + evt.newIndex)
//      console.log(this.dataImageArrs);
        this.$emit("changeGoodsImages",this.dataImageArrs)
    },
     deleteBig(val,index){
       this.dataImageArrs.splice(index,1);
            this.strCount = true;
     },
      successUpLoad(response, file, fileList){
          if(response.code == 200){
            if(this.type=='slider'){
              this.$message({
                type:'success',
                message:response.msg
              })
              var info = response.data;
              this.dataImageArrs.push(info);
              this.flag = true;
              this.$emit("changeGoodsImages",this.dataImageArrs)
                    if(this.dataImageArrs.length>=10){
                        this.strCount = false;
                    }
            }
          }else{
              this.$message({
                type:'info',
                message:response.msg
              })
          }
          this.$refs.upload.clearFiles();
      },
      onExceed(files, fileList){
              this.$message({
                type:'success',
                message:response.msg
              })
        var res = fileList[0].response;
        this.flag = true;
          this.$refs.upload.clearFiles();
      }
   }
 }
</script>

<style lang="less" scoped>
@import '../less/config.less';
    .test{
        border:1px solid #ccc;
    }
    .drag-item{
    	float:left;
        width: 178px;
        height: 178px;
        line-height: 178px;
        margin: auto;
        position: relative;
    }
    .ghostClass{
        opacity: 1;
    }
    .bottom{
        width: 178px;
        height: 178px;
        position: relative;
        background: blue;
        top:2px;
        left: 2px;
        transition: all .5s linear;
    }
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
    height: 178px;
    display: block;
  }

</style>
