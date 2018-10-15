<template>
 <div class="releaseNewProductEdit">
     <div class="common-top-title">发布新商品</div>
     <div class="item">
       <div class="title">商品关键信息</div>
      <div class="content">
          <span class="category">商品分类：</span>
          <div class="box">
              <el-select v-model="value1" placeholder="请选择商品分类" @change="selectIndex">
              <el-option
                v-for="item in options1"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="box">
              <el-select v-model="value2" placeholder="请选择商品分类" @change="selectSec">
              <el-option
                v-for="item in options2"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="box">
              <el-select v-model="value3" @change="selectThr" placeholder="请选择商品分类">
              <el-option
                v-for="item in options3"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
       </div>
     </div>
     <div class="item">
       <div class="title">商品信息详情</div>
       <div class="container">
         <div class="tits">
           <span class="category">商品标题：</span>
           <div class="box-input">
             <el-input v-model="listJson.goods_name" placeholder="标题最少10个字以上"></el-input>
           </div>
         </div>
         <div class="tits">
           <span class="category">商品市场价：</span>
           <div class="box-input">
             <div style="overflow:hidden">
                <div class="left">
                  <el-input v-model="listJson.market_price" placeholder="最大9位数"></el-input>
                </div>
                <div class="left" style="line-height:2.8;margin-left:10px;">元</div>
             </div>
              <div style="float:left">市场价应高于下方商品规格和库存中的最大单买价</div>
           </div>
         </div>
         <div class="tits">
           <span class="category">配送地区(包邮)：</span>
           <div class="right">
              <div class="warp">
                  <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                  <el-checkbox :indeterminate="isIndeterminateReverse" v-model="checkReverse" @change="handleCheckReverseChange">反选</el-checkbox>
                  <span class="default-address">常用地址</span>
                  <div style="margin: 15px 0;"></div>
                  <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                      <el-checkbox v-for="city in cities" :label="city.infos" :key="city.val">{{city.val}}--{{city.infos}}</el-checkbox>
                  </el-checkbox-group>
                  <div class="sum">已选择{{len}}个配送地区</div>
              </div>
           </div>
         </div>
         <div class="tits">
           <span class="category">商品描述：</span>
           <div class="right">
              <div class="box-input">
                  <el-input
                    type="textarea"
                    :rows="5"
                    :cols="15"
                    placeholder="请输入内容"
                    v-model="listJson.goods_remark">
                  </el-input>
              </div>
              <div class="explain">字数限制：20-500</div>
           </div>
         </div>
       </div>
       <up-load @changeOriginalImg = "originalImg" :upLoadData="upLoadData1" :title="componentTitle1" :explain="componentExplain1" :imageArr="listJson.original_img" :limit="1" :type="typeImg1" @deleteBig="watchChild"></up-load>
       <up-load @changeListImg = "listImg" :upLoadData="upLoadData2" :title="componentTitle2" :explain="componentExplain2" :imageArr="listJson.list_img" :limit="1" :type="typeImg2" @deleteBig="watchChild"></up-load>
       <up-load-slider @changeGoodsImages = "goodsImages" :upLoadData="upLoadData3" :title="componentTitle3" :explain="componentExplain3" :imageArr="listJson.goods_images" :limit="1" :type="typeImg3" @deleteBig="watchChild"></up-load-slider>
       <up-load @changeGoodsContent = "goodsContent" :upLoadData="upLoadData4" :title="componentTitle4" :explain="componentExplain4" :imageArr="listJson.goods_content" :limit="1" :type="typeImg4" @deleteBig="watchChild"></up-load>
     </div>
    <div class="item">
       <div class="title">商品规格/库存</div>
       <div class="content">
         <span class="category">选择商品规格：</span>
         <div class="item-right">
           <div class="sel" @click="selectGoodsSpecifications">
                <span uid="1" class="btn" :class="{ active: isActive }">一种规格</span>
                <span uid="2" class="btn" :class="{ active: !isActive }">两种规格</span>
           </div>
           <div class="detail">两种规格商品只需上传其中一种规格的SKU图 (单品的请选择一种规格)</div>
           <div class="select">
              <el-select v-model="speconename" placeholder="请选择规格" @change="changeOnce">
                <el-option
                  v-for="item in options4"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-button type="primary" class="add" @click="addSpeOnceDialog">添加</el-button>
           </div>
           <div class="onceSpecModel" v-show="speconelist">
             <ul class="onceSpecWarp">
               <li v-for="(item,index) in speconelist">
                <span>{{item.item}}</span>
                <span class="delete" @click="deleteItem(1,speconelist,index)"></span>
               </li>
             </ul>
           </div>
           <div class="select"  v-show="showSecItem">
              <el-select v-model="spectwoname" placeholder="请选择规格" @change="changeSec">
                <el-option
                  v-for="item in options4"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-button type="primary" class="add" @click="addSpeSecDialog">添加</el-button>
           </div>
           <div class="onceSpecModel" v-show="spectwolist">
             <ul class="onceSpecWarp">
               <li v-for="(item,index) in spectwolist">
                <span>{{item.item}}</span>
                <span class="delete" @click="deleteItem(2,spectwolist,index)"></span>
               </li>
             </ul>
           </div>
            <div class="showTable">
              <div class="table-show">
                <table class="release_tab">
                  <thead>
                    <tr>
                      <th v-show="theadOnce">{{speconename}}</th>
                      <th v-show="theadSec">{{spectwoname}}</th>
                      <th>当前库存</th>
                      <th>设置库存</th>
                      <th>团购价</th>
                      <th>单买价</th>
                      <th>商家编码</th>
                      <th>备用SKU图</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-show="goodsprice.length==0">
                        <td colspan="6" align="center" style="padding:20px;">暂无数据</td>
                    </tr>
                    <tr v-for="(val,index) in goodsprice">
                      <td v-for='key in val.key_name.split("`")' v-show='key.split(":")[0]==speconename&&key.split(":")[0]!=""'>
                        {{key.split(":")[1]}}
                      </td>
                      <td v-for='key in val.key_name.split("`")' v-show='key.split(":")[0]==spectwoname&&key.split(":")[0]!=""'>
                        {{key.split(":")[1]}}
                      </td>
                      <td class="width-tr-140">
                        <div class="width-120">                          
                            <div class="show_store_count">{{val.set_count?val.set_count:0}}</div>
                        </div>
                      </td>
                      <td class="width-tr-140">
                        <div class="width-120">                          
                            <el-input  v-model="val.store_count" placeholder="请输入内容" @blur="setStoreCount(val.store_count)"></el-input>
                        </div>
                      </td>
                      <td class="width-tr-140">
                        <div class="width-120">                          
                            <el-input v-model="val.prom_price" placeholder="请输入内容"></el-input>
                        </div>
                      </td>
                      <td class="width-tr-140">
                        <div class="width-120">                          
                            <el-input v-model="val.price" placeholder="请输入内容"></el-input>
                        </div>
                      </td>
                      <td class="width-tr-140">
                        <div class="width-120">                          
                            <el-input v-model="val.bar_code" placeholder="请输入内容"></el-input>
                        </div>
                      </td>
                      <td>
                        <up-load-small @changeSmall="emitImg" :childArr="val" :keys="index" :imageUrl="val.img" @deleteSmall="delete_Small(val)"></up-load-small>
                      </td>
                    </tr>
                  </tbody>
                </table>
                <div class="table_Statistics">
                  <div class="left">总库存</div>
                  <div class="left">商家编码</div>
                </div>
                <div class="input_Statistics">
                  <div class="left">
                    <div class="width-120">
                          <el-input disabled v-model="self_store_count" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                  <div class="left"> 
                    <div class="width-120">
                          <el-input disabled v-model="listJson.goods_sn" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </div>
              </div>
            <div class="setting">
              <span class="text">批量设置：</span>
              <div class="box-put">
                  <el-input v-model="setData.set_store_count" placeholder="设置库存"></el-input>
              </div>
              <div class="box-put">
                  <el-input v-model="setData.set_prom_price" placeholder="团购价"></el-input>
              </div>
              <div class="box-put">
                  <el-input v-model="setData.set_price" placeholder="单买价"></el-input>
              </div>
              <div class="box-put">
                  <el-input v-model="setData.set_bar_code" placeholder="商家编码"></el-input>
              </div>
              <el-button type="danger" @click="setTableData()">确定</el-button>
            </div>
              <ul class="warp">
                <li>a.总库存=已上架状态SKU的预估当前库存 + 已上架状态SKU的库存增减</li>
                <li>b.预览图必须是商品属性图</li>
                <li>c.预览图大小：预览图大小最大500k，尺寸200*200px</li>
                <li>d.同一种商品拥有多种不同属性的并且是同种价格的不可以分开上架商品，否则视为重复铺货</li>
              </ul>
          </div>
         </div>
       </div>
    </div>
    <div class="item">
      <div class="title">团消息</div>
      <div class="content">
        <span class="category">团购人数：</span>
        <div class="right">
          <div class="box">
            <el-input v-model="listJson.prom" placeholder="请输入内容"></el-input>
          </div>
          <div class="detail-explain">平台入驻商家上传商品价格默认为包邮价格，团购人数建议2~3人</div>
        </div>
      </div>
    </div>
    <div class="foo">
      <div class="center">
        <el-button @click="submitNewProduct('1')">保存草稿</el-button>
        <el-button type="danger" @click="submitNewProduct('2')">提交</el-button>
      </div>
    </div>
    <el-dialog
      title="添加规格"
      :visible.sync="addSpeOnce"
      width="30%">
      <el-input v-model="speOnce" placeholder="请输入内容"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addSpeOnce = false">取 消</el-button>
        <el-button type="primary" @click="addSpeBtnOnce()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加规格"
      :visible.sync="addSpeSec"
      width="30%">
      <el-input v-model="speSec" placeholder="请输入内容"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="addSpeSec = false">取 消</el-button>
        <el-button type="primary" @click="addSpeBtnSec()">确 定</el-button>
      </span>
    </el-dialog>
 </div>
