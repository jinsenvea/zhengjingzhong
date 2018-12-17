<template>
<div>
 
   <!--<headerConmon/>-->
   <div class="ewditBodsdxlock">
     
         <p>1.提现(微信提现)需要微信注册并绑定账号(支付宝提现不用)</p>
          <p>2.每天最多可以提现<span style="color:#359370;font-weight: bold;">3次</span>，且每次不小于5元</p>
           <p>3.提现申请将在<span style="color:#359370;font-weight: bold;">2个工作日以内</span>审批，不包括申请当天
（双休日，节假日顺延），(微信提现)提现的钱返回您绑定的微信
零钱账号</p>
            <p>4.注：微信提现总额受微信控制，若当天限额已满，请次日申请</p>
      
   </div>
    
  
</div>



</template>


<script type="text/ecmascript-6">


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
checkRegister:false
			}
      
		},
    
    computed:{
         
    },
  created(){

  },
   mounted() {
	   
     
    },
   methods: {
 changeLenth(){

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
      
    }
  }

}
</script>

<style lang="scss">
.ewditBodsdxlock{
  p{
    font-size: rem(28);
    color: #343434;
    margin: rem(70) rem(30);
  }
}
</style>
