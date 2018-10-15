import api from '../js/ajax';

export default{
    //获取状态下订单数
    getIllegalInformation(url,that){
        api.commonAjax({
            method:"post",
            url:url,
            success: function (result) {
                if (result.code == 200) {
                    var jsonData = result.data;
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
    }
}