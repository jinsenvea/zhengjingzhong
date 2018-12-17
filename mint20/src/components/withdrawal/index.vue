<template>
<div>
 
   <!--<headerConmon/>-->

   <!--选择类型-->
  <ul class="payVidsdasible">
    <li @click="chendsdvsshj(0)">
      <span class="payIConmy fl"><img src="../../commom/img/icon_weixin.png"/></span>
       <span class="payIConmyFontNOw fl">微信</span>
      <span class="fr checkpayBox"  :class="paymdsahjIndex==0?'check':''" ></span>
    </li>
     <li @click="chendsdvsshj(1)">
      <span class="payIConmy fl"><img src="../../commom/img/icon_alipay.png"/></span>
       <span class="payIConmyFontNOw fl">支付宝</span>
      <span class="fr checkpayBox" :class="paymdsahjIndex==1?'check':''" ></span>
    </li>

  </ul>
 <div class="bgHr"></div>
   <div class="ewditBoxlock">
     <ul>

       <li>
         <span class="ewditBoxFont MOBYEL" >金额（¥）</span>
        
         <input style="margin-left:0; " class="inputpassWOr" type="text"  v-model='monkeyNum'
           v-on:input="changemonkeyNum" :placeholder="holder"  @focus="haha()" />
         
       </li>
        
       
        <li v-if="paymdsahjIndex==1">
         <span class="ewditBoxFont MOBYEL">支付宝帐号：</span>
        
         <input style="margin-left:0; " class="inputpassWOr"  v-model='deposit' type="text" placeholder="请输入支付宝帐号"  />
         
       </li>
        <li v-if="paymdsahjIndex==1">
         <span class="ewditBoxFont MOBYEL">姓名：</span>
        
         <input style="margin-left:0; " v-model="txName" class="inputpassWOr" type="text" placeholder="请输入姓名"   />
         
       </li>
        <!--<li>
         <span class="ewditBoxFont" ><img src='../../commom/img/mobilepho.png' /></span>
         <span class="line" ></span>
         <input class="inputpassWOr" type="text" placeholder="请输入手机号"  v-model='phone'  v-on:input="changeLenth" />
         
       </li>-->
        <li>
         <span class="ewditBoxFont" ><img src='../../commom/img/verificationcodemobilephone.png' /></span>
         <span class="line" ></span>
         <input class="inputpassWOr" type="text" placeholder="请输入图形验证码" v-model="randCode" v-on:input="changeLenth" />
       
       
        
            <!--<span class="fr refresh"><img src='../../commom/img/icon_refresh.png'/></span>-->
               <span class="imgCode fr " @click="refresh"><img :src="this.$store.state.login.verifyPhone"/></span>
         
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
       <!---->
         
         <p style="margin-top:0.4rem;" @click="checkRegisterdsds">
           <em class="checkRegister"  :class=" checkRegister==true?  'checkRegister':'checkRegisterNormal'"></em>
          
       <span class="checkRegisterFont" style=" color: #343434;">我已阅读并同意</span>
         <router-link :to="{path:'/withdrawalagreement',query:{title:'用户提现协议'}}">
       <span class="checkRegisterFont" style="color:#2abc90;">《呐吉岛用户提现协议》</span>
       </router-link>
       </p>
          
     </ul>
   </div>
    <div class="locklogin" @click="createUserGetMoneyRecord" style="margin:0 auto; margin-top:0.75rem;">确定</div>
    <p class="sdfajncasgyudasklkj">提现审核通过后，工作人员会在3到7个工
作日内给您转账</p>
  
  
</div>



</template>


<script type="text/ecmascript-6">

