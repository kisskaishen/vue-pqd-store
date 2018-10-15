import api from '../js/ajax';
export default {
    couponStatisticsList(url, data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
            success: function (result) {
                if (result.code == 200) {
                    var jsonData = result.data;
                    that.tableData = jsonData.list;
                    that.totals = jsonData.total;
                }
            }
        })
    },
    countDetail(url, data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
            success: function (result) {
                if (result.code == 200) {
                    var jsonData = result.data;
                    that.tableData = jsonData.list;
                    that.info = jsonData.info;
                    that.totals = jsonData.total;
                }
            }
        })
    },
    couponList(url, data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
            success: function (result) {
                if (result.code == 200) {
                    var jsonData = result.data;
                    that.tableData = jsonData.list;
                    that.totals = jsonData.total;
                }
            }
        })
    },
    searchConf(url, data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
            success: function (result) {
                if (result.code == 200) {
                    var jsonData = result.data;
                    that.couponOption = jsonData.coupon_status;
                    that.couponOption.unshift({ label: '全部', value: '' })

                    that.couponTypeOption = jsonData.origin_type;
                    that.couponTypeOption.unshift({ label: '全部', value: '' })

                    that.store_fromOption = jsonData.store_from;
                    // that.store_fromOption.unshift({ label: '全部', value: '' })

                    that.store_typeOption = jsonData.store_type;
                    // that.store_typeOption.unshift({ label: '全部', value: '' })

                    that.couponOptionType = jsonData.type_promotion;
                    that.couponOptionType.unshift({ label: '全部', value: '' })
                }
            }
        })
    },
    delCoupon(url, data, that, jsonData, obj) {
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
            success: function (result) {
                if (result.code == 200) {
                    that.removeObjWithArr(jsonData, obj)
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
    },
    couponListDetail(url, data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
            success: function (result) {
                if (result.code == 200) {
                    that.form = result.data;
                    that.arrAll = result.data.limit_activity_data;
                    that.limit_activity_data_arr = that.form.limit_activity_data;
                    that.form.limit_activity_data.forEach(function (row, index) {
                        that.limit_activity_data.push(row.activity_name)
                    })
                    if (result.data.typetags == '5') {
                        that.isShow = false;
                    }
                }
            }
        })
    },
    getNotAddedActivityList(url, data, that) {
        var self = that;
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
            success: function (result) {
                if (result.code == 200) {
                    var jsonData = result.data;
                    if (jsonData.list.length != 0) {
                        if (that.limit_activity_data_arr.length == 0) {
                            that.limit_activity_data_arr = jsonData.list;
                            self.actionoption = [];
                            jsonData.list.forEach(function (row, index) {
                                self.actionoption.push(row.activity_name)
                            })
                        } else {
                            var arrs = [];
                            that.limit_activity_data_arr.forEach(function (rows, indexs) {
                                arrs.push(rows.activity_id)

                            })
                            jsonData.list.forEach(function (row, index) {
                                if (arrs.indexOf(row.activity_id) == -1) {
                                    that.limit_activity_data_arr.push(row)
                                }
                            })
                            self.actionoption = [];
                            jsonData.list.forEach(function (row, index) {
                                self.actionoption.push(row.activity_name)
                            })
                        }
                    } else {
                        self.actionoption = [];
                    }
                }
            }
        })
    },
    getNotAddedGoodsList(url, data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
            success: function (result) {
                if (result.code == 200) {
                    var jsonData = result.data;
                    that.tableData = jsonData.list;
                    that.totals = jsonData.total;
                }
            }
        })
    },
    getNotAddedCategoryList(url, data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
            success: function (result) {
                if (result.code == 200) {
                    var jsonData = result.data;
                    that.tableData = jsonData.list;
                    that.totals = jsonData.total;
                }
            }
        })
    },
    getNotAddedStoreList(url, data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
            success: function (result) {
                if (result.code == 200) {
                    var jsonData = result.data;
                    that.tableData = jsonData.list;
                    that.totals = jsonData.total;
                }
            }
        })
    },
    handleCoupon(url, data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
            success: function (result) {
                if (result.code == 200) {
                    if (data.limit_category_ids) {
                        this.tableDataCategory = [];
                    }
                    that.$router.push({ path: '/store/productManager/shopCoupons' })
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
