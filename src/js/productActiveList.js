import api from '../js/ajax';

export default{
    //获取状态下订单数
    getProductActiveList(url,params,that){
        api.commonAjax({
            method:"get",
            url:url,
            params:params,
            success: function (result) {
                if (result.code == 200) {
                    var jsonData = result.info;
                    that.tableData = jsonData.data;
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
}