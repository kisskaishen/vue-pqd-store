import api from '../js/ajax';
import common from './common';
export default{
    //获取状态下订单数
    getAccountFund(url,params,that){
        api.commonAjax({
            method:"get",
            url:url,
            params:params,
            success:function(result){
                if(result.code==200){
                    that.total = result.total
                    var jsonData = result.data;
                    that.listData = jsonData.data;
                }else{
                    that.$message({
                        type:'info',
                        message:result.msg
                    })
                }
            }
        })
    },
    getCreate(url,that){
        api.commonAjax({
            method:"get",
            url:url,
            success:function(result){
                if (result.code == 200) {
                    that.tableData = result.data;
                    that.form.withdrawal_code = result.data.withdrawal_code;
                    that.bindingAccount.withdrawal_phone = result.data.mobile;
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    isWithdrawals(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
            data,data,
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
    },bindingAccountPost(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
            data,data,
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
                that.dialogVisibleBindingAccount = false;
            }
        })
    },
    getVerificationCode(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
            data,data,
            success:function(result){
                var verification = document.getElementsByClassName('verification')[0];
                if (result.code == 200) {
                    that.$message({
                        type: 'success',
                        message: result.msg
                    })
                    common.getVerificationCode();
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                    verification.removeAttribute("disabled");
                }
            }
        })
    }
}