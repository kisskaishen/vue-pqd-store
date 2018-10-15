<style lang="less" scoped>
@import "../../less/config.less";
@import "../../less/orderDetail.less";
</style>
<template>
 <div class="orderModule">
     <div class="order-detail">
            <div class="title">订单信息
                <div class="btn_send">
                    <span v-for="item in button">
                        <span v-if="item.position=='1'">
                            <el-button size="small" type="danger" @click="deliveryBtn()">{{item.buttonName}}</el-button>
                    	</span>
                        <!--<span v-if="item.position=='4'">
                            <el-button size="small" type="danger" @click="editLogistics(orderDetailData)">{{item.buttonName}}</el-button>
                    	</span>-->
                    </span>
                </div>
                <div id="btn_sends">
                      <router-link :to="{path:root_back}">返回</router-link>
                </div>
            </div>
            <div class="order_detail_warp">
                <div class="pay_info">
                    <div class="titles">支付信息</div>
                    <div class="pay_info_warp">
                        <div class="warp_content">支付流水号：{{payInfo.serial_number}}</div>
                        <div class="warp_content">支付方式：{{payInfo.pay_name}}</div>
                    </div>
                </div>
                <div class="pay_info">
                    <div class="titles">订单信息</div>
                    <div class="pay_info_warp">
                        <div class="warp_content">订单编号：{{orderDetailData.order_sn}}</div>
                        <div class="warp_content">订单状态：{{orderDetailData.order_status}}</div>
                        <div class="warp_content">售后状态：{{orderDetailData.order_service}}</div>
                        <div class="warp_content">下单时间：{{orderDetailData.add_time}}</div>
                        <div class="warp_content">付款时间：{{orderDetailData.pay_time}}</div>
                        <!-- <div class="warp_content">拼团成功时间：{{orderDetailData.order_status}}</div> -->
                    </div>
                </div>
                <!--<div class="pay_info" v-show="orderDetailData.delivery_time">
                    <div class="titles">物流信息</div>
                    <div class="pay_info_warp">
                        <div class="warp_content">发货时间：{{orderDetailData.delivery_time}}</div>
                        <div class="warp_content">快递单号：{{orderDetailData.logistics_order_sn}}</div>
                        <div class="warp_content">快递公司：{{orderDetailData.logistics_name}}</div>
                        <div class="warp_content"><el-button size="small">修改物流信息</el-button></div>
                    </div>
                </div>-->
            </div>
     </div>
     <div class="order-list">
        <!-- <div class="title">订单列表</div> -->
        <div class="order-list-table">
            <table class="show-order-product">
              <thead>
                <tr>
                  <th>商品名称</th>
                  <th>规格</th>
                  <th>商品价格(元)</th>
                  <th>数量(件)</th>
                  <th>商品总价</th>
                  <th>是否使用优惠券</th>
                  <th>类型</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <img :src="orderGoodsInfo.img" style="width:60px;height:60px" alt="">
                    <div style="width:200px;margin:0 auto">{{orderGoodsInfo.goods_name}}</div> 
                  </td>
                  <td>{{orderGoodsInfo.spec_key_name}}</td>
                  <td>{{orderGoodsInfo.goods_price}}</td>
                  <td>{{orderGoodsInfo.goods_num}}</td>
                  <td>{{orderGoodsInfo.goods_totalprice}}</td>
                  <td>{{orderGoodsInfo.coupon_price}}</td>
                  <td>{{orderGoodsInfo.type}}</td>
                </tr>
              </tbody>
            </table>
            <div class="buyer-info">
                <table class="show-order-detail">
                <thead>
                    <tr>
                    <th class="first-th"><span class="buy-info">买家信息</span><el-button type="primary" @click="edituserinfo()">修改</el-button></th>
                    <th>备注创建时间</th>
                    <th>备注</th>
                    <th>操作</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <td style="text-align:left">
                        <span>买家</span>
                        <span>{{userInfo.consignee}}</span>
                        <span>{{userInfo.mobile}}</span>
                        <span>{{userInfo.address_base}}{{userInfo.address}}</span>
                    </td>
                    <td>{{userInfo.store_time}}</td>
                    <td>{{userInfo.store_note}}</td>
                    <td><el-button type="danger" size="small" @click="DialogEditRemark=true">修改备注</el-button></td>
                    </tr>
                </tbody>
                </table>
            </div> 
            <div class="logistics_info_warp" v-show="orderDetailData.delivery_time">
            	<div class="title_common">物流信息</div>
            	<div class="logistics_info">
            		<div class="title_info">
            			<span class="margin_item">快递公司：{{orderDetailData.logistics_name}}</span>
            			<span class="margin_item">物流单号：{{orderDetailData.logistics_order_sn}}</span>
            			<span class="margin_item">发货时间：{{orderDetailData.delivery_time}}</span>
            			<span class="margin_item" v-for="item in button">
	                        <span v-if="item.position=='4'">
	                            <el-button size="small" type="danger" @click="editLogistics(orderDetailData)">{{item.buttonName}}</el-button>
	                    	</span>
            			</span>
            		</div>
            		<div class="logistics_info_warp_content">
            			<li v-for="(item,keys) in express" :class="{'active':keys==0,'logistics_li':true}" v-if="keys < show_index">
            				<div class="title_infos">{{item.ftime}}</div>
            				<div class="time_info">{{item.context}}</div>
            			</li>
            			<!--logistics_li-->
            			<div class="btn_up_or_down" v-show="express.length>3">
            				<span class="btn_up">
            					<el-button type="text" @click="btn_up()">展开更多物流信息</el-button>
            				</span>
            				<span class="btn_down">
            					<el-button type="text" @click="btn_down()">收起</el-button>
            				</span>
            			</div>
            		</div>
            	</div>
            </div>
        </div>
     </div>
     <!-- 发货 -->
      <div class="send">
        <el-dialog
            title="订单发货"
            :visible.sync="DialogVisible"
            width="30%"
            left>
            <!-- <span>需要注意的是内容是默认不居中的</span> -->
            <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="订单编号">
                <el-input size="small" v-model.trim="orderDetailData.order_sn" disabled></el-input>
            </el-form-item>
            <el-form-item label="请选择快递" prop="shipping_name">
                <el-select v-model="ruleForm.shipping_name" size="small"
                    @change = "selectPicker">
                    <el-option
                    v-for="item in options2"
                    :key="item.logistics_code"
                    :label="item.logistics_name"
                    :value="item.logistics_code"
                    :disabled="item.disabled">
                    </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="快递单号" >
            	<!--prop="shipping_order"-->
            	<input class="self_input_valiate" :maxlength="50" v-model.trim="ruleForm.shipping_order"  onkeyup="value=value.replace(/[^\w\.\/]/ig,'')"> 
            	<!--<input type="text" :maxlength="50" class="self_input_valiate" v-model.trim="ruleForm.shipping_order" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">-->
                <!--<el-input :maxlength="50" size="small" v-model.trim="ruleForm.shipping_order"></el-input>-->
            </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="DialogVisible=false">取 消</el-button>
            <el-button size="small" type="primary" @click="submitFormOrder('ruleForm')">确 定</el-button>
            </span>
        </el-dialog>
    </div> 
    <!-- //修改买家信息 -->
      <div class="editInfo">
        <el-dialog
            title="编辑买家信息"
            :visible.sync="DialogEditInfo"
            width="50%"
            left>
            <!-- <span>需要注意的是内容是默认不居中的</span> -->
            <el-form :model="userInfoForm" ref="userInfoForm" :rules="rulesEditInfo" label-width="100px" class="demo-ruleForm"> 
                <el-form-item label="收件地址">
                    <el-select size="small" v-model="userInfoForm.province" placeholder="请选择" @change = "changeProvinced">
                        <el-option
                        v-for="item in optionsProvinced"
                        :key="item.region_id"
                        :label="item.region_name"
                        :value="item.region_id">
                        </el-option>
                    </el-select>
                    <el-select size="small" v-model="userInfoForm.city" @change = "changecity" placeholder="请选择">
                        <el-option
                        v-for="item in optionsCity"
                        :key="item.region_id"
                        :label="item.region_name"
                        :value="item.region_id">
                        </el-option>
                    </el-select>
                    <el-select size="small" v-model="userInfoForm.district" @change="changeDistrict" placeholder="请选择">
                        <el-option
                        v-for="item in optionsDistrict"
                        :key="item.region_id"
                        :label="item.region_name"
                        :value="item.region_id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="收件地址" prop="address">
                    <el-input size="small" v-model.trim="userInfoForm.address" ></el-input>
                </el-form-item>
                <el-form-item label="收货人" prop="consignee">
                    <el-input size="small" v-model.trim="userInfoForm.consignee" ></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="mobile">
                    <el-input size="small" v-model.trim="userInfoForm.mobile" ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="DialogEditInfo=false">取 消</el-button>
            <el-button size="small" type="primary" @click="submitFormEdit('userInfoForm')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
    <!-- //修改备注信息 -->
    <div class="editRemark">
        <el-dialog
            title="信息"
            :visible.sync="DialogEditRemark"
            width="30%"
            left>
            <!-- <span>需要注意的是内容是默认不居中的</span> -->
            <el-form :model="editRemarkForm" ref="editRemarkForm" :rules="rulesRemark" label-width="100px" class="demo-ruleForm">
                <el-form-item label="备注信息" prop="editRemark">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model.trim="editRemarkForm.editRemark">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="DialogEditRemark=false">取 消</el-button>
            <el-button size="small" type="primary" @click="editRemark('editRemarkForm')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
 </div>
