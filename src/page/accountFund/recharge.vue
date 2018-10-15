

<style lang="less" scoped>
@import "../../less/config.less";
@import "../../less/recharge.less";
@import "../../less/storeInfo.less";
</style>
<template>
	<div class="recharge">

		<div class="applicationForPresentation">
   			<div class="common-top-title">充值方式</div>
   			<div class="recharge_warp">
				<ul class="tab_item_over">
					<li :class="{active:show1==true}" @click="getActive1()">
						<div class="tab_item_over_three">
							<div class="tab_item_left"><img src="../../img/recharge/icon_yue.png" alt="" /></div>
							<div class="tab_item_right">
								<div class="tab_item_tit">可提现金额</div>
								<div class="tab_item_cash">¥ {{withdraw_money}}</div>
							</div>
						</div>
					</li>
					<li :class="{active:show2==true}" @click="getActive2()">
						<div class="tab_item_over_three">
							<div class="tab_item_top"><img src="../../img/recharge/icon_alipay.png" alt="" /></div>
							<div class="tab_item_bottom">需支付千分之六的手续费</div>
						</div>
					</li>
					<li :class="{active:show3==true}" @click="getActive3()">
						<div class="tab_item_over_three">
							<div class="tab_item_top"><img src="../../img/recharge/icon_wechat.png" alt="" /></div>
							<div class="tab_item_bottom">需支付千分之六的手续费</div>
						</div>
					</li>
					<!-- <li :class="{active:show4==true}" @click="getActive4()">
						<div class="tab_item_over_three">
							<div class="tab_item_top"><img src="../../img/recharge/banktransfer.png" alt="" /></div>
							<div class="tab_item_bottom">无手续费,到账时间以银行为准</div>
						</div>
					</li> -->
				</ul>
				<el-form :model="form" :rules="rules" ref="form">
					<div class="transfer_bank" v-show="transfer_bank_info">
						<div class="transfer_bank_warp">
							<div class="title">请填写转账信息</div>
							<div class="transfer_bank_warp_main">
								<div class="content">
									<div class="content_left">转账流水号:</div>
									<div class="content_right">
										<el-input size="small" v-model="input" placeholder="请输入内容"></el-input>
									</div>
									<div class="content_right_explain">
										(20位以内数字或字母)
									</div>
								</div>
								<div class="content">
									<div class="content_left">转账金额:</div>
									<div class="content_right">
										<el-input size="small" v-model="input" placeholder="请输入内容"></el-input>
									</div>
									<div class="content_right_explain">
										(输入金额范围10到100万)
									</div>
								</div>
								<div class="content">
									<div class="content_left">转账银行信息:</div>
									<div class="content_right">
										<el-input size="small" v-model="input" placeholder="请输入内容"></el-input>
									</div>
									<div class="content_right_explain">
										(如招商银行深圳分行华侨支行，50字以内)
									</div>
								</div>
								<div class="explain">请谨慎填写，以便我们可以快速核对您的转账信息</div>
								<div class="explains">
									<el-button type="danger" class="submit_transfer_bank" size="small" @click="submitTransferBank()">提交</el-button>
								</div>
							</div>
						</div>
					</div>
					<div class="transfer_bank" v-show="transfer_bank">
						<div class="transfer_bank_warp">
							<div class="title">保证金缴纳请汇款至以下账户</div>
							<div class="transfer_bank_warp_main">
								<div class="content">
									<div class="content_left">收款信息:</div>
									<div class="content_right">
										<img class="img_width" src="../../img/recharge/icon_pinganbank.png" alt="" />
									</div>
								</div>
								<div class="content">
									<div class="content_left">专属收款卡号:</div>
									<div class="content_right">
										1500 0091 4174 84
									</div>
								</div>
								<div class="content">
									<div class="content_left">开户行:</div>
									<div class="content_right">
										平安银行深圳创业路支行
									</div>
								</div>
								<div class="content">
									<div class="content_left">账户名:</div>
									<div class="content_right">
										深圳市前海朵莓网络科技公司
									</div>
								</div>
								<div class="search_transfer">
									<div class="search_transfer_left">
										<el-button type="danger" size="small" @click="addTransfer()">我已转账，提交转账信息</el-button>
									</div>
									<div class="search_transfer_right">
										<span>您有转账信息待审核</span>
										<span class="btn" @click="editTransfer()">修改转账信息</span>
									</div>
								</div>
								<div class="explain">若您转账成功，请点击"我已转账"填写转账信息</div>
							</div>
						</div>
					</div>
					<div class="pay_form" v-show="isShow">
						<div class="pay_form_warps">
							<div class="left_label">
								店铺保证金阈值：
							</div>
							<div class="right_label">
								<div class="right_label_first">
									{{marginSpecification}}元
								</div>
								<div class="icon_img">
									<img @mouseout="mouseouttext()" @mouseover="mouseovertext()" src="../../img/recharge/icon_question.png"/>
									<div class="text_tips" v-show="controlTips">
										<div class="content_tips">
											<div class="paragraph">店铺保证金阈值:</div>
											<div class="paragraph">根据店铺类目、风险评估、经营状况等因素计算得到的店铺需要充值的保证金额度。</div>
											<div class="paragraph">保证金低于阈值：</div>
											<div class="paragraph">客户回复不达标，违规刷单套券，划转至货款补款，阈值调整等情况，都可能会引起店铺保证金低于阈值。</div>
											<div class="paragraph">最高可充值金额：</div>
											<div class="paragraph">为避免保证金低于阈值引起的货款提现限制，商家可选择适当多充值。</div>
										</div>
										<div class="content_out"></div>
									</div>
								</div>
								<div style="clear:both"></div>
							</div>
							<div style="clear:both"></div>
						</div>
						<div class="pay_form_warp">
							<div class="left_label">
								当前余额：
							</div>
							<div class="right_label">
								{{margin}}元
							</div>
						</div>
						<div class="pay_form_warp">
							<div class="left_label">
								充值金额：
							</div>
							<div class="right_label">
								<el-form-item prop="rechargeVal">
								<!--<input type="text" name="je" v-model.number="rechargeVal" onkeyup="clearNoNum(rechargeVal)" />-->
								<el-input size="small" :maxlength="7" v-model.trim="form.rechargeVal" placeholder="请认真核对充值金额"></el-input>
								<!-- <input  type="number" :maxlength="7" v-model.trim="form.rechargeVal"  min="0" onkeyup="this.value= this.value.match(/\d+(\.\d{0,2})?/) ? this.value.match(/\d+(\.\d{0,2})?/)[0] : ''"> -->
								<!--<input type = "text" :maxlength="7" v-model.number="rechargeVal" placeholder="请认真核对充值金额" onkeyup= "if( ! /^d*(?:.d{0,2})?$/.test(this.value)){alert(this.value);this.value='';}" />-->
								<!--<input type="text" style="font-size:14px" :maxlength="9" class="self_input_valiate" placeholder="请认真核对充值金额" v-model.number="rechargeVal" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">-->
								</el-form-item>
							</div>
						</div>
						<div class="right_label_text" v-show="calculation">
							<div class="tips_text">1.充值金额不得低于10.00元</div>
							<div class="tips_text">2.充值手续费不满0.1元，按0.1元收取</div>
							<div class="tips_text">3.单笔充值金额最高不超过100万</div>
						</div>
						<div class="pay_form_warp" v-show="calculation">
							<div class="left_label">
								实付金额：
							</div>
							<div class="right_label">
								<div class="right_label_first">
								{{realPayment}}元
								</div>
								<div class="icon_text">
									<span>含{{serviceCharge}}元手续费</span>
								</div>
							</div>
						</div>
						<div class="pay_form_warp">
							<div class="btn_submit">
	  							<el-button size="small" @click="immediatePay('form')" type="danger">立即缴纳</el-button>
							</div>
						</div>
					</div>
  				</el-form>
   			</div>
   		</div>
   <el-dialog
    title="安全验证"
    :visible.sync="dialogVisibleWithdrawals"
    width="300">
    	<div class="title_vali">您正在从可提现余额中转存<span class="colorCash">{{rechargeVal}}</span>元至店铺保证金账户</div>
		<div class="form-create">
		    <el-form ref="editData" :rules="putForwardRules" :model="putForwardForm" label-width="100px">
		        <el-form-item label="手机号码:">
		            <div class="width-controll">
		                <el-input disabled size="small" v-model.trim="mobile"></el-input>
		            </div>
		        </el-form-item>
		        <el-form-item label="手机验证码:" >
		            <div class="width-controll">
		                <div class="code_width">
		                    <!-- <el-input :maxlength='6' v-model="putForwardForm.verifycode"></el-input> -->
		                    <input size="small" type="text" maxlength="6" class="self_input_valiate" v-model.trim="putForwardForm.verifycode" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
		                </div>
		                <div class="code_width">
		                    <div class="code_width_right">
		                        <el-button size="small" id="getCode" type="primary" @click="getCode('putWard')">{{codeTitle}}</el-button>
		                    </div>
		                </div>
		            </div>
		        </el-form-item>
		    </el-form>
		</div>
    <span slot="footer" class="dialog-footer">
      <el-button size="small" @click="dialogVisibleWithdrawals = false">取 消</el-button>
      <el-button size="small" type="primary" @click="submitwithdrawals()">确 定</el-button>
    </span>
  </el-dialog>
	</div>
