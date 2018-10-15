<template>
 <div class="releaseNewProductEdit">
 	123123
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
              <el-select v-model="value3" placeholder="请选择商品分类">
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
             <el-input v-model="goodsName" placeholder="标题最少10个字以上"></el-input>
           </div>
         </div>
         <div class="tits">
           <span class="category">商品市场价：</span>
           <div class="box-input">
             <div style="overflow:hidden">
                <div class="left">
                  <el-input v-model="marketPrice" placeholder="最大9位数"></el-input>
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
                      <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
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
                    v-model="goodsRemark">
                  </el-input>
              </div>
              <div class="explain">字数限制：20-500</div>
           </div>
         </div>
       </div>
       <up-load :title="componentTitle1" :explain="componentExplain1"></up-load>
       <up-load :title="componentTitle2" :explain="componentExplain2"></up-load>
       <up-load :title="componentTitle3" :explain="componentExplain3"></up-load>
     </div>
    <div class="item">
       <div class="title">商品规格/库存</div>
       <div class="content">
         <span class="category">选择商品规格：</span>
         <div class="item-right">
           <div class="sel" @click="selectGoodsSpecifications">
                <span uid="1" class="btn active">一种规格</span>
                <span uid="2" class="btn">两种规格</span>
           </div>
           <div class="detail">两种规格商品只需上传其中一种规格的SKU图 (单品的请选择一种规格)</div>
           <div class="select">
              <el-select v-model="valueOnce" placeholder="请选择规格" @change="changeOnce">
                <el-option
                  v-for="item in options4"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-button type="primary" class="add" @click="addSpeOnceDialog">添加</el-button>
           </div>
           <div class="onceSpecModel" v-show="itemsOnce.length>0">
             <ul class="onceSpecWarp">
               <li v-for="(item,index) in itemsOnce">
                <span>{{item}}</span>
                <span class="delete" @click="deleteItem(1,itemsOnce,index)"></span>
               </li>
             </ul>
           </div>
           <div class="select" v-show="valueSecBoolean">
              <el-select v-model="valueSec" placeholder="请选择规格" @change="changeSec">
                <el-option
                  v-for="item in options4"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-button type="primary" class="add" @click="addSpeSecDialog">添加</el-button>
           </div>
           <div class="onceSpecModel" v-show="itemsSec.length>0">
             <ul class="onceSpecWarp">
               <li v-for="(item,index) in itemsSec">
                <span>{{item}}</span>
                <span class="delete" @click="deleteItem(2,itemsSec,index)"></span>
               </li>
             </ul>
           </div>
            <div class="showTable">
              <div class="table-show">
                <table class="release_tab">
                  <thead>
                    <tr>
                      <th v-for="head in addHead">{{head.attrName1?head.attrName1:head.attrName2}}</th>
                      <th v-for="item in itemHead">{{item}}</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-show="itemBody.length==0">
                        <td colspan="6" align="center" style="padding:20px;">暂无数据</td>
                    </tr>
                    <tr v-for="val in itemBody">
                      <td v-show="val.attr1">{{val.attr1}}</td>
                      <td v-show="val.attr2">{{val.attr2}}</td>
                      <td class="width-tr-140">
                        <div class="width-120">                          
                            <el-input v-model="goodsprice" placeholder="请输入内容"></el-input>
                        </div>
                      </td>
                      <td class="width-tr-140">
                        <div class="width-120">                          
                            <el-input v-model="input" placeholder="请输入内容"></el-input>
                        </div>
                      </td>
                      <td class="width-tr-140">
                        <div class="width-120">                          
                            <el-input v-model="input" placeholder="请输入内容"></el-input>
                        </div>
                      </td>
                      <td class="width-tr-140">
                        <div class="width-120">                          
                            <el-input v-model="input" placeholder="请输入内容"></el-input>
                        </div>
                      </td>
                      <td class="width-tr-140">
                        <div class="width-120">                          
                            <el-input v-model="input" placeholder="请输入内容"></el-input>
                        </div>
                      </td>
                      <td>
                        <el-upload
                          class="avatar-uploader"
                          action="https://jsonplaceholder.typicode.com/posts/"
                          :show-file-list="false"
                          :on-success="handleAvatarSuccess"
                          :before-upload="beforeAvatarUpload">
                          <img v-if="imageUrl" :src="imageUrl" class="avatar">
                          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
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
                          <el-input v-model="storeCount" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                  <div class="left"> 
                    <div class="width-120">
                          <el-input v-model="goodSn" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </div>
              </div>
            <div class="setting">
              <span class="text">批量设置：</span>
              <div class="box-put">
                  <el-input v-model="input" placeholder="设置库存"></el-input>
              </div>
              <div class="box-put">
                  <el-input v-model="input" placeholder="团购价"></el-input>
              </div>
              <div class="box-put">
                  <el-input v-model="input" placeholder="单买价"></el-input>
              </div>
              <div class="box-put">
                  <el-input v-model="input" placeholder="商家编码"></el-input>
              </div>
              <el-button type="danger">确定</el-button>
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
            <el-input v-model="prom" placeholder="请输入内容"></el-input>
          </div>
          <div class="detail-explain">平台入驻商家上传商品价格默认为包邮价格，团购人数建议2~3人</div>
        </div>
      </div>
    </div>
    <div class="foo">
      <div class="center">
        <el-button type="danger" @click="submitNewProduct()">提交</el-button>
        <el-button>取消</el-button>
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
const cityOptions = ['北京', '安徽', '福建', '甘肃', '广东', '广西', '贵州', '海南', '河北', '河南', '黑龙江', '湖北', '湖南', '吉林', '江苏', '江西', '辽宁', '内蒙古', '宁夏', '青海', '山东', '陕西', '上海', '四川', '天津', '西藏', '新疆', '云南', '浙江', '重庆'];
import upLoad from '../../components/upLoad';
import releaseNewProductEdit from '../../js/releaseNewProductEdit';
 export default {
   data () {
     return {
       paramsArr2up:0,
       paramsArr2down:0,
       goodSn:'',
       storeCount:'',
       prom:0,
       orderId:0,
       marketPrice:0,
       goodsRemark:'',
       goodsName:'',
       addHead:[],
       totalStock:0,
        merchantCoding:0,
       addSpeOnceArr:[],
       addSpeSecArr:[],
       onceSpe:'',
       secSpe:'',
       itemBody:[],
       itemHead:["当前库存","设置库存","团购价","单买价","商家编码","SKU预览图"],
       imageUrl:'',
       merchantCoding:0,
       singlePurchasePrice:0,
       groupPurchasePrice:0,
       setUpStock:0,
       itemsOnce:[],
       itemsSec:[],
       valueSecBoolean:false,
       speOnce:'',
       speSec:'',
       addSpeOnce:false,
       addSpeSec:false,
       len:0,
        checkAll: false,
        checkedCities: ['上海', '北京'],
        checkReverse:[],
        cities: cityOptions,
        isIndeterminate: true,
        isIndeterminateReverse:false,
       input:'',
      tableData: [{
            date: '1245',
            name: '1000',
            address: '12'
          }],
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
        componentTitle3:"商品详情图：",
        componentExplain3:[
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
        options1: [],
        valueOnce:'',
        valueSec:'',
        value1: '',
        value2: '',
        value3: '',
        options2: [],
        value2: '',
        options3: [],
        options4: [],
        value3: '',
        input1:''
     }
   },
   created(){
     this.len = this.checkedCities.length;
     //获取商品类目
     var sortid = 0;
    releaseNewProductEdit.getGoodsCategory("/api/goods/category/"+sortid,this)
     //获取商品规格 specification
     releaseNewProductEdit.getSpecification("/api/goods/speclist",this);
     this.orderId = this.$route.query.orderid;
    //  var data = {
    //     specid:2
    //     itemname:11
    //     goodid:this.orderId
    //  }
    //  releaseNewProductEdit.getSecId("/api/goods/addspecitem",data,this)
    //  var data = {
    //     specid:6
            // itemname:66
            // goodid:this.orderId
    //  }
    //  releaseNewProductEdit.getSecId("/api/goods/addspecitem",data,this)
   },
   components: {
      upLoad
   },
   methods:{
     
     //改变规格 一种规格时
     changeOnce(value){
          this.addHead.splice(0,1);
          this.itemsOnce = [];
          this.itemBody = [];
          this.addSpeOnceArr = [];
          let obj = {};
          obj = this.options4.find((item)=>{
              return item.id === value;
          });
          this.onceSpe = obj.name;
          var len = this.itemHead.length;
          if(len>6){
           this.itemHead.splice(-len,len-6);
          }
          var arr2 = this.addSpeSecArr;
          for(var j=0;j<arr2.length;j++){
              this.itemBody.push({"attr2":arr2[j]});
          }
          console.log(value)
          console.log(this.onceSpe)
     },
     //添加规格时  一种规格时
     addSpeBtnOnce(){
       /*
       输入规格后，将规格和id存起来
       
       **/ 
      var data = {
          specid:this.valueOnce,
          itemname:this.speOnce,
          goodid:this.orderId
      }
      releaseNewProductEdit.getSecId("/api/goods/addspecitem",data,this,1)

       this.itemBody = [];
       var mark = this.speOnce;
       console.log(mark);
       this.itemsOnce.push(mark);
       if(this.itemsOnce.length==1){
        //添加tab头
        this.addHead.push({"attrName1":this.onceSpe});
       };
       this.addSpeOnce = false;
       this.addSpeOnceArr.push(mark);
       var arr1 = this.addSpeOnceArr;
       var arr2 = this.addSpeSecArr;
       if(arr2.length){
        for(var i=0;i<arr1.length;i++){
            for(var j=0;j<arr2.length;j++){
                this.itemBody.push({"attr1":arr1[i],"attr2":arr2[j]});
            }
        }
       }else{
         for(var i=0;i<arr1.length;i++){
           this.itemBody.push({"attr1":arr1[i]});
         }
       }
      //  console.log(JSON.stringify(this.itemBody))
      //  this.itemBody.push(mark);
      //  this.itemHead.splice(0, 0,this.onceSpe); 
     },
      //添加规格时  两种种规格时
     addSpeBtnSec(){
       if(this.itemsOnce.length==0){
         this.$message("请您先设置第一种规格");
         this.addSpeSec = false;
         return 
       }
       console.log(this.secSpe)
       this.itemBody = [];
       var mark = this.speSec;
       console.log(mark);
       this.itemsSec.push(mark);
       
       if(this.itemsSec.length==1){
        //添加tab头
        this.addHead.push({"attrName2":this.secSpe});
       };
       this.addSpeSec = false;
       this.addSpeSecArr.push(mark);
       console.log(JSON.stringify(this.addHead))
       var arr1 = this.addSpeOnceArr;
       var arr2 = this.addSpeSecArr;
        if(arr1.length){
          for(var i=0;i<arr1.length;i++){
              for(var j=0;j<arr2.length;j++){
                  this.itemBody.push({"attr1":arr1[i],"attr2":arr2[j]});
              }
          }
        }else{
          for(var i=0;i<arr2.length;i++){
            this.itemBody.push({"attr2":arr2[i]});
          }
       }
       console.log(JSON.stringify(this.itemBody))
      var data = {
          specid:this.valueSec,
          itemname:this.speSec,
          goodid:this.orderId
      }
      releaseNewProductEdit.getSecId("/api/goods/addspecitem",data,this,2)
      //  this.itemBody.push(mark)
     },
     //改变规格 两种规格时
     changeSec(value){
          this.itemsSec = [];
          this.itemBody = [];
           console.log(value);
          let obj = {};
          obj = this.options4.find((item)=>{
              return item.id === value;
          });
          this.secSpe = obj.name;
          var arr1 = this.addSpeOnceArr;
          for(var i=0;i<arr1.length;i++){
              this.itemBody.push({"attr1":arr1[i]});
          }

     },
      handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
     addSpeSecDialog(){
       if(!this.valueSec){
         this.$message("请您先选择规格");
       }else{
         this.addSpeSec = true;
       }
     },
     addSpeOnceDialog(){
       if(!this.valueOnce){
         this.$message("请您先选择规格");
       }else{
         this.addSpeOnce = true;
       }
     },
     submitNewProduct(){
       console.log(123)
       /*
       saveType   提交类型  保存 还是 提交
       catId  is_haitao==1  1级的值   否则  2级的值
       商品归属  默认值 0
       */ 
       var  is_haitao = localStorage.getItem('is_haitao');
       var speStr = {};
       speStr.item = {};
       for(var i=0;i<list.length;i++){
          speStr.item.list[i] = {
                "keyname": "容量:66`款式:44",
                "stock": "8",
                "groupPrice": "8",
                "singlePrice": "16",
                "storeCode": "88",
                "storeImg": "http://ooc3vwe04.bkt.clouddn.com/5ab377735bacc35090.jpg"
          }
       }
       var data = {
          saveType:1,
          catId:is_haitao==1?this.value1:this.value2,
          countries_type:0,
          is_haitao:is_haitao,
          goodsName:this.goodsName,
          marketPrice:this.marketPrice,
          region:this.checkedCities,
          goodsRemark:this.goodsRemark,
          Goodid:this.orderId,
          prom:this.prom,
          storeCount:this.storeCount,
          specOne:this.valueOnce,
          specTwo:this.valueSec,
          goodSn:this.goodSn,
          spec:{
            "item": {
              "1421738_1421737": {
                "keyname": "容量:66`款式:44",
                "stock": "8",
                "groupPrice": "8",
                "singlePrice": "16",
                "storeCode": "88",
                "storeImg": "http://ooc3vwe04.bkt.clouddn.com/5ab377735bacc35090.jpg"
              },
              "1421739_1421737": {
                "keyname": "容量:99`款式:44",
                "stock": "9",
                "groupPrice": "6",
                "singlePrice": "12",
                "storeCode": "88",
                "storeImg": "http://ooc3vwe04.bkt.clouddn.com/5ab377793fa5587487.jpg"
              }
            }
          }
       }
       console.log(JSON.stringify(data))
       return 
       releaseNewProductEdit.submitReleaseNewProduct("/api/goods/savedraft",data,this);
     },
     deleteItem(count,data,ind){
      //  return 
      //  console.log(JSON.stringify(this.addHead))
      var len = this.itemHead.length;
      if(len>6){
        this.itemHead.splice(-len,len-6);
      }
      this.itemBody = [];
       data.splice(ind,1);
       if(count==1){
         this.addSpeOnceArr.splice(ind,1);
         var arr1 = this.addSpeOnceArr;
         var arr2 = this.addSpeSecArr;
       }else if(count==2){
         this.addSpeSecArr.splice(ind,1)
         var arr1 = this.addSpeOnceArr;
         var arr2 = this.addSpeSecArr;
       }
       //两个规格都存在
        if(arr1.length&&arr2.length){
          for(var i=0;i<arr1.length;i++){
              for(var j=0;j<arr2.length;j++){
                  this.itemBody.push({"attr1":arr1[i],"attr2":arr2[j]});
              }
          }
          //第二个规格存在
        }else if(!arr1.length&&arr2.length){
          for(var i=0;i<arr2.length;i++){
            this.itemBody.push({"attr2":arr2[i]});
          }
          //第一个规格存在
       }else if(!arr2.length&&arr1.length){
          for(var i=0;i<arr1.length;i++){
            this.itemBody.push({"attr1":arr1[i]});
          }
          //二种规格不存在
       }else if(!arr2.length&&!arr1.length){
            this.itemBody = '';
       }
       
       console.log(this.itemsOnce.length)
       console.log(this.itemsSec.length)
      //  console.log(!this.itemsOnce)
       if(!this.itemsOnce.length&&this.itemsSec.length){
          this.addHead.splice(0,1);
       }else if(!this.itemsSec.length&&this.itemsOnce.length){
          this.addHead.splice(1,1);
       }
     },
     selectGoodsSpecifications(event){
       var e = window.e || window.event;
       var targetName = e.target;
       var uid = targetName.getAttribute("uid");
       var sel = document.getElementsByClassName("sel")[0];
       var btn = sel.getElementsByClassName("btn");
       this.addSpeOnceArr=[];
       this.addSpeSecArr=[];
       for(var i=0;i<btn.length;i++){
          btn[i].className = "btn";
          if(targetName.nodeName.toLowerCase()=='span'){
            this.itemBody = [];
            if(uid==2){
              this.valueOnce = ''; 
              this.valueSec = '';
              this.itemsOnce = [];
              this.itemsSec = [];
              this.itemHead.splice(-5,this.itemHead-5);
              this.itemBody = [];
              this.valueSecBoolean = true;
            }else if(uid==1){   
              this.valueOnce = '';           
              this.itemsOnce = [];
              this.itemsSec = [];
              this.itemHead.splice(-5,this.itemHead-5);
              this.itemBody = [];
              this.valueSecBoolean = false;
            }
            targetName.className = "btn active";
          }
       }
     },
    handleCheckReverseChange(val){
        let data  = new Set(cityOptions); 
        let checkedCities  = new Set(this.checkedCities); 
        let difference= [...new Set([...data].filter(x=> !checkedCities.has(x)))];
        this.checkedCities = difference;
          this.isIndeterminateReverse = false;
          this.len = this.checkedCities.length;
   },
    handleCheckAllChange(val) {
        this.checkedCities = val ? cityOptions : [];
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
        console.log(val)
       releaseNewProductEdit.getGoodsThirCategory("/api/goods/category/"+val,this)
     },
     selectIndex(val){
       console.log(val)
       releaseNewProductEdit.getGoodsSecCategory("/api/goods/category/"+val,this)
     }
   }
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
