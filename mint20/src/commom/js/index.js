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



