import api from '../js/ajax';

export default{
    delimg(url,data,that,key,count){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
                if(result.code==200){
                    that.$message(result.msg)
                    if(key=="big"){
                        if(typeof(that.imageArr)=='string'){
                            that.isShow = false;
                            that.dataImageArr = '';
                            that.strCount = true;
                        }else{
                            that.dataImageArr.splice(count,1);
                        }
                    }else if(key=="small"){
                        that.$emit("deleteSmall",that.imageUrlStr);
                        that.imageUrlStr = '';
                        that.isImageUrl = false;
                    }
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    }
}
