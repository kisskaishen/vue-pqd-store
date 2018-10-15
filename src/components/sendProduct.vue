<template>
 <div class="send">
   <el-dialog
    title="订单发货"
    :visible.sync="centerDialogVisible"
    :before-close = "closeDialog()"
    width="30%"
    left>
    <!-- <span>需要注意的是内容是默认不居中的</span> -->
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="订单编号">
        <el-input v-model="order_sn" disabled></el-input>
      </el-form-item>
      <el-form-item label="请选择快递" prop="shipping_name">
        <el-select v-model="ruleForm.shipping_name">
            <el-option
              v-for="item in options2"
              :key="item.logistics_code"
              :label="item.logistics_name"
              :value="item.logistics_code"
              :disabled="item.disabled">
            </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="快递单号" prop="shipping_order">
        <el-input v-model="ruleForm.shipping_order"></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancel()">取 消</el-button>
      <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
    </span>
  </el-dialog>
 </div> 
</template>

<script>
import sendProduct from "../js/sendProduct";
 export default {
   data () {
     return {
       centerDialogVisible:false,
       ruleForm:{
         shipping_name:'',
         shipping_order:''
       },        
       options2: [],
       rules:{
          shipping_name: [
            { required: true, message: '请选择物流公司', trigger: 'change' }
          ], 
          shipping_order: [
            { required: true, message: '请输入快递单号', trigger: 'blur' },
            { min: 7, max: 18, message: '长度在7到18个字符', trigger: 'blur' }
          ],
       }
     }
   },
   props:["order_sn"],
   created(){
     sendProduct.getShipInfo("/api/order/shippinglist",this)
   },
   components: {

   },
   methods:{
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      closeDialog(){
        //   this.centerDialogVisible = false;
        this.$emit("controllDialog",false);
      },
      cancel(){
        this.$emit("controllDialog",false);
      }
   }
 }
</script>

<style>

 
</style>
