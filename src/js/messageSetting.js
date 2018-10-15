import api from '../js/ajax';

export default{
    getMessageSetting(url,that){
        api.commonAjax({
            method:"get",
            url:url,
            success: function (result) {
                if (result.code == 200) {
                    var jsonData = result.data
                    that.messageData = jsonData;
                    that.total = jsonData.length;
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    addSettingListData(url,params,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:params,
            success: function (result) {
                if (result.code == 200) {
                    that.dialogSettingVisible = false;
                    that.total++;
                    params.sort = that.total++;
                    that.messageData.push(params)
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    deleteSettingListData(url, params, that,index) {
        api.commonAjax({
            method: "post",
            url: url,
            data: params,
            success: function (result) {
                if (result.code == 200) {
                    that.messageData.splice(index, 1)
                    that.dialogSettingVisible = false;
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    editSettingListData(url, params, that, index) {
        api.commonAjax({
            method: "post",
            url: url,
            data: params,
            success: function (result) {
                if(result.code==200){
                    that.messageData[index].title = params.title;
                    that.messageData[index].reply = params.reply;
                    that.dialogSettingVisible = false;
                    that.$message({
                        type: 'success',
                        message: result.msg
                    });
                }else{
                    that.dialogSettingVisible = false;
                    that.$message({
                        type: 'info',
                        message: result.msg
                    }); 
                }
            }
        })
    },
    moveSettingListData(url, params, that, index) {
        api.commonAjax({
            method: "post",
            url: url,
            data: params,
            success: function (result) {
                if (result.code == 200) {
                    if (params.position == 'down') {
                        var dataInt = that.messageData[index];
                        var key = index + 2;
                        that.messageData.splice(key, 0, dataInt);
                        that.messageData.splice(index, 1)
                    } else if (params.position == 'up'){
                        var dataInt = that.messageData[index];
                        var key = index + 1;
                        that.messageData.splice(index-1, 0, dataInt);
                        that.messageData.splice(key, 1)
                    }
                    that.$message({
                        type: 'success',
                        message: result.msg
                    });
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    });
                }
            }
        })
    },
    enableSettingListData(url, params, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data: params,
            success: function (result) {
                if (result.code == 200) {
                	that.fetch();
                    that.$message({
                        type: 'success',
                        message: result.msg
                    });
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    });
                }
            }
        })
    }
}