<template>
    <div class="search-input">
        <div class="leftLable" v-show="title">{{title}}&nbsp;&nbsp;</div><div class="rightLable">
            <el-date-picker size="small"
            v-model="picker"
            type="daterange"
            unlink-panels
            :change = pickerData()
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
        </el-date-picker>
        </div>
    </div>
</template>

<script>
 export default {
   data () {
     return {
         start:'',
         end:'',
         picker:[],
     }
   },
   created(){
  	if(this.sTime!=null||this.sTime!=''){
         this.picker.push(this.sTime);
         this.picker.push(this.eTime);
  	}
      if(this.defaultTime!=undefined){
          if(this.defaultTime.length!=0){
            this.picker =this.defaultTime;
          }
      }
   },
   props:["sTime","eTime","title","defaultTime"],
   watch:{
       sTime(newVal,oldVal){
			this.picker = [];
       		if(this.sTime!=null||this.sTime!=''){
	           this.picker.push(this.sTime);
	           this.picker.push(this.eTime);
       		}
       },
       defaultTime(newVal,oldVal){
        this.picker = newVal;
       }
   },
   methods:{
       pickerData(){
         if(this.picker!=null){
           var start = this.picker[0];
           var end = this.picker[1];
           var sd = new Date(start);
           var ed = new Date(end);
           var M = (sd.getMonth() + 1) >= 10 ? (sd.getMonth() + 1) : ('0'+ (sd.getMonth() + 1));
           var D = sd.getDate() >= 10 ? sd.getDate() : ('0' + sd.getDate());
           var EM = (ed.getMonth() + 1) >= 10 ? (ed.getMonth() + 1) : '0'+ (ed.getMonth() + 1);
           var ED = ed.getDate() >= 10 ? ed.getDate() : '0' + ed.getDate();
           var starts = sd.getFullYear() + '-' + M + '-' + D;
           var ends = ed.getFullYear() + '-' + EM + '-' + ED;
            var arrPicker = [];
            arrPicker.push(starts)
            arrPicker.push(ends)
            this.$emit('onPassByVal',arrPicker);
         }else{
              this.$emit('onPassByVal',arrPicker);
         }
       }
   }
 }
</script>

<style lang="less" scoped>
.search-input{
    display: inline-block;
    overflow: hidden;
    /*margin-bottom:10px;*/
    width:328px;
    .leftLable{
        float:left;
        width:110px;
        height:32px;
        text-align: right;
        line-height: 32px;
        display: block;
    }
    .rightLable{
        float:left;
        display: block;
        width:192px;
        height:37px;
	    .el-date-editor--daterange.el-input,
	    .el-date-editor--daterange.el-input__inner,
	     .el-date-editor--timerange.el-input,
	     .el-date-editor--timerange.el-input__inner{
	        width:215px;
	    }
    }
}
</style>
