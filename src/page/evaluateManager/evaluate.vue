<style lang="less" scoped>
@import "../../less/config.less";
@import "../../less/evaluate.less";
.position_parent{
	position: relative;
	min-height:80px;
	.audited_position{
		position:absolute;
		top:15px;
		right:15px;
	}
}
.evaluate{
	background:#fff;
}
.text_overflow{
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;	
}
</style>
<template>
	<div class="evaluate">
		<big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
		<div class="common-top-title">评价管理</div>
		<div class="evaluate_warp">
			<div class="evaluate_warp_left">
				<el-tabs v-model="activeName" @tab-click="handleClick">
					<el-tab-pane v-for="item in typeOption" :key="item.value" :label="item.label+'('+item.count+')'" :name="item.value"></el-tab-pane>
		            <!--<el-tab-pane v-for="item in typeOption" :label="item.label" :name="item.value"></el-tab-pane>-->
		            <!--<el-tab-pane label="有评价内容" name="2"></el-tab-pane>
		            <el-tab-pane label="无评价内容" name="3"></el-tab-pane>
		            <el-tab-pane label="有追加评价内容" name="4"></el-tab-pane>
		            <el-tab-pane label="已举报的评价" name="5"></el-tab-pane>-->
		        </el-tabs>
			</div>
			<div class="evaluate_warp_right">
				<div class="width-120">
					<el-input size="small" v-model.trim="form.goods_id" placeholder="输入商品ID"></el-input>
				</div>
				<div class="search_contents">
					<el-button size="small" type="primary" @click="searchListData()">查询</el-button>
				</div>
			</div>
		</div>
		<div class="show_list_table_evaluate_warp">
			  <el-table
			    :data="tableData"
			    border
			    style="width: 100%">
			    <el-table-column
			      prop="goods_id"
			      label="商品ID"
			      width="80">
			    </el-table-column>
			    <el-table-column
			      prop="goods_name"
			      label="商品名称"
			      width="260">
			    </el-table-column>
			    <el-table-column
			      label="评分"
			      width="240">
			      <template slot-scope="scope">
			        <div class="score_warp">
						<span class="title">描述相符</span>
						<el-rate
						  v-model="scope.row.goods_rank"
						   class="detail"
						  disabled
						  show-score
						  text-color="#ff9900"
						  score-template="{value}">
						</el-rate>
					</div>
					<div class="score_warp">
						<span class="title">物流服务</span>
						<el-rate
						  v-model="scope.row.deliver_rank"
						   class="detail"
						  disabled
						  show-score
						  text-color="#ff9900"
						  score-template="{value}">
						</el-rate>
					</div>
					<div class="score_warp">
						<span class="title">服务质量</span>
						<el-rate
						  v-model="scope.row.service_rank"
						   class="detail"
						  disabled
						  show-score
						  text-color="#ff9900"
						  score-template="{value}">
						</el-rate>
					</div>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="商品评价">
				       <el-table-column
				      label="文字内容"
				      width="240">
				      <template slot-scope="scope">
				      	<div class="position_parent">
							<div class="text_overflow">{{scope.row.content}}</div>
							<el-button v-show="scope.row.btn.reply" type="text" @click="storeReply(scope.row.comment_id)">商家回复</el-button>
						</div>
				      </template>
				    </el-table-column>
				       <el-table-column
				      label="图片"
				      width="80">
				      <template slot-scope="scope">
				      	<div v-show="scope.row.img.length!=0">
					      	<div class="position_parent">
					      		<!--<img style="width:60px;height:60px;margin-right:10px;" :src="scope.row.img[0]" alt="" />-->
					      		<span>
			                        <img  @click="clickImg($event,scope.row.img)" style="width:60px;height:60px;" :src="scope.row.img[0]">
			                        <!-- 放大图片 -->
			                    </span>
							</div>
							<div style="text-align: center;">1/{{scope.row.img.length}}</div>
				      	</div>
				      </template>
			    	</el-table-column>
				       <el-table-column
				      label="商家回复"
				      width="240">
				      <template slot-scope="scope">
					      	<div class="position_parent">
					      		<div class="product_name" v-for="its in scope.row.list">
									<div v-if="its.comment_pid==scope.row.comment_id&&its.op_type=='2'">
										{{its.content}}
									</div>
								</div>
							</div>
				      </template>
				    </el-table-column>
			    </el-table-column>
			    <el-table-column
			      label="商品追评">
				       <el-table-column
				      label="文字内容"
				      width="240">
				      <template slot-scope="scope">
				      	<div class="position_parent">
				      		<div class="product_name" v-for="its in scope.row.list">
								<div v-if="its.op_type=='1'">
									{{its.content}}
								</div>
								<div class="items_btn" v-show="scope.row.list">
									<div v-if="its.op_type=='1'">
										<el-button v-show="its.btn.reply" type="text" @click="storeReply(its.comment_id)">商家回复</el-button>
									</div>
								</div>
							</div>
						</div>
				      </template>
				    </el-table-column>
				       <el-table-column
				      label="图片"
				      width="80">
				      <template slot-scope="scope">
				      	<div class="position_parent">
				      		<div class="product_name" v-for="its in scope.row.list" v-show="its.img.length!=0">
				      			<div>
				      				<img  @click="clickImg($event,its.img)" style="width:60px;height:60px;" :src="its.img[0]">
									<div style="text-align: center;">1/{{its.img.length}}</div>
				      			</div>
							</div>
						</div>
				      </template>
			    	</el-table-column>
				       <el-table-column
				      label="商家回复"
				      width="240">
				      <template slot-scope="scope">
					      	<div class="position_parent">
					      		<div class="product_name" v-for="(its,index) in scope.row.list">
									<div v-if="its.op_type=='2'&&its.comment_pid!=scope.row.comment_id">
										{{its.content}}
									</div>
								</div>
							</div>
				      </template>
				    </el-table-column>
			    </el-table-column>
			    <el-table-column
			      prop="is_show_name"
			      label="是否显示"
			      width="80">
			    </el-table-column>
			    <el-table-column
			      prop="audit_status_name"
			      label="商家举报"
			      width="80">
			    </el-table-column>
			    <el-table-column
			      label="操作"
			      width="130">
			      <template slot-scope="scope">
			        <div style="text-align:center;">
						<div class="items_btn" v-show="scope.row.btn.view_order">
							<el-button type="text" @click="searchOrder(scope.row.order_sn)">查看订单</el-button>
						</div>
						<div class="items_btn" v-show="scope.row.btn.report">
							<el-button type="text" @click="reportAds(scope.row.comment_id)">举报广告</el-button>
						</div>
						<!--<div class="items_btn" v-show="scope.row.btn.reply">
							<el-button type="text" @click="storeReply(scope.row.comment_id)">商家回复</el-button>
						</div>-->
					</div>
			      </template>
			    </el-table-column>
			  </el-table>
		</div>
		       <div class="pagination" v-show="tableData.length!=0">
		        <el-pagination
		          @current-change="handleCurrentChange"
		          :current-page="currentPage"
		          :page-size = 'pageSize'
		          layout="total, prev, pager, next, jumper"
		          :total='total'>
		        </el-pagination>
		      </div>
