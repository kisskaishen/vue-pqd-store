// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import md5 from 'js-md5';
import webim from './js/webim/webim';
import axios from 'axios';
let Base64 = require('js-base64').Base64;
import router from './router'

/*
 富文本编辑器
 * */
import VueQuillEditor from 'vue-quill-editor'

// require styles
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor, /* { default global options } */)


import VueWechatTitle from 'vue-wechat-title';
Vue.use(VueWechatTitle)

import base from './js/base';
//Vue.use(base);
axios.defaults.timeout =  15000;

import VueQriously from 'vue-qriously'
Vue.use(VueQriously)
// import VueQr from 'vue-qr'
// Vue.use(VueQr)

Vue.prototype.$md5 = md5;
Vue.prototype.$Base64 = Base64;

import vuePicturePreview from 'vue-picture-preview'
Vue.use(vuePicturePreview)

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(ElementUI);

String.prototype.gblen = function() {
    var len = 0;
    var count1 = 0;
    var count2 = 0;
    for (var i=0; i<this.length; i++) {
        if (this.charCodeAt(i)>127 || this.charCodeAt(i)==94) {
             len += 2;
             count1++;
         } else {
             len ++;
             count2++;
         }
     }
     if(len>=60){
       return [i,len,count1,count2]
     }else{
       return [i,len,count1,count2]
     }
    // return [len,count1,count2];
}
Vue.prototype.qcArrFun = function(arr,arr1){
	  var a=[];var b=[];var r;
    for(var i=0;i<arr.length;i++){
        var index=arr1.indexOf(arr[i]);
        if(index!=-1){
            var r=a[i];
            for(var j=index;j<arr1.length;j++){
                if(arr1[j]==arr[i]){
                    arr1.splice(j,1);
                    j=j-1;
                }
            }
            for(var k=i+1;k<arr.length;k++){
                    if(arr[k]==arr[i]){
                        arr.splice(k,1);
                        k=k-1;
                    }
            }
            arr.splice(i,1);
            i=i-1;
        }
    }
    return arr.concat(arr1);
}

Date.prototype.formatChat = function (timestamp){
  if (isNaN(timestamp) || timestamp == 0) {
    return '';
  };
  function zeroize(num) {
    return (String(num).length == 1 ? '0' : '') + num;
  }
  var curTimestamp = parseInt(new Date().getTime() / 1000); //当前时间戳
  var timestampDiff = curTimestamp - timestamp; // 参数���间戳与当前时间戳相差秒数

  var curDate = new Date(curTimestamp * 1000); // 当前时间日期对象
  var tmDate = new Date(timestamp * 1000);  // 参数时间戳转换成的日期对象
  var Y = tmDate.getFullYear(), m = tmDate.getMonth() + 1, d = tmDate.getDate();
  var H = tmDate.getHours(), i = tmDate.getMinutes(), s = tmDate.getSeconds();

  if (timestampDiff < 60) { // 一分钟以内
    return "刚刚";
    //            } else if( timestampDiff < 3600 ) { // 一小时前之内
    //                return Math.floor( timestampDiff / 60 ) + "分钟前";
  } else if (curDate.getFullYear() == Y && curDate.getMonth() + 1 == m && curDate.getDate() == d) {
    return zeroize(H) + ':' + zeroize(i);
  } else {
    if (curDate.getFullYear() == Y) {
      return zeroize(m) + '-' + zeroize(d);
    } else {
      return Y + '-' + zeroize(m) + '-' + zeroize(d);
    }
  }
}
Vue.filter('formatDate', function (times) {
    var timer = null;
    clearInterval(timer);
    timer = setInterval(function () {
      var day = 0,
        hour = 0,
        minute = 0,
        second = 0;//时间默认值
      if (times > 0) {
        day = Math.floor(times / (60 * 60 * 24));
        hour = Math.floor(times / (60 * 60)) - (day * 24);
        minute = Math.floor(times / 60) - (day * 24 * 60) - (hour * 60);
        second = Math.floor(times) - (day * 24 * 60 * 60) - (hour * 60 * 60) - (minute * 60);
      }
      if (day <= 9) day = '0' + day;
      if (hour <= 9) hour = '0' + hour;
      if (minute <= 9) minute = '0' + minute;
      if (second <= 9) second = '0' + second;
      var showTime = day + "天:" + hour + "小时：" + minute + "分钟：" + second + "秒";
      if (times <= 0) {
        clearInterval(timer);
      }
      times--;
      return showTime
  }, 1000);
});
Date.prototype.format = function(fmt) {
  var o = {
     "M+" : this.getMonth()+1,                 //月份
     "d+" : this.getDate(),                    //日
     "h+" : this.getHours(),                   //小时
     "m+" : this.getMinutes(),                 //分
     "s+" : this.getSeconds(),                 //秒
     "q+" : Math.floor((this.getMonth()+3)/3), //季度
     "S"  : this.getMilliseconds()             //毫秒
 };
 if(/(y+)/.test(fmt)) {
         fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length));
 }
  for(var k in o) {
     if(new RegExp("("+ k +")").test(fmt)){
          fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length)));
      }
  }
 return fmt;
}



