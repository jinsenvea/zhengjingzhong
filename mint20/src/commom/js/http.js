/**
 * http配置 后台接口入口
 */
// 引入axios以及element ui中的loading和message组件
import axios from 'axios'
// 超时时间
axios.defaults.timeout = 1000000
//192.168.1.171
//axios.defaults.baseURL = 'http://192.168.1.1:8052/'
//axios.defaults.baseURL = 'http://192.168.1.171:8052/'
  //线上
axios.defaults.baseURL = 'http://www.najidao.com/shop'
 //日灿
//axios.defaults.baseURL = 'http://192.168.1.130:8052/'

//  axios.defaults.baseURL = 'http://www.najidao.com/shop/'
// http请求拦截器
// var loadinginstace


export default axios