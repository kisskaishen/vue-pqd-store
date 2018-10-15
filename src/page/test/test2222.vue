<template>
    <transition name="fade">
	<div class="swiper" style="background:#eee;">
        <div id="scroll" class="scroll">
            <div id="box" class="box">
                <ul id="ulMark">
                    <li v-for="child in its"><img :src="child" class="swiper_img"></li>
                </ul>
            </div>
        </div>
        <div class="img-layer">
			<div class="delete_btn_right" @click="closeSwiper()">X</div>
        	<div @click="arrowsLeft()" class="left_arrows"><</div>
        	<div @click="arrowsRight()" class="right_arrows">></div>
        </div>
	</div>
    </transition>
</template>

<script>
//import BigImg from '../../components/bigimgtest';
export default{
	data(){
		return{
	         showImg:false,
	         its:[
	         	"https://cdn2.pinquduo.cn/15315395505b49705edcbed5ffeb920ce5515bfe7fa5fd20666e40e.jpg",
	         	"https://cdn2.pinquduo.cn/15315395515b49705f22d05744b075a581c2f2858c85dfdd390ebc8.jpg",
	         	"https://cdn2.pinquduo.cn/15315395515b49705fe61a28163173bb079b692c0b2d4cebe40678d.jpg",
	         ],
			 keys:0,
		}
	},
	props: ["imgSrc"],
	created(){
		console.log(2222)
//		console.log(this.imgSrc)
	},
	mounted(){
    		this.createdFun();
	},
   components: {
   },
	methods:{
		createdFun(){
			var ul = document.getElementById("ulMark"); 
			this.liWidth = ul.children[0].offsetWidth;
			this.ulLis = ul.children;
			console.log(this.ulLis)
			ul.appendChild(ul.children[0].cloneNode(true));
		},
		closeSwiper(){
			 this.$emit('clickit')
		},
		animate(obj,target){
            // 首先清除掉定时器
            clearInterval(obj.timer);
            var speed = obj.offsetLeft < target ? 800 : -800;
            obj.timer = setInterval(function(){
                var result = target - obj.offsetLeft;//它们的差值不会超过speed
                obj.style.left = obj.offsetLeft + speed + "px";
                // 有可能有小数的存在，所以在这里要做个判断             
                if (Math.abs(result) <= Math.abs(speed)) {
                    clearInterval(obj.timer);
                    obj.style.left = target + "px";
                }
            },10);
        },
    	arrowsRight(){
    		var ul = document.getElementById("ulMark");
    		this.keys++;
    		console.log(this.keys)
    		console.log(this.ulLis.length-1)
    		if(this.keys>this.ulLis.length-1){
    			ul.style.left = 0;
    			this.keys = 1;
    		}
    		this.animate(ul,-this.keys*this.liWidth);
    	},
    	arrowsLeft(){
    		var ul = document.getElementById("ulMark");
    		console.log(this.keys)
    		if(this.keys<2){
				if(this.keys==0){
					this.keys = this.ulLis.length-2;
				}else{
					this.keys = this.ulLis.length-1;
				}
    		}else{
    			this.keys--;
    		}
    		this.animate(ul,-this.keys*this.liWidth);
    	},
	}
}
</script>

<style lang="less" scoped>
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
/*遮罩层样式*/
.img-layer{
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    overflow: hidden;
	.delete_btn_right{
		background:#fff;
		width:50px;
		height:50px;
		color:#000;
		border-radius: 10px 0 0 80px;
		position: absolute;
		text-align: right;
		padding-right:10px;
		line-height: 40px;
		font-size:20px;
		right:0;
		top:0;
		cursor: pointer;
	}
    .left_arrows{
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
    }
}
ul,ol{
    list-style: none;
}
/*消除图片底部3像素距离*/
img{
    vertical-align: top;
}
.swiper{
	position: fixed;
	left:50%;
	top:50%;
	z-index: 444;
	margin-left:-400px;
	margin-top:-300px;
}
.scroll{
    width: 800px;
    height: 600px;
    margin: 100px auto;
    overflow: hidden;
    position: relative;
    z-index:10000;
}
.box{
    width: 800px;
    height: 600px;
    overflow: hidden;
    position: relative;
}
.box ul{
    width: 600%;
    position: absolute;
    left: 0;
    top: 0;
}
.box ul li{
    float: left;
    width:800px;
    text-align: center;
    .swiper_img{
    	width:600px;
    	height: 600px;
    	margin:0 auto;
    	display: block;
    }
}
.scroll ol{
    position: absolute;
    right: 10px;
    bottom: 10px;

}
.scroll ol li{
    float: left;
    width: 20px;
    height: 20px;
    background: pink;
    text-align: center;
    line-height: 20px;
    border-radius: 50%;
    background-color: pink;             
    margin-left:10px ;
    cursor: pointer;
}
.scroll ol li.current{
    background-color: purple;
}
</style>