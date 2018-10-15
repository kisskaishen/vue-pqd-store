
<style lang="less" scoped>
@import "../less/config.less";
@import "../less/left_menu.less";
a{
	text-decoration: none;
}
a:hover{
	text-decoration: none;
}
</style>
<template>
 <div class="left-menu">
     <div class="store_info">
        <div class="store_info_img">
            <img src="../img/login/store_logo.png" alt="">
        </div>
        <div class="store_info_warp">
            <dl>
                <dt><img :src="store_logo" alt=""></dt>
                <dd>欢迎您：{{store_name}}</dd>
            </dl>
            <div class="btn_warp">
                <div class="right_btn">
                    <span class="btn_margin_right">
                        <el-button class="go_out_btn" @click="goOut()" size="small" >退出登录</el-button>
                    </span>
                </div>
            </div>
        </div>
     </div>
     <div class="nav">
     	<ul class="nav_warp">
     		<li @click="handclick($event,index,item)" :class="current==index?'active nav_warp_li':'nav_warp_li'" v-for="(item,index) in tableData">
     			<router-link :to="item.path" v-show="item.path" class="index_a">
	     			<div class="text_warp">
	     				<div :class="'text_warp_left'+' '+'index_icon'+(index+1)">
	     					{{item.text}}
	     				</div>
	     				<div class="text_warp_right"></div>
	     			</div>
				</router-link>
	     			<div class="text_warp" v-show="!item.path">
	     				<div :class="'text_warp_left'+' '+'index_icon'+(index+1)">
	     					{{item.text}}
	     				</div>
	     				<div class="text_warp_right"></div>
	     			</div>
     			<ul class="children" v-show="currentChild && currentIndex==index && item.children">
					<router-link :to="its.path" v-for="(its,keys) in item.children" :key="keys">
     					<li @click="selectChild(index,$event,keys)" :class="currentchild==keys?'active children_li':'children_li'" :key_index="(index+1)+'-'+(keys+1)">
     							{{its.text}}
     					</li>
					</router-link>
     			</ul>
     		</li>
     	</ul>
     </div>
 </div>
</template>

