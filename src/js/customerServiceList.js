import api from '../js/ajax';

export default{
    //获取状态下订单数
    getCustomerServiceList(url,params,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:params,
            success: function (result) {
                if (result.code == 200) {
                	if(result.data.length==0){
	                    that.total = 0;
	                    that.itemData = [];
                	}else{
	                    var jsonData = result.data;
	                    that.total = jsonData.total;
	                    that.itemData = jsonData.data;
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
    orderServiceInquireStatus(url, that) {
        api.commonAjax({
            method: "post",
            url: url,
            success: function (result) {
                if (result.code == 200) {
                    var jsonData  = result.data;
                    that.optionsStatus = jsonData.order_service_status;
                    that.optionsType = jsonData.service_type;
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    orderServiceStatusCount(url, that) {
        api.commonAjax({
            method: "post",
            url: url,
            success: function (result) {
                if (result.code == 200) {
                    that.orderStatusCount = result.data;
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
            				'export':0,
					       'page':that.count,
					       'pageSize':that.pageSize,
				          'order_sn':that.orderSn,
				          'goodsId':that.goodId,
				          'mobile':that.userTel,
				          'logistics_code':that.shipNumber,
				          'order_service_status':that.order_service_status,
					       'service_type':that.order_service_type,
				          'consignee':that.userName,
				            'sTime':that.sTime=='NaN-0NaN-0NaN'?"":that.sTime,
				            'eTime':that.eTime=='NaN-0NaN-0NaN'?"":that.eTime,
					 	}
					 	_that.getOrderListGetUrl("/order/exportOrderService",datas,that);
					 }else{
					 	that.count = 1;
						var token = localStorage.getItem("token");
						window.location.href = that.headerCommon+"/Order/exportOrderService?export=1&Authorization="+token;
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