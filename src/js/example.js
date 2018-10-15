/**
 * 
 * 
const userName="store1057";
const pwd = "b602925645e76b1254853e8b318d9d8b";
this.$imConn.open({
    apiUrl:Vue.prototype.$WebIM.config.apiURL,  
    user: userName,  
    pwd: pwd,  
    appKey: Vue.prototype.$WebIM.config.appkey, 
    success:function(token){
        console.log(JSON.stringify(token))
        var token = token.access_token;
        Vue.prototype.$WebIM.utils.setCookie('webim'+encryptUsername,tokenStr,1)
    },
    error:function(){

    }
})
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 * 
 */