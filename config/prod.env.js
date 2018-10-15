'use strict'
//module.exports = {
//NODE_ENV: '"production"'
//}
const target = process.env.npm_lifecycle_event;
if (target == 'buildtest') {
　　//测试
　　var obj = {
	　　NODE_ENV: '"production"',
	　　//post用当前域名
	　　API_ROOT: '"https://storeapitest.pinquduo.cn"',
　　}
}else if(target == 'buildpre'){
	
　　//开发
　　var obj = {
	　　NODE_ENV: '"production"',
	　　//post用当前域名
	　　API_ROOT: '"http://storeapitest.pinquduo.top"',
　　}
} else if(target == 'buildprod'){
	
　　//生产
　　var obj = {
	　　NODE_ENV: '"production"',
	　　//post用当前域名
	　　API_ROOT: '"https://storeapi.pqdshop.com"',
　　}
}else{
　　//线上
　　var obj = {
　　NODE_ENV: '"production"',
　　//post用当前域名
　　API_ROOT: '"https://storeapi.pqdshop.com"',
　　}
}
module.exports = obj;