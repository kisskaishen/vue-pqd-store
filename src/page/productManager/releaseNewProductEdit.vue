<template>
 <div class="releaseNewProductEdit">
     <!-- <div class="common-top-title">发布新商品111111111111111
          <div id="btn_sends">
                <router-link :to="{path:'/store/orderManager/order'}">返回</router-link>
          </div>
      </div> -->

        <div class="right_title">发布新商品
            <!--<div class="btn_send">
                <span v-for="item in button">
                    <span v-if="item.position=='1'">
                        <el-button size="small" type="danger" @click="DialogVisible=true">{{item.buttonName}}</el-button>
                </span>
                </span>
            </div>-->
            <div id="btn_sends">
                  <router-link :to="{path:root_back}">返回</router-link>
            </div>
        </div>
     <div class="item">
       <div class="title">商品关键信息</div>
      <div class="content">
          <span class="category">商品分类：</span>
          <!--<div>
          	  <el-cascader
          	  	size="small"
			    expand-trigger="hover"
			    :options="options1"
			    :props = "propsDefault"
			    v-model="default_catId"
			    @change="handleChange">
			  </el-cascader>
          </div>-->
          <div class="box">
              <el-select size="small" v-model="firstCategory" placeholder="请选择商品分类" @change="selectIndex">
              <el-option
                v-for="item in options1"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="box">
              <el-select size="small" v-model="secCategory" placeholder="请选择商品分类" @change="selectSec">
              <el-option
                v-for="item in options2"
                :key="item.id"
                :label="item.name"
                :value="item.id">
              </el-option>
            </el-select>
          </div>
          <div class="box"  v-if="is_haitao=='false'">
              <el-select size="small" v-model="thirthCate" @change="selectThr" placeholder="请选择商品分类">
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
           <div class="box-inputs">
             <input class="input_check" type="text" style="width:500px" v-model.trim="listJson.goods_name"  @keyup="checkWord(listJson.goods_name)" @mousedown="checkWord(listJson.goods_name)" placeholder="标题字符为20-60个">
           </div>
           <div class="box-input" style="line-height: 32px;margin-left:10px;">
             	当前字符{{accountNum}}/60个,一个汉字为两个字符。
           </div>
         </div>
         <div class="tits">
           <span class="category">商品市场价：</span>
           <div class="box-input">
             <div style="overflow:hidden">
                <div class="left">
                	<input type="text" class="self_input_valiate"  maxlength="9" v-model.trim="listJson.market_price" onkeyup="this.value=this.value.toString().match(/^\d+(?:\.\d{0,2})?/)"/>
                  <!--<el-input size="small" :maxlength='9' v-model.trim="listJson.market_price" placeholder="最大9位数"></el-input>-->
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
                  <span class="default-address" @click="defaultAddress()">常用地址</span>
                  <div style="margin: 15px 0;"></div>
                  <el-checkbox-group v-model="checkedCities" @change="handleCheckedCitiesChange">
                      <el-checkbox v-for="city in cities" :label="city.infos" :key="city.val">{{city.val}}</el-checkbox>
                  </el-checkbox-group>
                  <div class="sum">已选择{{checkedCities.length}}个配送地区</div>
              </div>
           </div>
         </div>
         <div class="tits">
           <span class="category">商品描述：</span>
           <div class="right">
              <div class="box-input">
                  <textarea  :maxlength='500' v-model.trim="listJson.goods_remark" style="height: 100px;width: 800px;resize: none;border:1px solid #dcdfe6;border-radius:4px;"></textarea>
                  <!-- <el-input
                    type="textarea"
                    :rows="5"
                    :cols="15"
                    placeholder="请输入内容"
                    v-model="listJson.goods_remark">
                  </el-input> -->
              </div>
              <div class="explain">字数限制：20-500</div>
           </div>
         </div>
       </div>
       <up-load @changeOriginalImg = "originalImg" :isNewProduct="type" :upLoadData="upLoadData1" :title="componentTitle1" :explain="componentExplain1" :imageArr="listJson.original_img" :limit="1" :type="typeImg1" @deleteBig="watchChild"></up-load>
       <up-load @changeListImg = "listImg" :isNewProduct="type" :upLoadData="upLoadData2" :title="componentTitle2" :explain="componentExplain2" :imageArr="listJson.list_img" :limit="1" :type="typeImg2" @deleteBig="watchChild"></up-load>
       <up-load-slider @changeGoodsImages = "goodsImages" :upLoadData="upLoadData3" :title="componentTitle3" :explain="componentExplain3" :imageArr="listJson.sowing_images" :limit="1" :type="typeImg3" @deleteBig="watchChild"></up-load-slider>
       <product-detail-upload @changeGoodsContent = "goodsContent" :upLoadData="upLoadData4" :title="componentTitle4" :explain="componentExplain4" :imageArr="listJson.goods_images" :limit="1" :type="typeImg4" @deleteBig="watchChild"></product-detail-upload>
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
              <el-select size="small" v-model="listJson.specone" placeholder="请选择规格" @change="changeOnce">
                <el-option
                  v-for="item in options4"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-button size="small" type="primary" class="add" @click="addSpeOnceDialog">添加</el-button>
           </div>
           <div class="onceSpecModel" v-show="speconelist">
             <ul class="onceSpecWarp">
               <li v-for="(item,index) in speconelist">
                <span>{{item}}</span>
                <span class="delete" @click="deleteItem(1,speconelist,index)"></span>
               </li>
             </ul>
           </div>
           <div class="select"  v-show="showSecItem">
              <el-select size="small" v-model="listJson.spectwo" placeholder="请选择规格" @change="changeSec">
                <el-option
                  v-for="item in options4"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
              <el-button size="small" type="primary" class="add" @click="addSpeSecDialog">添加</el-button>
           </div>
           <div class="onceSpecModel" v-show="spectwolist">
             <ul class="onceSpecWarp">
               <li v-for="(item,index) in spectwolist">
                <span>{{item}}</span>
                <span class="delete" @click="deleteItem(2,spectwolist,index)"></span>
               </li>
             </ul>
           </div>
            <div class="setting">
              <span class="text">批量设置：</span>
              <div class="box-put">
                  <div class="texts">设置库存</div>
                  <div class="width_inmp">
                  <el-input size="small" :maxlength='7' v-model.trim="setData.set_store_count" placeholder="设置库存"></el-input>
                  </div>
              </div>
              <div class="box-put">
                  <div class="texts">团购价</div>
                  <div class="width_inmp">
                  <el-input size="small" :maxlength='7' v-model.trim="setData.set_prom_price" placeholder="团购价"></el-input>
                  </div>
              </div>
              <div class="box-put">
                  <div class="texts">单买价</div>
                  <div class="width_inmp">
                  <el-input size="small" :maxlength='7' v-model.trim="setData.set_price" placeholder="单买价"></el-input>
                  </div>
              </div>
              <div class="box-put">
                  <div class="texts">商家编码</div>
                  <div class="width_inmp">
                  <el-input size="small" :maxlength='20' v-model.trim="setData.set_bar_code" placeholder="商家编码"></el-input>
                  </div>
              </div>
              <el-button style="float:left;margin-right:10px;" size="small" type="danger" @click="setTableData()">确定</el-button>
              <div class="tips_product_warp">
              	<el-button style="float:left;" size="small" type="danger" @click="abnormalData()">检测异常数据</el-button>
				<div class="icon_img">
					<img @mouseout="mouseouttext()" @mouseover="mouseovertext()" src="../../img/recharge/icon_question.png"/>
					<div class="text_tips" v-show="controlTips">
						<div class="content_tips">
							<div class="paragraph">如果您的商品数据出现 无法删除单规格、规格名称数据混乱等情况，您可以尝试点击“检测异常数据”来检测您的商品，系统会自动检测异常数据。</div>
							<div class="paragraph">若检测到异常数据，确定删除全部异常数据，并提示“删除成功”，异常数据框关闭，需要您在发布新商品页，点击“提交”之后，异常数据才真正删除，否则执行无效。</div>
							<div class="paragraph">点击“取消”按钮或者叉号，关闭异常数据框，则并未删除异常数据。</div>
							<div class="paragraph">若提示未检测到异常数据，那您可以放心管理您的商品哦！</div>
						</div>
						<div class="content_out"></div>
					</div>
				</div>
              </div>
              <div style="clear:both"></div>
            </div>
            <div class="showTable">
              <div class="table-show">
                <table class="release_tab">
                  <thead>
                    <tr>
                      <th v-show="speconelist.length">{{speconename}}</th>
                      <th v-show="spectwolist.length">{{spectwoname}}</th>
                      <th>当前库存</th>
                      <th>设置库存</th>
                      <th>团购价</th>
                      <th>单买价</th>
                      <th>商家编码</th>
                      <th v-show="type!='newProduct'">是否上架</th>
                      <th>备用SKU图</th>
                      <th v-show="type!='newProduct'">操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-show="goodsprice.length==0">
                        <td colspan="10" align="center" style="padding:20px;">暂无数据</td>
                    </tr>
                    <tr v-for="(val,index) in goodsprice">
                      <td v-show="speconelist.length">
                        {{val.specone_name}}
                      </td>
                      <td v-show="spectwolist.length">
                         {{val.spectwo_name}}
                      </td>
                      <td class="width-tr-140">
                        <div class="width-120">
                            <div class="show_store_count">{{val.current_stock?val.current_stock:0}}</div>
                        </div>
                      </td>
                      <td class="width-tr-140">
                        <div class="width-120">
                            <el-input size="small" :maxlength='7'  v-model.trim="val.store_count" placeholder="" @blur="setStoreCount(val.store_count)"></el-input>
                        </div>
                      </td>
                      <td class="width-tr-140">
                        <div class="width-120">
                            <el-input size="small" :maxlength='7' v-model.trim="val.prom_price" placeholder=""></el-input>
                        </div>
                      </td>
                      <td class="width-tr-140">
                        <div class="width-120">
                            <el-input size="small" :maxlength='7' v-model.trim="val.price" placeholder=""></el-input>
                        </div>
                      </td>
                      <td class="width-tr-140">
                        <div class="width-120">
                            <el-input size="small" :maxlength='20' v-model.trim="val.bar_code" placeholder=""></el-input>
                        </div>
                      </td>
                      <td class="width-tr-140" v-show="type!='newProduct'">
                        {{val.is_on_sale_text?val.is_on_sale_text:"上架"}}
                      </td>
                      <td>
                        <up-load-small @changeSmall="emitImg" :upLoadData="upLoadData5" :childArr="val" :keys="index" :imageUrl="val.img" @deleteSmall="delete_Small(val)"></up-load-small>
                      </td>
                      <td v-show="type!='newProduct'">
                        <el-button type="text" @click="operateTheGoods(listJson,val)">{{val.is_on_sale=='1' ? "下架" : "上架"}}</el-button>
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
                          <el-input :maxlength='7' size="small" disabled v-model.trim="self_store_count" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                  <div class="left">
                    <div class="width-120">
                          <el-input :maxlength='20' size="small" disabled v-model.trim="listJson.goods_sn" placeholder="请输入内容"></el-input>
                    </div>
                  </div>
                </div>
              </div>
              <ul class="warp">
                <li>a.总库存=已上架状态SKU的预估当前库存 + 已上架状态SKU的库存增减</li>
                <li>b.预览图必须是商品属性图</li>
                <li>c.预览图大小：预览图大小最大500k，尺寸480*480px</li>
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
            <el-input size="small" :maxlength='2' v-model.trim="listJson.prom" placeholder="请输入内容"></el-input>
          </div>
          <div class="detail-explain">平台入驻商家上传商品价格默认为包邮价格，团购人数建议2~3人</div>
        </div>
      </div>
      <div class="content">
        <span class="category">是否限购：</span>
        <div class="right" style="line-height: 32px;margin-left:20px;">
			  <el-radio-group v-model="listJson.is_limit_num" @change="isLimit()">
			    <el-radio :label="2">是</el-radio>
			    <el-radio :label="1">否</el-radio>
			  </el-radio-group>
        </div>
      </div>
      <div class="is_limit_num_warp" v-show="isLimitDialog">
      	<el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" style="width:520px;">
	<el-form-item label="单次限量" prop="limit_single_num">
		<div class="style_input_text_warp">
			<div class="style_input_text_warp_left">
	    		<!--<el-input size="small" v-model="ruleForm.limit_single_num"></el-input>-->
	    		<input type="text" :maxlength="6" class="self_input_valiate" v-model.trim="ruleForm.limit_single_num" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
			</div>
			<div class="style_input_text_warp_right">
				<span>(1~999999)</span>
			</div>
		</div>
	</el-form-item>
	<el-form-item label="限购次数" prop="limit_order_num">
		<div class="style_input_text_warp">
			<div class="style_input_text_warp_left">
	    		<!--<el-input size="small" v-model="ruleForm.limit_order_num"></el-input>-->
	    		<input type="text" :maxlength="6" class="self_input_valiate" v-model.trim="ruleForm.limit_order_num" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
			</div>
			<div class="style_input_text_warp_right">
				<span>(1~999999)</span>
			</div>
		</div>
	</el-form-item>
	<el-form-item label="限购总数" prop="limit_total_num">
		<div class="style_input_text_warp">
			<div class="style_input_text_warp_left">
	    		<!--<el-input size="small" v-model="ruleForm.limit_total_num"></el-input>-->
	    		<input type="text" :maxlength="6" class="self_input_valiate" v-model.trim="ruleForm.limit_total_num" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
			</div>
			<div class="style_input_text_warp_right">
				<span>(1~999999)</span>
			</div>
		</div>
	</el-form-item>
	<el-form-item label="限购时间" prop="limit_num_start_time">
		<div class="style_input_text_warp">
			<div class="style_input_text_warp_left">
      			<el-form-item prop="limit_num_start_time">
	    		    <el-date-picker
	    		    	size="small"
				      v-model="ruleForm.limit_num_start_time"
				      type="datetime"
				      value-format="yyyy-MM-dd HH:mm:ss"
				      placeholder="选择日期">
				    </el-date-picker>
				</el-form-item>
			</div>
			<div style="float:left;margin:0 10px;">
				至
			</div>
			<div class="style_input_text_warp_left">
      			<el-form-item prop="limit_num_end_time">
	    		    <el-date-picker
	    		    	size="small"
				      v-model="ruleForm.limit_num_end_time"
				      type="datetime"
				      value-format="yyyy-MM-dd HH:mm:ss"
				      placeholder="选择日期">
				    </el-date-picker>
				</el-form-item>
			</div>
		</div>
	</el-form-item>
