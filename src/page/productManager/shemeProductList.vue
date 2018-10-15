<template>
 <div class="productList">
     <div class="common-top-title">资源位列表</div>
     <div class="main">
        <table class="show-order-product">
            <thead>
            <tr>
                <th>专题名称</th>
                <th>商品ID</th>
                <th>商品名称</th>
                <th>团购价</th>
                <th>单买价</th>
                <th>库存</th>
                <th>状态</th>
                <th>已售数量</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in itemData">
            	<td>
            		{{item.special}}
            	</td>
                <td>
                <img :src="item.list_img" style="width:60px;height:60px" alt="">
                <div>{{item.goods_id}}</div> 
                </td>
                <td style="width:200px;">{{item.goods_name}}</td>
                <td>{{item.prom_price}}</td>
                <td>{{item.price}}</td>
                <td>{{item.store_count}}</td>
                <td>{{item.is_on_sale==1 ? "已上架":"已下架"}}</td>
                <td>{{item.sales}}</td>
            </tr>
            </tbody>
        </table>
        
        <div class="pagination">
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
         currentPage4:1,
         pageSize:10,
         itemData:[],
         total:0,
     }
   },
   created(){
	   	this.fetch();
	   	var that = this;
	   	eventBus.$on('shemeProductList', function(id){
		    that.fetch();
		})
   },
   components: {

   },
   methods:{
   	fetch(){
       var data = {
           "page":1,
           "row":this.pageSize
       }
       productList.getProductList("/goods/topicSproductList",data,this)
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
               val.is_on_sale = 0;
                var data = {
                    goodsId:val.goods_id,
                    action:'down'
                }
                productList.changeStatus("/Goods/upDownSale",data,this,0);
           }else{
               val.is_on_sale = 1;  
                var data = {
                    goodsId:val.goods_id,
                    action:'up'
                }
                productList.changeStatus("/Goods/upDownSale",data,this,1);
           }
       },
       handleCurrentChange(val){
            var data = {
                "page":val,
                "row":this.pageSize
            }
            productList.getProductList("/goods/topicSproductList",data,this)
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
