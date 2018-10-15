<template>
 <div class="shopCoupons">
     <div class="common-top-title">账号管理</div>
     <div class="main">
        <div class="search-input">
            <div class="leftLable">账号名称：</div><div class="rightLable"><el-input v-model.trim="coupon_name" placeholder=""></el-input></div>
        </div>
        <div class="search-input">
            <div class="leftLable">账号角色：</div><div class="rightLable">
                 <el-select v-model="coupon_status" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <div class="search-input">
            <div class="leftLable">账号状态：</div><div class="rightLable">
                 <el-select v-model="coupon_status" placeholder="请选择">
                    <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
            </div>
        </div>
        <picker-data title="最近登录时间" @onPassByVal = "change"></picker-data>
        <picker-data title="创建时间" @onPassByVal = "change"></picker-data>
        <div class="clickButtonMargin">     
            <el-button type="primary" @click = "searchQueryShopCoupons()">查询</el-button>
        </div>
        <div class="rightClickButton">
            <el-button type="danger" @click="centerDialogVisible=true">+创建账号</el-button>
        </div>
        <div class="list">
                     <el-table
            :data="tableData"
            border
            style="width: 100%">
            <el-table-column
            prop="name"
            label="账号名称"
            width="190">
            </el-table-column>
            <el-table-column
            prop="send_start_time"
            label="账号角色"
            width="120">
            </el-table-column>
            <el-table-column
            prop="send_end_time"
            label="登陆次数"
            width="120">
            </el-table-column>
            <el-table-column
            prop="money"
            label="最近登录时间"
            width="96">
            </el-table-column>
            <el-table-column
            prop="money"
            label="创建时间"
            width="96">
            </el-table-column>
            <el-table-column
            label="操作">
           <template slot-scope="scope">      
                <span class="cursor" @click="deleteCoupons(scope.$index,scope.row.id)">关闭</span>
                <span class="cursor" @click="deleteCoupons(scope.$index,scope.row.id)">删除</span>
                <span class="cursor" @click="deleteCoupons(scope.$index,scope.row.id)">密码重置</span>
           </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-size=15
                layout="total, prev, pager, next, jumper"
                :total=total>
            </el-pagination>
        </div>
        </div>
     </div>
     <el-dialog
        title="创建账号"
        :visible.sync="centerDialogVisible"
        width="30%"
        center>
        <div class="form-create">
            <el-form ref="editData" :rules="rules" :model="editData" label-width="100px">
                <el-form-item label="账号角色:" prop="name">
                    <div class="width-controll">
                        <el-input v-model.trim="editData.name"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="账号名称:" prop="createnum">
                    <div class="width-controll">
                        <el-input v-model.trim="editData.createnum"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="登陆密码:" prop="expirationday">
                    <div class="width-controll">
                        <el-input v-model.trim="editData.expirationday"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="确认密码:" prop="expirationday">
                    <div class="width-controll">
                        <el-input v-model.trim="editData.expirationday"></el-input>
                    </div>
                </el-form-item>
                <el-form-item label="账号状态:" prop="limit_take">
                    <div class="width-controll">
                        <el-select v-model="editData.limit_take" placeholder="1张">
                        <el-option label="1" value="1"></el-option>
                        <el-option label="2" value="2"></el-option>
                        <el-option label="3" value="3"></el-option>
                        </el-select>
                    </div>
                </el-form-item>
            </el-form>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button @click="centerDialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="createdShopCoupons('editData')">确 定</el-button>
        </span>
        </el-dialog>
 </div>
</template>

<script>
import shopCoupons from "../../js/shopCoupons";

