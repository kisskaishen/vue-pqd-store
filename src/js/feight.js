import api from '../js/ajax';

export default {
    getUserRegister(url, data,that) {
        api.commonAjax({
            method: "post",
            url: url,
            data:data,
            success: function (result) {
                if(result.code==200){
					var jsonData = result.data;
					that.tableData = jsonData.list;
					that.total = jsonData.total;
                } else {
                    that.$message({
                        type: "info",
                        message: result.msg
                    })
                }
            }
        })
    },
    logisticsTemplateInfo(url, data,that) {
        api.commonAjax({
            method: "post",
            url: url,
            data:data,
            success: function (result) {
                if(result.code==200){
//					that.tableDataObj = result.data;
//					that.checkedCities = that.tableDataObj.postage_region_free;
//					that.postage_region_no = that.tableDataObj.postage_region_no;
					var results =  {
						"costTemplateId": 3112867,
						"costTemplateName": "绥德邮政3.6元",
						"costType": 0,
						"dispatchFree": {
							"templateItemId": 21869884,
							"areaList": [
							  2,3,10,11,13,14,22,23,24,26,32,31,6,7,8,17,16,27,25,4,12,30,15,18],
						},
						"dispatchCost": [{
							"templateItemId": 21869885,
							"areaList": [5,9],
							"firstStandard": 1,
							"firstCost": 1000,
							"addStandard": 1,
							"addCost": 500,
							"hasMinCount": "1",
							"minCountForDeliveryFree": 4,
							"is_where_postage_region_free":"1"
						},{
							"templateItemId": 21869885,
							"areaList": [19],
							"firstStandard": 1,
							"firstCost": 1000,
							"addStandard": 1,
							"addCost": 500,
							"hasMinCount": "1",
							"minCountForDeliveryFree": 4,
							"is_where_postage_region_free":"0"
						}],
						"nondeliveryAreas": [20,21,28,29]
					}
					that.tableDataObj = results;
					var dispatchFree = results.dispatchFree;
					var dispatchCost = results.dispatchCost;
					var self = that;
					
					dispatchCost.forEach((item,keys)=>{
						self.dispatchCost.push({
							"areaList": item.areaList,
							"firstStandard": item.firstStandard,
							"firstCost": item.firstCost,
							"addStandard": item.addStandard,
							"addCost": item.addCost,
							"hasMinCount": item.hasMinCount,
							"minCountForDeliveryFree":item.minCountForDeliveryFree,
							"hasMinAmount": item.hasMinAmount,
							"is_where_postage_region_free":item.is_where_postage_region_free,
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
						})
					})
					that.setSelectDisabled(self);
					that.dispatchFreeSelf.areaList = dispatchFree.areaList;
					that.dispatchCost.areaList = dispatchCost;
                } else {
                    that.$message({
                        type: "info",
                        message: result.msg
                    })
                }
            }
        })
    },
    delLogisticsTemplate(url, data,that) {
        api.commonAjax({
            method: "post",
            url: url,
            data:data,
            success: function (result) {
                if(result.code==200){
                	that.fetch();
                    that.$message({
                        type: "success",
                        message: result.msg
                    })
                } else {
                    that.$message({
                        type: "info",
                        message: result.msg
                    })
                }
            }
        })
    },
}



