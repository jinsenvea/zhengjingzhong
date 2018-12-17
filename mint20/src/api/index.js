import axios from 'commom/js/http'


//公告
export const getNotices = params=>{return axios.post(`/getNotices`, params)}
//首页商品信息加载

export const getGuessYouLike = params=>{return axios.post(`/getGuessYouLike`, params)}
//getBannerByType
export const getBannerByType = params=>{return axios.post(`/getBannerByType`, params)}
//二级分类  _getHomeCategory
export const getHomeCategory = params=>{return axios.post(`/getHomeCategory`, params)}

//二级分类  _getHomeCategory
export const getWeekHotSaleById = params=>{return axios.post(`/getWeekHotSaleById`, params)}

// 微信提现  createUserGetMoneyRecord
export const createUserGetMoneyRecord = params=>{return axios.post(`/createUserGetMoneyRecord`, params)}
//加入订单
export const insertOrder = params=>{return axios.post(`/insertOrder`, params)}
//查询订单
export const getOrderInfoByCondition = params=>{return axios.post(`/getOrderInfoByCondition`, params)}
//支付  呐吉币
export const nagebiPay= params=>{return axios.post(`/nagebiPay`, params)} 
//钱包
export const walletPay  = params=>{return axios.post(`/walletPay`, params)} 
///微信接口
export const weiXinPay = params=>{return axios.post(`weiXinPay`, params)}
//用户反馈    
export const addFeedbackForm = params=>{return axios.post(`addFeedbackForm`, params)}
//exitUser
export const exitUser = params=>{return axios.post(`exitUser`, params)}

//呐吉币混合支付
export const nagebiMixturePay = params=>{return axios.post(`nagebiMixturePay`, params)}
//
//呐吉币混合支付
export const updateOderStatusInfoById = params=>{return axios.post(`updateOderStatusInfoById`, params)}
//
export const cancelPay = params=>{return axios.post(`cancelPay`, params)}