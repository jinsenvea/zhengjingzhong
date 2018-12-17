<template>
<div class="">
  <!--<headerConmon/>-->
       <!--修改列表-->
   <div class="ewditBoxlock">
     <ul>

        <li>
          <span class="ewditBoxFont" ><img src='../../commom/img/mobilepho.png' /></span>
          <span class="line" ></span>
          <input class="inputpassWOr" type="text" placeholder="请输入手机号码"  v-model='phone'  v-on:input="changeLenth" />
          
        </li>
          <li>
          <span class="ewditBoxFont" ><img src='../../commom/img/icon_password.png' /></span>
          <span class="line" ></span>
          <input class="inputpassWOr" type="text" placeholder="请输入密码（6-18个字符）"  v-model='passwork'   />
          
        </li>
          <li>
          <span class="ewditBoxFont" ><img src='../../commom/img/icon_password.png' /></span>
          <span class="line" ></span>
          <input class="inputpassWOr" style="width: 7.06667rem;" type="text" placeholder="请确认密码（与上一次密码相同）"  v-model='passworksecond'  />
          
        </li>
          <li>
          
          <span class="ewditBoxFont" ><img src='../../commom/img/verificationcodemobilephone.png' /></span>
          <span class="line" ></span>
          <input class="inputpassWOr" type="text" placeholder="请输入图形验证码" v-model="randCode" />
          <span class="imgCode fr" @click="refresh"><img :src="this.$store.state.login.verifyPhone"/></span>
          
        </li>
        <li>
         <span class="ewditBoxFont" ><img src='../../commom/img/verificationcode.png' /></span>
         <span class="line"></span>
         <input class="inputpassWOr" type="text" placeholder="请输入手机验证码" v-model="authcode"/>
         <span   @click="getCode()" >
           <input type="button" class="fr codeNorm marginCode"  :class="this.$store.state.login.codeState?'codeDafult':'code'" 
                 v-model="this.$store.state.login.codeMsg":disabled="this.$store.state.login.codeDisabled" />
         </span>
       </li>             
        <p style="margin-top:0.4rem;" @click="checkRegisterdsds">
          <em class="checkRegister"  :class=" checkRegister==true?  'checkRegister':'checkRegisterNormal'"></em>
    
    <!---->
   
       <span class="checkRegisterFont" style=" color: #343434;">我已阅读并同意</span>
          <router-link :to="{path:'/loginagreement',query:{title:'呐吉岛用户注册协议'}}">
       <span class="checkRegisterFont" style="color:#2abc90;">《呐吉岛用户注册协议》</span>
      </router-link>
       </p>
        
     </ul>
      

   </div>

         
      <div class="locklogin" @click="savePasswork">下一步</div>
 
</div>

</template>


<script type="text/ecmascript-6">
import headerConmon from '../headerConmon/index';
import {verifyPhoneNum,verify,weixinLogin,verifyOpenid} from 'api/login'
import {commonParams} from 'api/config'
import {hexMD5} from '../../commom/js/md5'
//  import store from './vuex/store.js'

export default {

  //vuex
  // store,
  components: {
   headerConmon
  },
  data() {
			return {
       
        checkRegister:false,
        phone:'',
        passwork:'',
        passworksecond:'',
        randCode:'',
        authcode:'',
        verifyPhoneNumState:false
      
          
			}
      
		},
    
    computed:{
         
    },

    
  created(){
   

  },
   mounted() {
	   this.$store.dispatch('verifyPhone');
     
    this._weixinLo()
     
    },
   methods: {
        refresh(){
        this.$store.dispatch('verifyPhone');
     },
     //登录
    checkRegisterdsds(){
      if(this.checkRegister){
        this.checkRegister=false
      }else{
        this.checkRegister=true
      }
   
    },

   
     //获取opdengid  
     _weixinLo(){
       var arrCode=[];
      
console.log(this.$store.state.login.codeString)
 arrCode=this.$store.state.login.codeString.split("_");
        console.log(arrCode)

        weixinLogin(commonParams.searxhshopsParams({
           code:arrCode[0]
         
        })).then((res)=>{
         //lock
          if(res.data.status==1){
            if(res.data.data.openid!=''&&res.data.data.openid!=null){
              this.$store.dispatch('setwxOpenId',res.data.data.openid);
    

            }else{
               this.$store.dispatch('toast',"系统异常");
            }
          
              

          }

         })
      

     },

     //获取验证码
      changeLenth(){
         var _this=this;
       
           if(this.phone.length>=11){
          
                // 
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
        if(this.phone==""){
 this.$store.dispatch('toast',"请输入你的手机号码");
        }
      else  if(this.passwork==""){
            this.$store.dispatch('toast',"请输入你的密码");
        }else if(this.passwork!=this.passworksecond){
             this.$store.dispatch('toast',"请确认两次输入密码一致");
        }else if(this.authcode==''){
           this.$store.dispatch('toast',"请输入验证码");
        }else if(!this.checkRegister){
 this.$store.dispatch('toast',"请勾选上用户协议");
        }
        else{
                 // 执行下一步
    verify(commonParams.searxhshopsParams({
          phone: this.phone, authcode: this.authcode
          })).then((res)=>{
           console.log(res)

            if(res.data.status==1){
              //跳转到修改密码页面

         
					  this.$router.push({path:'/ziliaodetail',query:{title:'补齐资料',phone:this.phone,password:hexMD5(this.passwork)}})
	
					
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
.checkRegister{
  display: inline-block;
  width: rem(25);
  height: rem(25);
  background: url('../../commom/img/reginer-check.png') center center no-repeat;
  background-size: 100% 100%;
  margin-right: rem(15);
      vertical-align: -0.02rem;
}
.checkRegisterNormal{
   display: inline-block;
  width: rem(25);
  height: rem(25);
  background: url('../../commom/img/reginer-checknormal.png') center center no-repeat;
  background-size: 100% 100%;
  margin-right: rem(15);
      vertical-align: -0.02rem;
}
.checkRegisterFont{
  font-size: rem(24);
 
}
</style>
