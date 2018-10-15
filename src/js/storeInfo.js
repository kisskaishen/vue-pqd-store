import api from '../js/ajax';
import customerServiceDetail from './customerServiceDetail';
export default{
    updateStoreMobile(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success: function (result) {
                if (result.code == 200) {
                	that.ruleForm.verifycode = '';
                    localStorage.setItem("mobile",data.mobile)
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
                that.changeMobileSec = false;
            }
        })
    },
    checkOldMobildSms(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success: function (result) {
                if (result.code == 200) {
			   		that.saveOldCodeVal = that.ruleForm.verifycode;
			   		that.changeMobile = false;
			   		that.changeMobileSec = true;
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    getStoreInfo(url,that){
        api.commonAjax({
            method:"post",
            url:url,
            success: function (result) {
                if (result.code == 200) {
                    var jsonData = result.data;
                    that.storeInfoForm = jsonData;
                    that.addressList = jsonData.address;
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    addStoreInfo(url,data,that){
    	var self = this;
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
                if(result.code=='200'){
                    self.getStoreInfo("/Store/storeInfo",that);
                    that.$message({
                        type:'success',
                        message: result.msg
                    })
                } else {
                    that.$message({
                        type: 'success',
                        message: result.msg
                    })
                }
            }
        })
    },
    setDefaultStoreConsignee(url, data, that, params) {
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
            success: function (result) {
                if (result.code == '200') {
                    that.addressList.forEach(element => {
                        element.is_default = false;
                    });
                    params.is_default = true;
                    that.$message({
                        type: 'success',
                        message: result.msg
                    })
                } else {
                    that.$message({
                        type: 'success',
                        message: result.msg
                    })
                }
            }
        })
    },
    addStoreAddress(url, data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
            success: function (result) {
                if (result.code == '200') {
//                  data.address_id = result.data.address_id;
//                  that.addressList.push(data);
	   				that.fetch();
                    that.$message({
                        type: 'success',
                        message: result.msg
                    })
                } else {
                    that.$message({
                        type: 'success',
                        message: result.msg
                    })
                }
                 that.dialogVisible = false;
            }
        })
    },
    deleteStoreConsignee(url, data, that, index) {
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
            success: function (result) {
                if (result.code == '200') {
                    that.addressList.splice(index, 1)
                    that.$message({
                        type: 'success',
                        message: result.msg
                    })
                } else {
                    that.$message({
                        type: 'success',
                        message: result.msg
                    })
                }
            }
        })
    },
    editStoreAddress(url, data, that, index) {
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
            success: function (result) {
                if (result.code == '200') {
//                  var addressDefault = '';
//                  if (that.provinced_name && that.city_name && that.district_name) {
//                      addressDefault = that.provinced_name + that.city_name + that.district_name;
//                  } else {
//                      addressDefault = that.ruleForm.address_base;
//                  }
//                  var jsonData = that.addressList[that.keys];
//                  jsonData.address_id = that.ruleForm.address_id;
//                  jsonData.address_base = addressDefault;
//                  jsonData.mobile = that.ruleForm.mobile;
//                  jsonData.consignee = that.ruleForm.consignee;
//                  jsonData.address = that.ruleForm.address;
//                  jsonData.district = that.ruleForm.district;
//                  jsonData.city = that.ruleForm.city;
//                  jsonData.province = that.ruleForm.province;
//                  jsonData.is_default = that.ruleForm.is_default;
	   				that.fetch();
	   				that.dialogVisible = false;
                    that.$message({
                        type: 'success',
                        message: result.msg
                    })
                } else {
                    that.$message({
                        type: 'success',
                        message: result.msg
                    })
                }
            }
        })
    }
}
