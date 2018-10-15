<template>
 <div class="orderModule">
 	<big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
     <div class="order-detail">
            <div class="title">订单详情
                <div class="btn_send">
                      <span v-if="isShow">
                          <span ><el-button size="small" type="danger" @click="Handle(tableData)">处理</el-button></span>
                      </span>
                </div>   
                <div id="btn_sends">
                      <router-link :to="{path:'/store/orderManager/customerServiceList'}">返回</router-link>
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
                        <div class="warp_content">订单编号：{{orderInfo.order_sn}}</div>
                        <div class="warp_content">订单状态：{{orderInfo.order_status}}</div>
                        <div class="warp_content">售后状态：{{orderInfo.order_service}}</div>
                        <div class="warp_content">下单时间：{{orderInfo.add_time}}</div>
                        <div class="warp_content">付款时间：{{orderInfo.success_time}}</div>
                        <!-- <div class="warp_content">拼团成功时间：{{orderDetailData.order_status}}</div> -->
                    </div>
                </div>
                <div class="pay_info">
                    <div class="titles">物流信息</div>
                    <div class="pay_info_warp">
                        <div class="warp_content">发货时间：{{orderInfo.delivery_time}}</div>
                        <div class="warp_content">快递单号：{{orderInfo.logistics_order_sn}}</div>
                        <div class="warp_content">快递公司：{{orderInfo.logistics_name}}</div>
                    </div>
                </div>
            </div>
     </div>
     <div class="order-list">
        <div class="title">订单列表</div>
        <div class="order-list-table">
            <table class="show-order-product">
              <thead>
                <tr>
                  <th>商品</th>
                  <th>商品名称</th>
                  <th>购买规格</th>
                  <th>商品单价</th>
                  <th>数量</th>
                  <th>商品总价</th>
                  <th>是否使用优惠券</th>
                  <th>类型</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <img :src="tableData.img" style="width:60px;height:60px" alt="">
                  </td>
                  <td width="300">{{tableData.goods_name}}</td>
                  <td>{{tableData.spec_key_name}}</td>
                  <td>{{tableData.goods_price}}</td>
                  <td>{{tableData.goods_num}}</td>
                  <td>{{tableData.goods_totalprice}}</td>
                  <td>{{tableData.coupon_price}}</td>
                  <td>{{tableData.type}}</td>
                </tr>
              </tbody>
            </table>
            <div class="buyer-info">
                <table class="show-order-detail">
                <thead>
                    <tr>
                    <th class="first-th"><span class="buy-info">买家信息</span><el-button type="primary" @click="DialogEditInfo=true">修改</el-button></th>
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
            <div class="return-goods" v-show='tableData.order_type==9'>
                <table class="show-order-detail">
                <thead>
                    <tr>
                    <th class="first-th"><span class="buy-info">退货描述</span></th>
                    <th>售后类型</th>
                    <th>描述图片</th>
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
                    <td>{{userInfo.show_status}}</td>
                    <td>{{userInfo.mobile}}</td>
                    </tr>
                </tbody>
                </table>
            </div>  
        </div>
     </div> 
    <div class="order-list" v-show="orderService.length!=0">
        <div class="title">售后操作列表</div>
        <div class="order-list-table">
            <table class="show-order-product">
              <thead>
                <tr>
                  <th>操作角色</th>
                  <th>退款金额</th>
                  <th>原因</th>
                  <th>描述</th>
                  <th>图片凭证</th>
                  <th>创建时间</th>
                  <th>物流代码</th>
                  <th>物流编号</th>
                  <th>物流名称</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="its in orderService">
                  <td>
                    {{its.operate_role_name}}
                  </td>
                  <td>{{its.return_money}}</td>
                  <td>{{its.reason}}</td>
                  <td>{{its.description}}</td>
                  <td>
                      <span v-show="its.proof_imgs.length!=0">
                      	<img  @click="clickImg($event,its.proof_imgs)" style="width:60px;height:60px;" :src="its.proof_imgs[0]">
                        <!--<img  @click="clickImg($event)" style="height:100px;" :src="child">-->
                      	<div style="text-align: center;">1/{{its.proof_imgs.length}}</div>
                      </span>
                  </td>
                  <td>{{its.create_time}}</td>
                  <td>{{its.shipping_code}}</td>
                  <td>{{its.shipping_order}}</td>
                  <td>{{its.shipping_name}}</td>
                </tr>
              </tbody>
            </table>
            <div class="click_btn">
                <span v-if="isShow3" class="center_btn">
                    <span ><el-button type="danger" round @click="HandlePosition()">{{btn_name}}</el-button></span>
                </span>
            </div>
        </div>
    </div>
     <!-- //修改备注 -->
     <div class="editRemark">
        <el-dialog
            title="信息"
            :visible.sync="DialogEditRemark"
            width="30%"
            left>
            <!-- <span>需要注意的是内容是默认不居中的</span> -->
            <el-form :model="editCustomerForm" ref="editCustomerForm" :rules="rulesRemark" label-width="100px" class="demo-ruleForm">
                <el-form-item label="备注信息" prop="editRemark">
                    <el-input
                        type="textarea"
                        :rows="2"
                        placeholder="请输入内容"
                        v-model.trim="editCustomerForm.editRemark">
                    </el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="DialogEditRemark=false">取 消</el-button>
            <el-button size="small" type="primary" @click="editRemark('editCustomerForm')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
    <!-- 修改买家信息 -->
          <div class="editInfo">
        <el-dialog
            title="编辑买家信息"
            :visible.sync="DialogEditInfo"
            width="60%"
            left>
            <el-form :model="userInfo" ref="userInfo" :rules="rulesEdit" label-width="100px" class="demo-ruleForm"> 
                <el-form-item label="收件地址">
                    <el-select size="small" v-model="userInfo.province" placeholder="请选择" @change = "changeProvinced">
                        <el-option
                        v-for="item in optionsProvinced"
                        :key="item.region_id"
                        :label="item.region_name"
                        :value="item.region_id">
                        </el-option>
                    </el-select>
                    <el-select size="small" v-model="userInfo.city" @change = "changecity" placeholder="请选择">
                        <el-option
                        v-for="item in optionsCity"
                        :key="item.region_id"
                        :label="item.region_name"
                        :value="item.region_id">
                        </el-option>
                    </el-select>
                    <el-select size="small" v-model="userInfo.district" @change="changeDistrict" placeholder="请选择">
                        <el-option
                        v-for="item in optionsDistrict"
                        :key="item.region_id"
                        :label="item.region_name"
                        :value="item.region_id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="收件地址" prop="address">
                    <el-input size="small" v-model.trim="userInfo.address" ></el-input>
                </el-form-item>
                <el-form-item label="收货人" prop="consignee">
                    <el-input size="small" v-model.trim="userInfo.consignee" ></el-input>
                </el-form-item>
                <el-form-item label="联系电话" prop="mobile">
                    <el-input size="small" v-model.trim="userInfo.mobile" ></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="DialogEditInfo=false">取 消</el-button>
            <el-button size="small" type="primary" @click="submitForm('userInfo')">确 定</el-button>
            </span>
        </el-dialog>
    </div>
    <!-- 退款处理 -->
          <div class="send">
        <el-dialog
            title="退款处理"
            :visible.sync="DialogVisible"
            width="40%"
            left>
            <el-form :model="ruleFormsend" :rules="rulesSend" ref="ruleFormsend" label-width="100px" class="demo-ruleForm">
                <el-form-item label="订单编号">
                    <el-input size="small" v-model.trim="ruleFormsend.order_sn" disabled></el-input>
                </el-form-item>
                <el-form-item label="商品名称">
                    <el-input size="small" disabled v-model.trim="ruleFormsend.goods_name"></el-input>
                </el-form-item>
                <el-form-item label="订单金额">
                    <el-input size="small" disabled v-model.trim="ruleFormsend.order_amount"></el-input>
                </el-form-item>
                <el-form-item label="实际退款">
                    <el-input size="small" disabled v-model.trim="return_money"></el-input>
                </el-form-item>
                <el-form-item label="处理方式">
                    <!-- <el-select v-model="activeVal"
                        @change = "selectPicker">
                        <el-option
                        v-for="item in button"
                        :key="item.action"
                        :label="item.buttonName"
                        :value="item.action">
                        </el-option>
                    </el-select> -->
                      <el-select size="small" @change = "selectPicker" v-model="activeVal" placeholder="请选择">
                        <el-option
                        v-for="item in button"
                        :key="item.action"
                        :label="item.buttonName"
                        :value="item.action">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注说明" prop="order_remark">
                    <el-input size="small"
                        type="textarea"
                        :autosize="{ minRows: 2, maxRows: 4}"
                        placeholder="请输入内容"
                        v-model.trim="ruleFormsend.order_remark">
                    </el-input>
                </el-form-item>
            </el-form>
                <span slot="footer" center class="dialog-footer">
                <el-button size="small" @click="DialogVisible=false">取 消</el-button>
                <el-button size="small" type="primary" @click="submitFormSend('ruleFormsend')">确 定</el-button>
                </span>
        </el-dialog>
    </div> 
 </div>