import {createUserGetMoneyRecord} from 'api/index'
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
        monkeyNum:'',
        holder:'请输入您要提现的金额',
        checkRegister:false,
        paymdsahjIndex:0,
        deposit:"",
        txName:"",
        phone:'',
        randCode:'',
        authcode:'',
        ugr:{},
        passworState:false
			}
      
		},
    
    computed:{
         
    },
  created(){
      this.$store.dispatch('verifyPhone');
      

 
  },
   mounted() {
	   
     
    },
   methods: {
 // 
       getToken(){
       //获取产品id
       if(this.$route.query.token){
      
       this.$store.dispatch('setToken',res.data.data.token);
       }else{
        
           this.$store.dispatch('setToken',commonParams.getUrlKey("token"));
         
       }
     
     },

     haha(){
        this.holder="";
     },
     changemonkeyNum(){
      if(this.monkeyNum.replace(/[^\d]/g,'')){
        console.log(this.monkeyNum)
        if(this.monkeyNum<5){
 this.$store.dispatch('toast',"提现金额大于5块");
        }
      }else{
       this.$store.dispatch('toast',"请输入数字");
      }
     },
      changeLenth(){
       
           if(this.randCode.length>=4){
             //改变状态
              this.$store.dispatch('changeCodeState',true);
              this.randCode = this.randCode.slice(0, 4);
            }else if(this.randCode.length<4){
               this.$store.dispatch('changeCode',false);
             
              
            }
             
            
             
     },
         // 获取验证码
        getCode() {
          //this.$store.state.login.phonetkj

          if(this.$store.state.login.phonetkj!=''){

               if(this.randCode!=''){
                var a=this.$store.state.login.phonetkj;
                var b=this.randCode
             this.$store.dispatch('getCode');
                this.$store.dispatch('getAuthCode',{a,b});
                
       
        }else{
        
               this.$store.dispatch('toast',"图形验证码不能为空");
          }


        }else{
           this.$store.dispatch('toast',"请完善个人资料");
              
          }
          
       
       
           
            
       

      },
 chendsdvsshj(a){
    this.paymdsahjIndex=a
 },
 createUserGetMoneyRecord(){
   var _this=this;
if(this.checkRegister){

  if(this.paymdsahjIndex==0){
    // 微信提现
    this.ugr.cashWithdrawalType=1
       
  }else{
    // 支付宝提现
     this.ugr.cashWithdrawalType=2;
      this.ugr.txName=this.txName;
       this.ugr.deposit=this.deposit;
        
  }
   this.ugr.amount=this.monkeyNum
   createUserGetMoneyRecord(commonParams.searxhshopsParams({
     token:this.$store.state.login.token,
     
     userGetMoneyRecordVO:JSON.stringify(this.ugr)
    })).then((res)=>{
     
     if(res.data.status==1){

        this.$store.dispatch('toast',"恭喜你提现成功");
        setTimeout(function(){
 _this.$router.push({path:'/resultsIndex',query:{title:"结果详情",tid:res.data.data,transactionType:1}})


 
        },800)

        
     }else{
        _this.$store.dispatch('toast',res.data.message);
     }
     
   })
}else{
  _this.$store.dispatch('toast',"请勾选提现协议");
  
}
  
 },
    //登录
    checkRegisterdsds(){
      if(this.checkRegister){
        this.checkRegister=false
      }else{
        this.checkRegister=true
      }
   
    },
    savePasswork(){

    },
     refresh(){
        this.$store.dispatch('verifyPhone');
     }
  }

}
</script>

<style lang="scss">
@import '../../assets/passwork';
.MOBYEL{
  font-size: rem(32);
  color: #2a2a2a;
  
}
.payIConmyFontNOw{
  font-size: rem(32);
  color: #333;
 margin-top: 0.37333rem;
 margin-left: rem(40);
}
.checkRegister{
  display: inline-block;
  width: rem(26);
  height: rem(26);
  background: url('../../commom/img/reginer-check.png') center center no-repeat;
  background-size: 100% 100%;
  margin-right: rem(15);
       vertical-align: -0.02rem;
}
.checkRegisterNormal{
   display: inline-block;
  width: rem(26);
  height: rem(26);
  background: url('../../commom/img/reginer-checknormal.png') center center no-repeat;
  background-size: 100% 100%;
  margin-right: rem(15);
      vertical-align: -0.02rem;
}
.checkRegisterFont{
  font-size: rem(24);
 
}
.payVidsdasible {
    width: 10rem;
    height: auto;
    overflow-x: hidden;
   
}
.payVidsdasible li {
    padding: 0.37333rem;
    overflow: hidden;
    border-bottom: 1px solid #e5e5e5;
}
.payVidsdasible .payIConmy img {
    width: 1.21333rem;
    height: 1.21333rem;
}
.checkpayBox {
    width: 0.50667rem;
    height: 0.50667rem;
    border-radius: 50%;
    display: inline-block;
   margin-top: rem(28);
  
    border: 1px solid #d7d7d7;
}
.check{
    background: url('../../commom/img/checkTrue.png')  center center no-repeat;
     background-size: contain;
      border: 1px solid transparent;
  }
  .sdfajncasgyudasklkj{
    width: rem(460);
    text-align: center;
    font-size: rem(24);
    line-height: rem(42);
    color: #999;
    margin: rem(20) auto;
  }
</style>