// 引入日期组件
import pickerData from '../../components/picker';
 export default {
   data () {
     return {
         rules:{
             name: [
                { required: true, message: '请输入优惠券名称', trigger: 'blur' },
                { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
            ],
             money: [
                { required: true, message: '请输入面额', trigger: 'blur' },
                { min: 1, max:9999, message: '长度在 1 到 9999 个字符', trigger: 'blur' }
            ],
             condition: [
                { required: true, message: '请输入使用条件', trigger: 'blur' },
                { min: 1, max: 50000, message: '长度在 1 到 50000 个字符', trigger: 'blur' }
            ],
             createnum: [
                { required: true, message: '请输入创建张数', trigger: 'blur' },
                { min: 1, max:50000, message: '最多创建5万张', trigger: 'blur' }
            ],
             expirationday: [
                { required: true, message: '请输入有效期天数', trigger: 'blur' },
                { min: 1, max: 30, message: '最大不超过30天', trigger: 'blur' }
            ],
             limit_take: [
                { required: true, message: '请选择每人限领张数', trigger: 'blur' },
                { min: 1, max: 3, message: '长度在 1 到 3 个字符', trigger: 'blur' }
            ]
         },
         use_start_time:'',
         use_end_time:'',
         form:{
             name:''
         },
         centerDialogVisible:false,
         currentPage4:1,
         total:0,
         coupon_name:'',
         coupon_status:0,
         tableData:[],
         editData:{

         },
         sTime:'',
         eTime:'',
         options:[
             {
               "label":'全部',
               "value":0 
             },
             {
               "label":'领取中', 
               "value":1 
             },
             {
               "label":'已领完',
               "value":2 
             },
             {
               "label":'已结束',
               "value":3 
             }
         ]
     }
   },
   created(){
       var data = {
           'coupon_name':'',
            'page':1,
            'coupon_status':0,
            'start':'',
            'end':''
       }
       shopCoupons.getShopCoupons("/api/coupon/index",data,this);
   },
   components:{pickerData},
   methods:{
       createdShopCoupons(formName){
           var that = this;
           this.$refs[formName].validate((valid) => {
            if (valid) {
                var data = {
                    name:that.editData.name,
                    money:that.editData.money,
                    condition:that.editData.condition,
                    createnum:that.editData.createnum,
                    use_start_time:that.editData.use_start_time?that.editData.use_start_time:that.sTime,
                    use_end_time:that.editData.use_end_time?that.editData.use_end_time:that.eTime,
                    limit_take:that.editData.limit_take,
                    expirationday:that.editData.expirationday
                }
                shopCoupons.editShopCoupons("/api/coupon/store",data,that);
            } else {
                console.log('error submit!!');
                return false;
            }
            });
       },
       change(msg){
            if(msg){
            this.use_start_time = msg[0];
            this.use_end_time = msg[1];
            }else{
            this.use_start_time = '';
            this.use_end_time = '';
            }
       },
       editCoupons(id){
           this.centerDialogVisible = true;
           shopCoupons.editCoupons("/api/coupon/show/"+id,this);
       },
       deleteCoupons(index,id){
           var msg = "删除";
            this.$confirm('您确定要'+msg+'?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    this.$message({
                        type: 'success',
                        message: msg+'成功!'
                    });
                shopCoupons.deleteShopCoupons("/api/coupon/destroy/"+id,index,this);
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });          
            });
       },
       suspendCoupons(index,status,id){
           var that = this;
           var msg = '';
           if(status==1){
              msg = "暂停"
           }else{
               msg = "开启"
           }
            this.$confirm('您确定要'+msg+'?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
                }).then(() => {
                    if(status==1){
                        that.tableData[index].status = 0
                    }else{
                        that.tableData[index].status = 1
                    }
                    this.$message({
                        type: 'success',
                        message: msg+'成功!'
                    });
                    var data = {
                        id:id,
                        status:status
                    }
                    shopCoupons.isSuspendCoupons("/api/coupon/status",data,that)
                }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消'
                });          
            });
       },
     change(msg){
      if(msg){
        this.sTime = msg[0];
        this.eTime = msg[1];
       }else{
        this.sTime = '';
        this.eTime = '';
       }
     },
       handleSizeChange(val){

       },
       handleCurrentChange(val){

       },
       searchQueryShopCoupons(){
            var data = {
                'coupon_name':this.coupon_name,
                'page':1,
                'coupon_status':this.coupon_status,
                'start':this.sTime!='NaN-0NaN-0NaN'?this.sTime:0,
                'end':this.eTime!='NaN-0NaN-0NaN'?this.eTime:0
            }
            shopCoupons.getShopCoupons("/api/coupon/index",data,this);
       },
   }
 }
</script>

<style lang="less" scoped>
@import "../../less/config.less";
.shopCoupons{
    .main{
        padding:10px 0;
        background:@backgroundfff;
        position: relative;
        .rightClickButton{
            position: absolute;
            right:20px;
            top:10px;
        }
        .list{
            padding:20px;
        }
    }
    .form-create{
        .width-controll{
            width:180px;
        }
        .width-controll-small{
            float:left;
            width:80px;
        }
        .text-margin{
            margin:0 10px;
        }
        .el-form-item{
            margin-bottom:10px;
        }
    }
}
 
</style>
