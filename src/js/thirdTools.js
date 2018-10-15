import api from '../js/ajax';

export default{
    //获取状态下订单数
    getOpenInfo(url,that){
        api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
                if (result.code == 200) {
                	var jsonData = result.data;
                	that.store_id = jsonData.store_id;
                	that.app_secret = jsonData.app_secret;
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    saveAppSecret(url,that){
        api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
                if (result.code == 200) {
                	that.app_secret = result.data.app_secret;
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
}