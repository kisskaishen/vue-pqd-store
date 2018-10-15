import api from '../js/ajax';

export default {
    getcode(url, data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
            success: function (result) {
                if(result.code==200){
                    that.$message({
                        type:"success",
                        message:result.msg
                    })
                } else {
                    that.$message({
                        type: "info",
                        message: result.msg
                    })
                }
            }
        })
    },
    forgetPwd(url, data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
            success: function (result) {
                if (result.code == 200) {
                    that.$router.push("/")
                    that.$message({
                        type: "success",
                        message: result.msg
                    })
                } else {
                    that.$message({
                        type: "info",
                        message: result.msg
                    })
                }
            }
        })
    }
}