</el-form>
      </div>
    </div>
    <div class="foo">
      <div class="center">
        <el-button size="small" @click="submitNewProduct('1','ruleForm')">保存草稿</el-button>
        <el-button size="small" type="danger" @click="submitNewProduct('2','ruleForm')">提交</el-button>
      </div>
    </div>
    <el-dialog
      title="添加规格"
      :visible.sync="addSpeOnce"
      width="30%">
      <input class="input_check" type="text" style="width:190px" v-model.trim="speOnce"  @keyup="keyupGoodCate1(speOnce)" @mousedown="keyupGoodCate1(speOnce)" placeholder="请输入内容">
      <!-- <el-input :maxlength="setLength_20" @input = "keyupGoodCate1(speOnce)" v-model.trim="speOnce" placeholder="请输入内容"></el-input> -->
      <div class="">
        当前字符{{accountNum1}}/20个，一个汉字为2个字符
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addSpeOnce = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addSpeBtnOnce()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title="添加规格"
      :visible.sync="addSpeSec"
      width="30%">
      <input class="input_check" type="text" style="width:190px" v-model.trim="speSec"  @keyup="keyupGoodCate1(speSec)" @mousedown="keyupGoodCate1(speSec)" placeholder="请输入内容">
      <!-- <el-input :maxlength="setLength_20" @input = "keyupGoodCate2(speSec)" v-model.trim="speSec" placeholder="请输入内容"></el-input> -->
      <div class="">
        当前字符{{accountNum2}}/20个，一个汉字为2个字符
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="addSpeSec = false">取 消</el-button>
        <el-button size="small" type="primary" @click="addSpeBtnSec()">确 定</el-button>
      </span>
    </el-dialog>
    </el-dialog>
        <el-dialog
      :title='"已为您找到以下异常数据"+abnormalDatas.length+"条"'
      :visible.sync="abnormalDialog"
      border
      width="80%">
      <div v-show="abnormalDatas.length==0" style="padding:20px 0;text-align: center;">暂无数据</div>
      <table class="release_tab" v-show="abnormalDatas.length!=0">
                  <thead>
                    <tr>
                      <th v-show="speconelist.length">{{speconename}}</th>
                      <th v-show="spectwolist.length">{{spectwoname}}</th>
                      <th>当前库存</th>
                      <th>团购价</th>
                      <th>单买价</th>
                      <th>商家编码</th>
                      <th>是否上架</th>
                      <th>备用SKU图</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(val,index) in abnormalDatas">
                      <td v-show="speconelist.length">
                        {{val.specone_name}}
                      </td>
                      <td v-show="spectwolist.length">
                         {{val.spectwo_name}}
                      </td>
                      <td class="width-tr-140">
                        <div class="width-120">
                            {{val.store_count}}
                        </div>
                      </td>
                      <td class="width-tr-140">
                        <div class="width-120">
                            {{val.prom_price}}
                        </div>
                      </td>
                      <td class="width-tr-140">
                        <div class="width-120">
                            {{val.price}}
                        </div>
                      </td>
                      <td class="width-tr-140">
                        <div class="width-120">
                            {{val.bar_code}}
                        </div>
                      </td>
                      <td class="width-tr-140">
                        {{val.is_on_sale_text}}
                      </td>
                      <td>
                      	{{val.img}}
                      </td>
                    </tr>
                  </tbody>
                </table>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="abnormalDialog = false">取 消</el-button>
        <el-button size="small" type="primary" @click="deleteAbnormalList()">确 定</el-button>
      </span>
    </el-dialog>
        <!--<el-dialog
      title='限购设置'
      :visible.sync="isLimitDialog"
      border
      width="600px">

      <span slot="footer" class="dialog-footer">
        <el-button size="small" @click="isLimitDialog = false">取 消</el-button>
        <el-button size="small" type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>-->
 </div>