<el-dialog
	title="举报广告"
  :visible.sync="reportAdsDialog"
  width="420px">
  <div class="question">
  	<span class="title">您确定举报该评价为广告评价吗？</span>
  </div>
  <div class="report_detail">剩余举报次数：
  	<span class="report_margin">今日剩余{{dayCount}}次</span>
  	<span class="report_margin">本周剩余{{weekCount}}次</span>
  	<span class="report_margin">本月剩余{{monthCount}}次</span>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button size="small" @click="reportAdsDialog = false">取 消</el-button>
    <el-button size="small" type="primary" @click="reportAdsBtn()">确 定</el-button>
  </span>
</el-dialog>

<el-dialog
	title="商家回复"
  :visible.sync="reportReplyDialog"
  width="420px">
  <div class="store_reply">
	  	<el-input
	  type="textarea"
	  :maxlength=200
	  :rows="8"
	  placeholder="请输入回复内容"
	  v-model.trim="form.content">
	</el-input>
  </div>
  <span slot="footer" class="dialog-footer">
    <el-button size="small" @click="reportReplyDialog = false">取 消</el-button>
    <el-button size="small" type="primary" @click="reportReplyBtn()">确 定</el-button>
  </span>
</el-dialog>
	</div>
</template>

<script>
import Evaluate from '../../js/evaluate.js';
//import BigImg from '../../components/bigImg';
import BigImg from '../../components/swiper_big_img';
export default{
	data(){
		return {
			imgSrc:'',
         	showImg:false,
         	root_back:'',
			monthCount:0,
			dayCount:0,
			weekCount:0,
			storeReplyVal:'',
			reportAdsDialog:false,
			reportReplyDialog:false,
			score:2,
			count:'1',
			activeName:'1',
			form:{
				goods_id:'',
				type:'1',
				comment_id:'',
				content:''
			},
			currentPage:1,
			pageSize:10,
			total:0,
			tableData:[],
			typeOption:[],
		}
	},
	created(){
		this.fetch();
		Evaluate.searchConf("Comment/searchConf",this)
	},
   components: {
       BigImg
   },
	methods:{
        clickImg(e,data) {
            this.showImg = true;
            // 获取当前图片地址
//          this.imgSrc = e.currentTarget.src;
//			console.log(JSON.stringify(data))
            this.imgSrc = data;
        },
        viewImg(){
            this.showImg = false;
        },
		searchOrder(order_sn){
			this.$router.push({path:"/store/orderManager/orderDetail",query:{"order_sn":order_sn,"accout":"evaluate"}})
		},
		fetch(val,count){
			var data = {
				type:count?count:this.form.type,
				goods_id:this.form.goods_id,
				page:val?val:this.currentPage,
				rows:this.pageSize,
			}
			Evaluate.commentList("Comment/list",data,this);
		},
		handleClick(tab, event) {
	        this.count = tab.name;
	        this.fetch('',this.count);
		},
		handleCurrentChange(val){
			this.currentPage = val;
			this.fetch(val,this.count);
		},
		searchListData(){
			this.fetch();
		},
		reportAds(id){
			this.form.comment_id = id;
			Evaluate.getMonthReportCount("Comment/getMonthReportCount",this);
		},
		reportAdsBtn(){
			var data = {
				comment_id:this.form.comment_id
			}
			Evaluate.commentReport("Comment/report",data,this);
		},
		storeReply(id){
			this.form.content = '';
			this.reportReplyDialog = true;
			this.form.comment_id  = id;
		},
		reportReplyBtn(){
			var data = {
				comment_id:this.form.comment_id,
				content:this.form.content,
			}
			Evaluate.commentReply("Comment/reply",data,this);
		}
	}
}
</script>


<!--<img v-show="scope.row.audit_status==3" class="audited_position" src="../../img/evaluate/audited9.png" alt="" />
<img v-show="scope.row.audit_status==1" class="audited_position" src="../../img/evaluate/audited8.png" alt="" />-->



