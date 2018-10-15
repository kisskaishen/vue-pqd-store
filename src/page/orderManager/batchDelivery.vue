<style lang="less" scoped>
@import "../../less/config.less";
@import "../../less/orderlist.less";
@import "../../less/batchDelivery.less";
.item1{
	overflow: hidden;
	width:100%;
}

</style>
<template>
<div class="orderList">
	<div class="orderList_warp">
		<div class="common-top-title">运费模板</div>
		<div class="item1">
			<div class="left"></div>
			<div class="right">
			    <el-radio-group @change="changeLabel()" v-model="radio3" size="small">
			      <el-radio-button label="批量导入"></el-radio-button>
			      <el-radio-button label="单条导入"></el-radio-button>
			    </el-radio-group>
			</div>
		</div>
		<div class="batch_delivery">
			<div class="batch_delivery_warp" v-show="radioModlue">
				<div class="batch_delivery_warp_content">
					<dl class="item_dl">
						<dt>
							<img src="../../img/order/piliang@2x.png" alt="" />
						</dt>
						<dd>批量修改直接覆盖导入</dd>
					</dl>
					<dl class="item_dl">
						<dt>
							<img src="../../img/order/duoci2@2x.png" alt="" /></dt>
						<dd>可一次性导入多家快递</dd>
					</dl>
				</div>
				<div class="batch_delivery_warp_content_btn">
					<div class="left_btn">
						<!--<el-button @click="batchImport()" size="small" type="danger">批量导入发货文件</el-button>-->
						<batch-import :upLoadData="upLoadData" title="批量导入发货文件"></batch-import>
					</div>
					<div class="right_btn">
						<a class="btn_a" :href="this.headerCommon+'/Orderservice/batchShipTemDown?Authorization='+token">下载发货模板</a>
					</div>
				</div>
			</div>
			<div class="introduction_single" v-show="!radioModlue">
				<div class="introduction_single_content">
					<div class="introduction_single_content_warp">
						<el-form :model="form" :rules="rules" ref="form" label-width="100px">
							<div class="padding_warp">
					            <el-form-item label="订单号" prop="order_sn">
					                <el-input size="small" v-model.trim="form.order_sn"></el-input>
					            </el-form-item>
							</div>
							<div class="padding_warp">
					            <el-form-item label="快递编号" prop="logistics_order_sn">
					                <el-input size="small" v-model.trim="form.logistics_order_sn"></el-input>
					            </el-form-item>
							</div>
							<div class="padding_warp">
					            <el-form-item label="请选择快递" prop="logistics_code">
					                <el-select v-model.trim="form.logistics_code" size="small">
					                    <el-option
					                    v-for="item in options2"
					                    :key="item.logistics_code"
					                    :label="item.logistics_name"
					                    :value="item.logistics_code">
					                    </el-option>
					                </el-select>
					            </el-form-item>
							</div>
			            </el-form>
						<div class="introduction_single_content_warp_btn">
							<el-button @click="sendProduct('form')" size="small" type="danger">确定导入</el-button>
						</div>
	           		</div>
	           	</div>
				<!--<div class="introduction_single_content">
					<div class="introduction_single_content_warp">
						<div class="left_warp">
							订单号：
						</div>
						<div class="right_warp">
							<el-input size="small" v-model="form.order_sn" placeholder="请输入订单号"></el-input>
						</div>
					</div>
					<div class="introduction_single_content_warp">
						<div class="left_warp">
							快递单号：
						</div>
						<div class="right_warp">
							<el-input size="small" v-model="form.logistics_order_sn" placeholder="请输入快递单号"></el-input>
						</div>
					</div>
					<div class="introduction_single_content_warp">
						<div class="left_warp">
							快递公司：
						</div>
						<div class="right_warp">
							  <el-select size="small" v-model="form.logistics_code" placeholder="请选择">
							    <el-option
							      v-for="item in options2"
							      :key="item.logistics_code"
							      :label="item.logistics_name"
							      :value="item.logistics_code">
							    </el-option>
							  </el-select>
						</div>
					</div>
					<div class="introduction_single_content_warp_btn">
						<el-button @click="sendProduct()" size="small" type="danger">确定导入</el-button>
					</div>
				</div>-->
			</div>
		</div>
	</div>
</div>
</template>

<script>
import orderList from '../../js/orderList';
import sendProduct from "../../js/sendProduct";
import orderDetail from '../../js/orderDetail';

import pickerData from "../../components/picker";

import batchImport from "../../components/batch_import";
 export default {
   data () {
     return {        
     	rules:{
            order_sn: [
                { required: true, message: '请输入订单号', trigger: 'blur' }
            ], 
            logistics_code: [
                { required: true, message: '请选择物流公司', trigger: 'blur' },
                { min: 1, max: 28, message: '长度在1到28个字符', trigger: 'blur' }
            ],
            logistics_order_sn: [
                { required: true, message: '请输入快递单号', trigger: 'blur' },
                { min: 7, max: 48, message: '长度在7到18个字符', trigger: 'blur' }
            ],
        },
     	form:{
     		order_sn:'',
     		logistics_code:'',
     		logistics_order_sn:'',
     	},
     	options2:[],
     	upLoadData:{
          order_file:"detailsImg",
        },
     	token:'',
     	radioModlue:true,
     	radio3: '批量导入',
     	count:1,
     	total_page:0,
     	stateArr:[],
       orderStatusCount:[],
       quick_search_1:'',
       quick_search_2:'',
       pageSize:10,
       undelivery:0,
       pendinggroup:0,
       delivery:0,
       currentPage4: 1,
       activeName: '',//4   3  6   12
       order_sn:'',
       goodsId:'',
       mobile:'',
       logistics_code:'',
       order_state:'',
       consignee:'',
       picker:'',
       total:0,
       sTime:'',
       eTime:'',
       tableData: [],
        options: [],
        value: '',
        value:'',
        action:'',
     }
   },
   created(){
		this.token = localStorage.getItem("token");
		sendProduct.getShipInfo("/Storepublic/getLogistics",this)
   },
   components: {
     pickerData,batchImport
   },
   methods:{
   	sendProduct(formName){
        var that = this;
        this.$refs[formName].validate((valid) => {
        if (valid) {     
            var data = {
	   			order_sn:this.form.order_sn,
	   			action:'delivery',
	   			logistics_code:this.form.logistics_code,
	   			logistics_order_sn:this.form.logistics_order_sn,
            }
            orderDetail.sendProduct("/OrderService/storeAfterSales",data,that,"batchDelivery");
        } else {
            console.log('error submit!!');
            return false;
        }
        });
   	},
   	changeLabel(){
   		this.radioModlue = !this.radioModlue;
   	},
   }
 }
</script>