</template>

<script>
// const cityOptions = ['北京', '安徽', '福建', '甘肃', '广东', '广西', '贵州', '海南', '河北', '河南', '黑龙江', '湖北', '湖南', '吉林', '江苏', '江西', '辽宁', '内蒙古', '宁夏', '青海', '山东', '陕西', '上海', '四川', '天津', '西藏', '新疆', '云南', '浙江', '重庆'];
import cityOptions from "../../json/postalArea.json";
import Vue from "vue";
import upLoad from '../../components/upLoad';
import upLoadSmall from '../../components/upLoadSmall';
import upLoadSlider from '../../components/slider';
import productDetailUpload from '../../components/product_detail_upload';

import releaseNewProductEdit from '../../js/releaseNewProductEdit';
 export default {
   data () {
     return {
     	controlTips:false,
     	isLimitDialog:false,
     	ruleForm:{
     		limit_single_num:999999,
     		limit_order_num:999999,
     		limit_total_num:999999,
     		limit_num_start_time:'',
     		limit_num_end_time:'',
     	},
        rules: {
          limit_single_num: [
            { required: true, message: '请输入单次限量数', trigger: 'blur' },
          ],
          limit_order_num: [
            { required: true, message: '请输入限购次数', trigger: 'blur' },
          ],
          limit_total_num: [
            { required: true, message: '请输入限购总数', trigger: 'blur' },
          ],
          limit_num_start_time: [
            { required: true, message: '请选择限购开始时间', trigger: 'blur' },
          ],
          limit_num_end_time: [
            { required: true, message: '请选择限购结束时间', trigger: 'blur' },
          ],
        },
     	radio2:2,
          abnormalDatas: [],
     	abnormalDialog:false,
     	thirthCate:'',
     	firstCategory:'',
     	secCategory:'',
     	default_catId:['34'],
     	propsDefault:{
     		value:'id',
     		label:'name',
     		children:'children'
     	},
     	accountNum:0,
     	accountNum1:0,
     	accountNum2:0,
      setLength_20:60,
      goods_con:60,
       root_back:'',
       is_haitao:'',
       categoryInfo:{},
       formData:{},
       type:'',
       msg:0,
       smallImgArr:[],//规格图片
       goods_id:'',
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
          is_limit_num:1,
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
          source:"originalImg",
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
          source:"listImg",
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
          source:"sliderImg",
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
            value:"d.数量限制在20张之内",
          }
        ],
        typeImg4:"detailsImg",
        upLoadData4:{
          source:"detailsImg",
        },
        upLoadData5:{
          source:"goodSkuImg",
        },
        idArr:[],
     }
   },
   watch:{
     goodsprice(old,newVal){
     },
     radio2(newVal,oldVal){
     	console.log(newVal)
     	console.log(oldVal)
     }
   },
    created(){
      //  //获取商品类目
      // var datas = "北京市, 安徽省, 甘肃省, 广东省, 广西壮族自治区, 贵州省, 海南省, 河北省, 河南省, 黑龙江省, 湖北省, 湖南省,",
        // var checkedCities = ["北京"];
        this.goods_id = this.$route.query.goods_id;
        var is_haitao = localStorage.getItem("is_haitao");
        this.is_haitao = is_haitao;
        this.type = this.$route.query.type;
        if(this.type!='newProduct'){
          this.root_back = '/store/productManager/productList';
          var data = {
            goods_id :this.goods_id
          }
          releaseNewProductEdit.getReleaseNewProductEdit("/Goods/goodsDetails",data,this);
        }
          this.root_back = '/store/productManager/releaseNewProducts';

      //  //获取商品规格 specification
      var data = {
        category:0
      }
      releaseNewProductEdit.getGoodsCategory("/Goods/category",data,this);
      releaseNewProductEdit.getSpecification("Goods/specList", this)

    },
   components: {
      upLoad,upLoadSmall,upLoadSlider,productDetailUpload
   },
   methods:{
		mouseouttext(){
			this.controlTips = false;
		},
		mouseovertext(){
			this.controlTips = true;
		},
   	submitForm(formName){
   		this.$refs[formName].validate((valid) => {
          if (valid) {
	         this.listJson.limit_single_num = this.ruleForm.limit_single_num;
	         this.listJson.limit_order_num = this.ruleForm.limit_order_num;
	         this.listJson.limit_total_num = this.ruleForm.limit_total_num;
	         this.listJson.limit_num_start_time = this.ruleForm.limit_num_start_time;
	         this.listJson.limit_num_end_time = this.ruleForm.limit_num_end_time;
   			this.isLimitDialog = false;
          } else {
            console.log('error submit!!');
            return false;
          }
        });
   	},
   	isLimit(){
   		if(this.listJson.is_limit_num==2){
   			this.isLimitDialog = true;
   		}else{
   			this.isLimitDialog = false;
   		}
   	},
   	abnormalData(){
   		var that = this;
   		that.abnormalDatas = [];
   		this.goodsprice.forEach((item)=>{
   			if(item.specone_name==''){
   				//第一种为空了
   				that.abnormalDatas.push(item)
   			}else{
   				if(item.spectwo_name!=undefined&&item.spectwo_name==''){
   					//第二种不存在
   					that.abnormalDatas.push(item)
   				}
   			}
   		})
   		this.abnormalDialog = true;
   	},
   	deleteAbnormalList(){
   		var that = this;
   		this.abnormalDatas.forEach((item)=>{
   			that.idArr.push(item.id);
   		})
		Array.prototype.contains = function(obj) {
		     var i = this.length;
		     while (i--) {
		             if (this[i] == obj){
		             return true;
		         }
		     }
		     return false;
		};
		var taskList = this.goodsprice;
	 	for(var i=0;i<taskList.length;){
	 		var task = taskList[i];
	 		if(that.idArr.contains(task.id)){
	 			taskList.splice(i,1)
	 			continue;
	 		}
	 		i++;
	 	}
	 	this.abnormalDialog = false;
   	},
   	operateTheGoods(params,currentData){
   		var goodsId = params.goods_id;
   		var spec_id = currentData.id;
   		var actionText = currentData.is_on_sale=='0' ? "up" : "down";
   		var data = {
   			goodsId:goodsId,
   			action:actionText,
   			spec_id:spec_id,
   		}
   		releaseNewProductEdit.upDownSale("Goods/upDownSale",data, this,currentData)
   	},
   	handleChange(value){
    // var str = this.listJson.goods_name;
    //   this.goods_con = setMaxLength/2;
   	},
   	checkWord(val){
      var maxstrlen = 30;
      var len=maxstrlen;
      var str = val;
      var con = this.getStrleng(val,maxstrlen);
      if(con[0]>len*2){
        this.listJson.goods_name = str.substring(0,con[1]-1);
        this.accountNum = 60;
      }else{
          this.accountNum = Math.floor(con[0]);
      }
   	},
    getStrleng(str,maxstrlen){
        var myLen =0;
        var i=0;
        for(;(i<str.length)&&(myLen<=maxstrlen*2);i++){
        if(str.charCodeAt(i)>127 || str.charCodeAt(i)==94)
            myLen+=2;
        else
          myLen++;
        }
        return [myLen,i];
    },
   	keyupGoodCate1(val){
          var maxstrlen = 10;
          var len=maxstrlen;
          var str = val;
          var con = this.getStrleng(val,maxstrlen);
          if(con[0]>len*2){
            this.speOnce = str.substring(0,con[1]-1);
                this.accountNum1 = 20;
          }else{
              this.accountNum1 = Math.floor(con[0]);
          }
   	},
   	keyupGoodCate2(val){
          var maxstrlen = 10;
          var len=maxstrlen;
          var str = val;
          var con = this.getStrleng(val,maxstrlen);
          if(con[0]>len*2){
            this.speSec = str.substring(0,con[1]-1);
                this.accountNum2 = 20;
          }else{
              this.accountNum2 = Math.floor(con[0]);
          }
   	},
     defaultAddress(){
       this.checkedCities = [
         "北京市",
         "安徽省",
         "天津市",
         "福建省",
         "广东省",
         "河北省",
         "湖南省",
         "辽宁省",
         "山东省",
         "四川省",
         "云南省",
         "广西壮族自治区",
         "河南省",
         "吉林省",
         "山西省",
         "浙江省",
         "贵州省",
         "黑龙江省",
         "江苏省",
         "陕西省",
         "重庆市",
         "湖北省",
         "江西省",
         "上海市",
         ]
     },
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
       item.img = '';
     },
     goodsContent(val){
       /**
        商品详情图
        */
        this.listJson.goods_images = val;
     },
     goodsImages(val){
       /**
        商品轮播图
        */
        this.listJson.sowing_images = val;
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
       this.listJson.original_img = val;
     },
     //批量设置
     setTableData(){
       var result = this.goodsprice;
       if(result.length==0){
         this.$message({
           type:"info",
           message:"请输入规格"
         })
         return
       }
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
       var info = val.info;
       var keys = val.keys;
       this.goodsprice[keys].img = info;
     },
     //改变规格 一种规格时
     changeOnce(value){
          this.speconelist = [];
          this.spectwolist = [];
          this.goodsprice = [];
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
          this.specone = value;
          var arr2 = this.spectwolist;
          if(arr2.length!=0){
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
       if(this.accountNum1-20>0){
         this.$message({
           type:"info",
           message:"超出规定字符长度"
         })
         return
       }
      //  speOnce
      if(this.speOnce == ''){
        this.$message({
          type:'info',
          message:'请输入规格'
        })
        return
      }
       this.addSpeOnce = false;
       var self = this;
       var fls = false;
       this.speconelist.forEach((item,key)=>{
         if(item==this.speOnce){
            fls = true;
         }
       })
       if(fls){
           self.$message({
             type:'info',
             message:'不能设置同种规格'
           })
           return
       }
       this.speconelist.push(this.speOnce);
       var arr1 = this.speconelist;
       var arr2 = this.spectwolist;
       var jsonData = this.goodsprice;
      this.goodsprice = [];
              //两个规格都存在
        if(arr1.length!=0&&arr2.length!=0){
          var len1 = arr1.length;
          var len2 = arr2.length;
          var totalLen = len1*len2;
          /*  1有一个  一有多个   2有一个  2有多个 */
          if(len1==1&&len2==1){
              jsonData[0].specone_name = arr1[0];
              jsonData[0].spectwo_name = this.speSec;
          }else if(len1==1&&len2>1){
              for(var i=0;i<len2;i++){
                 jsonData.push({
                  specone_name:this.speOnce,
                  spectwo_name:arr2[i],
                  current_stock:'',
                  store_count:'',
                  price:'',
                  prom_price:'',
                  img:'',
                  bar_code:'',
                })
              }
          }else if(len1>1&&len2==1){
                 jsonData.push({
                  specone_name:this.speOnce,
                  spectwo_name:arr2[0],
                  current_stock:'',
                  store_count:'',
                  price:'',
                  prom_price:'',
                  img:'',
                  bar_code:'',
                })
          }else if(len1>1&&len2>1){
              for(var i=0;i<len2;i++){
                 jsonData.push({
                  specone_name:this.speOnce,
                  spectwo_name:arr2[i],
                })
              }
          }
            for(var h=0;h<totalLen;h++){
              var list = {
                "specone_name" : jsonData[h].specone_name,
                "spectwo_name" : jsonData[h].spectwo_name,
                "current_stock":jsonData[h].current_stock,
                "store_count":jsonData[h].store_count,
                "price":jsonData[h].price,
                "prom_price":jsonData[h].prom_price,
                "img":jsonData[h].img,
                "bar_code":jsonData[h].bar_code,
            }
            this.goodsprice.push(list);
          }
          //第二个规格存在
        }else if(arr1.length==0&&arr2.length!=0){
          jsonData.push({
            spectwo_name:'',
            current_stock:0,
            store_count:0,
            price:0,
            prom_price:0,
            img:'',
            bar_code:'',
          })
          for(var i=0;i<arr2.length;i++){
                  var list = {
                    "spectwo_name" : arr2[i],
                    "current_stock":jsonData[i].current_stock,
                    "store_count":jsonData[i].store_count,
                    "price":jsonData[i].price,
                    "prom_price":jsonData[i].prom_price,
                    "img":jsonData[i].img,
                    "bar_code":jsonData[i].bar_code,
                }
            this.goodsprice.push(list);
          }
          //第一个规格存在
       }else if(arr2.length==0&&arr1.length!=0){
          jsonData.push({
            specone_name:'',
            current_stock:0,
            store_count:0,
            price:0,
            prom_price:0,
            img:'',
            bar_code:'',
          })
          for(var i=0;i<arr1.length;i++){
                  var list = {
                    "specone_name" : arr1[i],
                    "current_stock":jsonData[i].current_stock,
                    "store_count":jsonData[i].store_count,
                    "price":jsonData[i].price,
                    "prom_price":jsonData[i].prom_price,
                    "img":jsonData[i].img,
                    "bar_code":jsonData[i].bar_code,
                }
            this.goodsprice.push(list);
          }
          //二种规格不存在
       }else if(arr2.length==0&&arr1.length==0){
            this.goodsprice = [];
       }
     },
     //对话框显示
     addSpeOnceDialog(){
       this.accountNum1=0;
       if(this.listJson.specone==undefined){
          this.$message({
            type:'info',
            message:'请您先选择规格'
          })
          return
       }else{
          this.speOnce = '';
          this.addSpeOnce = true;
       }
     },
      //添加规格时  两种种规格时
     addSpeBtnSec(){
       if(this.accountNum2-20>0){
         this.$message({
           type:"info",
           message:"超出规定字符长度"
         })
         return
       }
       if(this.speSec==''){
         this.$message({
           type:'info',
           message:'请输入规格'
         })
         return
       }
        this.addSpeSec = false;
        var fls = false;
       this.spectwolist.forEach((item,key)=>{
         if(item==this.speSec){
            fls = true;
         }
       })
       if(fls){
           this.$message({
             type:'info',
             message:'不能设置同种规格'
           })
           return
       }
       this.spectwolist.push(this.speSec);
       var arr1 = this.speconelist;
       var arr2 = this.spectwolist;
       var jsonData = this.goodsprice;
      this.goodsprice = [];
              //两个规格都存在
        if(arr1.length!=0&&arr2.length!=0){
          var len1 = arr1.length;
          var len2 = arr2.length;
          var totalLen = len1*len2;
          /*  1有一个  一有多个   2有一个  2有多个 */
          if(len1==1&&len2==1){
              jsonData[0].specone_name = arr1[0];
              jsonData[0].spectwo_name = this.speSec;
          }else if(len1==1&&len2>1){
                 jsonData.push({
                  specone_name:arr1[0],
                  spectwo_name:this.speSec,
                })
          }else if(len1>1&&len2==1){
              for(var i=0;i<len1;i++){
                jsonData[i].specone_name = arr1[i];
                jsonData[i].spectwo_name = this.speSec;
              }
          }else if(len1>1&&len2>1){
              for(var i=0;i<len1;i++){
                 jsonData.push({
                  specone_name:arr1[i],
                  spectwo_name:this.speSec,
                })
              }
          }
            for(var h=0;h<totalLen;h++){
              var list = {
                "specone_name" : jsonData[h].specone_name,
                "spectwo_name" : jsonData[h].spectwo_name,
                "current_stock":jsonData[h].current_stock,
                "store_count":jsonData[h].store_count,
                "price":jsonData[h].price,
                "prom_price":jsonData[h].prom_price,
                "img":jsonData[h].img,
                "bar_code":jsonData[h].bar_code,
            }
            this.goodsprice.push(list);
          }
          //第二个规格存在
        }else if(arr1.length==0&&arr2.length!=0){
                  jsonData.push({
                    spectwo_name : '',
                    current_stock:0,
                    store_count:0,
                    price:0,
                    prom_price:0,
                    img:'',
                    bar_code:'',
                  })
          for(var i=0;i<arr2.length;i++){
                  var list = {
                    "spectwo_name" : arr2[i],
                    "current_stock":jsonData[i].current_stock,
                    "store_count":jsonData[i].store_count,
                    "price":jsonData[i].price,
                    "prom_price":jsonData[i].prom_price,
                    "img":jsonData[i].img,
                    "bar_code":jsonData[i].bar_code,
                }
            this.goodsprice.push(list);
          }
          //第一个规格存在
       }else if(arr2.length==0&&arr1.length!=0){
                  jsonData.push({
                    specone_name : '',
                    current_stock:0,
                    store_count:0,
                    price:0,
                    prom_price:0,
                    img:'',
                    bar_code:'',
                  })
          for(var i=0;i<arr1.length;i++){
                  var list = {
                    "specone_name" : arr1[i],
                    "current_stock":jsonData[i].current_stock,
                    "store_count":jsonData[i].store_count,
                    "price":jsonData[i].price,
                    "prom_price":jsonData[i].prom_price,
                    "img":jsonData[i].img,
                    "bar_code":jsonData[i].bar_code,
                }
            this.goodsprice.push(list);
          }
          //二种规格不存在
       }else if(arr2.length==0&&arr1.length==0){
            this.goodsprice = [];
       }
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
          this.spectwo = value;
           var arr1 = this.speconelist;
          for(var i=0;i<arr1.length;i++){
                  var list = {
                    "specone_name" : arr1[i],
                }
            this.goodsprice.push(list);
          }
     },
     addSpeSecDialog(){
         this.accountNum2=0;
       if(this.listJson.spectwo==undefined){
         this.$message({
           type:'info',
           message:'请您先选择规格'
         })
         return
       }else{
        this.addSpeSec = true;
        this.speSec = '';
       }
     },
     submitCommon(con){
     	if(!this.listJson.goods_name){
	          this.$message("请输入商品标题");
	          return
	        }else if(this.accountNum<20){
	          this.$message("商品名称长度为20-60个字符");
	          return
	        }else if(this.accountNum>60){
	          this.$message("商品名称长度为20-60个字符");
	          return
	        }else if(!this.listJson.market_price){
	          this.$message("请输入商品市场价");
	          return
	        }else if(!this.checkedCities.join(",")){
	          this.$message("请选择包邮配送地区");
	          return
	        }else if(!this.listJson.goods_remark){
	          this.$message("请输入商品描述");
	          return
	        }else if(!this.listJson.original_img){
	          this.$message("请上传首页推荐图");
	          return
	        }else if(!this.listJson.list_img){
	          this.$message("请上传类目主图");
	          return
	        }else if(this.listJson.sowing_images==''||!this.listJson.sowing_images){
	          this.$message("请上传商品轮播图");
	          return
	        }else if(!this.listJson.goods_images||this.listJson.goods_images==''){
	          this.$message("请上传商品详情图");
	          return
	        }else if(this.speconelist==''||this.speconelist==undefined){
	          this.$message("请添加规格");
	          return
	        }else if(this.goodsprice.length!=0){
	          var res =this.goodsprice;
	          for(var i=0;i<res.length;i++){
	            if(res[i].img==undefined||res[i].img==''){
	              this.$message("请上传SKU图");
	              return
	            }
	          }
	        }else if(this.goodsprice.length==0){
	          this.$message("请重新选择规格");
	          return
	        }else if(!this.listJson.prom){
	          this.$message("请输入团购人数");
	          return
	        }
	        var fls = '';
	        var fls2 = '';
	        var len = this.speconelist.length;
	        var len2 = this.spectwolist.length;
	        var arr = this.speconelist;
	        var arr2 = this.spectwolist;
	         for(var i = 0; i < len; i++){
				  for(var j = i + 1; j < len; j++){
					   if(arr[i] === arr[j]){
					    fls = true;
					   }
				  }
			 }
	         if(len2!=0){
		         for(var i = 0; i < len2; i++){
					  for(var j = i + 1; j < len2; j++){
						   if(arr2[i] === arr2[j]){
						    fls2 = true;
						   }
					  }
				 }
	         }
	       if(fls2){
	       		this.$message({
	       			type:'info',
	       			message:'第二种规格有重复规格'
	       		})
	       		return
	       }else if(fls){
	       		this.$message({
	       			type:'info',
	       			message:'第一种规格有重复规格'
	       		})
	       		return
	       }
	      var jsonData = {};
	      jsonData.specone = {};
	      jsonData.specone.items = [];
	      jsonData.specone.spec_id = this.listJson.specone;
	      jsonData.specone.name = this.speconename;
	      this.speconelist.forEach((value, index) => {
	          jsonData.specone.items.push({name:value})
	      });
	      if(this.spectwolist.length!=0){
	        jsonData.spectwo = {};
	        jsonData.spectwo.items = [];
	        jsonData.spectwo.spec_id = this.listJson.spectwo;
	        jsonData.spectwo.name = this.spectwoname;
	        this.spectwolist.forEach((value, index) => {
	            jsonData.spectwo.items.push({name:value})
	        });
	      }

	      jsonData.spec_goods = {};
	      jsonData.spec_goods.items = [];

	      var child = {};
	      var self = this;
	      var key_val = '';
	      this.goodsprice.forEach((value, index) => {
	        if(this.spectwolist.length!=0){
	          key_val = value.specone_name+':'+value.spectwo_name;
	        }else{
	          key_val = value.specone_name;
	        }
	          Vue.set(value,'key_name',key_val);
	          self.listJson.goods_sn = value.bar_code;
	          jsonData.spec_goods.items.push(value);
	      });
	      var speone = this.specone?this.specone:'';
	      var spectwo = this.spectwo?this.spectwo:'';
	      var cate_id='';
	      var is_haitao = localStorage.getItem('is_haitao');
	      if(is_haitao=='true'){
	        this.catId = this.secCategory;
	      }else{
	        this.catId = this.thirthCate;
	      }
	       var data = {
	         type:con,
	         one_cate_id:this.firstCategory,
	         two_cate_id:this.secCategory,
	         cat_id:this.catId,
	         specone:speone,
	         spectwo:spectwo,
	         store_count:this.self_store_count,
	         goods_sn:this.listJson.goods_sn,
	         prom:this.listJson.prom,
	         is_haitao:this.listJson.is_haitao,
	         goods_id:this.goods_id,
	         goods_name:this.listJson.goods_name,
	         market_price:this.listJson.market_price,
	         region:this.checkedCities,
	         goods_remark:this.listJson.goods_remark,
	         original_img:this.listJson.original_img,
	         list_img:this.listJson.list_img,
	         sowing_images:this.listJson.sowing_images,
	         goods_images:this.listJson.goods_images,
	         spec_goods_price:jsonData,
	         is_limit_num:this.listJson.is_limit_num,
	         limit_single_num:this.ruleForm.limit_single_num,
	         limit_order_num:this.ruleForm.limit_order_num,
	         limit_total_num:this.ruleForm.limit_total_num,
	         limit_num_start_time:this.ruleForm.limit_num_start_time,
	         limit_num_end_time:this.ruleForm.limit_num_end_time,
	       }
	        if(this.type=='newProduct'){
	          /* 发布 */
	          releaseNewProductEdit.savedraftNewrelease("/Goods/save",data,this);
	        }else if(this.type=='product'){
	          /* 商品 */
	            releaseNewProductEdit.savedraftNewrelease("/Goods/edit",data,this);
	         } else{
	          /* 编辑 */
	          releaseNewProductEdit.savedraftNewrelease("/Goods/editDraft",data,this);
	        }
     },
     //  提交表单
     submitNewProduct(con,formName){
        if(this.listJson.is_limit_num!=1){
	   		this.$refs[formName].validate((valid) => {
	          if (valid) {
	          	this.submitCommon(con);
	          } else {
	            console.log('error submit!!');
	            return false;
	          }
	        });
        }else{
        	this.submitCommon(con);
        }

     },
     deleteItem(count,data,ind){
       /*
         删除单个栏目   table重新排列
       * */
      var jsonData = this.goodsprice;
      this.goodsprice = [];
      var arr1 = this.speconelist;
      var arr2 = this.spectwolist;
              //两个规格都存在
        if(arr1.length!=0&&arr2.length!=0){
            if(arr2.length==1&&arr1.length==1){
              this.goodsprice = jsonData;
                this.$message({
                  type:'info',
                  message:'两种规格不能直接删除'
                })
                return
            }else if(arr2.length==1){
              if(count==2){
                this.goodsprice = jsonData;
                this.$message({
                  type:'info',
                  message:'第二种规格不能为空'
                })
                return
              }
            }else if(arr1.length==1){
              if(count==1){
                this.goodsprice = jsonData;
                this.$message({
                  type:'info',
                  message:'第一种规格不能为空'
                })
                return
              }
            }
            var arrTotal = [];
            if(count==1){
              jsonData.forEach((item,index)=>{
                if(item.specone_name!=data[ind]){
                    arrTotal.push(item)
                }
              })
            }else if(count==2){
                jsonData.forEach((item,index)=>{
                  if(item.spectwo_name!=data[ind]){
                      arrTotal.push(item)
                  }
                })
            }
            this.goodsprice = arrTotal;
            if(count==1){
              this.speconelist.splice(ind,1);
            }else if(count==2){
              this.spectwolist.splice(ind,1)
            }
            //第二个规格存在
        }else if(arr1.length==0&&arr2.length!=0){
          jsonData.splice(ind,1)
          for(var i=0;i<arr2.length;i++){
                  var list = {
                    "spectwo_name" : arr2[i],
                    "current_stock":jsonData[i].current_stock,
                    "store_count":jsonData[i].store_count,
                    "price":jsonData[i].price,
                    "prom_price":jsonData[i].prom_price,
                    "img":jsonData[i].img,
                    "bar_code":jsonData[i].bar_code,
                }
            this.goodsprice.push(list);
          }
          //第一个规格存在
       }else if(arr2.length==0&&arr1.length!=0){
          if(arr1.length==1){
            this.speconelist.splice(ind,1);
            jsonData.splice(ind,1)
          }else{
            this.speconelist.splice(ind,1);
            jsonData.splice(ind,1)
            for(var i=0;i<arr1.length;i++){
                      var list = {
                        "specone_name" : arr1[i],
                        "current_stock":jsonData[i].current_stock,
                        "store_count":jsonData[i].store_count,
                        "price":jsonData[i].price,
                        "prom_price":jsonData[i].prom_price,
                        "img":jsonData[i].img,
                        "bar_code":jsonData[i].bar_code,
                    }
                this.goodsprice.push(list);
            }
          }
          //二种规格不存在
       }else if(arr2.length==0&&arr1.length==0){
            this.goodsprice = [];
       }
     },
     selectGoodsSpecifications(event){
       var e = window.e || window.event;
       var targetName = e.target;
       var uid = targetName.getAttribute("uid");
       var sel = document.getElementsByClassName("sel")[0];
       var btn = sel.getElementsByClassName("btn");

//    this.specone = '';
//    this.spectwo = '';
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
//            this.speconename = '';
//            this.spectwoname = '';
              this.goodsprice = [];
              this.speconelist = [];
              this.spectwolist = [];
            }else if(uid==1){
              this.isActive = true;
              this.showSecItem = false;
//            this.speconename = '';
//            this.spectwoname = '';
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
     	if(this.is_haitao=='true'){
     		this.catId = val;
     	}else{
	       var data = {
	         category:val
	       }
	       releaseNewProductEdit.getGoodsThirCategory("/Goods/category",data,this)
     	}
     },
     selectThr(val){
       this.catId = val
     },
     selectIndex(val){
       var data = {
         category:val
       }
       releaseNewProductEdit.getGoodsSecCategory("/Goods/category",data,this)
     }
   },
 }
