import axios from 'commom/js/http'
//登录
export const getGuessYouLike = params=>{return axios.post(`/getGuessYouLike`, params)}
//登录
export const login = params=>{return axios.post(`/login`, params)}
//验证是否注册  verifyPhone   
export const verifyPhoneNum = params=>{return axios.post(`/verifyPhone `, params)}
//手机快捷登陆
export const phoneLogin = params=>{return axios.post(`/phoneLogin `, params)}
//获取短信验证码
export const getAuthCode = params=>{return axios.post(`/getAuthCode `, params)}
//微信登录获取openID
export const weixinLogin = params=>{return axios.post(`getOpenId.do`, params)}
//token获取用户信息openId
export const getUserInfoByToken = params=>{return axios.post(`getUserInfoByToken`, params)}
//查询个人信息
export const getUserInfo = params=>{return axios.post(`getUserInfo`, params)}
//获取图形验证码
export const getValidateCodeBybase = params=>{return axios.post(`getValidateCodeBybase`, params)}
//密码验证
export const verify = params=>{return axios.post(`verify`, params)}
//修改密码upPassword
export const upPassword = params=>{return axios.post(`upPassword`, params)}
//修改手机号 updateUserPhone
export const updateUserPhone = params=>{return axios.post(`updateUserPhone`, params)}
//updateUserName

export const updateUserName = params=>{return axios.post(`updateUserName`, params)}
//查询账单
export const pageTransactionFlowingCondition = params=>{return axios.post(`pageTransactionFlowingCondition`, params)}
//上传头像
export const uploadImg = params=>{return axios.post(`uploadImg`, params)}
//上传头像
export const getTransactionFlowingByid   = params=>{return axios.post(`getTransactionFlowingByid`, params)}
//上传头像
export const addweixinopenid   = params=>{return axios.post(`addweixinopenid`, params)}

//verifyOpenid

export const verifyOpenid = params=>{return axios.post(`verifyOpenid`, params)}