</template>

<script>
import orderDetail from '../../js/orderDetail';
import sendProduct from "../../js/sendProduct";

import customerServiceDetail from "../../js/customerServiceDetail";
 export default {
   data () {      
// 	var validateShippingOrder = (rule, value, callback) => {
//      if (value === '') {
//        callback(new Error('请再次输入密码'));
//      } else if (value !== this.ruleForm2.pass) {
//        callback(new Error('两次输入密码不一致!'));
//      } else {
//        callback();
//      }
//    };
     return {
     	show_index:3,
     	btn_name:false,
         accout:'',
         root_back:'',
         payInfo:{},
         express:[],
         button:[],
         userInfo:{},
         orderGoodsInfo:'',
         address_base:'',
         order_sn:'',
         order_type:0,
         order_type_status:'',
         sendStatus:true,
         orderDetailData:{},
         DialogVisible:false,
         DialogEditInfo:false,
         DialogEditRemark:false,
         provincedName:'',
         cityName:'',
         districtName:'',
         optionsProvinced:[],
         optionsCity:[],
         optionsDistrict:[],
         tableData:{
             productName:"创业资金大额补助现金直接送",
             specification:"100g/300元",
             productPrice:0.01,
             count:1,
             productTotal:0.01,
             coupon:1,
             type:"团购"
         },   
         userInfoForm:{

         }   , 
         ruleForm:{
            shipping_name:'',
            shipping_order:'',
            logistics_code:''
        }, 
        editRemarkForm:{

        },
        shipCode:'',
        shipName:'',
        shipNumber:'',    
        options2: [],
        rules:{
            shipping_name: [
                { required: true, message: '请选择物流公司', trigger: 'change' }
            ], 
            shipping_order: [
//          	{ validator: validateShippingOrder, trigger: 'blur' }
//              { required: true, message: '请输入快递单号', trigger: 'blur' },
//              { min: 7, max: 18, message: '长度在7到18个字符', trigger: 'blur' }
            ],
        },
        rulesRemark:{
            editRemark: [
                { required: true, message: '请输入备注信息', trigger: 'blur' },
                { min:5, max: 100, message: '备注信息至少五个字', trigger: 'blur' }
            ],
        },
        rulesEditInfo:{
            address: [
                { required: true, message: '请输入收件地址', trigger: 'blur' },
                { min:2, max: 60, message: '收件地址不能超过60个字', trigger: 'blur' }
            ],
            consignee: [
                { required: true, message: '请输入收货人姓名', trigger: 'blur' },
                { min:2, max: 20, message: '收货人姓名不能超过20个字', trigger: 'blur' }
            ],
            mobile: [
                { required: true, message: '请输入联系电话', trigger: 'blur' },
                { min:11, max: 11, message: '电话为11位数', trigger: 'blur' }
            ],
        },
     }
   },
   created(){
       this.order_sn = this.$route.query.order_sn;
       this.accout = this.$route.query.accout;
       if(this.accout=='accout'){
          this.root_back = '/store/accountFund/revenueRecord';
       }else if(this.accout==undefined){
          this.root_back = '/store/orderManager/order';
       }else if(this.accout=='evaluate'){
          this.root_back = '/store/evaluateManager/evaluate';
       }
       var data = {
           order_sn:this.order_sn
       }
       orderDetail.getOrderDetailShow('/Order/orderInfo',data,this);
            sendProduct.getShipInfo("/Storepublic/getLogistics",this)
   },
   components: {

   },
   methods:{
   	btn_up(){
   		this.show_index = this.express.length;
   	},
   	btn_down(){
   		this.show_index = 3;
   	},
   	deliveryBtn(){
   		this.DialogVisible = true;
	   		this.ruleForm.shipping_order = '';
   	},
	   	editLogistics(data){
	   		this.btn_name = true;
	   		this.orderDetailData.order_sn = data.order_sn;
	   		this.ruleForm.shipping_name = data.logistics_code;
	   		this.ruleForm.shipping_order = data.logistics_order_sn;
	   		this.DialogVisible = true;
	   	},
       edituserinfo(){
            this.DialogEditInfo = true;
            this.userInfoForm.address = this.userInfo.address;
            this.userInfoForm.mobile = this.userInfo.mobile;
            this.userInfoForm.consignee = this.userInfo.consignee;
            this.userInfoForm.province = this.userInfo.province;
            this.userInfoForm.city = this.userInfo.city;
            this.userInfoForm.district = this.userInfo.district;
            var data = {
                action:'level_1'
            }
          customerServiceDetail.getaddress("/Storepublic/getRegion",data,this);
       },
       //修改买家信息
       submitFormEdit(formName) {
           var that = this;
        this.$refs[formName].validate((valid) => {
          if (valid) {      
            var address_base = that.provincedName+that.cityName+that.districtName;
            if(address_base==""){
                address_base = that.address_base;
            }
            var data = {
                orderSn:that.order_sn,
                address:that.userInfoForm.address,
                consignee:that.userInfoForm.consignee,
                mobile:that.userInfoForm.mobile,
                district:that.userInfoForm.district,
            }
            orderDetail.editaddress("/order/editaddress",data,that);
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
       changeProvinced(val){
           let obj = {};
           if(this.optionsProvinced.length!=0){
            obj = this.optionsProvinced.find((item) => {
                return item.region_id === val;
            })
            this.provincedName = obj.region_name;
           }
           var data = {
               action:'parent_id',
               value:val
            }
          customerServiceDetail.secondLevel("/Storepublic/getRegion",data,this);
            // this.userInfoForm.city = '';
            // this.userInfoForm.district = '';
       },
       changecity(val){
           let obj = {};
           if(this.optionsCity.length!=0){
            obj = this.optionsCity.find((item) => {
                return item.region_id === val;
            })
            this.cityName = obj.region_name;
           }
            var data = {
               action:'parent_id',
               value:val
            }
          customerServiceDetail.thirdLevel("/Storepublic/getRegion",data,this);
            // this.userInfoForm.district = '';
       },
       changeDistrict(val){
           let obj = {};
            if(this.optionsDistrict.length!=0){
                obj = this.optionsDistrict.find((item) => {
                    return item.region_id === val;
                })
                this.districtName = obj.region_name;
           }
           this.userInfoForm.district = val;
       },
       selectPicker(val){
                let obj = {};
                obj = this.options2.find((item) => {
                    return item.logistics_code === val;
                })
                this.ruleForm.logistics_code = obj.logistics_name;
       },
       editRemark(formName){
           var that = this;
            this.$refs[formName].validate((valid) => {
            if (valid) {     
                var storeNote = that.editRemarkForm.editRemark; 
                var data = {
                    order_sn:that.order_sn,
					store_note:storeNote
                }
                orderDetail.editRemarkInfo("/Order/storeNote",data,that);
            } else {
                console.log('error submit!!');
                return false;
            }
            });
       },
       //订单发货
       submitFormOrder(formName){
            var that = this;
            this.$refs[formName].validate((valid) => {
            if (valid) {     
            	if(this.btn_name){
	                var data = {
	                    order_sn:that.order_sn,
	                    logistics_code:this.ruleForm.shipping_name,
	                    logistics_order_sn:this.ruleForm.shipping_order,
	                }
	                orderDetail.editLogistics("/Order/editLogistics",data,that);
            	}else{
	                var data = {
	                    order_sn:that.order_sn,
	                    action:'delivery',
	                    logistics_code:this.ruleForm.shipping_name,
	                    logistics_order_sn:this.ruleForm.shipping_order,
	                }
	                orderDetail.sendProduct("/OrderService/storeAfterSales",data,that);
            	}
            } else {
                console.log('error submit!!');
                return false;
            }
            });
       },
   }
 }
</script>
