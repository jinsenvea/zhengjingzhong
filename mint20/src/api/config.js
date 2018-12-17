export const ERR_OK = true
export const commonParams={
 
    //处理多个参数
     searxhshopsParams(data){
      let params = new URLSearchParams();
      
       Object.keys(data).forEach(key=>{
        console.log(key)
           params.append(key,data[key]);
          }); 
          return params;


     },
     //获取url参数
     getUrlKey(name) {
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null
    }

}