<script>
	import Login from '../js/login.js'
 export default {
   data () {
     return {
     	key_index:'',
     	currentChild:false,
     	current:0,
     	currentchild:0,
     	currentIndex:0,
         openeds:[],
         navselected:'horizontal',
         store_name:'',
         store_logo:'',
         tableData:[
         	{
         		text:'首页',
         		path:'/store'
         	},
         	{
         		text:'订单管理',
         		path:'',
         		children:[
         			{
         				text:'订单列表',
         				path:'/store/orderManager/order'
         			},
         			{
         				text:'退货/售后列表',
         				path:'/store/orderManager/customerServiceList'
         			},
         			{
         				text:'批量发货',
         				path:'/store/orderManager/batchDelivery'
         			},
         			// {
         			// 	text:'运费模板',
         			// 	path:'/store/orderManager/freightFormwork'
         			// }
         		]
         	},
         	{
         		text:'商品管理',
         		path:'',
         		children:[
         			{
         				text:'发布新产品',
         				path:'/store/productManager/releaseNewProducts'
         			},
         			{
         				text:'产品列表',
         				path:'/store/productManager/productList'
         			},
         			{
         				text:'资源位列表',
         				path:'/store/productManager/shemeProductList'
         			}
         		]
         	},
         	{
         		text:'账户管理',
         		path:'',
         		children:[
         			{
         				text:'资金管理',
         				path:'/store/accountFund/revenueRecord'
         			},
         			{
         				text:'账户管理',
         				path:'/store/accountFund/accountManager'
         			}
         		]
         	},
         	{
         		text:'店铺管理',
         		path:'',
         		children:[
         			{
         				text:'商家信息',
         				path:'/store/storeManager/storeInfo'
         			},
         			{
         				text:'违规信息',
         				path:'/store/storeManager/IllegalInformation'
         			},
         			{
         				text:'密码安全',
         				path:'/store/storeManager/passwordSecurity'
         			}
         		]
         	},
         	{
         		text:'客服设置',
         		path:'',
         		children:[
         			{
         				text:'消息设置',
         				path:'/store/customerServiceSetting/messageSetting'
         			}
         		]
         	},
         	{
         		text:'营销管理',
         		path:'',
         		children:[
         			{
         				text:'营销活动',
         				path:'/home/marketing/marketing_active'
         			},
         			{
         				text:'资源位活动',
         				path:'/home/marketing/resource_activity'
         			},
         			// {
         			// 	text:'趣多多赚',
         			// 	path:'/home/marketing/make_fun'
         			// }
         		]
         	},
         	{
         		text:'优惠券管理',
         		path:'',
         		children:[
         			{
         				text:'店铺优惠券',
         				path:'/store/productManager/shopCoupons'
         			},
         			{
         				text:'优惠券统计',
         				path:'/store/productManager/couponStatistics'
         			}
         		]
         	},
         	{
         		text:'第三方工具',
         		path:'',
         		children:[
         			{
         				text:'第三方工具',
         				path:'/store/storeManager/thirdPartyTools'
         			}
         		]
         	},
         	{
         		text:'评价管理',
         		path:'',
         		children:[
         			{
         				text:'评价管理',
         				path:'/store/evaluateManager/evaluate'
         			}
         		]
         	}
         ],
         num:1,
     }
   },
   created(){
   		var that = this;
	   	eventBus.$on('setStoreLogo', function(msg){
	   		that.store_logo = localStorage.getItem("store_logo");
		})
       this.navselected = this.nextRouteArr;
       this.store_name = localStorage.getItem("storeName");
       this.store_logo = localStorage.getItem("store_logo");

		var rout = this.$route.name;
//		console.log(rout)
	    if (rout =='index'){
			this.currentChild = true;
	     	this.current = 0;
	     	this.currentIndex = 0;
	    } else if (rout == 'orderList'||rout == 'orderDetail'){
			this.currentChild = true;
	     	this.current = 1;
	     	this.currentIndex = 1;
	    } else if (rout == 'customerServiceList'||rout == 'customerServiceDetail') {
			this.currentChild = true;
	     	this.current = 1;
	     	this.currentIndex = 1;
	    }  else if (rout == 'batchDelivery') {
			this.currentChild = true;
	     	this.current = 1;
	     	this.currentIndex = 1;
	    } else if (rout == 'releaseNewProducts') {
			this.currentChild = true;
	     	this.current = 2;
	     	this.currentIndex = 2;
	    } else if (rout == 'productList') {
			this.currentChild = true;
	     	this.current = 2;
	     	this.currentIndex = 2;
	    }else if (rout == 'shemeProductList') {
			this.currentChild = true;
	     	this.current = 2;
	     	this.currentIndex = 2;
	    } else if (rout == 'revenueRecord'||rout == 'recharge'||rout == 'wx_pay') {
			this.currentChild = true;
	     	this.current = 3;
	     	this.currentIndex = 3;
	    } else if (rout == 'accountManager') {
			this.currentChild = true;
	     	this.current = 3;
	     	this.currentIndex = 3;
	    } else if (rout == 'storeInfo') {
			this.currentChild = true;
	     	this.current = 4;
	     	this.currentIndex = 4;
	    } else if (rout == 'IllegalInformation') {
			this.currentChild = true;
	     	this.current = 4;
	     	this.currentIndex = 4;
	    } else if (rout == 'passwordSecurity') {
			this.currentChild = true;
	     	this.current = 4;
	     	this.currentIndex = 4;
	    }else if (rout == 'messageSetting') {
	    	this.currentChild = true;
	     	this.current = 5;
	     	this.currentIndex = 5;
	    }else if (rout == 'marketing_active'||rout == 'marketing_detail'||rout == 'marketing_goods') {
			this.currentChild = true;
	     	this.current = 6;
	     	this.currentIndex = 6;
	    }  else if (rout == 'resource_activity'||rout == 'resource_activity_detail'||rout == 'resource_activity_goods') {
			this.currentChild = true;
	     	this.current = 6;
	     	this.currentIndex = 6;
	    } else if (rout == 'shopCoupons'||rout == 'couponListDetail') {
			this.currentChild = true;
	     	this.current = 7;
	     	this.currentIndex = 7;
	    } else if (rout == 'couponStatistics') {
			this.currentChild = true;
	     	this.current = 7;
	     	this.currentIndex = 7;
	    }else if (rout == 'thirdPartyTools') {
			this.currentChild = true;
	     	this.current = 8;
	     	this.currentIndex = 8;
	    }else if (rout == 'evaluate') {
			this.currentChild = true;
	     	this.current = 9;
	     	this.currentIndex = 9;
	    }
   },
   components: {

   },
    methods: {
    	selectChild(index,e,keys){
//			var params = this.$route.path;
//			var key = e.target.getAttribute("key_index");
    		this.current = index;
    		this.currentchild = keys;
    	},
    	handclick(e,index,data){
    		if(!data.children){
    			this.current = index;
    		}else{
	    		var target = e.target.nodeName;
	    		if(target.toLowerCase()=='div'){
	    			if(this.currentIndex==index){
	    				this.currentChild = !this.currentChild;
	    				this.currentIndex = index;
	    			}else{
		    			this.currentChild = true;
		    			this.currentIndex = index;
	    			}
	    		}
    		}
    	},
	    goOut(){
	        Login.logout("passport/logout",this);
	    },
		handleOpen(key, keyPath) {
		},
		handleClose(key, keyPath) {
		},
		handleselect(key, keyPath){
			var params = this.$route.path;
			console.log(params)
			var arrIndex = ['1','2-1','2-2','3-1','3-2','3-3','4-1','4-2','5-1','5-2','5-3','6-1','8-1','9-1','9-2','10-1','11-1'];
			var arrRouter = ["index","orderList","customerServiceList",
			"releaseNewProducts","productList","shemeProductList","revenueRecord","accountManager",
			"storeInfo","IllegalInformation","passwordSecurity",
			"messageSetting","marketing_active","shopCoupons","couponStatistics","thirdPartyTools","evaluate"];
			var keys = arrIndex.indexOf(key);
			var str = arrRouter[keys];
			eventBus.$emit(str, 1)
		}
    }
 }
