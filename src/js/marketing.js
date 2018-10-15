import api from '../js/ajax';
export default {
    //快捷查询接口
    storeMarketingActiveList(url,data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data:data,
            success: function (result) {
                if (result.code == 200) {
                    var jsonData = result.data;
                    that.tableData = jsonData.list;
                    that.total = jsonData.total;
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    storeActiveInfo(url, data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
            success: function (result) {
                if (result.code == 200) {
                    var jsonData = result.data;
                    that.activeDetail = jsonData;
                    that.limitData = jsonData.limit;
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    storeActiveGoodsList(url, data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
            success: function (result) {
                if (result.code == 200) {
                    var jsonData = result.data;
                    that.tableDataActive = jsonData.list;
                    that.totalActive = jsonData.total;
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    storeJoinHelpActivityGoodsList(url, data, that) {
        /** 未选择 */
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
            success: function (result) {
                if (result.code == 200) {
                    var jsonData = result.data;
                    that.toBeSelected = jsonData.list;
                    that.total1 = jsonData.total;
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    ActiveGoodsList(url, data, that) {
        /** 未选择 */
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
            success: function (result) {
                if (result.code == 200) {
                    var jsonData = result.data;
                    that.chosenAlready = jsonData.list;
                    that.total2 = jsonData.total;
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    storeAddActiveGoods(url, data, that) {
        /** 未选择 */
       var self = this;
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
            success: function (result) {
                if (result.code == 200) {
                	that.chosenAlready = [];
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
    updateActiveGoodsSpec(url, data, that) {
        /** 未选择 */
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
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
                	that.activeNameDetail = "third";
	        		that.storeActiveGoodsListFetch()
                that.dialogVisible = false;
            }
        })
    },
    storeDelGoods(url, data, that,index) {
        /** 未选择 */
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
            success: function (result) {
                if (result.code == 200) {
                	that.tableDataActive.splice(index,1)
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