</template>
<script>

import Recharge from '../../js/recharge';
import account from '../../js/account';

export default{
	data(){
   	var checkMoney = (rules, value, callback) => {
	        if (!value) {
	          return callback(new Error('金额不能为空'));
	        }
	        var re = /^\d+(?=\.{0,1}\d+$|$)/
          if (!re.test(value)) {
            callback(new Error('请输入正确的数字'));
          } else {
          	value = value+'';
          	if(value.indexOf(".") != -1 && value.substring(value.indexOf("."),value.length).length>3){
          		callback(new Error('只能输入小数点后两位'));
          	}else{
	            if (value < 10) {
	              callback(new Error('必须大于10元'));
	            } else
							if(value > 1000000) {
	              callback(new Error('必须小于1000000元'));
	            }else{
	              callback();
	            }
          	}
          }
      };
		return {
			input:'',
			rules:{
				rechargeVal: [
	            	{ validator: checkMoney, trigger: 'blur' }
	          	],
			},
			form:{
				rechargeVal:''
			},
			submitForm:'',
			margin:0,
			codeTitle:'获取验证码',
			show1:true,
			show2:false,
			show3:false,
			show4:false,
			isShow:true,
			calculation:false,
			transfer_bank:false,
			transfer_bank_info:false,
			rechargeVal:'',
			controlTips:false,
			margin:0,
			withdraw_money:0,
			marginSpecification:0,
			codeUrl:'',
			realPayment:0.00,
			serviceCharge:0.00,
			dialogVisibleWithdrawals:false,
			mobile:'',
			putForwardForm:{
				verifycode:''
			},
			putForwardRules:{
	            name: [
	                { required: true, message: '请输入1活动名称', trigger: 'blur' },
	                { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
	            ],
	         },
		}
	},
	watch:{
		"form.rechargeVal"(a,b){
			if(!isNaN(this.form.rechargeVal)){
				var cash = (this.form.rechargeVal/0.994).toString();
				if(cash==0.000){
					this.serviceCharge = 0;
					this.realPayment = 0;
				}else{
					var str = cash.toString().split('.');
					if(str.length>1){
						this.realPayment = (this.form.rechargeVal/0.994).toFixed(2);
						var str_val2 = Number(this.realPayment) - Number(this.form.rechargeVal);
						if(str_val2 - 0.1 > 0){
							var isTrue = Number.isInteger(this.form.rechargeVal + this.serviceCharge)
							if(isTrue){
									this.serviceCharge = str_val2%1===0?str_val2:str_val2.toFixed(2);
									this.realPayment = (Number(this.form.rechargeVal) + Number(this.serviceCharge)).toFixed(2);
							}else{
									this.serviceCharge = str_val2%1===0?str_val2:str_val2.toFixed(2);
									this.realPayment = (Number(this.form.rechargeVal) + Number(this.serviceCharge));
							}
						}else{
							var isTrue = Number.isInteger(this.form.rechargeVal + this.serviceCharge)
							this.serviceCharge = 0.1;
							if(isTrue){
								this.realPayment = (Number(this.form.rechargeVal) + Number(this.serviceCharge)).toFixed(2);
							}else{
									this.realPayment = (Number(this.form.rechargeVal) + Number(this.serviceCharge));
							}
						}
					}else{
						this.realPayment = (this.form.rechargeVal/0.994).toFixed(2);
						var str_val3 = Number(this.realPayment) - Number(this.form.rechargeVal);
						if(str_val3.toString().indexOf('.') > 0){
							this.serviceCharge = str_val3.toFixed(2);
						}else{
							this.serviceCharge = str_val3;
						}
					}
				}
			}else{
				this.serviceCharge = 0;
				this.realPayment = 0;
			}
		}
	},
	created(){
		this.mobile = localStorage.getItem("mobile");
		Recharge.getStoreMoneyStatistics("Storedeposit/statistics",this);
	},
	methods:{
		submitTransferBank(){
			this.transfer_bank = true;
			this.transfer_bank_info = false;
		},
		addTransfer(){
			this.isShow = false;
			this.transfer_bank = false;
			this.transfer_bank_info = true;
		},
		editTransfer(){
			this.isShow = false;
			this.transfer_bank = false;
			this.transfer_bank_info = true;
		},
		submitwithdrawals(){
			var data = {
				money:this.form.rechargeVal,
				verifycode:this.putForwardForm.verifycode
			}
			Recharge.storeMarginWithdrawDeduction("Storedeposit/storeMarginWithdrawDeduction",data,this);
		},
		getCode(type){
           var getCode = document.getElementById("getCode");
               getCode.disabled = true;
           var t = 60;
           var timer;
           var that = this;
            var data = {
                tem: "margin_recharge"
            }
            account.sendSms("SmsLog/sendSms",data,this)
           timer = setInterval(function(){
                t--;
                that.codeTitle = '('+t+')后重新发送';
                if(t<1){
                    clearInterval(timer);
                    getCode.disabled = false;
                    that.codeTitle = '获取验证码';
                }
           },1000)
       },
		immediatePay(formName){
		var rechargeAmount = this.marginSpecification-this.margin;
   		this.$refs[formName].validate((valid) => {
          if (valid) {
				if(this.show1){
					if(this.form.rechargeVal >= rechargeAmount){
						if(this.form.rechargeVal==''||this.form.rechargeVal==null||(isNaN(this.form.rechargeVal))){
							this.$message({
								type:'info',
								message:'请您输入充值金额'
							})
						}else{
							this.dialogVisibleWithdrawals = true;
						}
					}else{
						this.$message({
							type:'info',
							message:'实付金额不低于'+rechargeAmount
						})
						return
					}
				}else if(this.show2){
					if(this.realPayment >= rechargeAmount){
						var cashRecharge = this.form.rechargeVal;
						var data = {
							payCode:'alipay',
							money:this.realPayment,
							after_tax_money:cashRecharge
						}
						Recharge.marginQrCode("Storedeposit/marginQrCode",data,this);
					}else{
						this.$message({
							type:'info',
							message:'充值金额不低于'+rechargeAmount
						})
						return
					}
				}else if(this.show3){
					var cashRecharge = this.form.rechargeVal;
					if(this.realPayment >= rechargeAmount){
						var data = {
							payCode:'weixin',
							money:this.realPayment,
							after_tax_money:cashRecharge
						}
						Recharge.marginQrCode("Storedeposit/marginQrCode",data,this);
					}else{
						this.$message({
							type:'info',
							message:'充值金额不低于'+rechargeAmount
						})
						return
					}
				}
          } else {
            console.log('error submit!!');
            return false;
          }
        });
        return
		},
		getActive1(){
			this.show1 = true;
			this.show2 = false;
			this.show3 = false;
			this.show4 = false;
			this.calculation = false;
			this.transfer_bank = false;
			this.isShow = true;
			this.transfer_bank_info = false;
		},
		getActive2(){
			this.show1 = false;
			this.show2 = true;
			this.show3 = false;
			this.show4 = false;
			this.calculation = true;
			this.transfer_bank = false;
			this.isShow = true;
			this.transfer_bank_info = false;
		},
		getActive3(){
			this.show1 = false;
			this.show2 = false;
			this.show3 = true;
			this.show4 = false;
			this.calculation = true;
			this.transfer_bank = false;
			this.isShow = true;
			this.transfer_bank_info = false;
		},
		getActive4(){
			this.show1 = false;
			this.show2 = false;
			this.show3 = false;
			this.show4 = true;
			this.calculation = false;
			this.transfer_bank = true;
			this.isShow = false;
			this.transfer_bank_info = false;
		},
		mouseouttext(){
			this.controlTips = false;
		},
		mouseovertext(){
			this.controlTips = true;
		}
	}
}
</script>