</template>

<script>
// const cityOptions = ['北京', '安徽', '福建', '甘肃', '广东', '广西', '贵州', '海南', '河北', '河南', '黑龙江', '湖北', '湖南', '吉林', '江苏', '江西', '辽宁', '内蒙古', '宁夏', '青海', '山东', '陕西', '上海', '四川', '天津', '西藏', '新疆', '云南', '浙江', '重庆'];
import cityOptions from "../../json/postalArea.json";
// console.log(cityOptions)
import upLoad from '../../components/upLoad';
import upLoadSmall from '../../components/upLoadSmall';
import upLoadSlider from '../../components/slider';

import releaseNewProductEdit from '../../js/releaseNewProductEdit';
 export default {
   data () {
     return {
       type:'',
       msg:0,
       smallImgArr:[],//规格图片
       orderId:'',
       self_store_count:0,//总库存
       set_store_count:0,//设置库存
        setData:{
          set_store_count:0,
          set_prom_price:0,
          set_price:0,
          set_bar_code:0,
        },//批量设置
       isActive:true,//动态切换规格
       theadOnce:false,//第一个thead显示
       theadSec:false,//第二个thead显示
       twoData:'',//第二个选择的栏目
       onceSpe:'',//第一个选择的栏目
       showSecItem:false,//显示第二种规格选择
       cities: cityOptions,
        listJson:{
          goods_name:'',
          market_price:'',
          goods_remark:'',
          prom:'',
          store_count:'',
          goods_sn:''
        },
        options1: [],
        value1: '',
        value2: '',
        value3: '',
        options2: [],
        options3: [],
        input:'',
        speSec:'',
        speOnce:'',
        specOne:'',
        specTwo:'',
        catId:'',
        addSpeOnce:false,
        addSpeSec:false,
        checkAll: false,
        isIndeterminate: true,
        isIndeterminateReverse:false,
        spectwoname:'',
        goodsprice:[
        ],
        goods_sn:'',
        speconelist:[],
        spectwolist:[],
        goods_name:'',
        market_price:'',
        region:'',
        checkedCities:[],
        goods_remark:'',
        speconename:'',
        options4:[],
        len:0,
        checkReverse:[],
        componentTitle1:"首页推荐图：",
        componentExplain1:[
          {
            value:"首页推荐图，要求明细：",
          },{
            value:"a.尺寸为750X352",
          },{
            value:"b.大小为100k以内",
          },{
            value:"c.图片背景为纯白底，商品图案居中显示",
          },{
            value:"d.图片可以添加品牌相关文字或logo",
          }
        ],
        typeImg1:"main",
        upLoadData1:{
          condition:"750/352/1/1",
          Goodid:0,
          Imgsize:"200",
          Imgtype:"main",
          Imgdetail:'',
        },
        componentTitle2:"类目主图：",
        componentExplain2:[
          {
            value:"类目主图，要求明细：",
          },{
            value:"a.尺寸为400X400",
          },{
            value:"b.大小为120k以内",
          },{
            value:"c.尽量保持主图饱满美观实物展现",
          },{
            value:"d.图片可以添加品牌相关文字或logo",
          }
        ],
        typeImg2:"list",
        upLoadData2:{
          condition:"400/400/2/2",
          Goodid:0,
          Imgsize:"1024",
          Imgtype:"list",
          Imgdetail:'',
        },
        componentTitle3:"商品轮播图：",
        componentExplain3:[
          {
            value:"商品轮播图，要求明细：",
          },{
            value:"a.第一张为主轮播图",
          },{
            value:"b.数量限制在10张以内",
          },{
            value:"c.大小为1M以内",
          },{
            value:"d.尺寸为宽高不低于600px的正方形图片",
          }
        ],
        typeImg3:"slider",
        upLoadData3:{
          condition:"600/600/2/2",
          Goodid:0,
          Imgsize:"1024",
          Imgtype:"slider",
          Imgdetail:'',
        },
        componentTitle4:"商品详情图：",
        componentExplain4:[
          {
            value:"商品详情图，要求明细：",
          },{
            value:"a.尺寸宽度最大1500px",
          },{
            value:"b.尺寸高度最大1500px",
          },{
            value:"c.文件大小控制在1M以内",
          },{
            value:"d.数量限制在20张之间",
          }
        ],
        typeImg4:"detail",
        upLoadData4:{
          condition:"1500/1500/3/1",
          Goodid:0,
          Imgsize:"1024",
          Imgtype:"detail",
          Imgdetail:'',
        },
     }
   },
   watch:{
     goodsprice(old,newVal){
      //  console.log(JSON.stringify(old))
      //  console.log(JSON.stringify(newVal))
     }
   },
    created(){
      //  //获取商品类目
      // var datas = "北京市, 安徽省, 甘肃省, 广东省, 广西壮族自治区, 贵州省, 海南省, 河北省, 河南省, 黑龙江省, 湖北省, 湖南省,",
        // var checkedCities = ["北京"];
        this.orderId = this.$route.query.orderid;
        this.type = this.$route.query.type;
        if(this.type!='newProduct'){
          var data = {
            goods_id :this.orderId
          }
          releaseNewProductEdit.getReleaseNewProductEdit("/Goods/goodsDetails",data,this);
        }
        // alert(this.orderId)
        this.upLoadData1.Goodid = this.orderId;
        this.upLoadData2.Goodid = this.orderId;
        this.upLoadData3.Goodid = this.orderId;
        this.upLoadData4.Goodid = this.orderId;
        
      //  //获取商品规格 specification
      // releaseNewProductEdit.getSpecification("/Goods/category",this);
      // releaseNewProductEdit.getGoodsCategory("/api/goods/category/0",this);
                      
    },
   components: {
      upLoad,upLoadSmall,upLoadSlider
   },
   methods:{
     setStoreCount(val){
       /**@author
        * 设置库存
        */
       if(!val)val=0;
       var arrs = this.goodsprice;
       var count = 0;
       for(var i=0;i<arrs.length;i++){
         if(isNaN(parseInt(count))){
           count = 0;
         }else if(isNaN(parseInt(arrs[i].store_count))){
           arrs[i].store_count = 0;
         }
          count = parseInt(count) +  parseInt(arrs[i].store_count);
       }
       this.self_store_count = parseInt(count); 
     },
     delete_Small(item){
       /*****
        * 删除图片small
        */
      //  console.log(JSON.stringify(item))
       item.img = '';
      //  console.log(val)
     },
     goodsContent(val){
       /**
        商品详情图
        */
        this.listJson.goods_content = val;
     },
     goodsImages(val){
       /**
        商品轮播图
        */
        this.listJson.goods_images = val;
     },
     listImg(val){
       /*
       类目主图
       * */
      this.listJson.list_img = val;
     },
     originalImg(val){
       /*
       首页推荐图
       * */
      //  console.log(val)
       this.listJson.original_img = val;
     },
     //批量设置
     setTableData(){
       var result = this.goodsprice;
       var resultSetData = this.setData;
       for(var k=0;k<result.length;k++){
          this.$set(this.goodsprice[k],"store_count",resultSetData.set_store_count);
          this.$set(this.goodsprice[k],"prom_price",resultSetData.set_prom_price);
          this.$set(this.goodsprice[k],"price",resultSetData.set_price);
          this.$set(this.goodsprice[k],"bar_code",resultSetData.set_bar_code);
       }
        var arrs = this.goodsprice;
        var count = 0;
        for(var i=0;i<arrs.length;i++){
          if(isNaN(parseInt(count))){
            count = 0;
          }else if(isNaN(parseInt(arrs[i].store_count))){
            arrs[i].store_count = 0;
          }
            count = parseInt(count) +  parseInt(arrs[i].store_count);
        }
        this.self_store_count = parseInt(count); 
     },
     watchChild(val){

     },
     emitImg(val){
      //  console.log(val)
       var info = val.info;
       var keys = val.keys;
       this.goodsprice[keys].img = info;
     },
     //改变规格 一种规格时
     changeOnce(value){
          this.speconelist = [];
          this.goodsprice = [];
          this.theadOnce = false;
          let obj = {};
          obj = this.options4.find((item)=>{
              return item.id === value;
          });
          this.speconename = obj.name;
          if(this.speconename==this.spectwoname){
            this.speconename='';
            this.$message("两种规格不能一样")
            return 
          }
          this.specOne = value;
          var arr2 = this.spectwolist;
          // alert(arr2!=undefined)
          // alert(JSON.stringify(arr2))
          if(arr2!=undefined){
            for(var i=0;i<arr2.length;i++){
              var list = {
                  "key_name" : this.spectwoname+':'+arr2[i].item +'`'
              }
              this.goodsprice.push(list);
            }
          }
     },
     //添加规格时  一种规格时
     addSpeBtnOnce(){
       var data = {
          specid:this.specOne,
          itemname:this.speOnce,
          timeout:5000,
          goodid:this.orderId
       }
      //  console.log(JSON.stringify(data))
       releaseNewProductEdit.getkey("/api/goods/addspecitem",data,this,"1");
     },
     //对话框显示
     addSpeOnceDialog(){
       this.addSpeOnce = true;
     },
      //添加规格时  两种种规格时
     addSpeBtnSec(){
       var data = {
          specid:this.specTwo,
          itemname:this.speSec,
          goodid:this.orderId
       }
      //  console.log(JSON.stringify(data))
       releaseNewProductEdit.getkey("/api/goods/addspecitem",data,this,"2");
     },
     //改变规格 两种规格时
     changeSec(value){
          this.spectwolist = [];
          this.goodsprice = [];
          this.theadSec = false;
          let obj = {};
          obj = this.options4.find((item)=>{
              return item.id === value;
          });
          /*
            显示选择规格
          * */
          this.spectwoname = obj.name;
       if(this.speconename==this.spectwoname){
         this.spectwoname='';
         this.$message("两种规格不能一样")
         return 
       }
       console.log(this.spectwoname)
          this.specTwo = value;
           var arr1 = this.speconelist;
          for(var i=0;i<arr1.length;i++){
            var list = {
                "key_name" : this.speconename+':'+arr1[i].item +'`'
            }
            this.goodsprice.push(list);
          }
     },
     addSpeSecDialog(){
       this.addSpeSec = true;
     },
     //  提交表单
     submitNewProduct(con){
      var arrData1 = this.speconelist;
      var arrData2 = this.spectwolist; 
      var keyArr = [];
      var keyNameArr = [];
      // console.log(arrData1==undefined)
      // console.log(arrData2==undefined)
      /**
       * 只有一个时 只算第一个  false true
       * 当有两个时  算两个
       * 通过删除只剩一个时  算剩下的那个
       */
      if(arrData1!=undefined&&arrData2!=undefined){
        if(arrData1.length>0&&arrData2.length>0){
        // console.log(111111)
          for(var k=0;k<arrData1.length;k++){
            for(var p=0;p<arrData2.length;p++){
              var key = arrData1[k].id+'_'+arrData2[p].id;
              var keyname = this.speconename+':'+arrData1[k].item+'`'+this.spectwoname+':'+arrData2[p].item;
              keyArr.push(key);
              keyNameArr.push(keyname);
            }
          }
        }else if(arrData1.length>0&&arrData2.length==0){
        // console.log(22222)
          // alert(JSON.stringify(arrData1))
          for(var k=0;k<arrData1.length;k++){
              var key = arrData1[k].id;
              var keyname = this.speconename+':'+arrData1[k].item;
              keyArr.push(key);
              keyNameArr.push(keyname);
          }
        }else if(arrData1.length==0&&arrData2.length>0){
        // console.log(3333)
          for(var k=0;k<arrData2.length;k++){
              var key = arrData2[k].id;
              var keyname = this.spectwoname+':'+arrData2[k].item;
              keyArr.push(key);
              keyNameArr.push(keyname);
          }
        }
      }else if(arrData1!=undefined&&arrData2==undefined){
        // console.log(4444)
          // alert(JSON.stringify(arrData1))
        for(var k=0;k<arrData1.length;k++){
            var key = arrData1[k].id;
            var keyname = this.speconename+':'+arrData1[k].item;
            keyArr.push(key);
            keyNameArr.push(keyname);
        }
      }else if(arrData1==undefined&&arrData2!=undefined){
        // console.log(55555)
        for(var k=0;k<arrData2.length;k++){
            var key = arrData2[k].id;
            var keyname = this.spectwoname+':'+arrData2[k].item;
            keyArr.push(key);
            keyNameArr.push(keyname);
        }
      }
      var jsonDatas = {};
      jsonDatas.item = {};
      var formData = [];
      var result = this.goodsprice;
      for(var j=0;j<result.length;j++){
        formData.push({
          "keyname":keyNameArr[j]?keyNameArr[j]:'',
          "stock":result[j].store_count?result[j].store_count:'',
          "groupPrice":result[j].prom_price?result[j].prom_price:'',
          "singlePrice":result[j].price?result[j].price:'',
          "storeCode":result[j].bar_code?result[j].bar_code:'',
          "storeImg":result[j].img?result[j].img:''
        })
      }
      if(keyArr.length==1){
          var val = keyArr[0];
          jsonDatas.item[val] = {
          "keyname":keyNameArr[0]?keyNameArr[0]:'',
          "stock":result[0].store_count?result[0].store_count:'',
          "groupPrice":result[0].prom_price?result[0].prom_price:'',
          "singlePrice":result[0].price?result[0].price:'',
          "storeCode":result[0].bar_code?result[0].bar_code:'',
          "storeImg":result[0].img?result[0].img:''
        };
      }else{
        for(var i=0;i<keyArr.length;i++){
          var val = keyArr[i];
          jsonDatas.item[val] = formData[i];
        }
      }


        // if(!this.catId||this.catId==0){
        //   this.$message("请选择商品分类");
        //   return
        // }else if(!this.listJson.goods_name){
        //   this.$message("请输入商品标题");
        //   return
        // }else if(!this.listJson.market_price){
        //   this.$message("请输入商品市场价");
        //   return
        // }else if(!this.checkedCities.join(",")){
        //   this.$message("请选择包邮配送地区");
        //   return
        // }else if(!this.listJson.goods_remark){
        //   this.$message("请输入商品描述");
        //   return
        // }else 
        // if(!this.listJson.original_img){
        //   this.$message("请上传首页推荐图");
        //   return
        // }else if(!this.listJson.list_img){
        //   this.$message("请上传类目主图");
        //   return
        // }else if(this.listJson.goods_images==''||!this.listJson.goods_images){
        //   this.$message("请上传商品轮播图");
        //   return
        // }else if(!this.listJson.goods_content||this.listJson.goods_content==''){
        //   this.$message("请上传商品详情图");
        //   return
        // }else 
        // alert(this.speconelist==''||this.speconelist==undefined)
        // return
        // if(this.speconelist==''||this.speconelist==undefined){
        //   this.$message("请添加规格");
        //   return
        // }else if(jsonDatas){
        //   var res = jsonDatas.item;
        //   // console.log(res)
        //   for (var key in res){
        //     // alert(res[key])
        //     if(res[key].storeImg==undefined||res[key].storeImg==''){
        //       this.$message("请上传SKU图");
        //       return
        //     }
        //   }
        // }else if(!this.listJson.prom){
        //   this.$message("请输入团购人数");
        //   return
        // }
var data = {"goods_id":173843,"saveType":1,"catId":10116,"marketPrice":"1","countries_type":0,
"goodsName":"\u6d4b\u8bd5\u5546\u54c1\uff08\u52ff\u8d2d\uff09\uff0c\u4e0d\u53d1\u8d27\uff0c\u4e0d\u9000\u6b3exxx",
"region":"\u5317\u4eac\u5e02,\u5b89\u5fbd\u7701,\u798f\u5efa\u7701,\u7518\u8083\u7701,\u5e7f\u4e1c\u7701,\u91cd\u5e86\u5e02","goodsRemark":"\u62fc\u8da3\u591a\u4e13\u7528\u6d4b\u8bd5\u5546\u54c1\uff08\u52ff\u8d2d\uff09\uff0c\u4e0d\u53d1\u8d27\uff0c\u4e0d\u9000\u6b3e","original_img":"http:\/\/c.hiphotos.baidu.com\/image\/pic\/item\/9358d109b3de9c822bb66df56081800a18d843fd.jpg","list_img":"http:\/\/c.hiphotos.baidu.com\/image\/pic\/item\/9358d109b3de9c822bb66df56081800a18d843fd.jpg",
"image_url":{"1":["http:\/\/c.hiphotos.baidu.com\/image\/pic\/item\/9358d109b3de9c822bb66df56081800a18d843fd.jpg"],
"2":["http:\/\/c.hiphotos.baidu.com\/image\/pic\/item\/9358d109b3de9c822bb66df56081800a18d843fd.jpg"]},
"specOne":2,"specTwo":3,
"specification":{
  "two":{"one":{"specification_id":2,"sub_Specifications":["10ml","20ml"]},
  "two":{"specification_id":3,"sub_Specifications":["1ml","2ml"]},
  "info":{"10ml:1ml":{"stock":10,"groupPrice":10,"singlePrice":12,"storeCode":10,
  "storeImg":"http:\/\/c.hiphotos.baidu.com\/image\/pic\/item\/9358d109b3de9c822bb66df56081800a18d843fd.jpg"},
  "10ml:2ml":{"stock":10,"groupPrice":10,"singlePrice":12,"storeCode":10,"storeImg":
  "http:\/\/c.hiphotos.baidu.com\/image\/pic\/item\/9358d109b3de9c822bb66df56081800a18d843fd.jpg"},"20ml:1ml":
  {"stock":10,"groupPrice":11,"singlePrice":12,"storeCode":13,
  "storeImg":"http:\/\/c.hiphotos.baidu.com\/image\/pic\/item\/9358d109b3de9c822bb66df56081800a18d843fd.jpg"},"20ml:2ml":
  {"stock":1,"groupPrice":2,"singlePrice":3,"storeCode":4,
  "storeImg":"http:\/\/c.hiphotos.baidu.com\/image\/pic\/item\/9358d109b3de9c822bb66df56081800a18d843fd.jpg"}}}},"prom":"2","storeCount":3100,"goodSn":666666}
     
     //  var data = {
      //     "saveType": con,
      //     "goods_id": this.orderId,  
      //     "catId": this.catId,
      //     "marketPrice": this.listJson.market_price,
      //     "countries_type": 0,
      //     "is_haitao": 0,
      //     "goodsName": this.listJson.goods_name,
      //     "region":this.checkedCities.join(","),
      //     "goodsRemark": this.listJson.goods_remark,
      //     "original_img":'',
      //     "list_img":'',
      //     "image_url[1][]":'http://c.hiphotos.baidu.com/image/pic/item/9358d109b3de9c822bb66df56081800a18d843fd.jpg',
      //     "image_url[2][]":"http://c.hiphotos.baidu.com/image/pic/item/9358d109b3de9c822bb66df56081800a18d843fd.jpg",
      //     "prom":this.listJson.prom,
      //     // storeCount: this.listJson.store_count,
      //     "storeCount":this.self_store_count,
      //     // "specOne": this.specOne,
      //     // "specTwo": this.specTwo,
      //     "goodSn": this.listJson.goods_sn?this.listJson.goods_sn:'',
      //     "specification":JSON.stringify(jsonDatas)
      //  }
       console.log(JSON.stringify(data))
        releaseNewProductEdit.savedraftNewrelease("/Goods/save",data,this);
     },
     deleteItem(count,data,ind){
       /*
         删除单个栏目   table重新排列
       * */
       this.goodsprice = [];
      if(count==1){
         this.speconelist.splice(ind,1);
       }else if(count==2){
         this.spectwolist.splice(ind,1)
       }
      var arr1 = this.speconelist;
      var arr2 = this.spectwolist;
      // console.log(arr1)
      // console.log(arr2)
              //两个规格都存在
        if(arr1!=undefined&&arr2!=undefined){
          for(var i=0;i<arr1.length;i++){
              for(var j=0;j<arr2.length;j++){
                  var list = {
                    "key_name" : this.speconename+':'+arr1[i].item +'`'+ this.spectwoname+':'+arr2[j].item
                }
                this.goodsprice.push(list);
              }
          }
          //第二个规格存在
        }else if(arr1==undefined&&arr2!=undefined){
          
          this.theadOnce = false;
          this.speconename = '';
          for(var i=0;i<arr2.length;i++){
            var list = {
              "key_name" : this.spectwoname+':'+arr2[i].item +'`'
            }
            this.goodsprice.push(list);
          }
          //第一个规格存在
       }else if(arr2==undefined&&arr1!=undefined){
         
         this.theadSec = false;
         this.spectwoname = '';
          for(var i=0;i<arr1.length;i++){
            var list = {
              "key_name" : this.speconename+':'+arr1[i].item +'`'
            }
            this.goodsprice.push(list);
          }
          //二种规格不存在
       }else if(arr2==undefined&&arr1==undefined){
            this.theadOnce = false;
            this.theadSec = false;
            this.goodsprice = [];
       }
     },
     selectGoodsSpecifications(event){
       var e = window.e || window.event;
       var targetName = e.target;
       var uid = targetName.getAttribute("uid");
       var sel = document.getElementsByClassName("sel")[0];
       var btn = sel.getElementsByClassName("btn");
       /*
       第一种规格   
            显示一个输入框   thead speconename tbody  全部清空    第一个输入框数组清空  speconelist = []
       第二种规格 
            显示两个输入框   thead speconename spectwoname  tbody goodsprice = []  全部清空    第一个输入框数组清空  speconelist = []  第二个输入框数组清空 spectwolist = []
       * */
       for(var i=0;i<btn.length;i++){
          // btn[i].className = "btn";
          if(targetName.nodeName.toLowerCase()=='span'){
            if(uid==2){
              this.isActive = false;
              this.showSecItem = true;
              this.speconename = '';
              this.spectwoname = '';
              this.goodsprice = [];
              this.speconelist = [];
              this.spectwolist = [];
            }else if(uid==1){   
              this.isActive = true;
              this.showSecItem = false;
              this.speconename = '';
              this.spectwoname = '';
              this.goodsprice = [];
              this.speconelist = [];
              this.spectwolist = [];
            }
            // targetName.className = "btn active";
          }
       }
     },
        handleCheckReverseChange(val){
        var arrs = cityOptions;
        var cityOptionsArr = []
        for(var i=0;i<arrs.length;i++){
          cityOptionsArr.push(arrs[i].infos)
        }
        let data  = new Set(cityOptionsArr); 
        let checkedCities  = new Set(this.checkedCities); 
        let difference= [...new Set([...data].filter(x=> !checkedCities.has(x)))];
        this.checkedCities = difference;
          this.isIndeterminateReverse = false;
          this.len = this.checkedCities.length;
   },
    handleCheckAllChange(val) {
        var arrs = cityOptions;
        var cityOptionsArr = []
        for(var i=0;i<arrs.length;i++){
          cityOptionsArr.push(arrs[i].infos)
        }
        this.checkedCities = val ? cityOptionsArr : [];
        this.isIndeterminate = false;
        this.len = this.checkedCities.length;
      },
      handleCheckedCitiesChange(value) {
        let checkedCount = value.length;
        this.checkAll = checkedCount === this.cities.length;
        this.checkReverse = checkedCount === this.cities.length;
        this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
        this.isIndeterminateReverse = checkedCount > 0 && checkedCount < this.cities.length;
        this.len = checkedCount;
      },
     selectSec(val){
      //  console.log(val);
       releaseNewProductEdit.getGoodsThirCategory("/api/goods/category/"+val,this)
     },
     selectThr(val){
      
       this.catId = val
     },
     selectIndex(val){
      //  console.log(val);
       releaseNewProductEdit.getGoodsSecCategory("/api/goods/category/"+val,this)
     }
   },
 }
