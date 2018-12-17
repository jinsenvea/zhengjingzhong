import axios from 'commom/js/http'
//分类产品
export const getCategoryOfProduct = params=>{return axios.post(`/getCategoryOfProduct`, params)}

//searchProductByAntistop   
export const searchProductByAntistop = params=>{return axios.post(`/searchProductByAntistop`, params)}
//热门搜索
export const getHotSearchAll= params=>{return axios.post(`/getHotSearchAll`, params)}
//三级标题查询
export const getThirdCategoryTitle= params=>{return axios.post(`/getThirdCategoryTitle`, params)}
//getProductByTitle
export const getProductByTitle= params=>{return axios.post(`/getProductByTitle`, params)}
//getRecycleCategory   getRecycleOrderinfoById
export const getRecycleOrderinfoById= params=>{return axios.post(`/getRecycleOrderinfoById`, params)}
//cancleRecycleOrderinfo  

export const cancleRecycleOrderinfo= params=>{return axios.post(`/cancleRecycleOrderinfo`, params)}
//recycleOrderinfoComplete  

export const recycleOrderinfoComplete= params=>{return axios.post(`/recycleOrderinfoComplete`, params)}



