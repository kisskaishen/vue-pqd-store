<template>
 <div class="productList">
     <div class="common-top-title">商品列表</div>
    <div class="search" style="margin-top:20px;">
	     <div class="search-input">
	       <div class="leftLable">商品ID：</div><div class="rightLable"><el-input size="small" v-model.trim="form.goods_id" placeholder=""></el-input></div>
	     </div>
	     <div class="search-input">
	       <div class="leftLable">商品名称：</div><div class="rightLable"><el-input size="small" v-model.trim="form.goods_name" placeholder=""></el-input></div>
	     </div>
	     <div class="search-input">
	       <div class="leftLable">商品类型：</div><div class="rightLable">
	           <el-select size="small"  v-model="form.is_special" placeholder="请选择">
	              <el-option
	                v-for="item in is_specialOption"
	                :key="item.value"
	                :label="item.label"
	                :value="item.value">
	              </el-option>
	            </el-select>
	         </div>
	     </div>
	     <div class="search-input">
	       <div class="leftLable">上下架状态：</div><div class="rightLable">
	           <el-select size="small"  v-model="form.is_on_sale" placeholder="请选择" >
	              <el-option
	                v-for="item in is_on_saleOption"
	                :key="item.value"
	                :label="item.label"
	                :value="item.value">
	              </el-option>
	            </el-select>
	       </div>
	     </div>
	     <div class="clickButtonMargin">     
	      <el-button size="small" type="primary" @click="searchOrderList()">查询</el-button>
	     </div>
	 </div>
     <div class="main">
     	 <div class="empty_tips" v-show="itemData.length==0">
		    <img class="img_empty" src="../../img/empty/empty_img.png" alt="" />
		    <div class="text_empty">暂无商品</div>
		 </div>
        <table class="show-order-product" v-show="itemData.length!=0">
            <thead>
            <tr>
                <th>商品ID</th>
                <th>商品名称</th>
                <th>团购价</th>
                <th>单买价</th>
                <th>库存</th>
                <th>状态</th>
                <th>是否推荐</th>
                <th>所在资源位</th>
                <th>已售数量</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in itemData">
                <td>
                <img :src="item.list_img" style="width:60px;height:60px" alt="">
                <div>{{item.goods_id}}</div> 
                </td>
                <td style="width:200px;">{{item.goods_name}}</td>
                <td>{{item.prom_price}}</td>
                <td>{{item.price}}</td>
                <td>
                	<span v-show="item.store_count==0" style="color:red">{{item.store_count}}</span>
                	<span v-show="item.store_count!=0">{{item.store_count}}</span>
                </td>
                <td>{{item.is_on_sale==1 ? "已上架":"已下架"}}</td>
                <td>{{item.recommendText}}</td>
                <td>{{item.special}}</td>
                <td>{{item.sales}}</td>
                <td>
                	<div v-show="item.editUnable!=1">
	                    <el-button type="primary" size="small" @click="returnUrl(item.goods_id)">编辑</el-button>
	                    <span class="background-button"  @click="offShelf(item)"><span id="onSale">{{item.is_on_sale==0 ? "上架":"下架"}}</span></span>
	                    <el-button type="danger" size="small" @click="deleteRow(index,item.goods_id)">删除</el-button>
                	</div>
                	<div v-show="item.editUnable==1">
	                   	该商品目前参与专题运营位或已推荐首页
                	</div>
                </td>
            </tr>
            </tbody>
        </table>
        
        <div class="pagination" v-show="total!=0">
            <el-pagination
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-size='pageSize'
                layout="total, prev, pager, next, jumper"
                :total='total'>
            </el-pagination>
        </div>
     </div>
 </div>
</template>

<script>
import productList from '../../js/productList';
 export default {
   data () {
     return {
     	form:{
     		goods_id:'',
     		goods_name:'',
     		is_special:'',
     		is_on_sale:'',
     	},
     	is_on_saleOption:[],
     	is_specialOption:[],
         currentPage4:1,
         pageSize:10,
         itemData:[],
         total:0,
         statusVal:'',
     }
   },
   created(){
	   	this.fetch(this.currentPage4);
	   	var that = this;
	   	eventBus.$on('productList', function(id){
		    that.fetch(that.currentPage4);
		});
		productList.searchStatus("/Goods/searchStatus",this)
   },
   components: {

   },
   methods:{
   	searchOrderList(){
	   	this.fetch(this.currentPage4);
   	},
   	fetch(val){
       var data = {
           page:val,
           pageSize:this.pageSize,
           goods_id:this.form.goods_id,
           goods_name:this.form.goods_name,
           is_special:this.form.is_special,
           is_on_sale:this.form.is_on_sale,
       }
       productList.getProductList("/goods/productlist",data,this)
   	},
       returnUrl(val){
           this.$router.push("/store/productManager/releaseNewProductEdit?type=product&goods_id="+val);
       },
       deleteRow(index,good_id){
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
           var data = {
               goods_id:good_id,
               action:'formal' 
           }
           productList.deleteRowList("/Goods/delGoods",data,this,index);
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
       },
       offShelf(val){
           if(val.is_on_sale == 1){
                var data = {
                    goodsId:val.goods_id,
                    action:'down'
                }
                productList.changeStatus("/Goods/upDownSale",data,this,0,val);
           }else{
                var data = {
                    goodsId:val.goods_id,
                    action:'up'
                }
                productList.changeStatus("/Goods/upDownSale",data,this,1,val);
           }
       },
       handleCurrentChange(val){
	   	this.fetch(val);
       }
   }
 }
</script>

<style lang="less" scoped>
@import "../../less/config.less";
.productList{
    background:@backgroundfff;
    .main{
        padding:20px;
        .background-button{
            width: 100px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            display: inline-block;
            color: #fff;
            background: #409EFF;
            border-radius: 2px;
            cursor: pointer;
        }
    }
}
 
</style>
