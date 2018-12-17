import Vue from 'vue'
import router from './router'
import App from './App'
import 'normalize.css'
import axios from 'axios'
import 'mint-ui/lib/style.css'
import Mint from 'mint-ui';
import VueLazyLoad from 'vue-lazyload'
import 'url-search-params-polyfill';
//调试工具
// import VConsole from 'vconsole/dist/vconsole.min.js' //import vconsole
// let vConsole = new VConsole() //
//图片
Vue.use(VueLazyLoad,{
    loading:require("../static/img/lazy-loading.png"),
    error: require("../static/img/lazy-loading.png")// 图片路径错误时加载图片
})

//测试
import wx from 'weixin-js-sdk'
//用于个别请求处理
Vue.prototype.$http = axios
//vux状态管理
import store from './store/store'
Vue.use(Mint);

Vue.config.productionTip = false
 import 'commom/js/flexible'

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
      document.title = to.meta.title
  }
  next()
})




axios.interceptors.request.use(config => {

	 store.dispatch('IndicatorOpen')
	return config
}, error => {
 	console.log('req error')
	return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => {
  store.dispatch('IndicatorClose')
	return data
}, error => {
 	console.log('res error...')
	return Promise.reject(error)
})


new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
