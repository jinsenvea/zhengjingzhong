<template>
<div class="contentbox">
  <!--<headerConmon/>-->
   <!--修改列表-->
   <div class="ewditBoxlock">
     <ul>
        <li style="border:none;" v-if="passworState">
          <span style="color:#333;    font-size: 0.4rem; ">已绑定手机号<span style="color:#09b980;    font-size: 0.4rem; ">
            {{this.$route.query.phone.slice(0,3)}}****{{this.$route.query.phone.slice(6,10)}}</span></span>
       </li>
       <li>
         <span class="ewditBoxFont" ><img src='../../commom/img/mobilepho.png' /></span>
         <span class="line" ></span>
         <input class="inputpassWOr" type="text" placeholder="请输入手机号"  v-model='phone'  v-on:input="changeLenth" />
         
       </li>
        <li>
         <span class="ewditBoxFont" ><img src='../../commom/img/verificationcodemobilephone.png' /></span>
         <span class="line" ></span>
         <input class="inputpassWOr" type="text" placeholder="请输入图形验证码" v-model="randCode" />
       
        
        
            <!--<span class="fr refresh"><img src='../../commom/img/icon_refresh.png'/></span>-->
               <span class="imgCode fr " @click="refresh"><img :src="this.$store.state.login.verifyPhone"/></span>
         
       </li>
        <li>
          <!--verificationcode-->
         <span class="ewditBoxFont" ><img src='../../commom/img/verificationcode.png' /></span>
         <span class="line"></span>
         <input class="inputpassWOr" type="text" placeholder="请输入手机验证码" v-model="authcode"/>
         <span   @click="getCode()" >
           <input type="button" class="fr codeNorm marginCode"  :class="this.$store.state.login.codeState?'codeDafult':'code'" 
                 v-model="this.$store.state.login.codeMsg" :disabled="this.$store.state.login.codeDisabled" />
         </span>
       </li>
        
     </ul>


   </div>

         
      <div class="locklogin" @click="savePasswork">确定</div>
      
</div>
</template>
<script type="text/ecmascript-6">
 //C:\Users\PC\Desktop\mint(4)\mint\src\components\headerConmon\index.vue
import headerConmon from '../headerConmon/index';

import {verify} from 'api/login'
import {commonParams} from 'api/config'
export default {
 
  components: {
 headerConmon
 
  },
  data() {
			return {
        phone:'',
        randCode:'',
        authcode:'',
        passworState:false
        
      }
      
		},
      created(){
    
    if(this.$route.query.title=="修改密码"){
      this.passworState=true
      console.log("修改密码")
    }else{
       console.log("忘记密码")
         this.passworState=false
    }
   this.$store.dispatch('verifyPhone');
  },
   methods: {
    
      changeLenth(){
       
           if(this.phone.length>=11){
             //改变状态
          
                 this.$store.dispatch('changeCodeState',true);
                  this.phone = this.phone.slice(0, 11);
            }else if(this.phone.length<11){
               this.$store.dispatch('changeCode',false);
             
              
            }
             
            
             
     },
         // 获取验证码
        getCode(b) {
            console.log(b)
          var _this=this;
          if(this.randCode!=''){
                var a=this.phone;
                var b=this.randCode
             this.$store.dispatch('getCode');
                this.$store.dispatch('getAuthCode',{a,b});
       
        }else{
        
               this.$store.dispatch('toast',"图形验证码不能为空");
          }
           
            
       

      },

     savePasswork(){
        verify(commonParams.searxhshopsParams({
          phone: this.phone, authcode: this.authcode
          })).then((res)=>{
           console.log(res)

            if(res.data.status==1){
              //跳转到修改密码页面

         
					  this.$router.push({path:'/findPasswork',query:{title:'找回密码',phone:this.phone}})
	
					
				 }else{
				
            this.$store.dispatch('toast',res.data.message);
                     
				 }
        })
     },
     refresh(){
        this.$store.dispatch('verifyPhone');
     }
    }
  

}
</script>

<style  lang="scss">

@import '../../assets/passwork';
</style>
