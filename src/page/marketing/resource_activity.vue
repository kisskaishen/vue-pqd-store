<style lang="less" scoped>
@import "../../less/config.less";
@import "../../less/marketing.less";
</style>
<template>
 <div class="marketing">
     <div class="common-top-title">营销活动</div>
     <div class="marketing_main">    
         <div class="tab_common">
              <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="已报名" name="2">
                    <div class="marketing_content">
                        <ul>
                            <li v-for="item in tableData">
                                <div class="warp">
                                    <div class="title">《&nbsp;{{item.activity_name}}&nbsp;》</div> 
                                    <div class="active_time">活动时间：{{item.start_view_time}}</div>
                                    <div class="sign_time">报名时间：{{item.enter_view_time}}</div>
                                    <div class="active_detail">活动详情：<div v-html="item.details"></div><el-button type="text" @click="entryDetail(item)">详情</el-button></div>
                                    <div class="sign_btn"><el-button size="small" type="danger">已报名</el-button> 
                                    <span v-show="item.enter_long_time!='1'">剩余：<count-down :endTime="item.enter_end_time" :callback="callback" endText="已经结束了"></count-down></span>
                                    </div>
                                </div>
                            </li>
                        </ul> 
                        <div v-show="tableData.length==0" class="empty">暂无数据</div>    
                    </div> 
                </el-tab-pane>
                <el-tab-pane label="可报名" name="1">
                    <div class="marketing_content">
                        <ul>
                            <li v-for="item in tableData">
                                <div class="warp">
                                    <div class="title">《&nbsp;{{item.activity_name}}&nbsp;》</div> 
                                    <div class="active_time">活动时间：{{item.start_view_time}}</div>
                                    <div class="sign_time">报名时间：{{item.enter_view_time}}</div>
                                    <div class="active_detail">活动详情：<div v-html="item.details"></div><el-button type="text" @click="entryDetail(item,'unabled')">详情</el-button></div>
                                    <div class="sign_btn"><el-button @click="signUp(item)" size="small" type="danger" >立刻报名</el-button>
                                     <span v-show="item.enter_long_time!='1'">剩余：<count-down :endTime="item.enter_end_time" :callback="callback" endText="已经结束了"></count-down></span></div>
                                </div>
                            </li>
                        </ul>     
                        <div v-show="tableData.length==0" class="empty">暂无数据</div>  
                    </div> 
                </el-tab-pane>
                <el-tab-pane label="不可报名" name="3">                    
                    <div class="marketing_content">
                        <ul>
                            <li v-for="item in tableData">
                                <div class="warp">
                                    <div class="title">《&nbsp;{{item.activity_name}}&nbsp;》</div> 
                                    <div class="active_time">活动时间：{{item.start_view_time}}</div>
                                    <div class="sign_time">报名时间：{{item.enter_view_time}}</div>
                                    <div class="active_detail">活动详情：<div v-html="item.details"></div><el-button type="text" @click="entryDetail(item,'unabled')">详情</el-button></div>
                                    <div class="sign_btn"><el-button size="small" type="danger" >不可报名</el-button>
                                     <span v-show="item.enter_long_time!='1'">剩余：<count-down :endTime="item.enter_end_time" :callback="callback" endText="已经结束了"></count-down></span></div>
                                </div>
                            </li>
                        </ul>  
                        <div v-show="tableData.length==0" class="empty">暂无数据</div>     
                    </div> 
                </el-tab-pane>
            </el-tabs> 
         </div>
        <div class="pagination">
            <el-pagination
                @current-change="handleCurrentChange"
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
import resource_activity from '../../js/resource_activity';
import countDown from '../../components/countDowm';
 export default {
   data () {
     return {
        tableData: [],
         activeNameDetail:'first',
         activeName:'2',
         currentPage:1,
         pageSize:10,
         total:0,
         itemData:[],
         times:'5'
     }
   },
   created(){
	   	this.fetch();
	   	var that = this;
	   	eventBus.$on('marketing_active', function(id){
		    that.fetch();
		})
   },
   components: {
        countDown
   },
   methods:{
   	fetch(val){
       var data = {
           page:this.currentPage,
           rows:this.pageSize,
           enter_type:val?val:this.activeName,
           activity_type:3
       }
        resource_activity.storeMarketingActiveList("Activities/getActiveList",data,this)
   	},
       signUp(params){
            this.$router.push({'path':'/home/marketing/resource_activity_goods',query:{activity_id:params.activity_id,action:params.action}})
       },
       callback(val){
       },       
       entryDetail(params,aa){
           this.$router.push({'path':'/home/marketing/resource_activity_detail',query:{activity_id:params.activity_id,action:params.action,type:aa}})
       },
      handleClick(tab, event) {
        var names = tab.name;
       	this.fetch(names)
      },
       handleCurrentChange(){

       },
   }
 }
</script>
