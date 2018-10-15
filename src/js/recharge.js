import api from '../js/ajax';
export default {
    storeMarginWithdrawDeduction(url,data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data:data,
            success: function (result) {
                if (result.code == 200) {
					that.$message({
						type:'success',
						message:result.msg
					})
                	that.$router.push({path:'/store/accountFund/revenueRecord',query:{bond:'1'}})
                }else{
					that.$message({
						type:'info',
						message:result.msg
					})
                }
                this.dialogVisibleWithdrawals = false;
            }
        })
    },
    getStoreMoneyStatistics(url, that) {
        api.commonAjax({
            method: "post",
            url: url,
            success: function (result) {
                if (result.code == 200) {
                	var jsonData = result.data;
					that.margin = jsonData.margin;
					that.withdraw_money = jsonData.withdraw_money;
					that.marginSpecification = jsonData.marginSpecification;
                }
            }
        })
    },
    marginQrCode(url,data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data:data,
            success: function (result) {
                if (result.code == 200) {
					var jsonData = result.data;
                	if(data.payCode=='alipay'){
//              		var html = jsonData.codeUrl;
//              		var appendForm = document.getElementById("appendForm");
//              		appendForm.innerHTML = html;
//              		var submitForm = document.getElementById("alipaysubmit");
//              		submitForm.submit();
						that.$router.push({path:'/store/accountFund/wx_pay',query:{pay_status:'alipay',pay_code:jsonData.codeUrl,serial_number:jsonData.serial_number,rechargeVal:data.money}})
                	}else if(data.payCode=='weixin'){
						that.$router.push({path:'/store/accountFund/wx_pay',query:{pay_status:'wxpay',pay_code:jsonData.codeUrl,serial_number:jsonData.serial_number,rechargeVal:data.money}})
                	}
                }
            }
        })
    },
    searchMarginStatus(url,data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data:data,
            success: function (result) {
                if (result.code == 200) {
                	var jsonData = result.data;
                	if(jsonData.status==0){
                		
                	}else{
						that.$message({
							type:'success',
							message:result.msg
						})
                		clearInterval(that.searchTimer)
                		that.$router.push({path:'/store/accountFund/revenueRecord',query:{bond:'1'}})
                	}
                }
            }
        })
    },
}