</template>

<script>
import customerServiceDetail from "../../js/customerServiceDetail"

import orderDetail from "../../js/orderDetail";
import common from '../../js/common';
import fancyBox from 'vue-fancybox';
//import BigImg from '../../components/bigImg'
import BigImg from '../../components/swiper_big_img';
 export default {
   data () {
     return {
         payInfo:{},
         showImg:false,
         action_name:'',
         btn_name:'',
         isShow3:false,
         orderService:[],
         isShow:false,
         return_money:'',
         activeVal:'',
         button:[],
         userInfo:{},
         orderInfo:{},
         ruleFormsend:{
             order_sn:'',
             goods_name:'',
             order_amount:'',
             gold:'',
             dealTypeVal:0,
             proof_imgsArr:[],//处理图片
             order_remark:'',//备注说明 
         },
         dealType:[
             {
                 name:"同意处理",
                 code:1,
             },
             {
                 name:"拒绝处理",
                 code:0,
             }
         ],
         order_type:0,
         order_type_status:'',
         order_sn:'',      //id
         provincedName:'',//省
         cityName:'',     //市
         districtName:'', //区 
         shipOption:[],
         ruleFormsend:{
            logistics_name:'',
            shipping_order:''
         },
        ruleForm:{
            address:'',
            consignee:'',
            mobile:'',
            province:'',
            city:'',
            district:'',
            address_base:'',
        }, 
        address_base:'',
         editCustomerForm:{
             editRemark:''
         },
         optionsProvinced:[],
         optionsCity:[],
         optionsDistrict:[],
         rulesEdit:{
             province: [
                { required: true, message: '请选择所在省', trigger: 'blur' }
            ], 
             city: [
                { required: true, message: '请选择所在市', trigger: 'blur' }
            ], 
             district: [
                { required: true, message: '请选择所在区', trigger: 'blur' }
            ], 
             address: [
                { required: true, message: '请输入收货地址', trigger: 'blur' },
                { min: 3, max: 48, message: '收货地址错误', trigger: 'blur' }
            ], 
            consignee: [
                { required: true, message: '请输入收件人姓名', trigger: 'blur' },
                { min: 2, max: 28, message: '收件人姓名错误', trigger: 'blur' }
            ],
            mobile: [
                { required: true, message: '请输入11位手机号', trigger: 'blur' },
                { min: 11, max: 11, message: '手机号错误', trigger: 'blur' }
            ],
         },
         rulesSend:{
             dealTypeVal:[
                { required: true, message: '请输入处理方式', trigger: 'blur' },
             ],
            order_remark: [
                { required: true, message: '请输入备注信息', trigger: 'blur' },
                { min:5, max: 100, message: '备注信息至少五个字', trigger: 'blur' }
            ],
         },
         tableData:{},
         DialogEditRemark:false,
         DialogEditInfo:false,
         DialogVisible:false,
        rulesRemark:{
            editRemark: [
                { required: true, message: '请输入备注信息', trigger: 'blur' },
                { min:5, max: 100, message: '备注信息至少五个字', trigger: 'blur' }
            ],
        }
     }
   },
   created(){
       this.order_sn = this.$route.query.order_sn;
       var data = {
           order_sn:this.order_sn
       }
       customerServiceDetail.getCustomerServiceDetail("OrderService/orderServiceInfo",data,this);
    //     //物流信息
       customerServiceDetail.getShipInfo("/Storepublic/getLogistics",this);
    //    //省市区级联
        var addressData = {
            action:'level_1',
            value:'0',
        }
       customerServiceDetail.getaddress("/Storepublic/getRegion",addressData,this);
   },
   components: {
       BigImg
   },
   methods:{
        clickImg(e,data) {
            this.showImg = true;
            // 获取当前图片地址
//          this.imgSrc = e.currentTarget.src;
            this.imgSrc = data;
        },
        viewImg(){
            this.showImg = false;
        },
       open(e,img){
           var str = this.orderService;
            // return 
        //    var arr = [];
        //    arr.push({ width: 900, height: 675, url: img })

            // fancyBox(e.target,this.orderService);
       },
       HandlePosition(){
            var data = {
                return_sn:this.orderServiceSn,
                action:this.action_name,
            }
        this.$confirm('您确定收到货了么, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            customerServiceDetail.storeAfterSales("/OrderService/storeAfterSales",data,this);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消'
          });          
        });
       },
       Handle(data){
            this.ruleFormsend.order_sn = this.orderInfo.order_sn;
            this.ruleFormsend.goods_name = data.goods_name;
            this.ruleFormsend.order_amount = this.tableData.goods_totalprice;
            this.ruleFormsend.dealTypeVal = data.dealTypeVal;
            this.ruleFormsend.order_remark = data.order_remark;
            this.DialogVisible = true;
       },
       //处理订单
      submitFormSend(formName) {
           var that = this;
            this.$refs[formName].validate((valid) => {
            if (valid) { 
                // if(this.activeVal=='return_money_seller_action_refuse'){      
                var data = {
                    return_sn:that.orderServiceSn,
                    action:that.activeVal,
                    description:that.ruleFormsend.order_remark,
                    return_money:that.return_money,
                    proof_imgs:'',
                }
                customerServiceDetail.storeAfterSales("/OrderService/storeAfterSales",data,that);
            } else {
                console.log('error submit!!');
                return false;
            }
            });
      },
       selectPicker(val){
            this.activeVal = val
       },
       changeDistrict(val){
         /**选择区 */
           let obj = {};
          obj = this.optionsDistrict.find((item) => {
              return item.region_id === val;
          })
        this.districtName = obj.region_name;

       },
       changecity(val){
         /**选择市 */
           let obj = {};
            obj = this.optionsCity.find((item) => {
                return item.region_id === val;
            })
            this.cityName = obj.region_name;
           var data = {
               parent_id:val
           }
           customerServiceDetail.thirdLevel("/Area/areaList",data,this);
       },
       changeProvinced(val){
            /**选择省级*/
           let obj = {};
            obj = this.optionsProvinced.find((item) => {
                return item.region_id === val;
            })
            this.provincedName = obj.region_name;
           var data = {
               parent_id:val
           }
           customerServiceDetail.secondLevel("/Area/areaList",data,this);
       },
        //    修改备注
        editRemark(formName){
           var that = this;
            this.$refs[formName].validate((valid) => {
            if (valid) {     
                var storeNote = that.editCustomerForm.editRemark; 
                var data = {
                    order_sn:this.order_sn,
					store_note:storeNote
                }
                customerServiceDetail.editRemarkInfo("/order/storenote",data,that);
            } else {
                console.log('error submit!!');
                return false;
            }
            });
       },
       //修改买家信息
        submitForm(formName) {
           var that = this;
            this.$refs[formName].validate((valid) => {
                if (valid) {  
                    that.address_base = that.provincedName+that.cityName+that.districtName;
                    if(that.address_base==""){
                        that.address_base = that.ruleForm.address_base;
                    }
                    var data = {
                        orderSn:that.order_sn,
                        address:that.userInfo.address,
                        district:that.userInfo.district,
                        mobile:that.userInfo.mobile,
                        consignee:that.userInfo.consignee,
                    }
                   customerServiceDetail.editaddress("/Order/editAddress",data,that,'2');
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        }
    }
 }
</script>

<style lang="less" scoped>
@import "../../less/config.less";
.orderModule{
    padding:10px;
        background:@backgroundfff;
    .el-form-item{
        margin-bottom:22px;
    }
    .order-detail{
        background:@backgroundfff;
        .order_detail_warp{
            padding:20px;
            background:#F9F9F9;
            font-size:14px;
            .pay_info{
                margin-bottom:30px;
                .titles{
                    padding:5px 10px;
                    display: inline-block;
                    border-radius: 5px;
                    font-weight:bold;
                    background:#EEEEEE;
                }
                .pay_info_warp{
                    padding:0 10px;
                    .warp_content{
                        display: inline-block;
                        padding:10px 10px 0 0;
                        width:320px;
                        color:#666666;
                    }
                }
            }
        }
        .title{
            font-size:@font16;
            height:40px;
            line-height: 40px;
            position: relative;
            padding-left:10px;
            font-weight: bold;
            .btn_send{
                position: absolute;
                right:120px;
                top:2px;
            }
        }
        .title::before{
            display: block;
            content:'';
            position: absolute;
            top:10px;
            left:0;
            width:2px;
            height:20px;
            background:#E50056;
        }
    }
    .order-list{
        background:@backgroundfff;
        .title{
            font-size:@font16;
            height:40px;
            line-height: 40px;
            position: relative;
            padding-left:10px;
            font-weight: bold;
            .btn_send{
                position: absolute;
                right:0;
                top:0;
            }
        }
        .title::before{
            display: block;
            content:'';
            position: absolute;
            top:10px;
            left:0;
            width:2px;
            height:20px;
            background:#E50056;
        }
        .order-list-table{
        }
        .buyer-info{
            margin-top:20px;
        }
    }
    .click_btn{
        text-align: center;
        width:100%;
        .center_btn{
            display: inline-block;
            margin:20px auto;
        }
    }
}
 
</style>
