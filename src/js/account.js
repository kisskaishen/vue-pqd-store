import api from '../js/ajax';

export default {
    storeBalanceHistory(url,data,that){
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
    storeBalanceSearchStatus(url, that) {
        api.commonAjax({
            method: "post",
            url: url,
            success: function (result) {
                if (result.code == 200) {
              		var jsonData = result.data;
  								that.is_paymentOptions = jsonData.is_payment;
  								that.pay_codeOptions = jsonData.withdrawal_payment_type;
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    bindAccount(url, data,that) {
        api.commonAjax({
            method: "post",
            url: url,
            data:data,
            success: function (result) {
                if (result.code == 200) {
                    that.withdrawalCode = result.data.withdrawal_code;
                    that.bindingAccountDialog = false;
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
    editAccount(url, data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
            success: function (result) {
                if (result.code == 200) {
                    that.editAccountDialog = false;
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
    sendSms(url,data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data:data,
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
    },
    seeWithdrawalAccount(url, that) {
        api.commonAjax({
            method: "post",
            url: url,
            success: function (result) {
                if (result.code == 200) {
                    that.withdrawalCode = result.data.withdrawalCode;
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    storePaymentOrderList(url,data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data:data,
            success: function (result) {
                if (result.code == 200) {
                    var jsonData = result.data;
                    that.tableData = jsonData.list;
                    that.statistics = jsonData.statistics;
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
    orderServiceList(url, data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
            success: function (result) {
                if (result.code == 200) {
                    var jsonData = result.data;
                    that.tableData = jsonData.list;
                    that.statistics = jsonData.statistics;
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
    storeMoneyStatistics(url, that) {
        api.commonAjax({
            method: "post",
            url: url,
            success: function (result) {
                if (result.code == 200) {
                    var jsonData = result.data;
                    that.storeMoneyStatistics = jsonData;
                    that.storeCode = jsonData.merchant_status;
                    that.presented = that.storeMoneyStatistics.total_withdraw_money;
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    WithdrawalFlow(url,data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data:data,
            success: function (result) {
                if (result.code == 200) {
                    var jsonData = result.data;
                    that.tableData = jsonData.list;
                    that.statistics = jsonData.statistics;
                    that.total3 = jsonData.total;
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    orderServiceInfo(url, data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
            success: function (result) {
                if (result.code == 200) {
                    that.dialogVisibleRefund = true;
                    var jsonData = result.data;
                    that.goodsInfo = jsonData.goodsInfo;
                    that.logisticInfo = jsonData.logisticInfo;
                    that.orderInfo = jsonData.orderInfo;
                    that.storeInfo = jsonData.storeInfo;
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    orderInfo(url, data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
            success: function (result) {
                if (result.code == 200) {
                    that.dialogVisibleOrder = true;
                    var jsonData = result.data;
                    that.goodsInfo = jsonData.goodsInfo;
                    that.logisticInfo = jsonData.logisticInfo;
                    that.orderInfo = jsonData.orderInfo;
                    that.storeInfo = jsonData.storeInfo;
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    fineHistory(url, data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
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
    fineHistoryCount(url, that) {
        api.commonAjax({
            method: "post",
            url: url,
            success: function (result) {
                if (result.code == 200) {
                    var jsonData = result.data;
                    that.total_punish_price = jsonData.total_punish_price;
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    margin(url, data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
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
    marginCount(url,data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data:data,
            success: function (result) {
                if (result.code == 200) {
                    var jsonData = result.data;
                    that.total_deposit_price = jsonData.total_deposit_price;
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    getWithdrawOrder(url, data,that) {
        api.commonAjax({
            method: "post",
            url: url,
            data:data,
            success: function (result) {
                if (result.code == 200) {
                    that.dialogTableVisible = true;
                    var jsonData = result.data;
                    that.tableData9 = jsonData.data.list;
                    that.total9 = jsonData.total;
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    withdrawalMoney(url, data, that) {
        var self = this;
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
            success: function (result) {
                if (result.code == 200) {
                    that.putForwardDialog = false;
                    self.storeMoneyStatistics("/Fundmanagement/storeMoneyStatistics", that);
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
                that.putForwardDialog = false;
            }
        })
    },
    applicationWithdrawal(url,data, that) {
        var self = this;
        api.commonAjax({
            method: "post",
            url: url,
            data:data,
            success: function (result) {
                if (result.code == 200) {
                    that.dialogTableVisible = false;
                    self.storeMoneyStatistics("/Fundmanagement/storeMoneyStatistics", that);
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
                that.putForwardDialog = false;
            }
        })
    },
    editPassword(url, data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
            success: function (result) {
                if (result.code == 200) {
                    that.dialogTableVisiblePass = false;
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
    orderTransactionStatus(url, that) {
        api.commonAjax({
            method: "post",
            url: url,
            success: function (result) {
                if (result.code == 200) {
                    that.optionsOrder = result.data;
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    withdrawalAuditStatus(url, that) {
        api.commonAjax({
            method: "post",
            url: url,
            success: function (result) {
                if (result.code == 200) {
                    that.optionsForWard = result.data;
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    storeSearchConf(url, that) {
        api.commonAjax({
            method: "post",
            url: url,
            success: function (result) {
                if (result.code == 200) {
                    var jsonData = result.data;
                    that.store_status = jsonData.status;
                    that.store_status.unshift({ label: '全部', name: '' })

                    that.store_type = jsonData.type;
                    that.store_type.unshift({ label: '全部', name: '' })
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    returnStatus(url, that) {
        api.commonAjax({
            method: "post",
            url: url,
            success: function (result) {
                if (result.code == 200) {
                    that.optionsReturn = result.data;
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
