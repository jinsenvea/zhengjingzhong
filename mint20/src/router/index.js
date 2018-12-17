import Vue from 'vue'
import Router from 'vue-router'

// Router.prototype.goBack = function () {
//   this.isBack = true
//   window.history.go(-1)
// }

Vue.use(Router)
// 路由spa按需加载
export default new Router({
    // mode: 'history',
  routes: [
   
    {
      path: '/',
      name: 'home',
      component: r => require.ensure([], () => r(require('@/components/home/index')), 'demo'),
       meta: {
            title: '首页'
        }

    },
      {
      path: '/login',
      name: 'login',
      component: r => require.ensure([], () => r(require('@/components/login/index')), 'demo'),
       meta: {
            title: '登陆'
        }
    },
    {
      path: '/register',
      name: 'register',
      component: r => require.ensure([], () => r(require('@/components/register/index')), 'demo')
      ,
       meta: {
            title: '注册账号'
        }
    },
        {
      path: '/myset',
      name: 'myset',
      component: r => require.ensure([], () => r(require('@/components/set/index')), 'demo')
       ,
       meta: {
            title: '设置'
        }
    },
     {
      path: '/shoppingCart',
      name: 'shoppingCart',
      component: r => require.ensure([], () => r(require('@/components/shoppingCart/index')), 'demo')
        ,
       meta: {
            title: '购物车'
        }
    },
     {
      path: '/management',
      name: 'management',
      component: r => require.ensure([], () => r(require('@/components/adresss/management')), 'demo')
        ,
       meta: {
            title: '我的地址'
        }
    },
   
     {
      path: '/productDetail',
      name: 'productDetail',      
      component: r => require.ensure([], () => r(require('@/components/productDetail/index')), 'demo')
       ,
       meta: {
            title: '产品详情'
        }
    },
    {
      path: '/editadress',
      name: 'editadress',
      component: r => require.ensure([], () => r(require('@/components/adresss/index')), 'demo')
        ,
       meta: {
            title: '编辑地址'
        }
      
    },
    {
      path: '/search',
      name: 'search',
      component: r => require.ensure([], () => r(require('@/components/common/search')), 'demo')
        ,
       meta: {
            title: '搜索'
        }
      
    },
      {
      path: '/secondary',
      name: 'secondary',
      component: r => require.ensure([], () => r(require('@/components/secondary/index')), 'demo')
        ,
       meta: {
            title: '生活品类'
        }
      
    },
    // F:\mint20\src\components\mapAdress\index.vue
      {
      path: '/qrcode',
      name: 'qrcode',
      component: r => require.ensure([], () => r(require('@/components/qrcode/index')),'demo')
        ,
       meta: {
            title: '我的二维码'
        }
      
    },  {
      path: '/mapAdress',
      name: 'mapAdress',
      component: r => require.ensure([], () => r(require('@/components/mapAdress/index')),'demo')
        ,
       meta: {
            title: '我的呐吉小岛'
        }
      
    },
     {
      path: '/weekSelling',
      name: 'weekSelling',
      component: r => require.ensure([], () => r(require('@/components/weekSelling/index')), 'demo')
       ,
       meta: {
            title: '呐吉专区'
        }
      
    }
    ,
     {
      path: '/sureOrder',
      name: 'sureOrder',
      component: r => require.ensure([], () => r(require('@/components/order/sureOrder/index')), 'demo')
       ,
       meta: {
            title: '确认订单'
        }
    }
     ,
     {
      path: '/orderDetail',
      name: 'orderDetail',
      component: r => require.ensure([], () => r(require('@/components/order/orderDetail/index')), 'demo')
      ,
       meta: {
            title: '订单详情'
        }
      
    } ,
     {
      path: '/myorder',
      name: 'myorder',
      component: r => require.ensure([], () => r(require('@/components/order/myorder/index')), 'demo')
       ,
       meta: {
            title: '我的订单'
        }
      
    },
     {
      path: '/userpass',
      name: 'userpass',
      component: r => require.ensure([], () => r(require('@/components/header/userspass')), 'demo')
       ,
       meta: {
            title: '新老用户'
        }
      
    },
     {
      path: '/set',
      name: 'set',
      component: r => require.ensure([], () => r(require('@/components/set/set')), 'demo')
       ,
       meta: {
            title: '个人设置'
        }
      
    },
     {
      path: '/editpassaddress',
      name: 'editpassaddress',
      component: r => require.ensure([], () => r(require('@/components/adresss/editaddress')), 'demo')
       ,
       meta: {
            title: '编辑地址'
        }
      
    },
     {
      path: '/headerOrder',
      name: 'headerOrder',
      component: r => require.ensure([], () => r(require('@/components/headerOrder/index')), 'demo')
         ,
       meta: {
            title: '收货地址'
        }
      
    },
     {
      path: '/nickname',
      name: 'nickname',
      component: r => require.ensure([], () => r(require('@/components/set/nickname')), 'demo')
        ,
       meta: {
            title: '修改名称'
        }
      
    }
    ,
     {
      path: '/ModifyPhone',
      name: 'ModifyPhone',
      component: r => require.ensure([], () => r(require('@/components/set/ModifyPhone')), 'demo')
        ,
       meta: {
            title: '修改绑定手机'
        }
      
    },
     {
      path: '/lock',
      name: 'lock',
      component: r => require.ensure([], () => r(require('@/components/set/lock')), 'demo')
       ,
       meta: {
            title: '绑定手机'
        }
      
    }
    //retroactiveDetaeil
    ,
      {
      path: '/rziliao',
      name: 'rziliao',
      component: r => require.ensure([], () => r(require('@/components/rziliao/index')), 'demo')
       ,
       meta: {
            title: '补全资料'
        }
      
    }
       ,
      {
      path: '/ziliaodetail',
      name: 'ziliaodetail',
      component: r => require.ensure([], () => r(require('@/components/ziliaodetail/index')), 'demo')
       ,
       meta: {
            title: '补全资料'
        }
      
    }
    ,
     {
      path: '/forgetPasswork',
      name: 'forgetPasswork',
      component: r => require.ensure([], () => r(require('@/components/forgetPasswork/forgetPasswork')), 'demo')
       ,
       meta: {
            title: '忘记密码'
        }
      
    }
     ,
     {
      path: '/findPasswork',
      name: 'findPasswork',
      component: r => require.ensure([], () => r(require('@/components/forgetPasswork/findPasswork')), 'demo')
       ,
       meta: {
            title: '找回密码'
        }
      
      
    }
     ,
     {
      path: '/headerConmon',
      name: 'headerConmon',
      component: r => require.ensure([], () => r(require('@/components/headerConmon/index')), 'demo')
      
    },
     {
      path: '/paySucess',
      name: 'paySucess',
      component: r => require.ensure([], () => r(require('@/components/pay/index')), 'demo')
       ,
       meta: {
            title: '支付成功'
        }
      
    }
     ,
     {
      path: '/register',
      name: 'register',
      component: r => require.ensure([], () => r(require('@/components/register/index')), 'demo')
       ,
       meta: {
            title: '注册账号'
        }
      
      
    }
    ,
     {
      path: '/registerDetail',
      name: 'registerDetail',
      component: r => require.ensure([], () => r(require('@/components/registerDetail/index')), 'demo')
       ,
       meta: {
            title: '注册详情'
        }
      
    }
     ,
     {
      path: '/dailyrushed',
      name: 'dailyrushed',
      component: r => require.ensure([], () => r(require('@/components/dailyrushed/index')), 'demo')
        ,
       meta: {
            title: '每日疯抢'
        }
      
    }
      ,
     {
      path: '/bill',
      name: 'bill',
      component: r => require.ensure([], () => r(require('@/components/bill/index')), 'demo')
       ,
       meta: {
            title: '个人账单'
        }
    }
       ,
     {
      path: '/withdrawal',
      name: 'withdrawal',
      component: r => require.ensure([], () => r(require('@/components/withdrawal/index')), 'demo')
        ,
       meta: {
            title: '个人账单'
        }
      
    }  ,
     {
      path: '/withdrawalagreement',
      name: 'withdrawalagreement',
      component: r => require.ensure([], () => r(require('@/components/withdrawal/agreement')), 'demo')
         ,
       meta: {
            title: '提现协议'
        }
      
    }
     ,
     {
      path: '/afterSales',
      name: 'afterSales',
      component: r => require.ensure([], () => r(require('@/components/order/afterSales/index')), 'demo')
       ,
       meta: {
            title: '申请退款'
        }
      
    }
     ,
     {
      path: '/afterList',
      name: 'afterList',
      component: r => require.ensure([], () => r(require('@/components/order/afterList/index')), 'demo')
       ,
       meta: {
            title: '退款售后'
        }
      
    }
     ,
     {
      path: '/problems',
      name: 'problems',
      component: r => require.ensure([], () => r(require('@/components/set/problems')), 'demo')
       ,
       meta: {
            title: '常见问题'
        }
      
    }
     ,
     {
      path: '/appointment',
      name: 'appointment',
      component: r => require.ensure([], () => r(require('@/components/appointment/index')), 'demo')
       ,
       meta: {
            title: '回收详情'
        }
      
    }
    ,
     {
      path: '/resultsIndex',
      name: 'resultsIndex',
      component: r => require.ensure([], () => r(require('@/components/withdrawal/resultsIndex')), 'demo')
       ,
       meta: {
            title: '提现进度'
        }
      
    }  ,
     {
      path: '/billDetail',
      name: 'billDetail',
      component: r => require.ensure([], () => r(require('@/components/bill/billDetail')), 'demo')
       ,
       meta: {
            title: '订单详情'
        }
      
    },
     {
      path: '/setMEASKJGH',
      name: 'setMEASKJGH',
      component: r => require.ensure([], () => r(require('@/components/set/setMEASKJGH')), 'demo')
       ,
       meta: {
            title: '设置'
        }
      
    },
     {
      path: '/feedback',
      name: 'feedback',
      component: r => require.ensure([], () => r(require('@/components/feedback/index')), 'demo')
        ,
       meta: {
            title: '意见反馈'
        }
      
    },
     {
      path: '/aboutUs',
      name: 'aboutUs',
      component: r => require.ensure([], () => r(require('@/components/feedback/aboutUs')), 'demo')
        ,
       meta: {
            title: '关于我们'
        }
    }
    ,
     {
      path: '/loginagreement',
      name: 'loginagreement',
      component: r => require.ensure([], () => r(require('@/components/register/loginagreement')), 'demo')
        ,
       meta: {
            title: '注册协议'
        }
      
    } ,
     {
      path: '/productListBox',
      name: 'productListBox',
      component: r => require.ensure([], () => r(require('@/components/productListBox/index')), 'demo')
       ,
       meta: {
            title: '产品列表'
        }
    } ,
     {
      path: '/newoldversion',
      name: 'newoldversion',
      component: r => require.ensure([], () => r(require('@/components/newoldversion/index')), 'demo')
       ,
       meta: {
            title: '新老版本'
        }
    }
     ,
     {
      path: '/loadingNow',
      name: 'loadingNow',
      component: r => require.ensure([], () => r(require('@/components/loadingNow/index')), 'demo')
       ,
       meta: {
            title: '加载中'
        }
    },
     
     {
      path: '/mapAdresslocarion',
      name: 'mapAdresslocarion',
      component: r => require.ensure([], () => r(require('@/components/mapAdresslocarion/index')), 'demo')
       ,
       meta: {
            title: '经纬度'
        }
    }
    

  ]
})
//mapAdresslocarion