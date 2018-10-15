

<template>
    <div class="search_input_picker">
        <div class="leftLable" v-show="title">{{title}}&nbsp;&nbsp;</div>
        <div class="rightLable">
            <div class="item_picker">
	            <el-date-picker
	            	   size="small"
	                   v-model="value1"
	                   type="date"
	                   :clearable="false"
            			:change = pickerDataStart()
	                   placeholder="开始日期"
	                   :picker-options="pickerOptions0">
	            </el-date-picker>
            </div>
            <div class="item_picker">
	            <el-date-picker
	            	   size="small"
	                   v-model="value2"
	                   :focus = focusEnd()
	                   type="date"
	                   :clearable="false"
            			:change = pickerDataEnd()
	                   placeholder="结束日期"
	                   :picker-options="pickerOptions1">
	            </el-date-picker>
            </div>
    	</div>
    </div>
</template>

<script>
    export default {
        data(){
            return {
            	count:0,
            	flag:true,
	            picker:true,
	            value1:'',
	            value2:'',
	            pickerOptions0: {},
	            pickerOptions1: {
	                //disabledDate是日期组件的一个方法
	                disabledDate: (time) => {   
		                    //这里就涉及到日期的指定了  setMonth()函数可以设置月份              
		                    let currentTime = this.value1;     
		                    let threeMonths = currentTime.setMonth(currentTime.getMonth()+6);   
		                    //一开始我没加下面减三个月的那个语句，他的值会一直累加                            
		                    currentTime.setMonth(currentTime.getMonth()-6)
		                    return time.getTime() < this.value1 || time.getTime() > threeMonths ; 
	                }
                }
            }      
        },
   		props:["sTime","eTime","title"],
   		watch:{
   			value1(newVal,oldVal){
   			}
   		},
   		created(){
   			this.value1 = this.sTime;
   			this.value2 = this.eTime;
   			if(this.value1!=''){
	   			this.count++;
	   			console.log(this.count)
   			}
   		},
   		methods:{
   			pickerDataStart(){

   			},
   			focusEnd(){
   				console.log(this.count)
   			},
   			pickerDataEnd(){
   				console.log(this.count)
// 				if(this.value1!='')
   				     if(this.value1!=''&&this.value2!=''){
			           var start = this.value1;
			           var end = this.value2;
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
			         	return
//			              this.$emit('onPassByVal',arrPicker);
			         }
   			}
   		}
    }     
</script>