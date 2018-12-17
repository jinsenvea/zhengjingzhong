import axios from 'commom/js/http'


//产品详情
export const getProductById = params=>{return axios.post(`/getProductById`, params)}
//产品库存
export const productIsInventory = params=>{return axios.post(`/productIsInventory`, params)}
//token获取地址
export const getReceiverAddressByUserId = params=>{return axios.post(`/getReceiverAddressByUserId`, params)}
//查询购物车购物车
export const getShopCatsOnSyuc= params=>{return axios.post(`/getShopCatsOnSyuc`, params)}
//添加购物车
export const addShopCat= params=>{return axios.post(`/addShopCat`, params)}
//修改购物车
export const upShopCat= params=>{return axios.post(`/upShopCat`, params)}
//删除购物车
export const deleteShopCat= params=>{return axios.post(`/deleteShopCat`, params)} 
//

export const weixinconfig= params=>{return axios.post(`/weixinconfig.do`, params)} 
