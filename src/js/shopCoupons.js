import api from '../js/ajax';

export default{
    //获取状态下订单数
    getShopCoupons(url,params,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:params,
            success:function(result){
                if (result.code == 200) {
                    var jsonData = result.data;
                    that.total = jsonData.total;
                    that.tableData = jsonData.data;
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    //  开启优惠券/暂停
    isSuspendCoupons(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success: function (result) {
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
    },
    //展示优惠券信息 
    editCoupons(url,that){
        api.commonAjax({
            method:"get",
            url:url,
            success:function(result){
                that.editData = result.data;
                if (result.code == 200) {
                    that.editData = result.data;
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    // 编辑优惠券
    editShopCoupons(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success: function (result) {
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
                that.centerDialogVisible = false;
            }
        })
    },
    // 删除优惠券 
    deleteShopCoupons(url,index,that){
        api.commonAjax({
            method:"post",
            url:url,
            success: function (result) {
                if (result.code == 200) {
                    that.tableData.splice(index, 1);
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
    }
}