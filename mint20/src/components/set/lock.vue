<template>
<div class="contentbox">
   <!--<headerConmon/>-->
   <!--修改列表-->
   <div class="ewditBoxlock">
     <ul>

       <li>
         <span class="ewditBoxFont" ><img src='../../commom/img/mobilepho.png' /></span>
         <span class="line" ></span>
         <input class="inputpassWOr" type="text" placeholder="请输入要绑定的手机号" v-model="phone" v-on:input="changeLenth"/>
         
       </li>
        <li>
         <span class="ewditBoxFont" ><img src='../../commom/img/verificationcodemobilephone.png' /></span>
         <span class="line" ></span>
         <input class="inputpassWOr" type="text" placeholder="请输入验证码" v-model="randCode"/>
         <span class="imgCode fr" @click="refresh"><img :src="this.$store.state.login.verifyPhone"/></span>
         
       </li>                                         
        <li>
         <span class="ewditBoxFont" ><img src='../../commom/img/verificationcode.png' /></span>
         <span class="line" ></span>
         <input class="inputpassWOr" type="text" placeholder="请输入手机验证码" v-model="authcode"/>
        <span   @click="getCode()" >
           <input type="button" class="fr codeNorm marginCode"  :class="this.$store.state.login.codeState?'codeDafult':'code'" 
                 v-model="this.$store.state.login.codeMsg":disabled="this.$store.state.login.codeDisabled" />
         </span>
         
       </li>
      
     </ul>


   </div>
  
           
  <div class="locklogin" @click="_upPassword">确定</div>
</div>
</template>
<script type="text/ecmascript-6">
 

import {updateUserPhone,addweixinopenid} from 'api/login'
 import {commonParams} from 'api/config';
 import headerConmon from '../headerConmon/index';
 
export default {

  //vuex
  // store,
  components: {
 
 headerConmon
  },
  data() {
			return {
        phone:"",
        randCode:'',
        authcode:'',
      
        userCondition:{
             phone:'',
             smsCode:''

        }
      }
      
		},
   created() {
     this.$store.dispatch('verifyPhone');
   

        this.$store.commit('changeCode')
   },
 
   methods: {

            
      changeLenth(){
       
           if(this.phone.length>=11){
             console.log(66666666)
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
  refresh(){
        this.$store.dispatch('verifyPhone');
     },
     _upPassword(){
       var _this=this;
       

         if(this.$route.query.weixinLoginOld==3){


           //老用户绑定手机
          addweixinopenid(
            commonParams.searxhshopsParams({
          phone:this.phone,
          authcode:this.authcode,
         openid:this.$store.state.pay.wxOpenId
         
        })).then((res)=>{
           if(res.data.status==1){
              if(this.$store.state.pay.redirectPath!=''&&this.$store.state.pay.redirectPath!=null){
                       this.$store.dispatch('toast',"绑定手机号成功");  
                 setTimeout(function(){
                                                   
                  _this.$router.push({path:this.$store.state.pay.redirectPath})
                       },800)
                                              
                  }else{
                  
                    setTimeout(function(){

                         _this.$store.dispatch('toast',"绑定手机号成功");
                       _this.$router.push({path:'/'})
                       },800)
               }

           }else{
             this.$store.dispatch('toast',res.data.message);
           }

          })

         }else{
           this.userCondition.phone=this.phone
          this.userCondition.smsCode=this.authcode
          let param = new URLSearchParams();
              param.append("token",this.$store.state.login.token);
         param.append("userCondition",JSON.stringify(this.userCondition));
          //  老用户修改
                     updateUserPhone(param).then((res)=>{
                                            if(res.data.status==1){
console.log(this.$store.state.pay.redirectPath)
                                            if(this.$store.state.pay.redirectPath!=''&&this.$store.state.pay.redirectPath!=null){
                                             

                                                this.$store.dispatch('toast',"绑定手机号成功");
                                                setTimeout(function(){
                                                      
                                                        _this.$router.push({path:this.$store.state.pay.redirectPath})
                                                },800)
                                              
                                              }else{
                                                  this.$store.dispatch('toast',"绑定手机号成功");
                                              }











                                            }else{
                                              this.$store.dispatch('toast',res.data.message);
                                            }
                                          
          })
         }
          
     }
     

    
   }
  

}
</script>

<style  lang="scss">
@import '../../assets/passwork';
</style>
