import api from '../js/ajax';
export default {
    pauseOrOpen(url,data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data:data,
            success: function (result) {
                if (result.code == 200) {
                  that.fetch();
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
    getPromotionGoodsList(url, that) {
        api.commonAjax({
            method: "post",
            url: url,
            success: function (result) {
                if (result.code == 200) {
                    var jsonData = result.data;
                    that.listData = jsonData.list;
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    getPromotionGoodsListCoupon(url,data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data:data,
            success: function (result) {
                if (result.code == 200) {
                    var jsonData = result.data;
                    that.setlistData = jsonData.list;
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    getPromotiongoodsGetCheckGoods(url,data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data:data,
            success: function (result) {
                if (result.code == 200) {
                    var jsonData = result.data;
                    that.listData = jsonData.list;
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    getPromotiongoodsGetGoods(url,data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data:data,
            success: function (result) {
                if (result.code == 200) {
                    var jsonData = result.data;
                    that.listData = jsonData.list;
                    that.totals = jsonData.total;
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    editPromotionGoods(url,data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data:data,
            success: function (result) {
                if (result.code == 200) {
                      that.dialogVisible = false;
                    that.fetch();
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
    deletePromotiongoods(url,data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data:data,
            success: function (result) {
                if (result.code == 200) {
                    that.fetch();
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
    PromotiongoodsIndex(url,data, that) {
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
    getPromotionGoodsNum(url, that) {
        api.commonAjax({
            method: "post",
            url: url,
            success: function (result) {
                if (result.code == 200) {
                  var jsonData = result.data;
                  that.total = jsonData.total;
                  that.num = jsonData.num;
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    savePromotionGoods(url,data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data:data,
            success: function (result) {
                if (result.code == 200) {
                    that.$router.push({path:'/home/marketing/make_fun'})
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
    promotionStatus(url,that){
    		api.commonAjax({
    					method:"post",
    					url:url,
    					success:function(result){
    						if(result.code==200){
                  var jsonData = result.data;
                  that.statusOption = jsonData.status;
    						}
    					}
    			})
    },
    promotionGoods(url,data,that){
    		api.commonAjax({
    					method:"post",
    					url:url,
              data:data,
    					success:function(result){
    						if(result.code==200){
                  var jsonData = result.data;
                  that.tableData = jsonData.list;
                  that.total = jsonData.total;
    						}
    					}
    			})
    },
    getTimeFundstatistics(url,that){
    		api.commonAjax({
    					method:"post",
    					url:url,
    					success:function(result){
    						if(result.code==200){
                  that.selectTimeOption = result.data;
    						}
    					}
    			})
    },
}