</script>

<style lang="less" scoped>
@import '../../less/config.less';
.releaseNewProductEdit{
    background:@backgroundfff; 
    .onceSpecModel{
      .onceSpecWarp{
        padding:20px 0;
        overflow: hidden;
        li{
          float:left;
          padding:10px 20px;
          border:1px solid #eee;
          margin-right:20px;
          position: relative;
          span.delete{
            cursor: pointer;
            display: block;
            content:'';
            position: absolute;
            right:-7px;
            top:-7px;
            width: 14px;
            height:14px;
            background:url(../../img/delete.png) no-repeat;
          }
        }
      }
    }
    .el-checkbox+.el-checkbox{
      margin-bottom:10px;
    }
    .foo{
      width:100%;
      .center{
        width:600px;
      }
    }
  .item{
    .title{
      padding:20px;
      font-weight:bold;
      position: relative;
    }
    .title::before{
      content:'';
      display: block;
      width:4px;
      height:30%;
      background:red;
      position: absolute;
      left:10px;
      top:20px;
    }
    .content{
      margin:0 0 20px 0;
      overflow: hidden;
      .right{
        .detail-explain{
          float:left;
          margin-left:20px;
          height:40px;
          line-height: 40px;
        }
      }
      .category{
        float:left;
        margin-left:20px;
        height:40px;
        line-height: 40px;
        }
         .item-right{
           float:left;
           .showTable{
             width:100%;
             .table-show{
               .release_tab{
                 width:100%;
                 border-collapse: collapse; 
                 text-align: center;
                 thead{
                   tr{
                     th{
                       padding:10px;
                       text-align: center;
                       background:#F2F6F8;
                     }
                   }
                 }
                 tbody{
                   tr{
                     td{
                        
                     }
                   }
                 }
               }
             }
             .warp{
               padding:10px;
               li{
                 padding-top:10px;
               }
             }
           }
           .setting{
             margin-top:20px;
             overflow: hidden;
             .text{
               height:40px;
               line-height: 40px;
               float:left;
             }
             .box-put{
               float:left;
               width:120px;
               margin-right:10px;
             }
           }
           .add{
             margin:10px 0;
           }
           .detail{
             padding:0 0 10px 0;
           }
          .sel{
            width:400px;
            overflow: hidden;
            span.btn{
              float:left;
              margin:0 10px 10px 0;
              padding:10px 20px;
              border:1px solid #ddd;
              cursor: pointer;
            }
            span.active{
              border:1px solid #ff5454;
              position: relative;
            }
            .active:before{
              content: "";
              position: absolute;
              width: 15px;
              height: 15px;
              right: 0.5px;
              bottom:  0.5px;
              background: url(../../img/gou.png) no-repeat;
              background-size: 15px 15px;
            }
          }
      }
      .box{
        width:150px;
        float:left;
          margin-left: 20px;
      }
    }
    .container{
      .tits{
        margin:0 0 20px 0;
        overflow: hidden;
        .category{
          text-align: right;
          width:110px;
          margin-left:20px;
          height:40px;
          line-height: 40px;
          float:left;
        }
        .box-input{
          float:left;
        }
        .right{
          float:left;
          .warp{
            width:800px;
            padding:20px;
            .default-address{
              margin-left:20px;
              cursor: pointer;
            }
          }
          .explain{
            padding:10px 0;
          }
          .sel{
            padding:10px 0;
            width:400px;
            overflow: hidden;
            span.btn{
              float:left;
              margin:0 10px 10px 0;
              padding:10px 20px;
              border:1px solid #ddd;
              cursor: pointer;
            }
            span.active{
              border:1px solid #ff5454;
              position: relative;
            }
            .active:before{
              content: "";
              position: absolute;
              width: 15px;
              height: 15px;
              right: 0.5px;
              bottom:  0.5px;
              background: url(../../img/gou.png) no-repeat;
              background-size: 15px 15px;
            }
          }
          .sum{
            margin:10px 0;
          }
        }
      }
    }
  }
}
 
</style>