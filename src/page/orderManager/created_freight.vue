
<template>
	<div class="freightFormwork" id="freightFormwork">
     	<div class="common-top-title">
     		模板基础消息
  			<!--<el-button class="common_top_right_btn" size="small" type="danger" @click="editFeight()">新建运费模板</el-button>-->
     	</div>
     	<div class="main">
     		<div class="search_warp">
		     	<div class="search">
		     		<div class="search_left">
		     			<div class="item">模板名称</div>
		     			<div class="item text_num">
		     				<el-input style="width:340px" :maxlength="50" size="small" v-model.trim="tableDataObj.costTemplateName" placeholder="这里输入模板名称哦"></el-input>
		     			</div>
		     			<div class="item ">0/50</div>
		     		</div>
		     		<div class="search_right">
		     			<div class="item">是否包邮</div>
		     			<div class="item" @click="setFreeShipping($event)">
		     				<div :class="dispatchFreeSelf.areaList.length==31?'itmetab active':'itmetab'" ids="0">全国包邮</div>
		     				<div :class="dispatchFreeSelf.areaList.length!=31?'itmetab active':'itmetab'" ids="1">自定义</div>
		     			</div>
		     		</div>
		     	</div>
     		</div>
	     	<div class="common-top-title">
	     		商家配送包邮区域
	     	</div>
	     	<div class="get_region">
		         <div class="tits" style="overflow: hidden;">
		           <span class="category">配送地区(包邮)：</span>
		           <div class="right">
		              <div class="warp">
		                  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
		                  <el-checkbox :indeterminate="isIndeterminateReverse" v-model="checkReverse" @change="handleCheckReverseChange">反选</el-checkbox>
		                  <span class="default-address" @click="defaultAddress()" style='cursor: pointer;'>常用地址</span>
		                  <div style="margin: 15px 0;"></div>
		                  <el-checkbox-group v-model="dispatchFreeSelf.areaList">
		                      <el-checkbox @change="handleCheckedCitiesChange(city.val,index,dispatchFreeSelf.areaList)" v-for="(city,index) in cities" :label="city.val" :key="city.val" :disabled="city.disabled">{{city.infos}}</el-checkbox>
		                  </el-checkbox-group>
		                  <div class="sum">已选择{{dispatchFreeSelf.areaList.length}}个配送地区</div>
		              </div>
		           </div>
		         </div>
	     		<!--<div class="get_region_warp">
	     			<div v-for="(item,index) in cities" class="get_region_warp_item">
	     				{{item.infos}}
	     			</div>
	     		</div>
	     		<div class="operator_btn">
	     			<div class="text_explain">已选择0个配送地区</div>
	     			<div class="operator_btn_warp">
	     				<div class="item">全选</div>
	     				<div class="item">反选</div>
	     				<div class="item hover_item">常用地址</div>
	     			</div>
	     		</div>-->
	     	</div>
	     	<div class="common-top-title">
	     		需要买家付邮费区域
	     	</div>
	     	<div class="set_cash">
	     		<div class="set_cash_warp">
					<div class="set_cash_warp_title">
						<div class="left">
							<div class="its">计费方式</div>
							<div class="its">
								<el-radio-group v-model="tableDataObj.costType" size="small">
								    <el-radio  :disabled="isDisabled" :label="0">按件数计费</el-radio>
	  								<el-radio  :disabled="isDisabled" :label="1">按重量计费</el-radio>
  								</el-radio-group>
							</div>
						</div>
						<div class="right">
							<el-button size="small" @click="addModule()">+添加可配送区域和运费</el-button>
							<!--<el-button size="small">删除此模板</el-button>-->
						</div>
					</div>
					<div class="set_cash_warp_content" v-for="(child,index) in dispatchCost">
						<div class="distribution_area">
							<div class="text">配送区域:
								<el-button size="small" class="delete" @click="deleteModule(dispatchCost,index)">删除此模板</el-button>
							</div>
							<div class="distribution_area_item">
								<!--<div class="item" v-for="its in child.areaList">{{its}}</div>-->
				                  <el-checkbox-group v-model="child.areaList">
				                     <el-checkbox @change="handleChange(city.val,index,child.areaList)" v-for="city in child.areaListJson" :disabled="city.disabled" :label="city.val" :key="city.val">{{city.infos}}</el-checkbox>
				                  </el-checkbox-group>
							</div>
						</div>
						<div class="distribution_area">
							<div class="text">配送运费:</div>
							<div class="freight_Delivery" v-show="tableDataObj.costType==0">
								<div class="params_input">
									<div class="text_input">首件:</div>
									<div class="text_input">
										<!--<el-input size="small" v-model.trim="child.firstStandard" placeholder=""></el-input>-->
										<input type="text" class="self_input_valiate"  maxlength="11" v-model.trim="child.firstStandard" onkeyup="this.value=this.value.toString().match(/^\d+(?:\.\d{0,2})?/)"/>
									</div>
									<div class="text_input">件</div>
								</div>
								<div class="params_input">
									<div class="text_input">首费:</div>
									<div class="text_input">
										<!--<el-input size="small" v-model.trim="child.firstCost" placeholder=""></el-input>-->
										<input type="text" class="self_input_valiate"  maxlength="11" v-model.trim="child.firstCost" onkeyup="this.value=this.value.toString().match(/^\d+(?:\.\d{0,2})?/)"/>
									</div>
									<div class="text_input">元</div>
								</div>
								<div class="params_input">
									<div class="text_input">续件:</div>
									<div class="text_input">
										<!--<el-input size="small" v-model.trim="child.addStandard" placeholder=""></el-input>-->
										<input type="text" class="self_input_valiate"  maxlength="11" v-model.trim="child.addStandard" onkeyup="this.value=this.value.toString().match(/^\d+(?:\.\d{0,2})?/)"/>
									</div>
									<div class="text_input">件</div>
								</div>
								<div class="params_input">
									<div class="text_input">续费:</div>
									<div class="text_input">
										<!--<el-input size="small" v-model.trim="child.addCost" placeholder=""></el-input>-->
										<input type="text" class="self_input_valiate"  maxlength="11" v-model.trim="child.addCost" onkeyup="this.value=this.value.toString().match(/^\d+(?:\.\d{0,2})?/)"/>
									</div>
									<div class="text_input">元</div>
								</div>
							</div>
							<div class="freight_Delivery" v-show="tableDataObj.costType==1">
								<div class="params_input">
									<div class="text_input">首重:</div>
									<div class="text_input">
										<!--<el-input size="small" v-model.trim="child.firstStandard" placeholder=""></el-input>-->
										<input type="text" class="self_input_valiate"  maxlength="11" v-model.trim="child.firstStandard" onkeyup="this.value=this.value.toString().match(/^\d+(?:\.\d{0,2})?/)"/>
									</div>
									<div class="text_input">件</div>
								</div>
								<div class="params_input">
									<div class="text_input">首费:</div>
									<div class="text_input">
										<!--<el-input size="small" v-model.trim="child.firstCost" placeholder=""></el-input>-->
										<input type="text" class="self_input_valiate"  maxlength="11" v-model.trim="child.firstCost" onkeyup="this.value=this.value.toString().match(/^\d+(?:\.\d{0,2})?/)"/>
									</div>
									<div class="text_input">件</div>
								</div>
								<div class="params_input">
									<div class="text_input">续重:</div>
									<div class="text_input">
										<!--<el-input size="small" v-model.trim="child.addStandard" placeholder=""></el-input>-->
										<input type="text" class="self_input_valiate"  maxlength="11" v-model.trim="child.addStandard" onkeyup="this.value=this.value.toString().match(/^\d+(?:\.\d{0,2})?/)"/>
									</div>
									<div class="text_input">件</div>
								</div>
								<div class="params_input">
									<div class="text_input">续费:</div>
									<div class="text_input">
										<!--<el-input size="small" v-model.trim="child.addCost" placeholder=""></el-input>-->
										<input type="text" class="self_input_valiate"  maxlength="11" v-model.trim="child.addCost" onkeyup="this.value=this.value.toString().match(/^\d+(?:\.\d{0,2})?/)"/>
									</div>
									<div class="text_input">件</div>
								</div>
							</div>
							<div class="check_self">
								<div class="left_check">
									<el-checkbox v-model="child.is_where_postage_region_free" true-label="1" false-label="0">
									</el-checkbox>
								</div>
								<div class="text_input" style="float:left;line-height: 70px;margin-right:20px;">指定条件包邮:</div>
								<div class="freight_Delivery" v-if="child.is_where_postage_region_free==1">
									<div class="params_input">
										<div class="text_input">
											<el-select size="small" v-model="child.hasMinCount" placeholder="请选择">
											    <el-option
											      v-for="item in options"
											      :key="item.value"
											      :label="item.label"
											      :value="item.value">
											    </el-option>
											  </el-select>
										</div>
									</div>
									<div class="params_input" v-if="child.hasMinCount==1">
										<div class="text_input">满:</div>
										<div class="text_input">
											<!--<el-input size="small" v-model.trim="child.minCountForDeliveryFree" placeholder=""></el-input>-->
											<input type="text" class="self_input_valiate"  maxlength="11" v-model.trim="child.minCountForDeliveryFree" onkeyup="this.value=this.value.toString().match(/^\d+(?:\.\d{0,2})?/)"/>
										</div>
										<div class="text_input">元包邮({{child.minCountForDeliveryFree}}元指的是用券后的价格)</div>
									</div>
									<div class="params_input" v-if="child.hasMinCount==2">
										<div class="text_input">满:</div>
										<div class="text_input">
											<input type="text" class="self_input_valiate"  maxlength="11" v-model.trim="child.minCountForDeliveryFree" onkeyup="this.value=this.value.toString().match(/^\d+(?:\.\d{0,2})?/)"/>
											<!--<el-input size="small" v-model.trim="child.minCountForDeliveryFree" placeholder=""></el-input>-->
										</div>
										<div class="text_input">件包邮</div>
									</div>
								</div>
							</div>
						</div>
					</div>
	     		</div>
	     	</div>
	     	<div class="common-top-title">
	     		不配送区域
	     	</div>
	     	<div class="no_istribution_area">
		     	<div class="explain">
		     		<div class="explain_test">
		     			收获地址为不配送区域的买家将无法购买该运费模板绑定的商品
		     		</div>
		     	</div>
				<!--<div class="distribution_area_item">
					<div class="item" v-for="(tiss,index) in tableDataObj.nondeliveryAreas">{{tiss}}--{{index}}</div>
				</div>-->
				<div class="get_region_warp" style="margin-top:20px">
	     			<div v-for="(item,index) in tableDataObj.nondeliveryAreas" class="get_region_warp_item active">
	     				<div v-for="child in cities" v-show="item==child.val">
	     					{{child.infos}}
	     				</div>
	     			</div>
	     		</div>
	     	</div>
	     	<div class="btn_submit">
	     		<el-button class="btn_submit_btn" @click="submitForm()" size="small" type="danger">确认</el-button>
	     	</div>
     	</div>
	</div>
