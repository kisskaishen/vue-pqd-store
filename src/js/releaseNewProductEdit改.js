import api from '../js/ajax';

export default {
    savedraftNewrelease(url, data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
            success: function (result) {
                console.log(JSON.stringify(result))
                if (result.code == 200) {
                    that.$message(result.message);
                } else {
                    that.$message(result.message);
                }
            }
        })
    },
    getkey(url, data, that, count) {
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
            success: function (result) {
                // console.log(JSON.stringify(result))
                if (result.status == '1') {
                    if (count == '1') {
                        /*
                            获取name值 生存id值key  每个栏目生存一个id值 所以  直接放数组(this.speconelist)里面 ；
                        * */
                        that.theadOnce = true;
                        // that.goodsprice = [];
                        var onceData = { id: result.info, item: that.speOnce, val: that.speconename };
                        that.speconelist.push(onceData);
                        //  选择一个的时候 放一条进去 其他数据空就好了   放两条同样的道理 
                        //  循环两个数组
                        var arr1 = that.speconelist;
                        var arr2 = that.spectwolist;
                        if (arr2 != '' && arr2 != undefined) {
                            that.goodsprice = [];
                            for (var i = 0; i < arr1.length; i++) {
                                for (var j = 0; j < arr2.length; j++) {
                                    var list = {
                                        "key_name": that.speconename + ':' + arr1[i].item + '`' + that.spectwoname + ':' + arr2[j].item
                                    }
                                    that.goodsprice.push(list);
                                }
                            }
                        } else {
                            var list = {};
                            if (arr1.length > 0) {
                                for (var i = 0; i < arr1.length; i++) {
                                    list = {
                                        "key_name": that.speconename + ':' + arr1[i].item + '`'
                                    }
                                }
                                that.goodsprice.push(list);
                            }
                        }
                        that.speOnce = '';
                        that.addSpeOnce = false;
                    } else if (count == '2') {
                        /*
                            获取name值 生存id值key  每个栏目生存一个id值 所以  直接放数组(this.speconelist)里面 ；
                        * */
                        that.theadSec = true;
                        that.goodsprice = [];
                        var twoData = { id: result.info, item: that.speSec, val: that.spectwoname };
                        that.spectwolist.push(twoData);
                        console.log(JSON.stringify(that.spectwolist));
                        /*
                        之前是一个对象  现在是两个对象交叉  所以还是避免不了要循环了
                        */
                        var arr1 = that.speconelist;
                        var arr2 = that.spectwolist;
                        if (arr1 != '') {
                            for (var i = 0; i < arr1.length; i++) {
                                for (var j = 0; j < arr2.length; j++) {
                                    var list = {
                                        "key_name": that.speconename + ':' + arr1[i].item + '`' + that.spectwoname + ':' + arr2[j].item
                                    }
                                    that.goodsprice.push(list);
                                }
                            }
                        } else {
                            for (var i = 0; i < arr2.length; i++) {
                                var list = {
                                    "key_name": that.spectwoname + ':' + arr2[i].item + '`'
                                }
                                that.goodsprice.push(list);
                            }
                        }
                        that.speSec = '';
                        that.addSpeSec = false;
                    }
                } else {
                    that.$message(result.msg);
                }
            }
        })
    },
    //获取新产品详情
    getReleaseNewProductEdit(url, data, that) {
        var self = this;
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
            success: function (result) {

                console.log(JSON.stringify(result))
                //显示数据
                // console.log(result.detail)
                var dataJson = result;
                /*
                1。展示商品分类
                value1  value2  value3  cat_id
                2。商品标题
                listJson.goods_name
                3。商品市场价
                listJson.market_price
                4。配送地区
                region
                5。商品描述
                listJson.goods_remark
                6。首页推荐图
                  original_img
                7。类目主图
                  list_img
                8。商品详情图
                  goods_content
                9。商品规格类型
                isActive
                10。一号规格
                speconename  speconelist
                11。二号规格
                spectwoname  spectwolist
                12。table表格
                goodsprice
                13。总库存
                listJson.store_count
                14。商家编码
                listJson.goods_sn
                15。团购人数
                listJson.prom
                ** */
                that.listJson = dataJson;
                that.goodsprice = dataJson.goodsprice;
                that.self_store_count = dataJson.store_count;
                var str = dataJson.region;
                if (str != null) {
                    str = str.split(",");
                    str.pop();
                    that.checkedCities = str;
                    that.len = that.checkedCities.length;
                    // console.log(JSON.stringify(that.checkedCities))
                }
                that.goodsprice = dataJson.goodsprice;
                var str1 = dataJson.first_cat_id;
                var str2 = dataJson.second_cat_id;
                var str3 = dataJson.cat_id;
                that.value1 = (str1 + '') == 0 ? '' : (str1 + '');
                that.value2 = str2 + '' == 0 ? '' : (str2 + '');
                that.value3 = str3 + '' == 0 ? '' : (str3 + '');
                // console.log("111111"+dataJson.original_img)
                //  0,3  3,52  52,378
                // that.value1 = 5;
                // that.value2 = '64';
                // that.value3 = '470';
                that.catId = dataJson.cat_id;
                that.specOne = dataJson.specone;
                that.specTwo = dataJson.spectwo;
                // alert(dataJson.first_cat_id)
                // alert(dataJson.second_cat_id)
                // alert(dataJson.cat_id)
                if (that.value1) {
                    var data = {
                        category: that.value1
                    }
                    self.getGoodsSecCategory("/Goods/category", data, that);
                    // alert(that.value2)
                    if (that.value2) {
                        var data = {
                            category: that.value2
                        }
                        self.getGoodsThirCategory("/Goods/category", data, that)
                    }
                }

                var arrstr = that.listJson.goods_images;
                // console.log(typeof(arrstr))

                //操作 spectwolist  speconelist
                that.speconelist = dataJson.speconelist
                that.spectwolist = dataJson.spectwolist

                //展示 table
                var speconename = dataJson.speconename;
                var spectwoname = dataJson.spectwoname;
                if (speconename && !spectwoname) {
                    /**
                     * 只有一种规格的时候
                     */
                    that.theadOnce = true;
                    that.speconename = speconename;
                } else if (spectwoname && !speconename) {
                    that.theadSec = true;
                    that.spectwoname = spectwoname;
                } else if (speconename && spectwoname) {
                    /**
                     * 两种规格都存在的时候
                     * this.showSecItem = true;
                     */
                    that.active = false;
                    that.showSecItem = true;
                    that.theadSec = true;
                    that.theadOnce = true;
                    that.speconename = speconename;
                    that.spectwoname = spectwoname;
                }
            }
        })
    },
    //两种规格时
    getSecId(url, data, that, count) {
        api.commonAjax({
            method: "post",
            url: url,
            data: data,
            success: function (result) {
                // console.log(JSON.stringify(result))
                if (count == 1) {
                    that.paramsArr2up = result.info;
                } else if (count == 2) {
                    that.paramsArr2down = result.info;
                }
            }
        })
    },
    //两种规格 第二个输入框
    getSecIdInput(url, data, that) {
        api.commonAjax({
            method: "post",
            url: url,
            success: function (result) {
                // console.log(JSON.stringify(result))
                that.paramsArr2down = result.info;
                // that.options1 = result.category;
            }
        })
    },
    //一级分类
    getGoodsCategory(url, that) {
        api.commonAjax({
            method: "get",
            url: url,
            success: function (result) {
                // console.log(JSON.stringify(result))
                that.options1 = result.category;
                // alert(2)
            }
        })
    },
    //二级分类
    getGoodsSecCategory(url, that) {
        api.commonAjax({
            method: "get",
            url: url,
            success: function (result) {
                // alert(5)
                // console.log(JSON.stringify(result))
                that.options2 = result.category;
            }
        })
    },
    //三级
    getGoodsThirCategory(url, that) {
        api.commonAjax({
            method: "get",
            url: url,
            success: function (result) {
                // alert(333)
                // console.log(JSON.stringify(result))
                that.options3 = result.category;
            }
        })
    },
    //商品规格
    getSpecification(url, that) {
        api.commonAjax({
            method: "post",
            url: url,
            success: function (result) {
                // console.log(JSON.stringify(result))
                that.options4 = result.speclist;
            }
        })
    },
}