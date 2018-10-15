import axios from 'axios';
import Vue from 'vue'
import Router from '../router/index'
import { Message } from 'element-ui';
import { Loading } from 'element-ui';
let qs = require("qs");

const root = process.env.API_ROOT;
//开发测试环境
axios.defaults.baseURL = root;
Vue.prototype.headerCommon = root;

//测试环境
//axios.defaults.baseURL = 'https://storeapitest.pinquduo.cn';
//Vue.prototype.headerCommon = "https://storeapitest.pinquduo.cn";

//正式环境
// axios.defaults.baseURL = 'https://storeapi.pqdshop.com';
// Vue.prototype.headerCommon = "https://storeapi.pqdshop.com";

//const root = process.env.API_ROOT;
	

	
var configUrl = {
	preUrl: "mygladmin.pinquduo.top", 
	preUrlStore: "store.pinquduo.top", 
	testUrl: "testmygladmin.pinquduo.cn", 
	testUrlStore: "teststore1.pinquduo.cn",
	prodUrl: "mygladmin.pinquduo.cn", 
	prodUrlStore: "sell.pinquduo.cn", 
}
var currentHostTop = configUrl.preUrlStore;
var currentHostCn = configUrl.testUrlStore;
var currentHostCom = configUrl.prodUrlStore;

var topRoot  = 'http://storeapitest.pinquduo.top';
var testRoot = 'https://storeapitest.pinquduo.cn';
var comRoot  = 'https://storeapi.pqdshop.com';

var k_host = window.location.host;
if(k_host == currentHostTop){
	axios.defaults.baseURL = topRoot;
	Vue.prototype.headerCommon = topRoot;
}else if(k_host == currentHostCn){
	axios.defaults.baseURL = testRoot;
	Vue.prototype.headerCommon = testRoot;
}else if(k_host == currentHostCom){
	axios.defaults.baseURL = comRoot;
	Vue.prototype.headerCommon = comRoot;	
}else if(k_host=='192.168.1.201:8087'){
	if(root=='http://store.pinquduo.top'){
		axios.defaults.baseURL = topRoot;
		Vue.prototype.headerCommon = topRoot;
	}else if(root=='teststore1.pinquduo.cn'){
		axios.defaults.baseURL = testRoot;
		Vue.prototype.headerCommon = testRoot;
	}else if(root=='sell.pinquduo.cn'){
		axios.defaults.baseURL = comRoot;
		Vue.prototype.headerCommon = comRoot;	
	}	
}

// localStorage.setItem("access_token", data.access_token)
// var token_type = localStorage.getItem("token_type");
export default{
   commonAjax(opts){
        if(!opts)return;
       var options = {
           fullscreen: true,
           lock: false,
           body: true,
       }
       Loading.service(options);
        var that = this;
        var url = opts.url ? opts.url : null;
        var data = opts.data ? opts.data : {};
        var params = opts.params ? opts.params : {};
       var header = { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' };
       var token = localStorage.getItem("token");
       if (token){
           header["Authorization"] = token;
           Vue.prototype.headers = {
               "Authorization": token
           }
        }
        axios({
            method : (opts.method ? opts.method : "get"),
            url : url,
            data: qs.stringify(data),
            params: params,
            headers:header,
        }).then(function (response) {
            that.successhander(response, opts, options);
            }, function (response, gg, ggg) {
                let loadingInstance = Loading.service(options);
                Vue.nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
                    loadingInstance.close();
                });
                that.errorhander(response, opts, options);
        })
    },
    successhander(res, opts, options) {
        var data = res.data;
            let loadingInstance = Loading.service(options);
	            Vue.nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭
	                loadingInstance.close();
	            });
        if(data==null){
            Message({ type: 'info', message: data.msg }); 
            return 
        }else{
            var status = data.code;
            var msg = data.msg;
             if (status == '8100' || status == '8101') {
                Router.push('/')
            }else{
                if (msg == "") {
                    Message({ type: 'info', message: data.msg }); 
                } else {
                    opts.success(data)
                }
            } 
        }
    },
    errorhander(res, opts) {
        var data = res.data;
        Message({ type: 'info', message: "网络异常！" });
        opts.error ? opts.error(data) : '';
    }
}











































///*重新封装ajax*/
//import Vue from 'vue'
//import axios from 'axios'
//export default{
//	commAjax(opts) {
//		if(!opts) return false;
//		var that = this;
//		var url = (opts.url ? opts.url : null);
//		var params = opts.params ? opts.params : {};
//		var header = {'Access-Control-Allow-Origin':'*','X-Requested-With': 'XMLHttpRequest','Content-Type': 'application/json;charset=UTF-8'};
////		"Authorization":"Bearer " +asstoken''
//		axios({
//			method : (opts.method ? opts.method : "get"),
//			url : url,
//			params : params,
//			headers: header,
//		}).then(function(response) {
//			 console.log(response)
//			 console.log(opts)
////			that.callbankSussess(response,opts);
//		},function(response) {
//			 console.log(response)
//			 console.log(opts)
////			that.callBankError(response,opts);
//		})
//	}
//}

