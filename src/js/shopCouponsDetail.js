import api from '../js/ajax';

export default{
    //  获取数据列表
    getListData(url,params,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:params,
            success: function (result) {
                if (result.code == 200) {
                    var jsonData = result.data;
                    that.couponinfo = jsonData.couponinfo;
                    that.listData = jsonData.list.data;
                    that.total = jsonData.list.total;
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    // 查询数据列表
    searchListData(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success: function (result) {
                if (result.code == 200) {
                    var jsonData = result.data;
                    that.listData = jsonData.list.data;
                    that.total = jsonData.list.total;
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