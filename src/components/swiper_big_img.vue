<template>
    <transition name="fade">
		<div class="swiper">
	        <div id="scroll" class="scroll">
	            <div id="box" class="box">
	                <ul id="ul" v-show="imgSrc.length!=0">
	                    <!--<li class="li_child" v-for="child in imgSrc"><img :src="child" class="swiper_img"></li>-->
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
export default{
    props: ["imgSrc"],
	data(){
		return{
			selfWidth:800,
			 keys:0,
			 componentImg:[],
		}
	},
	created(){
		this.componentImg = this.imgSrc;
	},
	mounted(){
		var ul = document.getElementById("ul");
		for(var i = 0 ; i < this.componentImg.length;i++){
			var li = document.createElement("li");
			var img = document.createElement("img");

			li.style.float = "left";
			li.style.width = this.selfWidth + "px";
			li.style.textAlign = "center";

			img.style.margin = "140px auto";
			img.style.width = "300px";
			// img.style.height = "600px";
			img.style.display = "block";
			img.src = this.componentImg[i];

			li.appendChild(img);
			ul.appendChild(li);
		}
		this.liWidth = ul.children[0].offsetWidth;
		this.ulLis = this.componentImg;
		ul.appendChild(ul.children[0].cloneNode(true));
	},
	methods:{
		closeSwiper(){
			var ul = document.getElementById("ul");
			ul.style.left = 0;
			ul.innerHTML = '';
			this.keys = 0;
			this.$emit('clickit');
		},
		animate(obj,target){
            // 首先清除掉定时器
            clearInterval(obj.timer);
            var speed = obj.offsetLeft < target ? this.selfWidth : -this.selfWidth;
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
        moveElement(ele,x_final,interval){//ele为元素对象
        	var self = this;
	        var x_pos=ele.offsetLeft;
	        var dist=0;
	        if(ele.movement){//防止悬停
	            clearTimeout(ele.movement);
	        }
	        if(x_pos==x_final){//先判断是否需要移动
	            return;
	        }
	        dist=Math.ceil(Math.abs(x_final-x_pos)/10);//分10次移动完成
	        x_pos = x_pos<x_final ? x_pos+dist : x_pos-dist;

	        ele.style.left=x_pos+'px';

	        ele.movement=setTimeout(function(){//分10次移动，自调用10次
	            self.moveElement(ele,x_final,interval);
	        },interval)
	    },
    	arrowsRight(){
    		var ul = document.getElementById("ul");
    		if(this.keys>this.ulLis.length-1){
    			ul.style.left = 0;
    			this.keys = 0;
    		}
    		this.keys++;
    		this.moveElement(ul,-this.selfWidth*this.keys,20);
//  		this.animate(ul,-this.keys*this.liWidth);
    	},
    	arrowsLeft(){
    		var ul = document.getElementById("ul");
    		if(this.keys==0){
    			var move = (this.selfWidth*this.ulLis.length);
    			ul.style.left = -move + "px";
    			this.keys = this.ulLis.length;
    		}
    		this.keys--;
    		this.moveElement(ul,-this.selfWidth*this.keys,20);
//  		this.animate(ul,-this.keys*this.liWidth);
    	},
	}
}
</script>

<style lang="less" scoped>/*动画*/
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
.swiper{
    position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.9);
    width: 100%;
    height: 100%;
    overflow: hidden;
}
/*遮罩层样式*/
.img-layer{
    /*position: fixed;
    z-index: 999;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.7);
    width: 100%;
    height: 100%;
    overflow: hidden;*/
	.delete_btn_right{
		cursor: pointer;
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
.scroll{
    width: 800px;
    height: 900px;
    margin: 20px auto;
    overflow: hidden;
    position: relative;
    z-index:10000;
}
.box{
    width: 800px;
    height: 900px;
    overflow: hidden;
    position: relative;
}
.box ul{
    width: 600%;
    position: absolute;
    left: 0;
    top: 0;
}
.box ul li.li_child{
    float: left;
    width:800px;
    text-align: center;
    .swiper_img{
    	width:600px;
    	height: auto;
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