</script>
<!--<li class="nav_warp_li">
     			<div class="text_warp">
     				<div class="text_warp_left index_icon2">
     					订单管理
     				</div>
     				<div class="text_warp_right"></div>
     			</div>
     		</li>
     		<li class="nav_warp_li">
     			<div class="text_warp">
     				<div class="text_warp_left index_icon3">
     					商品管理
     				</div>
     				<div class="text_warp_right"></div>
     			</div>
     		</li>
     		<li class="nav_warp_li">
     			<div class="text_warp">
     				<div class="text_warp_left index_icon4">
     					账户管理
     				</div>
     				<div class="text_warp_right"></div>
     			</div>
     		</li>
     		<li class="nav_warp_li">
     			<div class="text_warp">
     				<div class="text_warp_left index_icon5">
     					店铺管理
     				</div>
     				<div class="text_warp_right"></div>
     			</div>
     		</li>
     		<li class="nav_warp_li">
     			<div class="text_warp">
     				<div class="text_warp_left index_icon6">
     					客服设置
     				</div>
     				<div class="text_warp_right"></div>
     			</div>
     		</li>
     		<li class="nav_warp_li">
     			<div class="text_warp">
     				<div class="text_warp_left index_icon7">
     					营销管理
     				</div>
     				<div class="text_warp_right"></div>
     			</div>
     		</li>
     		<li class="nav_warp_li">
     			<div class="text_warp">
     				<div class="text_warp_left index_icon8">
     					优惠券管理
     				</div>
     				<div class="text_warp_right"></div>
     			</div>
     		</li>
     		<li class="nav_warp_li">
     			<div class="text_warp">
     				<div class="text_warp_left index_icon9">
     					第三方工具
     				</div>
     				<div class="text_warp_right"></div>
     			</div>
     		</li>
     		<li class="nav_warp_li">
     			<div class="text_warp">
     				<div class="text_warp_left index_icon10">
     					评价管理
     				</div>
     				<div class="text_warp_right"></div>
     			</div>
     		</li>-->
