<template>
  <div id="audios">
  	<div>Audio</div>
    <!--<audio id="audio" controls="controls" src="./../assets/A-Lin.mp3"></audio>-->
    <!--<audio id="audio" src="../../static/A-Lin.mp3" autoplay="autoplay"></audio>-->
    <audio id="audio" src="../../static/1.mp3" autoplay="autoplay"></audio>
    <button @click="news_notice()">来消息了</button>
  </div>
</template>

<script>
export default {
  name: 'app',
  components: {
  },
  data () {
    return {}
  },
  methods:{
  	news_notice(){
  		var audio = document.getElementById("audio");
  		audio.play();
  	}
  }
}
</script>

<style>

</style>