</template>

<script>
import Feight from "../../js/feight";
//import cityOptions from "../../json/postalArea.json";
import cityOptions from "../../json/province.json";
import default_cities from "../../json/default_area.json";
export default{
	data(){
		return {
			isDisabled:false,
			distributionArr:[],
			allSelect:[],
			children:[],
			disabledArea:[],
			dispatchFreeSelf:{
				areaList:[2,3,5,9,19,20,21,28,29,10,11,13,14,22,23,24,26,32,31,6,7,8,17,16,27,25,4,12,30,15,18]
			},
			dispatchCost:[],
			nondeliveryAreas:[],
			postage_region_no:{},
	        region:'',
	        checkedCities:[],
        	checkReverse:[],
        	checkAll: false,
	        isIndeterminate: true,
	        isIndeterminateReverse:false,
			cities: cityOptions,
			default_cities:default_cities,
			tableDataObj:{
				costType:0,
				nondeliveryAreas:[],
				costTemplateName:'',
				is_free_postage:2,
				postage_region_money:[]
			},
			options:[
				{
					"label":"价格",
					"value":"1"
				},
				{
					"label":"件数",
					"value":"2"
				}
			],
			id:'',
		}
	},
	created(){
		this.id = this.$route.query.id;
		if(this.id){
			this.isDisabled = true;
			this.fetch(this.id);
		}else{
			
		}
	},
	methods:{
		submitForm(){
			var dataArr = [];
			var ids = [];
			this.dispatchCost.forEach((item)=>{
				if(item.is_where_postage_region_free==1){
					dataArr.push({
						addCost:item.addCost,
						addStandard:item.addStandard,
						firstCost:item.firstCost,
						firstStandard:item.firstStandard,
						hasMinCount:item.hasMinCount,
						minCountForDeliveryFree:item.minCountForDeliveryFree,
						templateItemId:item.templateItemId,
						areaList:item.areaList
					})
				}else{
					dataArr.push({
						addCost:item.addCost,
						addStandard:item.addStandard,
						firstCost:item.firstCost,
						firstStandard:item.firstStandard,
						templateItemId:item.templateItemId,
						areaList:item.areaList
					})
				}
			})
			var data = {
				costTemplateId:this.tableDataObj.costTemplateId,
				costTemplateName:this.tableDataObj.costTemplateName,
				costType:this.tableDataObj.costType,
				dispatchCost:dataArr,
				dispatchFree:this.dispatchFreeSelf.areaList,
			}
			console.log(JSON.stringify(data))
		},
    	getarr(array,array2){
		    var arr3 =[];  
		    for (var key in array) {  
		        var stra = array[key];  
		        var count = 0;  
		        for(var j= 0; j < array2.length; j++){  
		            var strb = array2[j];  
		            if(stra == strb) {  
		                count++;  
		            }  
		        }  
		        if(count===0&&stra!=null) {//表示数组1的这个值没有重复的，放到arr3列表中  
		            arr3.push(stra);  
		        }  
		    }  
		    arr3.pop()
		    return arr3;
		},
		deleteModule(data,index){
	        this.$confirm('您确定要删除么, 是否继续?', '提示', {
	          confirmButtonText: '确定',
	          cancelButtonText: '取消',
	          type: 'warning'
	        }).then(() => {
				data.splice(index,1)
	        }).catch(() => {
	          this.$message({
	            type: 'info',
	            message: '已取消'
	          });          
	        });
		},
		addModule(){
			var self = this;
			if(this.dispatchCost.length==0){
				self.dispatchCost.push({
					"areaList": [],
					"firstStandard":'',
					"firstCost": '',
					"addStandard": '',
					"addCost": '',
					"hasMinCount": '',
					"hasMinCount":"2",
					"is_where_postage_region_free":'1',
					"minCountForDeliveryFree":'',
					"areaListJson":[
					    {
					      "infos":"甘肃",
					      "val":5
					    },
					    {
					      "infos":"海南",
					      "val":9
					    },
					    {
					      "infos":"内蒙古",
					      "val":19
					    },
					    {
					      "infos":"宁夏",
					      "val":20
					    },
					    {
					      "infos":"青海",
					      "val":21
					    },
					    {
					      "infos":"西藏",
					      "val":28
					    },
					    {
					      "infos":"新疆",
					      "val":29
					    }
					]
				});
		        self.distributionArr = [];
	    		self.default_cities.forEach((child)=>{
	    			if(self.dispatchFreeSelf.areaList.indexOf(child.val)>-1){
	    				self.distributionArr.push(child.val)
	    			}
	    		})
				self.dispatchCost.forEach((child)=>{
	      			child.areaListJson.forEach((itme)=>{
	      				self.distributionArr.forEach((its)=>{
		        				if(itme.val == its){
		        					itme.disabled = true;
		        				}
	      				})
	      			})
				})
			}else{
				self.dispatchCost.push({
					"areaList": [],
					"firstStandard":'',
					"firstCost": '',
					"addStandard": '',
					"addCost": '',
					"hasMinCount": '',
					"hasMinCount":"2",
					"is_where_postage_region_free":'1',
					"minCountForDeliveryFree":'',
					"areaListJson":[
					    {
					      "infos":"甘肃",
					      "val":5
					    },
					    {
					      "infos":"海南",
					      "val":9
					    },
					    {
					      "infos":"内蒙古",
					      "val":19
					    },
					    {
					      "infos":"宁夏",
					      "val":20
					    },
					    {
					      "infos":"青海",
					      "val":21
					    },
					    {
					      "infos":"西藏",
					      "val":28
					    },
					    {
					      "infos":"新疆",
					      "val":29
					    }
					]
				});
	      		self.allSelect = [];
		        self.dispatchCost.forEach((item)=>{
		        	item.areaList.forEach((child)=>{
		        		self.allSelect.push(child)
		        	})
		        })
				self.dispatchCost.forEach((child)=>{
					var arr = self.getarr(self.allSelect,child.areaList);
	      			child.areaListJson.forEach((itme)=>{
	      				arr.forEach((its)=>{
		        				if(itme.val == its){
		        					itme.disabled = true
		        				}
	      				})
	      			})
				})
			}
		},
		setFreeShipping(e){
			var ids = e.target.getAttribute("ids");
			var itmetab = document.getElementsByClassName("itmetab");
			for(var i=0;i<itmetab.length;i++){
				itmetab[i].className = "itmetab";
			}
			e.target.className = "itmetab active";
		},
		fetch(id){
			var data = {
				id:id
			}
			Feight.logisticsTemplateInfo("Logistics/logisticsTemplateInfo",data,this);
		},
        handleCheckReverseChange(vals){
		    var self = this;
	        var arrs = cityOptions;
	        var cityOptionsArr = [];
	        for(var i=0;i<arrs.length;i++){
        		if(arrs[i].disabled!=true){
	          		cityOptionsArr.push(arrs[i].val)
        		}
	        }
	        if(self.dispatchFreeSelf.areaList.length==0){
		        self.distributionArr = [];
	    		self.default_cities.forEach((child)=>{
	    			if(cityOptionsArr.indexOf(child.val)>-1){
	    				self.distributionArr.push(child.val)
	    			}
	    		})
				self.dispatchCost.forEach((child)=>{
	      			child.areaListJson.forEach((itme)=>{
	      				self.distributionArr.forEach((its)=>{
		        				if(itme.val == its){
		        					itme.disabled = true;
		        				}
	      				})
	      			})
				})
	        }else{
		        self.distributionArr = [];
	    		self.default_cities.forEach((child)=>{
	    			if(cityOptionsArr.indexOf(child.val)>-1){
	    				self.distributionArr.push(child.val)
	    			}
	    		})
				self.dispatchCost.forEach((child)=>{
	      			child.areaListJson.forEach((itme)=>{
	      				self.distributionArr.forEach((its)=>{
		        				if(itme.val == its){
		        					itme.disabled = false;
		        				}
	      				})
	      			})
				})
	        }
	        let data  = new Set(cityOptionsArr); 
	        let checkedCities  = new Set(this.dispatchFreeSelf.areaList); 
	        this.tableDataObj.nondeliveryAreas = this.dispatchFreeSelf.areaList;
	        let difference= [...new Set([...data].filter(x=> !checkedCities.has(x)))];
	        this.dispatchFreeSelf.areaList = difference;
	        this.isIndeterminateReverse = false;
	        this.len = this.dispatchFreeSelf.areaList.length;
	   },
	    handleCheckAllChange(val) {
		    	var self = this;
		        var arrs = cityOptions;
		        var cityOptionsArr = [];
		        for(var i=0;i<arrs.length;i++){
	        		if(arrs[i].disabled!=true){
		          		cityOptionsArr.push(arrs[i].val)
	        		}
		        }
		        if(val){
			        self.distributionArr = [];
		    		self.default_cities.forEach((child)=>{
		    			if(cityOptionsArr.indexOf(child.val)>-1){
		    				self.distributionArr.push(child.val)
		    			}
		    		})
					self.dispatchCost.forEach((child)=>{
		      			child.areaListJson.forEach((itme)=>{
		      				self.distributionArr.forEach((its)=>{
			        				if(itme.val == its){
			        					itme.disabled = true;
			        				}
		      				})
		      			})
					})
		        }else{
			        self.distributionArr = [];
		    		self.default_cities.forEach((child)=>{
		    			if(cityOptionsArr.indexOf(child.val)>-1){
		    				self.distributionArr.push(child.val)
		    			}
		    		})
					self.dispatchCost.forEach((child)=>{
		      			child.areaListJson.forEach((itme)=>{
		      				self.distributionArr.forEach((its)=>{
			        				if(itme.val == its){
			        					itme.disabled = false;
			        				}
		      				})
		      			})
					})
		        }
				self.dispatchFreeSelf.areaList = val?cityOptionsArr:[]; 
				self.tableDataObj.nondeliveryAreas = val?[]:cityOptionsArr;
		        self.isIndeterminate = false;
		        self.len = self.dispatchFreeSelf.areaList.length;
	      },
	      setSelectDisabled(self){
	      		var _self = this;
	      		self.allSelect = [];
		        self.dispatchCost.forEach((item)=>{
		        	item.areaList.forEach((child)=>{
		        		self.allSelect.push(child)
		        	})
		        })
		        self.allSelect.forEach((item)=>{
		        	self.cities.forEach((child)=>{
		        		if(child.val==item){
		        			child.disabled=true;
		        		}
		        	})
		        })
    			self.dispatchCost.forEach((child)=>{
    				var arr = _self.getarr(self.allSelect,child.areaList);
	      			child.areaListJson.forEach((itme)=>{
	      				arr.forEach((its)=>{
		        				if(itme.val == its){
		        					itme.disabled = true
		        				}
	      				})
	      			})
    			})
	      },
	      handleChange(value,index,checked){
		      	var self = this;
		      	var ins = checked.indexOf(value);
				if(ins>-1){
		      		this.tableDataObj.nondeliveryAreas.pop();
				}else{
		      		this.tableDataObj.nondeliveryAreas.push(value)
				}
	      		self.allSelect = [];
		        self.dispatchCost.forEach((item)=>{
		        	item.areaList.forEach((child)=>{
		        		self.allSelect.push(child)
		        	})
		        })
		        self.dispatchCost.forEach((item,keys)=>{
		        	item.areaListJson.forEach((child)=>{
		        		if(child.val==value&&keys!=index){
		        			if(ins>-1){
		        				child.disabled = true;
		        			}else{
		        				child.disabled = false;
		        			}
		        		}
		        	})
		        })
	        	self.cities.forEach((child)=>{
	        		child.disabled=false;
	        		self.allSelect.forEach((item)=>{
		        		if(child.val==item){
		        			child.disabled=true;
		        		}
		        	})
		        })
	      },
	      handleCheckedCitiesChange(value,index,checked) {
		    var self = this;
	      	var ins = checked.indexOf(value);
			if(ins>-1){
	      		this.tableDataObj.nondeliveryAreas.pop();
			}else{
	      		this.tableDataObj.nondeliveryAreas.push(value)
			}
	        self.dispatchCost.forEach((item,keys)=>{
	        	item.areaListJson.forEach((child)=>{
	        		if(child.val==value&&keys!=index){
	        			if(ins>-1){
	        				child.disabled = true;
	        			}else{
	        				child.disabled = false;
	        			}
	        		}
	        	})
	        })
	        let checkedCount = value.length;
	        this.checkAll = checkedCount === this.cities.length;
	        this.checkReverse = checkedCount === this.cities.length;
	        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
	        this.isIndeterminateReverse = checkedCount > 0 && checkedCount < this.cities.length;
	        this.len = checkedCount;
	      },
	     defaultAddress(){
	     	var self = this;
	     	this.dispatchFreeSelf.areaList = [
	     	2,3,10,11,13,14,22,23,24,26,32,31,6,7,8,17,16,27,25,4,12,30,15,18
	     	]
	        var arrs = cityOptions;
	        var cityOptionsArr = [];
	        for(var i=0;i<arrs.length;i++){
        		if(arrs[i].disabled!=true){
	          		cityOptionsArr.push(arrs[i].val)
        		}
	        }
	        self.distributionArr = [];
    		self.default_cities.forEach((child)=>{
    			if(cityOptionsArr.indexOf(child.val)>-1){
    				self.distributionArr.push(child.val)
    			}
    		})
			self.dispatchCost.forEach((child)=>{
      			child.areaListJson.forEach((itme)=>{
      				self.distributionArr.forEach((its)=>{
	        				if(itme.val == its){
	        					itme.disabled = false;
	        				}
      				})
      			})
			})
			self.tableDataObj.nondeliveryAreas = self.distributionArr;
	     },
	}
}
</script>

