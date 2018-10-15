import api from '../js/ajax';

export default{
    //
    getPasswordSecurity(url,that){
        api.commonAjax({
            method:"get",
            url:url,
            success: function (result) {
                if (result.code == 200) {
                    var jsonData = result.data;
                    that.infoData = jsonData.res;
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    editPasswordSecurity(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
               if(result.code==200){
                    that.ruleForm.newpwd = '';
                    that.ruleForm.oldpwd = '';
                   that.ruleForm.repeatpwd = '';
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