<!--<el-row>
            <el-col :span="24">
            <el-menu
            :default-openeds ='openeds'
            :default-active="navselected"
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            @select="handleselect"
            :unique-opened=true
            background-color="#fff"
            text-color="#000"
            active-text-color="#ffd04b">
            <router-link to="/store">
            <el-menu-item index="1">
            	<template slot="title">
	                <i class="common_icon index_icon"></i>
	                <span slot="title">
	            		<span class="self_child">
	            			<span class="self_child_text self_child_text1">首页 </span>
	            		</span>
	                </span>
                </template>
            </el-menu-item>
            </router-link>
            <el-submenu index="2">
                <template slot="title">
                	<i class="common_icon order_icon"></i>
	                <span slot="title">
                		<span class="self_child">
                			<span class="self_child_text self_child_text2">订单管理</span>
                		</span>
	                </span>
                </template>
                <el-menu-item-group>
	                <router-link to="/store/orderManager/order">
	                	<el-menu-item index="2-1">
	                		<div class="text">
	                			<span class="text_margin">
	                				订单列表
	                			</span>
	                		</div>
	                	</el-menu-item>
	                </router-link>
	                <router-link to="/store/orderManager/customerServiceList">
		            	<el-menu-item index="2-2">
		                	<div class="text">
		                			<span class="text_margin">
		                				退货/售后列表
		                			</span></div>
		                </el-menu-item>
	                </router-link>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="3">
                <template slot="title">
                <i class="common_icon goods_icon"></i>
	                <span slot="title">
                		<span class="self_child">
                			<span class="self_child_text self_child_text3">商品管理</span>
                		</span>
	                </span>
                </template>
                <el-menu-item-group>
                <router-link to="/store/productManager/releaseNewProducts">
            		<el-menu-item index="3-1">
                		<div class="text">
                			<span class="text_margin">
                				发布新产品
                			</span>
                		</div>
                	</el-menu-item>
                </router-link>
                <router-link to="/store/productManager/productList">
            		<el-menu-item index="3-2">
                		<div class="text">
                			<span class="text_margin">
                				产品列表
                			</span>
                		</div></el-menu-item>
                </router-link>
                <router-link to="/store/productManager/shemeProductList">
            		<el-menu-item index="3-3">
                		<div class="text">
                			<span class="text_margin">
                				资源位列表
                			</span>
                		</div></el-menu-item>
                </router-link>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="4">
                <template slot="title">
                <i class="common_icon account_icon"></i>
	                <span slot="title">
                		<span class="self_child">
                			<span class="self_child_text self_child_text4">账号管理</span>
                		</span>
	                </span>
                </template>
                <el-menu-item-group>
                <router-link to="/store/accountFund/revenueRecord">
            			<el-menu-item index="4-1">
	                		<div class="text">
	                			<span class="text_margin">
	                				资金管理
	                			</span>
	                		</div>
                	</el-menu-item>
                </router-link>
                <router-link to="/store/accountFund/accountManager">
	                	<el-menu-item index="4-2">
	                		<div class="text">
	                			<span class="text_margin">
	                				账户管理
	                			</span>
	                		</div>
	                	</el-menu-item>
                	</router-link>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="5">
                <template slot="title">
                <i class="common_icon store_icon"></i>
	                <span slot="title">
                		<span class="self_child">
                			<span class="self_child_text self_child_text5">店铺管理</span>
                		</span>
	                </span>
                </template>
                <el-menu-item-group>
                <router-link to="/store/storeManager/storeInfo">
            		<el-menu-item index="5-1">
                		<div class="text">
                			<span class="text_margin">
                				商家信息
                			</span>
                		</div>
            		</el-menu-item>
               	</router-link>
                <router-link to="/store/storeManager/IllegalInformation">
            		<el-menu-item index="5-2">
                		<div class="text">
                			<span class="text_margin">
                				违规信息
                			</span>
                		</div>
            		</el-menu-item>
                		</router-link>
                <router-link to="/store/storeManager/passwordSecurity">
	            		<el-menu-item index="5-3">
	                		<div class="text">
	                			<span class="text_margin">
	                				密码安全
	                			</span>
	                		</div>
	            		</el-menu-item>
                	</router-link>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="6">
                <template slot="title">
                <i class="common_icon message_icon"></i>
	                <span slot="title">
                		<span class="self_child">
                			<span class="self_child_text self_child_text6">客服设置</span>
                		</span>
	                </span>
                </template>
                <el-menu-item-group>
                <router-link to="/store/customerServiceSetting/messageSetting">
            		<el-menu-item index="6-1">
                		<div class="text">
                			<span class="text_margin">
                				消息设置
                			</span>
                		</div>
                	</el-menu-item>
                </router-link>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="8">
                <template slot="title">
                <i class="common_icon marketing_icon"></i>
	                <span slot="title">
                		<span class="self_child">
                			<span class="self_child_text self_child_text7">营销管理</span>
                		</span>
	                </span>
                </template>
                <el-menu-item-group>
                <router-link to="/home/marketing/marketing_active">
                	<el-menu-item index="8-1">
                		<div class="text">
                			<span class="text_margin">
                				营销活动
                			</span>
                		</div>
                	</el-menu-item>
                </router-link>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="9">
                <template slot="title">
                <i class="common_icon marketing_icon"></i>
	                <span slot="title">
                		<span class="self_child">
                			<span class="self_child_text self_child_text8">优惠券管理</span>
                		</span>
	                </span>
                </template>
                <el-menu-item-group>
                   <router-link to="/store/productManager/shopCoupons">
        				<el-menu-item index="9-1">
	                		<div class="text">
	                			<span class="text_margin">
	                				店铺优惠券
	                			</span>
	                		</div>
        				</el-menu-item>
                   </router-link>
                   <router-link to="/store/productManager/couponStatistics">
        				<el-menu-item index="9-2">
	                		<div class="text">
	                			<span class="text_margin">
	                				优惠券统计
	                			</span>
	                		</div>
                		</el-menu-item>
                   </router-link>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="10">
                <template slot="title">
                <i class="common_icon marketing_icon"></i>
	                <span slot="title">
                		<span class="self_child">
                			<span class="self_child_text self_child_text8">第三方工具</span>
                		</span>
	                </span>
                </template>
                <el-menu-item-group>
                      <router-link to="/store/storeManager/thirdPartyTools">
	                      	<el-menu-item index="10-1">
			                		<div class="text">
			                			<span class="text_margin">
			                				第三方工具
			                			</span>
			                		</div>
			                </el-menu-item>
                      </router-link>
                </el-menu-item-group>
            </el-submenu>
            <el-submenu index="11">
                <template slot="title">
                <i class="common_icon marketing_icon"></i>
	                <span slot="title">
                		<span class="self_child">
                			<span class="self_child_text self_child_text8">评价管理</span>
                		</span>
	                </span>
                </template>
                <el-menu-item-group>
                      <router-link to="/store/evaluateManager/evaluate">
	                      	<el-menu-item index="11-1">
			                		<div class="text">
			                			<span class="text_margin">
			                				评价管理
			                			</span>
			                		</div>
			                </el-menu-item>
                      </router-link>
                </el-menu-item-group>
            </el-submenu>
            </el-menu>
        </el-col>
        </el-row>-->