</script>

<style lang="less" scoped>
@import '../../less/config.less';
.input_check{
	-webkit-appearance: none;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #606266;
    display: inline-block;
    font-size: inherit;
    height: 30px;
    line-height: 30px;
    outline: 0;
    padding: 0 15px;
    -webkit-transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
    width: 100%;
}
.tips_product_warp{
	float: left;
     .icon_img{
        float:left;
        margin-left:17px;
         width:22px;
         height:22px;
         margin-top:5px;
         cursor: pointer;
         img{
             width:22px;
             height:22px;
         }
         .text_tips{
             position: relative;
             z-index: 9;
             width:200px;
             .content_tips{
                position:absolute;
                background:#999;
                border-radius: 5px;
                left:40px;
                top:-40px;
                padding:20px;
                line-height: 1.5;
                color:#fff;
                width:200px;
                font-size:14px;
             }
             .content_out{
                position:absolute;
                top:-30px;
                left:24px;
                border-color:transparent #999999 transparent transparent;
                border-style:dashed dashed solid dashed;
                border-width:8px;
             }
         }
     }
}
.style_input_text_warp{
	overflow: hidden;
	height:52px;
	.style_input_text_warp_left{
		float:left;
		width:190px;
		.el-date-editor.el-input, .el-date-editor.el-input__inner{
			width:190px;
		}
	}
	.style_input_text_warp_right{
		float:left;
		margin-left:10px;
	}
}
.releaseNewProductEdit{
    background:@backgroundfff;
    .onceSpecModel{
      .onceSpecWarp{
      	margin-top:40px;
        padding:20px 0;
        overflow: hidden;
        li{
          float:left;
          padding:10px 20px;
          border:1px solid #eee;
          margin-right:20px;
          margin-bottom:20px;
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
        height:32px;
        line-height:32px;
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
             padding-bottom:10px;
             .text{
               height:32px;
               line-height: 32px;
               float:left;
             }
             .box-put{
               float:left;
               margin-right:10px;
               overflow: hidden;
              .texts{
                height:32px;
                line-height: 32px;
                float:left;
                margin-right:10px;
                text-align: center;
              }
              .width_inmp{
                float:left;
                 width:120px;
              }
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
          height:32px;
          line-height: 32px;
          float:left;
        }
        .box-input{
          float:left;
        }
        .box-inputs{
          float:left;
  			  width:520px;
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
