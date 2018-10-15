import api from '../js/ajax';
import axios from 'axios';


export default{
    //退货售后列表详情
    getCustomerServiceDetail(url,data,that){
        var self = this;
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success: function (result) {
                if (result.code == 200) {
                    var _that = that;
                    var data = result.data;
                    that.button = data.button;
                    that.button.forEach((value, index) => {
                        if(value.position=='2'){
                            _that.isShow = true;
                        } else if (value.position == '3'){
                            _that.isShow3 = true;
                            _that.btn_name = value.buttonName;
                            _that.action_name = value.action;
                        }
                    });
                    that.orderServiceSn = data.orderServiceSn;
                    that.return_money = data.return_money;
                    that.tableData = data.orderGoodsInfo;
                    that.orderInfo = data.orderInfo;
                    that.userInfo = data.userInfo;
                    that.payInfo = data.pay_info;
                    that.order_type = data.order_type;
                    that.orderService = data.orderService;
                    //处理订单 
                    that.ruleFormsend.order_sn = data.order_sn;
                    that.ruleFormsend.goods_name = data.goods_name;
                    that.ruleFormsend.order_amount = data.order_amount;
                    that.ruleFormsend.gold = data.gold;

                    //编辑买家信息
                    that.ruleForm.province = data.province;
                    that.ruleForm.city = data.city;
                    that.ruleForm.district = data.district;
                    that.ruleForm.address = data.address;
                    that.ruleForm.consignee = data.consignee;
                    that.ruleForm.mobile = data.mobile;
                    that.ruleForm.address_base = data.address_base;
                    if (that.userInfo.city){
                        var data = {
                            action:'parent_id',
                            value: that.userInfo.province
                        }
                        self.secondLevel("/Storepublic/getRegion",data,that);
                        if (that.userInfo.district){
                            var data = {
                                action: 'parent_id',
                                value: that.userInfo.city
                            }
                            self.thirdLevel("/Storepublic/getRegion",data,that);
                        }
                    }
                }else{
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    //修改买家信息
    editaddress(url, data, that) {
        var self = this;
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
            success: function (result) {
                if (result.code == 200) {
                    var datas = {
                        order_sn: that.order_sn
                    }
                    self.getCustomerServiceDetail("OrderService/orderServiceInfo", datas, that);
                    that.$message({
                        type: 'success',
                        message: result.msg
                    })
                    that.DialogEditInfo = false;
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                    that.DialogEditInfo = false;
                }
            }
        })
    },
    storeAfterSales(url, data, that){
        var self = this;
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
            success: function (result) {
                if (result.code == 200) {
                    that.isShow = false;
                    var datas = {
                        order_sn: that.order_sn
                    }
                    self.getCustomerServiceDetail("OrderService/orderServiceInfo", datas, that);
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
                that.DialogVisible = false;
            }
        })
    },
    //处理订单
    processingOrders(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
                if (result.code == 200) {
                    that.$message({
                        type: 'success',
                        message: result.msg
                    })
                    that.DialogVisible=false;
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                    that.DialogVisible=false;
                }
            }
        })
    },
    // 编辑备注信息
    editRemarkInfo(url,data,that){
        var self = this;
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success: function (result) {
                if (result.code == 200) {
                    that.tableData.store_note = that.editCustomerForm.editRemark;
                    that.tableData.add_time = new Date().format("yyyy-MM-dd hh:mm:ss");
                    that.DialogEditRemark = false;
                    var datas = {
                        order_sn: that.order_sn
                    }
                    self.getCustomerServiceDetail("OrderService/orderServiceInfo", datas, that);
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    //获取物流信息
    getShipInfo(url,that){
        api.commonAjax({
            method:"post",
            url:url,
            success: function (result) {
                if (result.code == 200) {
                    that.shipOption = result.data;
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    //获取地址信息 addressUrl
    getaddress(url,data,that){
        api.commonAjax({
            method: "post",
            url: url,
            data:data,
            success: function (result) {
                if(result.code==200){
                    var re = result.data;
                    that.optionsProvinced = re;
                }else{
                    that.$message({
                        type:'info',
                        message:result.msg
                    })
                }
            }
        })
    },
    //获取市级
    secondLevel(url,data,that){
        api.commonAjax({
            method: "post",
            url: url,
            data:data,
            success: function (result) {
                if (result.code == 200) {
                    var re = result.data;
                    that.optionsCity = re;
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    //获取区
    thirdLevel(url,data,that){
        api.commonAjax({
            method: "post",
            url: url,
            data:data,
            success: function (result) {
                if (result.code == 200) {
                    var re = result.data;
                    that.optionsDistrict = re;
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