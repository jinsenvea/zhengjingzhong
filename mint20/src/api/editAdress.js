import axios from 'commom/js/http'


//新增购物车地址
export const saveReceiverAddress = params=>{return axios.post(`/saveReceiverAddress`, params)}
//查询收货地址
export const getReceiverAddressByUserId = params=>{return axios.post(`/getReceiverAddressByUserId`, params)}
//修改默认  updateReceiverAddressStatus

export const updateReceiverAddressStatus = params=>{return axios.post(`/updateReceiverAddressStatus`, params)}
//修改

export const toEditorReceiverAddress = params=>{return axios.post(`/toEditorReceiverAddress`, params)}
//删除
export const deleteReceiverAddressById = params=>{return axios.post(`/deleteReceiverAddressById`, params)}
//省市区请求小区
export const getPolt = params=>{return axios.post(`/getPolt`, params)}
//注册新增用户
export const addUserInfo = params=>{return axios.post(`addUserInfo`, params)}
//updateReceiverAddress//注册新增用户
export const updateReceiverAddress = params=>{return axios.post(`updateReceiverAddress`, params)}

//updateReceiverAddress//注册新增用户
export const addweixinopenid = params=>{return axios.post(`addweixinopenid`, params)}