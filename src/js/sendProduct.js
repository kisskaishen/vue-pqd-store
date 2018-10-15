import api from '../js/ajax';

export default{
    //获取状态下订单数
    getShipInfo(url,that){
        api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
                if (result.code == 200) {
                    that.options2 = result.data; 
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