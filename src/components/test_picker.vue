<template>
    <div class="search_input_picker">
        <div class="leftLable" v-show="title">{{title}}&nbsp;&nbsp;</div>
        <div class="rightLable">
            <el-date-picker
            	size="small"
		      v-model="picker"
		      type="daterange"
            :change = pickerData()
		      start-placeholder="开始日期"
		      end-placeholder="结束日期"
		      :picker-options="pickerOptions0">
		    </el-date-picker>
    	</div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
         		picker:[],
			    pickerOptions0: {
		          disabledDate(time) {
			            let curDate = (new Date()).getTime();
			            let three = 180 * 24 * 3600 * 1000;
			            let threeMonths = curDate - three;
			            return time.getTime() > Date.now() || time.getTime() < threeMonths;
		          }
        		},
            }      
        },
	   created(){
		if(this.sTime!=null||this.sTime!=''){
	       this.picker.push(this.sTime);
	       this.picker.push(this.eTime);
		}
	   },
   		props:["sTime","eTime","title"],   
   		watch:{
       		sTime(newVal,oldVal){
				this.picker = [];
	       		if(this.sTime!=null||this.sTime!=''){
		           this.picker.push(this.sTime);
		           this.picker.push(this.eTime);
	       		}
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