<style lang="less" scoped>
@import "../../less/config.less";
@import "../../less/greight.less";   
#check_self{
	.el-checkbox{ 
	 	width:100%;
	}
	.el-checkbox__inner{
	    display: inline-block;
	    position: relative;
	    border: 1px solid #dcdfe6;
	    border-radius: 2px;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	    top:-22px;
	    width: 14px;
	    height: 14px;
	    background-color: #fff;
	    z-index: 1;
	    -webkit-transition: border-color .25s cubic-bezier(.71, -.46, .29, 1.46), background-color .25s cubic-bezier(.71, -.46, .29, 1.46);
	    transition: border-color .25s cubic-bezier(.71, -.46, .29, 1.46), background-color .25s cubic-bezier(.71, -.46, .29, 1.46);
	}
	.self_input_valiate{
		-webkit-appearance: none;
	    background-color: #fff;
	    background-image: none;
	    border-radius: 4px;
	    border: 1px solid #dcdfe6;
	    -webkit-box-sizing: border-box;
	    box-sizing: border-box;
	    color: #606266;
	    display: inline-block;
	    font-size: inherit;
	    height: 40px;
	    line-height: 1;
	    outline: 0;
	    padding: 0 15px;
	    -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
	    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
	    width: 100%;
	}
}
</style>