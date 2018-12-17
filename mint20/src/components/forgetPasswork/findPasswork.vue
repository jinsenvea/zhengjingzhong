<template>
<div class="contentbox">
   <!--头部-->
    <!--<headerConmon/>-->
    
   <!--修改列表-->
   <div class="ewditBoxlock">
     <ul>

       <li>
         <span class="ewditBoxFont" ><img src='../../commom/img/mobilepho.png' /></span>
         <span class="line" ></span>
         <input class="inputpassWOr" type="text" placeholder="请输入密码（6-18个字符）" v-model="mobile" />
        
       </li>
      
        <li>
         <span class="ewditBoxFont" ><img src='../../commom/img/verificationcodemobilephone.png' /></span>
         <span class="line" ></span>
         <input class="inputpassWOr" type="text" placeholder="请确认密码" v-model="mobileseconde"/>
       
         
       </li>
      
     </ul>


   </div>
  
   
  <div class="locklogin" @click="_upPassword">确定</div>
         
</div>
</template>
<script type="text/ecmascript-6">
import headerConmon from '../headerConmon/index';

import {upPassword} from 'api/login';
import {commonParams} from 'api/config';
import {hexMD5} from '../../commom/js/md5'
export default {

  //vuex
  // store,
  components: {
 headerConmon
 
  },
  data() {
			return {
        mobile:'',
        mobileseconde:''

      }
      
		},
   
 
   methods: {

        _upPassword(){
          var _this=this;
          if(this.mobile==this.mobileseconde&&this.mobileseconde!=''&&this.mobile!=''){
            //整合修改密码的时候在vuex定义状态判断
           upPassword(commonParams.searxhshopsParams({
                phone: this.$route.query.phone,
                password: hexMD5(this.mobile)}
              )).then((res)=>{
                if(res.data.status==1){
                   this.$store.dispatch('toast',"修改密码成功");
                   setTimeout(function(){
                      _this.$router.push({path:'/login'})
                   },1200)
                }

            })
          }else{
            this.$store.dispatch('toast',"请输入正确的密码");
          }
         
        }

     

    
   }
  

}
</script>

<style  lang="scss">

@import '../../assets/passwork';
</style>
