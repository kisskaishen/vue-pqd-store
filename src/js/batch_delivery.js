import api from '../js/ajax';

export default {
    batchShip(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
            	if(result.code==200){
            		that.$message({
            			type:'success',
            			message:result.msg
            		})
            	}else{
            		that.$message({
            			type:'info',
            			message:result.msg
            		})
            	}
            }
        })
    }
}