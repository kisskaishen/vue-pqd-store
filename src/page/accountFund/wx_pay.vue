<style lang="less" scoped>
@import "./../../less/config.less";
.wx_pay{
	margin:10px;
	.wx_top{
		overflow:hidden;
		.wx_top_left{
			width:180px;
			height:53px;
			background:#fff;
			padding:20px;
			float:left;
		}
		.wx_top_right{
			padding:20px;
			height:53px;
			background:#fff;
			margin-left:240px;
			.text_title{
				color:#999;
				height:30px;
				line-height:30px;
				.serial_number{
					color:#333
				}
			}
			.text_detail{
				color:#999;
				.text_detail_item{
					height:30px;
					line-height:30px;
					margin-right:40px;
					.store_name,.store_type{
						color:#333;
					}
					.cash{
						color:#E50056;
						font-size:20px;
						font-weight:bold;
					}
				}
			}
		}
	}
	.wx_main{
		padding:40px 0;
		margin: 20px 0;
		background: #fff;
		.wx_main_warp{
			width:166px;
			margin:0 auto;
			position: relative;
			.tip_position{
				position: absolute;
				top:0;
				left:200px;
			}
		}
		.wx_main_text{
			text-align: center;
			color:#999;
		}
		.wx_main_time{
			color:#E50056;
			font-size:30px;
			text-align: center;
			line-height: 60px;
		}
		.url_code{
			width:154px;
			padding:5px;
			border:1px solid #eee;
			margin:0 auto;
			overflow: hidden;
			.wx_pay_scan{
				overflow: hidden;
				.wx_pay_scan_left{
						width:30px;
						height:30px;
						padding:5px;
					float:left;
					img{
						width:30px;
						height:30px;
					}
				}
				.wx_pay_scan_right{
					font-size:12px;
					margin-left:48px;
					.wx_pay_scan_right_text{
						line-height: 20px;
					}
				}
			}
		}
	}
	.wx_pay_text{
		text-align: center;
		color:#999;
	}
}
</style>
<template>
	<div class="wx_pay">
		<div class="wx_top">
			<div class="wx_top_left">
				<img v-show="ali_img" src="../../img/recharge/icon_alipay.png" alt="" />
				<img v-show="wx_img" src="../../img/recharge/icon_wechat.png" alt="" />
			</div>
			<div class="wx_top_right">
				<div class="text_title">订单号：<span class="serial_number">{{serial_number}}</span></div>
				<div class="text_detail">
					<span class="text_detail_item">拼趣多店铺：<span class="store_name">{{storeName}}</span></span>
					<span class="text_detail_item">充值类型：<span class="store_type">店铺保证金充值</span></span>
					<span class="text_detail_item">支付金额：<span class="cash">¥{{rechargeVal}}</span></span>
				</div>
			</div>
		</div>
		<div class="wx_main">
			<div class="wx_main_warp">
				<div class="wx_main_text">距离二维码过期还剩</div>
				<div class="wx_main_time">{{hoursCountDown}}:0{{minCountDown}}:{{secCountDown > 9 ? secCountDown : '0'+secCountDown}}</div>
				<div class="url_code">
	   				<qriously ref="getQrCode" :value="codeUrl" :size="154"/>
	   				<div class="wx_pay_scan">
	   					<div class="wx_pay_scan_left">
	   						<img src="../../img/recharge/account_icon_code.png" alt="" />
	   					</div>
	   					<div class="wx_pay_scan_right">
	   						<div class="wx_pay_scan_right_text">请使用"扫一扫"</div>
	   						<div class="wx_pay_scan_right_text">扫描二维码支付</div>
	   					</div>
	   				</div>
				</div>
	   			<img v-show="wx_img" class="tip_position" src="../../img/recharge/account_photo_iphone.png" alt="" />
	   			<img v-show="ali_img" class="tip_position" src="../../img/recharge/alipay_tips.jpg" alt="" />
			</div>
		</div>
		<div class="wx_pay_text">
			温馨提示：若您已经完成支付，但当前页面暂无提示，请往<router-link :to="{path:'/store/accountFund/revenueRecord'}">保证金</router-link>页面查看支付结果
		</div>
	</div>
</template>

<script>
	import Vue from 'vue'
import Recharge from '../../js/recharge';
export default{
	data(){
		return{
			codeUrl:'',
			serial_number:'',
			hoursCountDown:'00',
			minCountDown:4,
			secCountDown:59,
			pay_timer_self:null,
			searchTimer:'',
			storeName:'',
			rechargeVal:'',
			pay_status:'',
			ali_img:false,
			wx_img:false,
		}
	},  
	created(){
		this.pay_status = this.$route.query.pay_status;
		if(this.pay_status=='alipay'){
			this.ali_img = true;
		}else if(this.pay_status=='wxpay'){
			this.wx_img = true;
		}
		//alipay  wxpay
		this.storeName = localStorage.getItem("storeName");
		this.setCountDown();
		this.codeUrl = this.$route.query.pay_code;
		this.serial_number = this.$route.query.serial_number;
		this.rechargeVal = this.$route.query.rechargeVal;
		clearInterval(this.searchTimer)
		var that = this;
		this.searchTimer = setInterval(()=>{
			that.searchMarginStatus();
		},5000)
		Vue.prototype.pay_timer_self = this.searchTimer;
	},
	methods:{
		setCountDown(){
			var that = this;
			if(this.pay_timer_self){
			 	clearInterval(this.pay_timer_self)
			}
			 this.pay_timer_self = setInterval(function(){
				if(that.minCountDown<1){
					that.secCountDown--;
					if(that.secCountDown==0){
						clearInterval(that.pay_timer_self)
						that.$router.push({path:'/store/accountFund/revenueRecord',query:{bond:'1'}})
					}
				}else{
					that.secCountDown--;
					if(that.secCountDown==0){
						that.minCountDown--;
						that.secCountDown = 59;
					}
				}
			},1000);
		},
		searchMarginStatus(){
			var data = {
				serial_number:this.serial_number,
			}
			Recharge.searchMarginStatus("Storedeposit/searchMarginStatus",data,this);
		}
	}
}
</script>