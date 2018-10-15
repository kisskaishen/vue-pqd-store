<template>
    <!-- 过渡动画 -->
    <transition name="fade">
        <div class="img-view" @click="bigImg">
            <!-- 遮罩层 -->
            <div class="img-layer">
            	<!--<div @click="arrowsLeft()" class="left_arrows"><</div>
            	<div @click="arrowsRight()" class="right_arrows">></div>-->
            </div>
            <div class="img">
            	<!--<div class="img_warps" id="img_warps" style="position: absolute;left:0;">-->
                	<img class="show_imgs" :src="imgSrc">
            	<!--</div>-->
            </div>
        </div>
    </transition>
</template>
<script>
export default {
    props: ["imgSrc","index"],
    created(){
    	console.log(111)
    },
    methods: {
    	arrowsRight(){
    		var img_warps = document.getElementById("img_warps");
    		var move = parseInt(img_warps.style.left);
    		var count = 300;
    		img_warps.style.left = (move+count)+'px';
    		console.log(img_warps.style.left)
    	},
    	arrowsLeft(){
    		console.log(22222)
    	},
        bigImg() {
            // 发送事件
            this.$emit('clickit')
        }
    }
}
</script>
<style scoped lang="less">
/*动画*/
.fade-enter-active,
.fade-leave-active {
    transition: all .2s linear;
    /*transform: translate3D(0, 0, 0);*/
	/*transform:scale(1.5);*/
}

.fade-enter,
.fade-leave-active {
    /*transform: translate3D(100%, 0, 0);*/
   transform-origin : center;
	transform:scale(0);
}


/* bigimg */

.img-view {
    position: fixed;
    width: 100%;
    left: 0;
    top: 0;
    bottom:0;
    top:0;
    z-index:999;
}

/*遮罩层样式*/
.img-view .img-layer {
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    overflow: hidden;
    /*.left_arrows{
    	position: absolute;
    	left:40px;
    	top:50%;
    	width:40px;
    	height:40px;
    	line-height: 40px;
    	text-align: center;
    	font-weight: bold;
    	font-size:24px;
    	border-radius: 50%;
    	background: #fff;
    	z-index: 10001;
    	cursor: pointer;
    }
    .right_arrows{
    	position: absolute;
    	right:40px;
    	top:50%;
    	width:40px;
    	height:40px;
    	line-height: 40px;
    	text-align: center;
    	font-weight: bold;
    	font-size:24px;
    	border-radius: 50%;
    	background: #fff;
    	z-index: 10001;
    	cursor: pointer;
    }*/
}

/*不限制图片大小，实现居中*/
.img-view .img{
    max-width: 100%;
    display: block;
    width:960px;
    height:100%;
    position:relative;
    left: 50%;
    top:100px;
    margin-left:-480px;
    z-index: 1000;
    overflow: hidden;
    text-align: center;
    img{
    	height:700px;
    	margin:0 auto;
    }
}
/*.img-view .img .img_warps {
	position: absolute;
	left:0;
	top:0;
	width:2000px;
	height:400px;
	overflow: hidden;
	.show_imgs{
		float:left;
		height:400px;
		display: block;
	}
}*/
</style>