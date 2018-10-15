import api from '../js/ajax';
import axios from 'axios';
import customerServiceDetail from "../js/customerServiceDetail";
export default{
    //获取状态下订单数
    getOrderDetailShow(url,data,that){
        var self = this;
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
                if(result.code==200){
                    var jsonData = result.data;
                    that.orderDetailData = jsonData.orderInfo;
                    that.orderGoodsInfo = jsonData.orderGoodsInfo;
                    that.userInfo = jsonData.userInfo;
                    that.payInfo = jsonData.pay_info;
                    that.express = jsonData.express;
                    that.button = jsonData.button;
                    that.editRemarkForm.editRemark = jsonData.userInfo.store_note;
                    if (jsonData.userInfo.city){
                        var data = {
                            action: 'parent_id',
                            value: jsonData.userInfo.province
                        }
                        customerServiceDetail.secondLevel("/Storepublic/getRegion",data,that);
                        if (jsonData.userInfo.district) {
                            var data = {
                                action: 'parent_id',
                                value: jsonData.userInfo.city
                            }
                            customerServiceDetail.thirdLevel("/Storepublic/getRegion",data,that);
                        }
                    }
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    //发货
    sendProduct(url, data, that,title) {
        var self = this;
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
                if (result.code == 200) {
                    if(title=="batchDelivery"){
                    	that.form.order_sn = '';
                    	that.form.logistics_code = '';
                    	that.form.logistics_order_sn = '';
                    }else{
	                    that.button = result.data.button;
	                    var datas = {
	                        order_sn: that.order_sn
	                    }
	                    self.getOrderDetailShow('/Order/orderInfo', datas, that);
                    }
                    that.$message({
                        type: 'success',
                        message: result.msg
                    });
                } else{
                    that.$message({
                        type:'info',
                        message:result.msg
                    });
                }
                that.DialogVisible = false;
            }
        })
    },
    //发货
    editLogistics(url, data, that) {
        var self = this;
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
                if (result.code == 200) {
                    that.button = result.data.button;
                    var datas = {
                        order_sn: that.order_sn
                    }
                    self.getOrderDetailShow('/Order/orderInfo', datas, that);
                    that.$message({
                        type: 'success',
                        message: result.msg
                    });
                } else{
                    that.$message({
                        type:'info',
                        message:result.msg
                    });
                }
                that.DialogVisible = false;
            }
        })
    },
    //编辑备注信息
    editRemarkInfo(url,data,that){
        var  self  = this;
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
                if (result.code==200){
                    that.userInfo.store_note = that.editRemarkForm.editRemark;
                    that.userInfo.store_time = new Date().format("yyyy-MM-dd hh:mm:ss");
                    var datas = {
                        order_sn: that.order_sn
                    }
                    self.getOrderDetailShow('/Order/orderInfo', datas, that);
                    that.$message({
                        type:'success',
                        message:result.msg
                    })
                } else{
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
                that.DialogEditRemark = false;
            }
        })
    },
    editaddress(url,data,that,count){
        var self = this;
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
                /*1.订单详情修改买家信息
                  2。退货售后列表修改买家信息
                * */
                if(result.code==200){
                    if(count=='2'){
                        that.tableData.consignee =  that.ruleForm.consignee;
                        that.tableData.mobile =  that.ruleForm.mobile;
                        that.tableData.address_base =  that.address_base;
                        that.tableData.address = that.ruleForm.address;
                    }
                    var datas = {
                        order_sn: that.order_sn
                    }
                    self.getOrderDetailShow('/Order/orderInfo', datas, that);
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
                that.DialogEditInfo = false;
            }
        })
    } ,   
}