
<style lang="less" scoped>
@import "../less/config.less";
.entry_bond{
      text-align: center;
  .bond_warp{
      margin:160px auto;
      position: relative;
        width:786px;
        height:543px;
      img{
          width:786px;
          height:543px;
      }
      .store_name{
          position: absolute;
          left:305px;
          top:278px;
          color:#fff;
          font-size:24px;
      }
      .cash{
          position: absolute;
          left:305px;
          top:322px;
          color:#fff;
          font-size:24px;
      }
  }  
}
</style>
<template>
    <div class="entry_bond">
        <div class="bond_warp">
            <img src="../img/login/entry_bond.jpg" alt="">
            <div class="store_name">{{store_name}}</div>
            <div class="cash">{{store_margin}}</div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return {
                store_name:'',
                store_margin:'',
            }
        },
        created(){
            this.store_name = localStorage.getItem("storeName")
            this.store_margin = localStorage.getItem("store_margin")
        }
    }
</script>

