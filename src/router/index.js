import Vue from 'vue'
import Router from 'vue-router'

//登陆
import Login from '@/page/login'

// 首页
import borderContent from '@/page/border-content'

import index from '@/page/index/index'
import forget from '@/page/forget'

// 订单管理
import orderList from '@/page/orderManager/orderList'
import down_export from '@/page/orderManager/down_export'
import orderDetail from '@/page/orderManager/orderDetail'
import customerServiceList from '@/page/orderManager/customerServiceList'
import customerServiceDetail from '@/page/orderManager/customerServiceDetail'
import batchDelivery from '@/page/orderManager/batchDelivery'
import freightFormwork from '@/page/orderManager/freightFormwork'
import created_freight from '@/page/orderManager/created_freight'
import usage from '@/page/orderManager/usage'

// 商品管理
import productActiveList from '@/page/productManager/productActiveList'
import productList from '@/page/productManager/productList'
import shemeProductList from '@/page/productManager/shemeProductList'
import releaseNewProducts from '@/page/productManager/releaseNewProducts'
import releaseNewProductEdit from '@/page/productManager/releaseNewProductEdit'

import shopCoupons from '@/page/productManager/shopCoupons'
import couponStatistics from '@/page/productManager/couponStatistics'
import shopCouponsDetail from '@/page/productManager/shopCouponsDetail'
import couponListDetail from '@/page/productManager/coupon_list_detail'


//账户管理
import presentRecord from '@/page/accountFund/presentRecord'
import revenueRecord from '@/page/accountFund/revenueRecord'
import accountManager from '@/page/accountFund/accountManager'
import recharge from '@/page/accountFund/recharge'
import wx_pay from '@/page/accountFund/wx_pay'

// 系统管理
import accountList from '@/page/system/accountLists'
// import createUser from '@/page/accountFund/createUser'
// import applicationForPresentation from '@/page/accountFund/applicationForPresentation'

// 店铺管理
import IllegalInformation from '@/page/storeManager/IllegalInformation'
import passwordSecurity from '@/page/storeManager/passwordSecurity'
import storeInfo from '@/page/storeManager/storeInfo'
import thirdPartyTools from '@/page/storeManager/thirdPartyTools'

// 客服设置
import messageSetting from '@/page/customerServiceSetting/messageSetting'

// 评价管理
import evaluate from '@/page/evaluateManager/evaluate'

// 聊天
import communication from '@/page/chat/communication'

/*
 * 营销管理    	marketing
 * */
import marketing_active from '@/page/marketing/marketing_active';
import marketing_detail from '@/page/marketing/marketing_detail';
import marketing_goods from '@/page/marketing/marketing_goods';
import marketing_Qua from '@/page/marketing/marketing_Qua';

import make_fun from '@/page/marketing/make_fun';
import new_create_make_fun_exclusive from '@/page/marketing/new_create_make_fun_exclusive';
import new_create_make_fun from '@/page/marketing/new_create_make_fun';
import new_create_make_fun_set from '@/page/marketing/new_create_make_fun_set';
import new_create_make_fun_success from '@/page/marketing/new_create_make_fun_success';

import resource_activity from '@/page/marketing/resource_activity';
import resource_activity_detail from '@/page/marketing/resource_activity_detail';
import resource_activity_goods from '@/page/marketing/resource_activity_goods';
import resource_activity_qua from '@/page/marketing/resource_activity_qua';

//test-dialog
import test from '@/components/test';
import test2 from '@/components/test2';
import test3 from '@/components/test3';
import test4 from '@/components/test4';
import test5 from '@/components/test5';
import test6 from '@/components/test6';
import Audio from '@/components/Audio';
import swiper from '@/page/test/swiper';


import agreement from '@/page/agreement';
import shopRules from '@/page/shopRules';
import entryBond from '@/page/entry_bond';


