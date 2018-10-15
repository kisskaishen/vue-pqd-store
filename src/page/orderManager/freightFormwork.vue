<style lang="less" scoped>
@import "../../less/config.less";
.created_freight{
	.main{
		padding:20px;
		background:#fff;
		.explain{
			padding:12px 40px;
			background:#F9F9F9;
			color:#666;
			font-size:14px;
			position: relative;
		}
		.explain:before{
			display: block;
			content:'';
			position:absolute;
			left:15px;
			top:13px;
			width:18px;
			height:18px;
            background:url(../../img/freight/tips.jpg) no-repeat;
            background-size:contain;
		}
	}
}
</style>
<template>
	<div class="created_freight">
     	<div class="common-top-title">
     		模板基础消息
     		<el-button class="common_top_right_btn" size="small" type="danger" @click="editFeight()">新建运费模板</el-button>
     	</div>
     	<div class="main">
	     	<div class="explain">
	     		<div class="explain_test">
	     			默认模板由系统根据现有商品的信息自动生成，可以修改，未被使用的模板可以删除
	     		</div>
	     	</div>
	        <el-table
	            :data="tableData"
	            border
	            style="width: 100%;margin-top:20px;">       
			    <el-table-column
	                prop="id"
	                label="ID"
			      width="50">
			    </el-table-column>           
	            <el-table-column
	                prop="name"
	                label="模板名称"
	                width="180">
	            </el-table-column>
	            <el-table-column
	                prop="type"
	                label="计费方式"
	                width="180">
	            </el-table-column>
	            <el-table-column
	                prop="updated_at"
	                label="最后编辑时间">
	            </el-table-column>
	                <el-table-column
	                label="操作">
	                <template slot-scope="scope">   
	                        <el-button type="primary" size="small" @click="copyFreight(scope.row)">复制</el-button>
	                        <el-button type="primary" size="small" @click="editFeight(scope.row)">编辑</el-button>
	                        <el-button type="danger" size="small" @click="deleteFeight(scope.row)">删除</el-button>
	                        <el-button type="danger" size="small" @click="usageFeight(scope.row)">使用情况</el-button>
	                </template>
	                </el-table-column>
	        </el-table>
	        <div class="pagination" v-show="total!=0">
	            <el-pagination
	                @current-change="handleSizeChange"
	                :current-page="currentPage"
	                :page-size='pageSize'
	                layout="total, prev, pager, next, jumper"
	                :total='total'>
	            </el-pagination>
	        </div>
     	</div>
	</div>
</template>

<script>
import Feight from "../../js/feight";
export default{
	data(){
		return {
			tableData:[],
			total:0,
			currentPage:1,
			pageSize:10,
		}
	},
	created(){
		this.fetch();
	},
	methods:{
		fetch(val){
			var data = {
				page:val?val:this.currentPage,
				pageSize:this.pageSize,
			}
			Feight.getUserRegister("Logistics/logisticsTemplateList",data,this);
		},
		copyFreight(params){
			
		},
		editFeight(params){
			if(params){
				this.$router.push({path:"/store/orderManager/created_freight",query:{id:params.id}})
			}else{
				this.$router.push({path:"/store/orderManager/created_freight"})
			}
		},
		deleteFeight(params){
			var data = {
				id:params.id
			}
	        this.$confirm('此操作将删除该模板, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
				Feight.delLogisticsTemplate("Logistics/delLogisticsTemplate",data,this);
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消'
	          });          
	        });
		},
		usageFeight(params){
			
		},
		handleSizeChange(val){
			this.fetch(val);
		}
	}
}
</script>