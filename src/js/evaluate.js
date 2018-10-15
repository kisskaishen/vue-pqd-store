import api from '../js/ajax';

export default {
    commentList(url, data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
            success: function (result) {
                if(result.code==200){
                	var jsonData = result.data;
                   that.tableData = jsonData.list;
                   that.total = jsonData.total;
                } else {
                    that.$message({
                        type: "info",
                        message: result.msg
                    })
                }
            }
        })
    },
    commentReport(url, data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
            success: function (result) {
                if(result.code==200){
                	that.fetch(that.currentPage,that.count);
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
            that.reportAdsDialog = false;
            }
        })
    },
    commentReply(url, data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
            success: function (result) {
                if(result.code==200){
                	that.fetch(that.currentPage,that.count);
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
            that.reportReplyDialog = false;
            }
        })
    },
    getMonthReportCount(url, that) {
        api.commonAjax({
            method: "post",
            url: url,
            success: function (result) {
                if(result.code==200){
                    var  jsonData = result.data;
                    that.monthCount = jsonData.month;
                    that.dayCount = jsonData.day;
                    that.weekCount = jsonData.week;
                } else {
                    that.$message({
                        type: "info",
                        message: result.msg
                    })
                }
				that.reportAdsDialog = true;
            }
        })
    },
    searchConf(url, that) {
        api.commonAjax({
            method: "post",
            url: url,
            success: function (result) {
                if(result.code==200){
                    var  jsonData = result.data;
					that.typeOption = jsonData.type;
                } else {
                    that.$message({
                        type: "info",
                        message: result.msg
                    })
                }
            }
        })
    },
}