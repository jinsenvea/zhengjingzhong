<template>
<div class="contentbox">
  <!--背景-->
    <div class="containeLoginsh">
    
      
    </div>
    <div class="grountBox">
     <!--账号密码登录-->
     <div class="amount"  v-show=" currentView == 0" >
        <div class='grountBoxItem'>
           <img class="grountBoxItemImg"  src='../../commom/img/bg-02.png'>
           <span></span>
           <input placeholder="请输入帐号" v-model="userName"/>

        </div>
        <div class='grountBoxItem'>
           <img class="grountBoxItemImg" src='../../commom/img/bg-03.png'/>
           <span></span>
           <input placeholder="请输入密码" type="password" v-if="!eyeState" v-model="password"/>
                <input placeholder="请输入密码"  v-if="eyeState" v-model="password"/>
         
           <em class="eye fr" :class=" eyeState?  'eye':'eyeClose'" v-on:click="eyeClick" style="margin-right:.3rem;" ></em>

        </div>
         
        

     </div>
     <!--手机验证登录-->
       <div class="phoneLogin" v-show=" currentView == 1" >
        <div class='grountBoxItem'>
           <img class="grountCodeImg"  src='../../commom/img/bg-04.png'>
           <span></span>
           <input placeholder="请输入手机号" type="number" v-model='phone'  v-on:input="changeLenth" />

        </div>
        <div class='grountBoxItem'>
           <img class="grountCodeImg" src='../../commom/img/bg-05.png'/>
           <span></span>
           <input class="setCode" placeholder="请输入运算结果" v-model="randCode"/>
         
            <em class="loginimgCode fr" @click="refresh"><img :src="this.$store.state.login.verifyPhone"/></em>
                 

        </div>
         
        <div class='grountBoxItem'>
           <img class="grountCodeImg" src='../../commom/img/verificationcode.png'/>
           <span></span>
           <input class="setCode" placeholder="请输入验证码" v-model="codeMsginput"/>
         
          
               <input type="button" class="fr codeNorm"  @click="getCode()" :class="this.$store.state.login.codeState?'codeDafult':'code'" 
                 v-model="this.$store.state.login.codeMsg":disabled="this.$store.state.login.codeDisabled" />

        </div>
         
        

     </div>
      <!--手机验证登录-->
      <!--登录按钮-->
      <div class="loginButton" @click="_login">

      </div>
        <div class="reginLogin">

           <!--:to="{path:'/forgetPasswork',query:{productId:item.id}}" -->
  <router-link :to="{path:'/forgetPasswork',query:{title:'忘记密码'}}" class="fr">
    <span >忘记密码</span>
                       
                    </router-link>

                    
    <span  class="fl dashjkjhaskjvkjme" v-show=" currentView == 1"  @click="toggleTabs(0);">账号登录</span>
     <span  class="fl dashjkjhaskjvkjme" v-show=" currentView == 0"  @click="toggleTabs(1);">手机快捷登陆</span>
                       
                  <!---->
          
        </div>
    </div>
    
    <div class="">
      

  <span class="reginLoginphoneNowLogin" @click="reginLoginphoneNowLogin">注册</span>
    
     
     
    </div>
    <div class="loginasjdklyjlkhhj">

          
    </div>
     <span class='loginasjdklyjlkhhjphoneNowBg' @click="wdsajghkjwo"></span>

</div>
</template>
<script type="text/ecmascript-6">
import {login,verifyPhone,phoneLogin} from 'api/login'
import {commonParams,ERR_OK} from 'api/config'
import {hexMD5} from '../../commom/js/md5'

import md5 from "md5";


export default {

  
  data() {
			return {
  currentView:0,
  phone:"",
  msg:'',
  codeMsginput:'',
  randCode:'',
 
  showPositionValue: false,
     redirectPathnow:'productDetail',
 passNowpassword:'******',
  eyeState:false,
  password:'',
  passNum:'',
  userName:'',
  listParams:{
    phone:"",
    password:''
  },
  openid:'',
  // 定时器
  timer: null,
  stateNumState:true,
  stateNum:''
			}
      
		},
   
    
    computed:{
         
    },
  created(){
    
 
   this.$store.dispatch('verifyPhone');
  
  },
  
   methods: {
     reginLoginphoneNowLogin(){

 window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx475cb93859a720e9&redirect_uri=http://www.najidao.com/shop/getOpenIdByH5.do&response_type=code&scope=snsapi_userinfo&state=register/_564565#wechat_redirect'
        
     },
     wdsajghkjwo(){
     window.location.href='https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx475cb93859a720e9&redirect_uri=http://www.najidao.com/shop/getOpenIdByH5.do&response_type=code&scope=snsapi_userinfo&state=/#wechat_redirect';
     

     },
     //切换登录方式
      toggleTabs(tabText){
        
        this.currentView = tabText;
        console.log( this.currentView )

      },
     //获取验证码
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
      //显示密码
      eyeClick(){
       
     
        if(this.eyeState){
         
          this.eyeState=false


        }else {
            
            this.eyeState=true
            
        }
        

      },
       //登录
       _login(){
         //手机快捷登陆
        
            if(this.currentView>0){
             


               if(this.phone==''){
                    this.$store.dispatch('toast',"请输入手机号码");
                  
              }else if(this.randCode==''){
                 this.$store.dispatch('toast',"图形验证码不能为空");
              }else if(this.codeMsginput==''){
                 this.$store.dispatch('toast',"请输入验证码");
              
              }
              phoneLogin(commonParams.searxhshopsParams({
          phone: this.phone,
           authcode: this.codeMsginput
          })).then((res)=>{
                       if(res.data.status==1){
               console.log(res)
                  this.$store.dispatch('setToken',res.data.data.token);
                     this.$router.push({path:'/'})


              }
              })
              
            }else{
              if(this.userName==''){
                 this.$store.dispatch('toast',"账户信息不能为空");
                  
              }else if(this.password==''){
                  this.$store.dispatch('toast',"请输入密码");
               
              }else{


                                //账号密码登录
                    login(commonParams.searxhshopsParams({
                    phone:this.userName,password:hexMD5(this.password)
                    })).then((res)=>{
                        if(res.data.status==1){
                          console.log(res.data.data.token)
                            this.$store.dispatch('setToken',res.data.data.token);
                            //是否返回页面  productId
                            if(this.$store.state.pay.redirectPath!=''){
                          
                                   this.$router.push({path:this.$store.state.pay.redirectPath})  
                               
                            }else{
                                this.$router.push({path:'/'})
                            }
                              

                        }else{
                          this.$store.dispatch('toast',res.data.message);
                        }
                  })
              }
       

            }
        
       },
      //  微信登录
      _weixinLogin(){
      
        
         

        
          
      },
      //生成随机数
      RndNum(n){
          var rnd="";
          for(var i=0;i<n;i++)
              rnd+=Math.floor(Math.random()*10);
              console.log(rnd)
          return rnd;
    },
      refresh(){
        this.$store.dispatch('verifyPhone');
     }

    
   }
  ,
  beforeDestroy () {
    clearInterval(this.timer)
  }

}
</script>

<style >


 
@import '../../assets/login.css'


</style>
