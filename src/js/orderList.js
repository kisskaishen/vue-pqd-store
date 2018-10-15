import api from '../js/ajax';
export default {
    //快捷查询接口
    orderStatusCount(url, that) {
        api.commonAjax({
            method: "post",
            url: url,
            success: function (data) {
                if (data.code == 200) {
                    that.orderStatusCount = data.data;                    
                } else {
                    that.$message({
                        type: 'info',
                        message: data.msg
                    })
                }
            }
        })
    },
    //获取状态下订单数
    getOrderList(url,that){
        api.commonAjax({
            method:"post",
            url:url,
            success:function(data){
                if(data.code==200){
                    var jsonData = data.data;
                    that.tableData = jsonData.data;
                    that.total = jsonData.total;
                    that.pendinggroup = data.data.pendinggroup;
                } else {
                    var jsonData = data.data;
                    that.tableData = jsonData.data;
                    that.$message({
                        type: 'info',
                        message: data.msg
                    })
                }
            }
        })
    },
    //获取订单状态
    getOrderStatus(url, that) {
        api.commonAjax({
            method: "post",
            url: url,
            success: function (result) {
                if (result.code == 200) {
                    var jsonData = result.data;
                    that.options = jsonData;
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    //查询订单列表
    getOrderListQuery(url,params,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:params,
            success:function(result){
                if(result.code==200){
                	if(result.data.length==0){
	                    that.tableData = [];
	                    that.total = 0;
                	}else{
	                    that.tableData = result.data.data;
	                    that.total = result.data.total;
                	}
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    getOrderListGetUrl(url,params,that){
        var _that = this;
        api.commonAjax({
            method:"post",
            url:url,
            data:params,
            success:function(result){
                if(result.code==200){
                	if(result.data.total_page){
	              	 	that.total_page = result.data.total_page;
                	}else if(result.data.page){
                		that.count = result.data.page;
                	}
					 if(that.count<=that.total_page){
		      			var datas = {
					     	'quick_search':that.value,
				            'order_sn':that.order_sn,
				            'goodsId':that.goodsId,
				            'mobile':that.mobile,
				            'logistics_code':that.logistics_code,
				            'order_state':that.order_state,
				            'consignee':that.consignee,
				            'sTime':that.sTime=='NaN-0NaN-0NaN'?"":that.sTime,
				            'eTime':that.eTime=='NaN-0NaN-0NaN'?"":that.eTime,
				            'export':0,
				            'page':that.count
					 	}
					 	_that.getOrderListGetUrl("/order/exportOrder",datas,that);
					 }else{
					 	that.count = 1;
						var token = localStorage.getItem("token");
						window.location.href = that.headerCommon+"/Order/exportOrder?export=1&Authorization="+token;
					 }
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
}