/**webim */
Vue.prototype.webimLogin = "https://a1.easemob.com/1165160929115391/pqd/token";
/**webim聊天 */
// Vue.prototype.webiminfo = "https://pinquduo.cn/api_2_0_2/";
// Vue.prototype.webiminfo = "http://storeapitest.pinquduo.top/";
// Vue.prototype.webiminfo = "https://pinquduo.cn/api_2_0_2/";
// http://storeapitest.pinquduo.top
/**webim聊天 上传图片 */
Vue.prototype.webimUpload = "https://a1.easemob.com/1165160929115391/pqd/chatfiles";

import WebIM from 'easemob-websdk';
Vue.prototype.$webim = WebIM;

WebIM.config = {
  xmppURL: 'im-api.easemob.com',
  apiURL: (location.protocol === 'https:' ? 'https:' : 'http:') + '//a1.easemob.com',
  // appkey: 'chengzi#pingquduo',
  appkey: '1165160929115391#pqd',
  // appkey: 'easemob-demo#chatdemoui',
  https: true,
  isMultiLoginSessions: true,
  isAutoLogin: true,
  isWindowSDK: false,
  isSandBox: false,
  isDebug: false,
  autoReconnectNumMax: 3000000,
  autoReconnectInterval: 20,
  isWebRTC: (/Firefox/.test(navigator.userAgent) || /WebKit/.test(navigator.userAgent)) && /^https\:$/.test(window.location.protocol),
  heartBeatWait: 4500,
  isHttpDNS: false,
  msgStatus: true,
  delivery: true,
  read: true,
  saveLocal: false,
  encrypt: {
    type: 'none'
  }
}
//创建链接
const conn = new WebIM.connection({
  isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
  https: typeof WebIM.config.https === 'boolean' ? WebIM.config.https : location.protocol === 'https:',
  url: WebIM.config.xmppURL,
  heartBeatWait: WebIM.config.heartBeatWait,
  autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
  autoReconnectInterval: WebIM.config.autoReconnectInterval,
  apiUrl: WebIM.config.apiURL,
  isAutoLogin: true
})
Vue.prototype.$im_conn = conn;



Array.prototype.contains = function (obj) {
       var i = this.length;
       while (i--) {
        if (this[i] == obj) {
          return true;
    }
  }
  return false;

};
Vue.prototype.removeObjWithArr = function (_arr, _obj) {
  var length = _arr.length;
  for (var i = 0; i < length; i++) {
    if (_arr[i] == _obj) {
      if (i == 0) {
        _arr.shift(); //删除并返回数组的第一个元素
        return;
      }
      else if (i == length - 1) {
        _arr.pop();  //删除并返回数组的最后一个元素
        return;
      }
      else {
        _arr.splice(i, 1); //删除下标为i的元素
        return;
      }
    }
  }
}



  router.beforeEach(function (to, from, next) {
  const nextRoute = [
    'index',
    'orderList',
    'customerServiceList',
    'releaseNewProducts',
    'productList',
    'shemeProductList',
    'revenueRecord',
    'accountManager',
    'storeInfo',
    'IllegalInformation',
    'passwordSecurity',
    'thirdPartyTools',
    'messageSetting',
    'accountList',
    'marketing_active',
  ];
  var rout = to.name;
  var keys = '';
    if (rout =='index'){
      keys = '1'
    } else if (rout == 'orderList'||rout == 'orderDetail'){
      keys = '2-1'
    } else if (rout == 'customerServiceList'||rout == 'customerServiceDetail') {
      keys = '2-2'
    } else if (rout == 'releaseNewProducts') {
      keys = '3-1'
    } else if (rout == 'productList') {
      keys = '3-2'
    }else if (rout == 'shemeProductList') {
      keys = '3-3'
    } else if (rout == 'revenueRecord'||rout == 'recharge'||rout == 'wx_pay') {
      keys = '4-1'
    } else if (rout == 'accountManager') {
      keys = '4-2'
    } else if (rout == 'storeInfo') {
      keys = '5-1'
    } else if (rout == 'IllegalInformation') {
      keys = '5-2'
    } else if (rout == 'passwordSecurity') {
      keys = '5-3'
    }else if (rout == 'messageSetting') {
      keys = '6-1'
    } else if (rout == 'accountList' ) {
      keys = '7-1'
    } else if (rout == 'marketing_active'||rout == 'marketing_detail'||rout == 'marketing_goods') {
      keys = '8-1'
    } else if (rout == 'shopCoupons'||rout == 'couponListDetail') {
      keys = '9-1'
    } else if (rout == 'couponStatistics') {
      keys = '9-2'
    }else if (rout == 'thirdPartyTools') {
      keys = '10-1'
    }else if (rout == 'evaluate') {
      keys = '11-1'
    }
  	Vue.prototype.nextRouteArr = keys;
  		next();
  });

window.eventBus  = new Vue();
  /* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
