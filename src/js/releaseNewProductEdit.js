import api from '../js/ajax';

export default{
    upDownSale(url,data,that,params){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
                if(result.code==200){
                	if(data.action=="up"){
                		console.log("up")
                		params.is_on_sale='1';
                		params.is_on_sale_text='上架';
                	}else if(data.action=="down"){
                		console.log("down")
                		params.is_on_sale='0';
                		params.is_on_sale_text='下架';
                	}
                    that.$message({
                        type: 'success',
                        message: result.msg
                    });
                }else{
                    that.$message({
                        type: 'info',
                        message: result.msg
                    });
                }
            }
        })
    },
    savedraftNewrelease(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
                if(result.code==200){
                    that.$router.push({ "path":'/store/productManager/releaseNewProducts'})
                    that.$message({
                        type:'success',
                        message: result.msg
                    });
                }else{
                    that.$message({
                        type: 'info',
                        message: result.msg
                    });
                }
            }
        })
    },
    getkey(url,data,that,count){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
                if(result.code==200){
                    if(count=='1'){
                        /*
                            获取name值 生存id值key  每个栏目生存一个id值 所以  直接放数组(this.speconelist)里面 ；
                        * */
                        that.theadOnce = true;
                        // that.goodsprice = [];
                        var onceData = {id:result.info,item:that.speOnce,val:that.speconename};
                        that.speconelist.push(onceData);
                        //  选择一个的时候 放一条进去 其他数据空就好了   放两条同样的道理
                        //  循环两个数组
                        var arr1 = that.speconelist;
                        var arr2 = that.spectwolist;
                        if(arr2!=''&&arr2!=undefined){
                            that.goodsprice = [];
                            for(var i=0;i<arr1.length;i++){
                                for(var j=0;j<arr2.length;j++){
                                    var list = {
                                        "key_name" : that.speconename+':'+arr1[i].item +'`'+ that.spectwoname+':'+arr2[j].item
                                    }
                                    that.goodsprice.push(list);
                                }
                            }
                        }else{
                            var list = {};
                            if(arr1.length>0){
                                for(var i=0;i<arr1.length;i++){
                                    list = {
                                        "key_name" : that.speconename+':'+arr1[i].item +'`'
                                    }
                                }
                                that.goodsprice.push(list);
                            }
                        }
                        that.speOnce = '';
                        that.addSpeOnce = false;
                    }else if(count=='2'){
                        /*
                            获取name值 生存id值key  每个栏目生存一个id值 所以  直接放数组(this.speconelist)里面 ；
                        * */
                        that.theadSec = true;
                        that.goodsprice = [];
                        var twoData = {id:result.info,item:that.speSec,val:that.spectwoname};
                        that.spectwolist.push(twoData);
                        /*
                        之前是一个对象  现在是两个对象交叉  所以还是避免不了要循环了
                        */
                        var arr1 = that.speconelist;
                        var arr2 = that.spectwolist;
                        if(arr1!=''){
                            for(var i=0;i<arr1.length;i++){
                                for(var j=0;j<arr2.length;j++){
                                    var list = {
                                        "key_name" : that.speconename+':'+arr1[i].item +'`'+ that.spectwoname+':'+arr2[j].item
                                    }
                                    that.goodsprice.push(list);
                                }
                            }
                        }else{
                            for(var i=0;i<arr2.length;i++){
                                var list = {
                                    "key_name" : that.spectwoname+':'+arr2[i].item +'`'
                                }
                                that.goodsprice.push(list);
                            }
                        }
                        that.speSec = '';
                        that.addSpeSec= false;
                    }
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    //获取新产品详情
    getReleaseNewProductEdit(url,data,that){
        var self = this;
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
                if (result.code == 200) {
                    var jsonData = result.data;
                    var one_cate_id = jsonData.one_cate_id;
                    var two_cate_id = jsonData.two_cate_id;
                    that.firstCategory = jsonData.one_cate_id;
                    that.secCategory = jsonData.two_cate_id;
                    that.thirthCate = jsonData.cat_id;
                    if(jsonData.is_haitao){
						that.secCategory= jsonData.cat_id;
					}else{
						that.thirthCate = jsonData.cat_id;
					}
					this.catId = jsonData.cat_id;
                    if (one_cate_id) {
                        var data = {
                            category: one_cate_id
                        }
                        self.getGoodsSecCategory("Goods/category", data, that);
                        if (two_cate_id&&!jsonData.is_haitao) {
                            var data = {
                                category: two_cate_id
                            }
                            self.getGoodsThirCategory("Goods/category", data, that);
                        }
                    }
                    that.listJson = jsonData;
                    if(jsonData.is_limit_num==2){
                    	that.isLimitDialog = true;
				          that.ruleForm.limit_single_num = that.listJson.limit_single_num;
				          that.ruleForm.limit_order_num = that.listJson.limit_order_num;
				          that.ruleForm.limit_total_num = that.listJson.limit_total_num;
				          that.ruleForm.limit_num_start_time = that.listJson.limit_num_start_time;
				          that.ruleForm.limit_num_end_time = that.listJson.limit_num_end_time;
                    }
                    that.accountNum = that.listJson.goods_name.gblen()[1];
                    var regionArr = jsonData.region;
                    if (regionArr != null) {
                        that.checkedCities = regionArr.split(',');
                    }
                    var item = jsonData.spec_goods_price;
                    that.self_store_count = jsonData.store_count;


                    var speconelistArr = item.specone.items;
                    var spectwolistArr = item.spectwo.items;
                    speconelistArr.forEach((value, index) => {
                        that.speconelist.push(value.name)
                    });
                    if (spectwolistArr.length!=0){
                        spectwolistArr.forEach((value, index) => {
                            that.spectwolist.push(value.name)
                        });
                    }

                    that.specone = jsonData.specone;
                    that.spectwo = jsonData.spectwo;

                    that.speconename = item.specone.name;
                    that.spectwoname = item.spectwo.name;

                    that.goodsprice = item.spec_goods.items;
                    if (that.spectwolist.length!=0){
                        that.isActive = false;
                        that.showSecItem = true;
                    }
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    //两种规格时
    getSecId(url,data,that,count){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
                if (result.code == 200) {
                    if (count == 1) {
                        that.paramsArr2up = result.info;
                    } else if (count == 2) {
                        that.paramsArr2down = result.info;
                    }
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    //两种规格 第二个输入框
    getSecIdInput(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
            success:function(result){
                 if (result.code == 200) {
                     that.paramsArr2down = result.info;
                } else {
                    that.$message({
                        type: 'info',
                        message: result.msg
                    })
                }
            }
        })
    },
    //一级分类
    getGoodsCategory(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success: function (result) {
                if (result.code==200) {
                    that.options1 = result.data;
                } else {
//                  that.$message({
//                      type: 'info',
//                      message: result.msg
//                  })
                }
            }
        })
    },
    //二级分类
    getGoodsSecCategory(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success: function (result) {
                if (result.code==200) {
                    that.options2 = result.data;
                } else {
//                  that.$message({
//                      type: 'info',
//                      message: result.msg
//                  })
                }
            }
        })
    },
    //三级
    getGoodsThirCategory(url,data,that){
        api.commonAjax({
            method:"post",
            url:url,
            data:data,
            success:function(result){
                if (result.code==200){
                    that.options3 = result.data;
                }else{
//                  that.$message({
//                      type:'info',
//                      message:result.msg
//                  })
                }
            }
        })
    },
    //商品规格
    getSpecification(url,that){
        api.commonAjax({
            method:"post",
            url:url,
            success: function (result) {
                if (result.code == 200) {
                    that.options4 = result.data;
                    // that.options4.unshift({ id: '0', name: '请选择' })
                } else {
//                  that.$message({
//                      type: 'info',
//                      message: result.msg
//                  })
                }
            }
        })
    },
}
