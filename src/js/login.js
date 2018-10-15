import api from '../js/ajax';
let qs = require("qs");
import Vue from 'vue';
import axios from 'axios';

export default{
    login(url,params,that){
        axios({
            method: 'post',
            url: url,
            data: qs.stringify(params),
        }).then(function (response) {
                 var result = response.data;
                if (result.code == 200) {
                    var data = result.data;
                    localStorage.setItem("token", data.token)
                    localStorage.setItem("is_haitao", data.is_haitao)
                    localStorage.setItem("store_logo", data.store_logo);
                    localStorage.setItem("storeName", data.store_name)
                    localStorage.setItem("store_margin", data.margin)
                    localStorage.setItem("mobile", data.mobile)
                    if(data.is_opened!=1){
                        that.$router.push("/store/accountFund/recharge")
                    }else {
                        Vue.prototype.headers = {
                            "Authorization": data.token
                        }
                        that.$router.push("/store")
                    }
                }else{
                    that.$message({
                        type:'info',
                        message:result.msg
                    })
                }
        }, function (response, gg, ggg) {

        })
    },
    logout(url, that) {
        /* 注销登录  passport/logout*/
        api.commonAjax({
            method: "post",
            url: url,
            success: function (result) {
                if (result.code == '200') {
              	    localStorage.removeItem("token");
                    that.$router.push("/");
                }
            }
        })
    },
}