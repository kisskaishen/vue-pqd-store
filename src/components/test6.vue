<template>
 <div>
	<ul class="border_img">
		<li class="item" v-for="item in arrImg">
			{{item}}
		</li>
	</ul>
 </div>
</template>

<script>
 export default {
   data () {
     return {
		arrImg:[
			"第一张图",
			"第二张图",
			"第三张图",
			"第四张图",
		]
     }
   },
   created(){
   },
   components: {

   },
   methods:{

   },
   mounted(){
   	
//	var drag_img = document.getElementsByClassName("drag_img");
	var border_img = document.getElementsByClassName("border_img")[0];
	drag(border_img);
	function drag(obj) {
		var dragObj;
		console.log(obj.offsetLeft)
		console.log(obj.offsetTop)
		console.log(obj.offsetHeight)
		console.log(obj.offsetWidth)
		var targetLeft = obj.offsetLeft;
		var targetTop = obj.offsetTop;
		var targetHeight = obj.offsetHeight;
		var targetWidth = obj.offsetWidth;
		obj.onmousedown = function(ev) {
			var ev = ev || event;
			var disX = ev.clientX - this.offsetLeft;
			var disY = ev.clientY - this.offsetTop;
			dragObj = event.target;
			console.log(dragObj)
			if ( obj.setCapture ) {
				obj.setCapture();
			}
			document.onmousemove = function(ev) {
				var ev = ev || event;
				var L = ev.clientX - dragObj.offsetWidth/2;
				var T = ev.clientY - dragObj.offsetHeight/2;
//				var L = ev.clientX - dragObj.offsetWidth;
//				var T = ev.clientY - dragObj.offsetHeight;
//				console.log(dragObj.offsetLeft)
				console.log(T)
//					console.log(targetWidth)
//					console.log(dragObj.offsetWidth)
				if(L < 0){
					if(L < 0 && T < 0){
						L = 0;
						T = 0;
					}else{
						L = 0;
					}
				}else if(L > (targetWidth - dragObj.offsetWidth) ){
					L = targetWidth - dragObj.offsetWidth;
				}
				if(T < 0){
					T = 0;
				}else if(T > (targetHeight - dragObj.offsetHeight) ){
					T = targetHeight - dragObj.offsetHeight;
				}
				dragObj.style.left = L + 'px';
				dragObj.style.top = T + 'px';
			}
			document.onmouseup = function() {
				document.onmousemove = document.onmouseup = null;
				if ( obj.releaseCapture ) {
					obj.releaseCapture();
				}
			}
			return false;
		}
	}
   }
 }
</script>

<style>
*{
	padding:0;
	margin:0;
}
.border_img{
	overflow: hidden;
	position: relative;
	width:600px;
	top:0px;
	left:0px;
}
.border_img li{
	float:left;
	width:200px;
	height:200px;
	line-height: 200px;
	border:1px solid #eee;
	margin:-1px;
	text-align: center;
	cursor: pointer;
}
.border_img li img{
	width:200px;
	height:200px;
	position: absolute;
}
.select{
	position: absolute;
	z-index: 999;
}
 
</style>