import error from '@/page/404';

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/Audio',
      name: 'Audio',
      component: Audio,
    },
    {
      path: '/entryBond',
      name: 'entryBond',
      component: entryBond,
    },
    {
      path: '/agreement',
      name: 'agreement',
      component: agreement,
    },
    {
      path: '/shopRules',
      name: 'shopRules',
      component: shopRules,
    },
    {
      path: '/error',
      name: 'error',
      component: error,
    },
    {
      path: '/store',
      name: 'borderContent',
      component: borderContent,
      children:[
        {
          path: '/',
          name: 'index',
          component: index,
        },
         {
          path: '/home/marketing/marketing_active',
          name: 'marketing_active',
          component: marketing_active
        },
        {
          path: '/home/marketing/marketing_detail',
          name: 'marketing_detail',
          component: marketing_detail
        },
        {
          path: '/home/marketing/marketing_goods',
          name: 'marketing_goods',
          component: marketing_goods
        },
        {
          path: '/home/marketing/marketing_Qua',
          name: 'marketing_Qua',
          component: marketing_Qua
        },
        {
          path: '/home/marketing/make_fun',
          name: 'make_fun',
          component: make_fun
        },
        {
          path: '/home/marketing/new_create_make_fun_exclusive',
          name: 'new_create_make_fun_exclusive',
          component: new_create_make_fun_exclusive
        },
        {
          path: '/home/marketing/new_create_make_fun',
          name: 'new_create_make_fun',
          component: new_create_make_fun
        },
        {
          path: '/home/marketing/new_create_make_fun_set',
          name: 'new_create_make_fun_set',
          component: new_create_make_fun_set
        },
        {
          path: '/home/marketing/new_create_make_fun_success',
          name: 'new_create_make_fun_success',
          component: new_create_make_fun_success
        },
        {
          path: '/home/marketing/resource_activity',
          name: 'resource_activity',
          component: resource_activity
        },
        {
          path: '/home/marketing/resource_activity_detail',
          name: 'resource_activity_detail',
          component: resource_activity_detail
        },
        {
          path: '/home/marketing/resource_activity_goods',
          name: 'resource_activity_goods',
          component: resource_activity_goods
        },
        {
          path: '/home/marketing/resource_activity_qua',
          name: 'resource_activity_qua',
          component: resource_activity_qua
        },
        {
          path: '/store/orderManager/order',
          name: 'orderList',
          component: orderList,
        },
        {
          path: '/store/orderManager/down_export',
          name: 'down_export',
          component: down_export,
        },
        {
          path: '/store/orderManager/orderDetail',
          name: 'orderDetail',
          component: orderDetail,
        },
        {
          path: '/store/orderManager/customerServiceList',
          name: 'customerServiceList',
          component: customerServiceList,
        },
        {
          path: '/store/orderManager/customerServiceDetail',
          name: 'customerServiceDetail',
          component: customerServiceDetail,
        },
        {
          path: '/store/orderManager/batchDelivery',
          name: 'batchDelivery',
          component: batchDelivery,
        },
        {
          path: '/store/orderManager/freightFormwork',
          name: 'freightFormwork',
          component: freightFormwork,
        },
        {
          path: '/store/orderManager/created_freight',
          name: 'created_freight',
          component: created_freight,
        },
        {
          path: '/store/orderManager/usage',
          name: 'usage',
          component: usage,
        },
        {
          path: '/store/productManager/couponStatistics',
          name: 'couponStatistics',
          component: couponStatistics,
        },{
          path: '/store/productManager/productActiveList',
          name: 'productActiveList',
          component: productActiveList,
        },{
          path: '/store/productManager/productList',
          name: 'productList',
          component: productList,
        },{
          path: '/store/productManager/shemeProductList',
          name: 'shemeProductList',
          component: shemeProductList,
        },{
          path: '/store/productManager/releaseNewProducts',
          name: 'releaseNewProducts',
          component: releaseNewProducts,
        },{
          path: '/store/productManager/releaseNewProductEdit',
          name: 'releaseNewProductEdit',
          component: releaseNewProductEdit,
        },{
          path: '/store/productManager/shopCoupons',
          name: 'shopCoupons',
          component: shopCoupons,
        },{
          path: '/store/productManager/shopCouponsDetail',
          name: 'shopCouponsDetail',
          component: shopCouponsDetail,
        }, {
          path: '/store/productManager/couponListDetail',
          name: 'couponListDetail',
          component: couponListDetail,
        },
        {
          path: '/store/accountFund/presentRecord',
          name: 'presentRecord',
          component: presentRecord,
        },
        {
          path: '/store/accountFund/revenueRecord',
          name: 'revenueRecord',
          component: revenueRecord,
        },
        {
          path: '/store/accountFund/accountManager',
          name: 'accountManager',
          component: accountManager,
        },
        {
          path: '/store/accountFund/recharge',
          name: 'recharge',
          component: recharge,
        },
        {
          path: '/store/accountFund/wx_pay',
          name: 'wx_pay',
          component: wx_pay,
        },
        {
          path: '/system/accountList',
          name: 'accountList',
          component: accountList,
        },
        {
          path: '/store/storeManager/IllegalInformation',
          name: 'IllegalInformation',
          component: IllegalInformation,
        },{
          path: '/store/storeManager/passwordSecurity',
          name: 'passwordSecurity',
          component: passwordSecurity,
        },{
          path: '/store/storeManager/storeInfo',
          name: 'storeInfo',
          component: storeInfo,
        },{
          path: '/store/storeManager/thirdPartyTools',
          name: 'thirdPartyTools',
          component: thirdPartyTools,
        },
        {
          path: '/store/customerServiceSetting/messageSetting',
          name: 'messageSetting',
          component: messageSetting,
        },
        {
          path: '/store/evaluateManager/evaluate',
          name: 'evaluate',
          component: evaluate,
        }
      ]
    },
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/store/forget',
      name: 'forget',
      component: forget,
    },
    {
      path: '/test',
      name: 'test',
      component: test
    },
    {
      path: '/test2',
      name: 'test2',
      component: test2
    },
    {
      path: '/test3',
      name: 'test3',
      component: test3
    },
    {
      path: '/test4',
      name: 'test4',
      component: test4
    },
    {
      path: '/test5',
      name: 'test5',
      component: test5
    },
    {
      path: '/test6',
      name: 'test6',
      component: test6
    },
    {
      path: '/swiper',
      name: 'swiper',
      component: swiper
    },
    {
      path: '/communication',
      name: 'communication',
      component: communication,
      meta: {
        title: '拼趣多商家后台'
      }
    }
  ]
})
