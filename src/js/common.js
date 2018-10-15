import api from '../js/ajax';

export default {
    editRemarkInfo(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
                that.DialogEditRemark = false;
                that.tableData.store_note = that.editCustomerForm.editRemark;
            }
        })
    },
    getVerificationCode(){
        var verification = document.getElementsByClassName('verification')[0];
        var k = 60;
        var timers =  setInterval(function(){
            k--;
            if(k>0){
                verification.innerHTML = '('+k+'s)后可重发';
            }else{
                verification.innerHTML = '验证码';
                verification.removeAttribute("disabled");
                clearInterval(timers);
            }
        },1000)
    }
}