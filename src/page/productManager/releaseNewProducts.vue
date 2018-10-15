<template>
 <div class="releaseNewProducts">
     <div class="top">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="编辑中" name="1"></el-tab-pane>
            <el-tab-pane label="待发布" name="2"></el-tab-pane>
            <el-tab-pane label="发布成功" name="3"></el-tab-pane>
            <el-tab-pane label="已驳回" name="4"></el-tab-pane>
        </el-tabs>
        <div class="new-product">
            <el-button type="danger" size="small" @click="releaseProduct()">发布新产品</el-button>
        </div>
     </div>
     <div class="main">
         <div v-show="first">
            <el-table
                :data="itemData1"
                border
                style="width: 100%">
                <el-table-column
                    prop="goods_id"
                    label="商品ID"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="goods_name"
                    label="商品名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态">
                </el-table-column>
                    <el-table-column
                        prop="addtime"
                        label="创建时间">
                    </el-table-column>
                    <el-table-column
                        prop="edittime"
                        label="编辑时间">
                    </el-table-column>
                    <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                            <el-button type="primary" size="small" @click="returnUrl(scope.row.goods_id)">编辑</el-button>
                            <el-button type="danger" size="small" @click="deleteRow(scope.row.goods_id,scope.$index)">删除</el-button>
                    </template>
                    </el-table-column>
            </el-table>
         </div>
         <div v-show="second">
            <el-table
                :data="itemData2"
                border
                style="width: 100%">
                <el-table-column
                    prop="goods_id"
                    label="商品ID"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="goods_name"
                    label="商品名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态">
                </el-table-column>
                    <el-table-column
                        prop="edittime"
                        label="提交时间">
                    </el-table-column>
                    <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                            <!-- <el-button type="primary" @click="returnUrl(scope.row.goods_id)">编辑</el-button> -->
                            <el-button type="danger" size="small" @click="withdrawRow(scope.row,scope.$index)">撤回</el-button>
                    </template>
                    </el-table-column>
            </el-table>
         </div>
         <div v-show="thirty">
            <el-table
                :data="itemData3"
                border
                style="width: 100%">
                <el-table-column
                    prop="goods_id"
                    label="商品ID"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="goods_name"
                    label="商品名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态">
                </el-table-column>
            </el-table>
         </div>
         <div v-show="fifty">
            <el-table
                :data="itemData4"
                border
                style="width: 100%">
                <el-table-column
                    prop="goods_id"
                    label="商品ID"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="goods_name"
                    label="商品名称"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="状态">
                </el-table-column>
                <el-table-column
                    prop="reason"
                    label="驳回原因">
                </el-table-column>
                    <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                            <el-button type="primary" size="small" @click="returnUrl(scope.row.goods_id)">编辑</el-button>
                            <el-button type="danger" size="small" @click="deleteRow(scope.row.goods_id,scope.$index)">删除</el-button>
                    </template>
                    </el-table-column>
            </el-table>
         </div>
        <div class="pagination" v-show="total!=0">
            <el-pagination
                @current-change="handleSizeChange"
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
import releaseNewProducts from "../../js/releaseNewProducts";
 export default {
   data () {
     return {
          activeName: '1',
          itemData1: [],
          itemData2: [],
          itemData3: [],
          itemData4: [],
          currentPage4:1,
          total:0,
          pageSize:10,
          first:true,
          second:false,
          thirty:false,
          fifty:false,
          count:1,
     }
   },
   created(){
	   	this.fetch();
	   	var that = this;
	   	eventBus.$on('releaseNewProducts', function(id){
		    that.fetch();
		})
   },
   components: {

   },
   methods:{
   	fetch(){
       var data = {
           'page':1,
           'listType':1
       }
       releaseNewProducts.getReleaseNewProducts("/goods/index",data,this,'1');
   	},
       withdrawRow(val,index){
           var count = parseInt(this.currentPage4-1)*15+index;
           var data = {
               goods_id:val.goods_id
           }
           releaseNewProducts.recallGoods("/Goods/recallGoods",data,this,count);
       },
       deleteRow(val,index){
           var count = parseInt(this.currentPage4-1)*this.pageSize+index;
           var data = {
               goods_id:val,
               action:'editRelease'
           }
           releaseNewProducts.deleteOrderman("/Goods/delGoods",data,this,count);
       },
       returnUrl(val){
           this.$router.push("/store/productManager/releaseNewProductEdit?goods_id="+val);
       },
       releaseProduct(){
           this.$router.push("/store/productManager/releaseNewProductEdit?type=newProduct&&orderid=");
        //    releaseNewProducts.addNewProducts("/goods/add",this);
       },
       handleClick(tab, event) {
        var that = this;
        this.count = tab.name;
        var data = {
        //    'page':1,
           'listType':this.count
       }
       releaseNewProducts.getReleaseNewProducts("/goods/index",data,this,this.count);
        if(this.count == 1){
            that.first = true;
            that.second = false;
            that.thirty=false,
            that.fifty=false
        }else if(this.count == 2){
            that.first = false;
            that.second = true;
            that.thirty=false,
            that.fifty=false
        }else if(this.count == 3){
            that.first = false;
            that.second = false;
            that.thirty=true,
            that.fifty=false
        }else if(this.count == 4){
            that.first = false;
            that.second = false;
            that.thirty=false,
            that.fifty=true
        }
      },
      handleSizeChange(val){
          this.currentPage4 = val;
            var data = {
                page:val,
                listType:this.count
            }
        releaseNewProducts.getReleaseNewProducts("/goods/index",data,this,this.count);
      },
   }
 }
</script>

<style lang="less" scoped>
@import "../../less/config.less";
.strong{
    font-size:30px;
}
.releaseNewProducts{
    background:@backgroundfff;
    .top{
        position: relative;
        padding:20px;
        .new-product{
            position: absolute;
            right:20px;
            top:20px;
        }
    }
    .main{
        padding:20px;
    }
}

</style>
