<template>
 <div class="thirdPartyTools">
     <div class="common-top-title">
     	<div class="tab_title">
     		<span :class="{active:tools_is}" @click="getTool()">第三方市场</span>
     		|<span :class="{active:!tools_is}" @click="getInfo()">配置信息</span>
     	</div>
     </div>
     <div class="download">
     	<div class="tools" v-show="!tools_is">
     		<div class="info_warp">
     			<div class="item_info">
     				<span class="info_label">商户号：</span>{{store_id}}
     			</div>
     			<div class="item_info">
     				<span class="info_label">秘钥：</span>{{app_secret}} <el-button @click="upDate()" class="button_margin" type="danger" size="small">更新秘钥</el-button>
     			</div>
     			<div class="item_info">
	     			<div class="explain">
	     				注：点击更新秘钥后，会生成新的秘钥信息，此时需在第三方软件重新配置
	     			</div>
     			</div>
     		</div>
     	</div>
     	<div class="tools" v-show="tools_is">
	         <div class="item">
	             <img class="img" src="../../img/login/logo_1.png" alt="">
	             <div class="content">
	                 是一款强大的多网店管理软件，统一多网店于一个 客户端操作管理，广泛适用于多个平台、多个网店 的商品管理、订单管理、订单打印、促销活动管理 等日常网店管理事务
	             </div>
	             <div class="link">
	                <a class="img1" href="http://www.shuaishou.com/cache/restat.aspx?place=ezg&amp;url=http://www.shuaishou.com/download/ezg_win10.aspx">
	                    <!-- <img src="../../img/login/win10.png" alt=""> -->
	                </a>
	                <div class="explain">(适用windows10)</div>
	                <a class="img2" href="http://www.shuaishou.com/cache/restat.aspx?place=ezg&amp;url=http://www.shuaishou.com/download/ezg.aspx">
	                    <!-- <img src="../../img/login/sutra.png" alt=""> -->
	                </a>
	                <div class="explain">(适用XP,WIN7,WIN8)</div>
	             </div>
	         </div>
	         <!--<div class="item">
	             <img class="img" src="../../img/login/logo_2.png" alt="">
	             <div class="content">
	                 拼助手是一款多功能软件。适用于拼趣多平台、支持采集拼多多产品到拼趣多平台、聊天PC助手支持快捷发图、截图、自动回复、首次咨询自动回复固定内容、快速核对产品以及客户信息、物流查看、地址修改（如遇报毒，请关闭杀毒软件）
	             </div>
	             <div class="link">
	                <a class="download w10 img1" href="https://cdn2.pinquduo.cn/1513921005565786.rar">
	                </a>
	                    <div class="explain">(适用windows10)</div>
	                <a class="download xp img2" href="https://cdn2.pinquduo.cn/1513921005565786.rar">
	                </a>
	                    <div class="explain">(适用XP,WIN7,WIN8)</div>
	             </div>
	         </div>-->
	         <div class="item">
	             <img class="img" src="../../img/third/one_key_move.png" alt="">
	             <div class="content">
	                 可一键搬家淘宝、天猫、1688、拼多多、蘑菇街、搜款网、一起做网店、网商园、购途等31大平台的商品到拼趣多，整店复制，还有批量编辑、批量上下架、批量删除、导出货源表等众多超强功能！省时省力，上货首选！
	             </div>
	             <div class="link">
	                <a class="img1" href="http://t.cn/RY6SOmG">
	                    <!-- <img src="../../img/login/win10.png" alt=""> -->
	                </a>
	                <div class="explain">(适用windows10)</div>
	                <a class="img2" href="http://t.cn/RY6SOmG">
	                    <!-- <img src="../../img/login/sutra.png" alt=""> -->
	                </a>
	                <div class="explain">(适用XP,WIN7,WIN8)</div>
	             </div>
	         </div>
	         <div class="center">更多合作伙伴陆续加入中……</div>
     	</div>
     </div>
 </div>
</template>

<script>
import Tools from '../../js/thirdTools'
 export default {
   data () {
     return {
		tools_is:true,
		store_id:'',
		app_secret:''
     }
   },
   created(){
   		Tools.getOpenInfo("Open/getOpenInfo",this)
   },
   methods:{
   		upDate(){
   		this.$confirm('您确定要更新您的秘钥么, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
   			Tools.saveAppSecret("Open/saveAppSecret",this)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
   		},
   		getTool(){
   			this.tools_is = true;
   		},
   		getInfo(){
   			this.tools_is = false;
   		}
   },
   components: {

   }
 }
</script>

<style lang="less" scoped>
@import "../../less/config.less";
.thirdPartyTools{
    background:@backgroundfff;
    .tab_title{
    	.active{
    		color:#E50056;
    	}
    	span{
    		margin:0 10px;	
    		cursor: pointer;
    	}
    }
    .download{
    	.info_warp{
    		padding:20px;
    		.item_info{
    			height:40px;
    			line-height: 40px;
    			.button_margin{
    				margin-left:60px;
    			}
    			.info_label{
    				width:60px;
    				text-align: right;
    				display: inline-block;
    			}
    			.explain{
    				color:#ccc;
    			}
    		}
    	}
       .item{
           padding:40px 0;
           margin:0 auto;
           width:1040px;
           overflow: hidden;
           .img{
               float:left;
               width:300px;
               height:200px;
               border-radius: 10px;
           }
           .content{
               width:475px;
               float:left;
               padding:20px;
               font-weight: bold;
               color:#333;
               line-height: 26px;
           }
           .link{
               float:left;
               width:221px;
               a{
                    margin-top:10px;
                   display: inline-block;
                   width:140px;
                   height:40px;
               }
               .img1{
                   background:url('../../img/login/win10.png') no-repeat;
                   background-size:contain;
               }
               .img2{
                   background:url('../../img/login/sutra.png') no-repeat;
                   background-size:contain;
               }
               .img1:hover{
                   background:url('../../img/login/win10_hover.png') no-repeat;
                   background-size:contain;
               }
               .img2:hover{
                   background:url('../../img/login/sutra_hover.png') no-repeat;
                   background-size:contain;
               }
               .explain{
                   font-size:14px;
                   color:#666;
                   text-align: center;
                   margin-top:13px;
                   height:14px;
                   width:140px;
                   margin-bottom: 35px;
               }
           }
       } 
    }
}
 
</style>
