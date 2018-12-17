import Vue from 'vue';
import Vuex from 'vuex';

import search from './search/index'
import login from './home/index'
import pay from './pay/index'
//购物车
import shopCart from './shopCart/shopCart'
Vue.use(Vuex);

//把状态管理的属性暴露出去
    export default new Vuex.Store({
     modules:{

          search:search,
		  shopCart:shopCart,
          login:login,
          pay:pay
     }
           
    });