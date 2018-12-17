<template>
<div class="sehtdsa" style="background-color: #fff;">
     <!--头部-->
    <!--<headerConmon/>-->
    <ul>
    
       <!--listPro-->
        <!--v-for="(item,index)  in Activelist"  :key="index"-->
        <li v-for="(item,index)  in listPro" @click="togglePay(item,index)"  :key="index">
          <div class="prodhItem">
            <span class="prodFont">{{item.a}}</span>
            <span class="fr"><img src="../../commom/img/icon_arrow.png" :class="item.active?'choseItemActive':''"/></span>

          </div>
          <div class="prodhItemText" v-if="item.active"  >
             <span class="prodhItemTextLeft fl"></span>
           
             <p class="fl"  >
               <p class="productTitle">{{item.b.title}}</p>
               <p v-if="item.b.item!=''" v-for="(a,index)  in item.b.item" :key="index" >{{a}}</p>
            


             </p>

          </div>

      </li>
   

    </ul>


</div>
  

</template>


<script type="text/ecmascript-6">
import {getUserInfo} from 'api/login'
import Vue from 'vue';
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
      thirdCategoryFalse:false,
       activIndx:-1,
       listPro:[
         {
          a:"有关配送?",
          active:false,
          b:{
            title:"本商城是由自有的配送团队，将为您进行专业的配 送，保证商品的质量；订单下达后，预计2-3天送达。",
            item:[]


          }
        }
        ,
        {a:"在签收订单时，需要注意什么?",
         active:false,
          b:{
            title:"配送员送货上门时，请您务必检查货品是否破损然后签收，确保您的权益；如有异常状况，请您当面与配送员反馈处理。",
            item:[]


          }


       }
       ,{a:"有关支付?",
        active:false,
          b:{
            title:"本商城提供及支持以下三种支付方式：",
            item:["1)呐吉币支付：呐吉币是消费者在线下使用呐吉岛回收系统进行干垃圾分类投放时所获得的资金报酬，呐吉币与人民币是1:1等值使用，这是呐吉商城最基本的支付方式，也是推荐使用的支付方式。",
            "2)  微信支付：呐吉商城提供了微信第三方支付接口，消费者可以直接用微信账号内的钱进行货款支付。","3)  钱包支付：钱包是消费a者积极参与使用厨益清的湿垃圾处=理器获得一定等额资金返现，可在呐吉商城上消费，不可提现。"
           
          ]


          }


       }  ,{a:"有关退款?",
        active:false,
          b:{
            title:"退款申请审核通过后1-2个工作日内将退款返回到您的原支付账户，请注意查收。",
            item:[]


          }


       },{a:"有关提现?",
        active:false,
          b:{
            title:"提现申请审核通过后3-7个工作日内将退款返回到您的接收账户，请注意查收。",
            item:[]


          }


       },
       {a:"有关客服?",
        active:false,
          b:{
            title:"客服热线：400-8959-596",
            item:["在线客服服务时间：9：00-17：30。"]


          }


       }
       ]


			}
      
		},
    
    computed:{
         
    },
  created(){

  },
   mounted() {
	 
    },
   methods: {
    //  togglePay:function(item,index){	
		// if(item.active){
		//     Vue.set(item,'active',false);//为item添加不存在的属性，需要使用vue提供的Vue.set( object, key, value )方法。 
		// }else{
		//     Vue.set(item,'active',true);
		// }
	  //    }}
    togglePay(item,index){
      console.log(item.active)
      if(item.active){
        Vue.set(item,'active',false);
      }else{
        Vue.set(item,'active',true);
      }
    //   if(item.active){
    //      Vue.set(item,'active',false);
    //   }else{
    //     Vue.set(item,'active',true);

    // }


  }
   }

}
</script>
<style lang="scss">

.prodhItem{
  width: rem(690);
  padding: rem(36) 0;
  margin: 0 auto;
  
  border-bottom: 1px solid #e5e5e5;

  img{
      max-width: rem(24);
    transform:rotate(0deg);
-ms-transform:rotate(0deg); 	/* IE 9 */
-moz-transform:rotate(0deg); 	/* Firefox */
-webkit-transform:rotate(0deg); /* Safari 和 Chrome */
-o-transform:rotate(0deg);
		-webkit-transition: -webkit-transform 0.45s ease-in; /* Safari 和 Chrome */
		-moz-transition:-moz-transform 0.45s ease-in; 	/* Firefox */
		-o-transition:-o-transform 0.54s ease-in; 	/* Opera */
		transition:transform 0.45s ease-in;
      
  }

}
.prodFont{
  font-size: rem(28);
  color: #333;
}
.choseItemActive{
  -ms-transform:rotate(180deg) !important; 	/* IE 9 */
		-moz-transform:rotate(180deg) !important; 	/* Firefox */
		-webkit-transform:rotate(180deg) !important; /* Safari 和 Chrome */
		-o-transform:rotate(180deg) !important; 	/* Opera */
		transform:rotate(180deg) !important;
 
		-webkit-transition: -webkit-transform 0.45s ease-in; /* Safari 和 Chrome */
		-moz-transition:-moz-transform 0.45s ease-in; 	/* Firefox */
		-o-transition:-o-transform 0.45s ease-in; 	/* Opera */
		transition:transform 0.45s ease-in;
}
.prodhItemText{
  width: rem(750);
  border-bottom: 1px solid #e5e5e5;
  padding: rem(30) 0;
 
  overflow: hidden;

  p{
    width: rem(690);
    margin-left: rem(30);
    font-size: rem(26);
    line-height: rem(45);
    color: #666;
    margin-top: -0.2rem;
    margin-bottom: rem(10);
  }

}
.mentOpenten{
 
    transition:all 2s;
}
.prodhItemTextLeft{
 
  border-left:3px solid #09b980;
  height: rem(33);

}
.productTitle{
   margin-bottom: rem(10);
  }
</style>
