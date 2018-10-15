import api from '../js/ajax';

export default{
    //获取状态下订单数
    getReleaseNewProducts(url, params, that, count){
        api.commonAjax({
            method:"post",
            url:url,
            data:params,
            success:function(result){
                if(result.code==200){
                    var jsonData = result.data;
                	if(result.data.length==0){
                		that.total = 0;
                	}else{
                    	that.total = jsonData.total;
                	}
                    if (count == '1') {
                        that.itemData1 = jsonData.data;
                    } else if (count == '2'){
                        that.itemData2 = jsonData.data;
                    } else if (count == '3') {
                        that.itemData3 = jsonData.data;
                    } else if (count == '4') {
                        that.itemData4 = jsonData.data;
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
    // 发布新产品
    addNewProducts(url,that){
        api.commonAjax({
            method:"get",
            url:url,
            success: function (result) {
                if (result.code == 200) {
                    var orderid = result.info;
                    
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    deleteOrderman(url,data,that,count){
        // 删除
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success: function (result) {
                if (result.code == 200) {
                    that.itemData1.splice(count,1)
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
    recallGoods(url, data, that, count) {
        // 撤回
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
            success: function (result) {
                that.itemData2.splice(count,1)
                if (result.code == 200) {
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
    }
}