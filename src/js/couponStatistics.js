import api from '../js/ajax';

export default{
    //获取状态下订单数
    getCouponStatistics(url,params,that){
        api.commonAjax({
            method:"post",
            url:url,
            params:params,
            success: function (result) {
                if (result.code == 200) {
                    var jsonData = result.data;
                    var listData = jsonData.list;
                    that.tableData = listData.data;
                    that.total = listData.total;
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