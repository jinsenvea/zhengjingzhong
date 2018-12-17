<template>
<div>
<!--<headerConmon/>-->
 <div class="payOrderBg">
     <span class="payOk"><img src='../../commom/img/img_paymentsuc.png'/></span>
      <span class="payFont">支付成功</span>
       <span class="paYmonkey">￥{{this.$store.state.pay.totalPayNum | numFilter}}</span>
       <router-link  :to="{path:'/'}" ><span class="goBackHome">返回首页</span></router-link>
      <span class="goBackHomebg"   @click="setactivINdex(0)">查看订单</span>
    

 </div>

</div>



</template>


<script type="text/ecmascript-6">

//  import store from './vuex/store.js'

import headerConmon from '../headerConmon/index';

export default {

  //vuex
  // store,
  components: {
    headerConmon
   
  },
  data() {
			return {
      
         
			}
      
		},
    filters: {

  numFilter(value) {

  // 截取当前数据到小数点后两位

    let realVal = Number(value).toFixed(2)

    // num.toFixed(2)获取的是字符串

    return Number(realVal)

  }

},  computed:{
         
    },
  created(){

  },
   mounted() {
	   
     
    },
   methods: {
 
    setactivINdex(a){
      
       this.$store.dispatch('setactivINdex',a);
      this.$router.push({path:'/myorder',query:{title:'我的订单'}})
     },
  }

}
</script>

<style lang="scss">
.payOrderBg{
  span{
    display: block;
  }
  width: rem(750);
  margin-top: rem(140);
  text-align: center;
  .payOk{
   img{
      width: rem(126);
    height: rem(126);
   }
  }
  .payFont{
    color: #09b980;
    font-size: rem(32);
    margin-top: rem(30);
  }
  .paYmonkey{
    font-size: rem(62);
    color: #333;
      margin-top: rem(30);
  }
}
.goBackHome{
   width: rem(500);
  height: rem(120);
  line-height: rem(95);
  font-size: rem(28);
  color: #fff;
 background: url('../../commom/img/paymentsuccess.png') center center no-repeat;
  background-size: contain;
  text-align: center;
  margin: 0 auto;
  margin-top: rem(150);
  margin-bottom: rem(35);
  display: inline;
}
.goBackHomebg{
   width: rem(480);
  height: rem(75);
  display: inline;
  line-height: rem(75);
  font-size: rem(28);
  color: #666;
  border-radius: rem(220);
  border: 1px solid #09b980;
    margin: 0 auto;
    color: #09b980;
}
</style>
