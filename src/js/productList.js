import api from '../js/ajax';

export default{
    //获取状态下订单数
    getProductList(url,params,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:params,
            success: function (result) {
                if (result.code == 200) {
                    var jsonData = result.data;
	                    that.itemData = jsonData.data;
	                    that.total = jsonData.total;
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    deleteRowList(url,data,that,index){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success: function (result) {
                if (result.code == 200) {
                    that.itemData.splice(index, 1)
                    that.total--;
                    that.$message({
                        type: 'success',
                        message: result.msg
                    })
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    //上架下架
    changeStatus(url,data,that,sta,params){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success: function (result) {
                if (result.code == 200) {
                	if(sta==0){
                		params.is_on_sale = 0
                	}else if(sta==1){
                		params.is_on_sale = 1
                	}
                    that.$message({
                        type: 'success',
                        message: result.msg
                    })
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    searchStatus(url,that){
        api.commonAjax({
            method:"post",
            url:url,
            success: function (result) {
                if (result.code == 200) {
                	var jsonData = result.data;
                	that.is_on_saleOption = jsonData.is_on_sale;
                	that.is_specialOption = jsonData.is_special;
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