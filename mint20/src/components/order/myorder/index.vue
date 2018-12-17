<template>
<div>
      
<!--<headerConmon/>-->
    <!--切换订单状态-->
    <div class="MyOrdertab">
      <ul>
        <li class="" :class="this.$store.state.pay.activINdex==0?'myOrderactive':''" @click="myOrderactive(-1,20,0)">全部
          <span></span>
        </li>
        <li :class="this.$store.state.pay.activINdex==1?'myOrderactive':''"  @click="myOrderactive(3,0,1)">
          待付款
      <span></span>

        </li>
        <li :class="this.$store.state.pay.activINdex==2?'myOrderactive':''"  @click="myOrderactive(6,1,2)">待收货  <span></span></li>
        <li :class="this.$store.state.pay.activINdex==3?'myOrderactive':'' "  @click="myOrderactive(30,2,3)">已完成  <span></span></li>
       
      </ul>

    </div>
    <div class="bgHr"></div>
    <!--订单产品列表-->
    
    <div class="orderBox" v-if="!shopcARTstate">
          
          <!--orderMYlist-->
            <div class="orderList"  v-for="(item,index) in orderMYlist" :key="index"  v-if="item.status==1||item.status==12||item.status==13||item.status==0||item.status==2">
              <!--头部  {{item.id}}-->
              <div class="orderTitle">
                  <span style="margin-left:0.3rem;">订单编号 {{item.orderNo}} </span>
                  
                  
                    <span class="fr" style="margin-right:0.3rem;color:#ff6666;"  v-if="item.status==0" >待付款</span>
                    <span class="fr" style="margin-right:0.3rem; color:#ff8916;" v-if="item.status==1||item.status==12||item.status==13">待收货</span>
                      <span class="fr" style="margin-right:0.3rem;" v-if="item.status==2">已完成</span>
                      
                      
                  



              </div>
              <!--产品-->
           
               <div class="orderList"  @click="goORderdetail('orderDetail',item.id)">
                            <ul>


                              <li v-for="(itemnext,index) in item.orderProductAttributes" :key="index" >
                                
                                    <!-- item.id  orderId  productId-->
                                    <div class="orderListItem">
                                      <!--左边-->
                                      <div class="orderListItemLeft fl">
                                        <img v-lazy="itemnext.pruductImgUrl"/>
                                      </div>
                                      <!--右边-->
                                      <div class="orderListItemRight fr"> 
                                          <div class="orderListItemRightTitle">
                                                {{itemnext.productName}}
                                          </div>
                                          <div class="orderListItemfont">
                                            <span class="orderListItemMoney fl">￥{{itemnext.price}}</span>
                                            <span class='orderListItemNum fr'>X<em>{{itemnext.account}}</em></span>
                                          </div>

                                      </div>

                                    </div>
                                
                              </li>
                            
                            </ul>

            </div>

          
           <!--产品完-->
            <div class="orderTitle">
               <span class="fr totalOrder" style="margin-right:0.3rem;">￥{{item.amount}}</span>
              <span class="fr" style="color:#333;">共{{item.numme}}件，合计: </span>
              

           </div>
           <!--取消 支付-->
           <div class="orderfootRight" v-if="item.status==0" style="    text-align: right; padding:0.3rem 0;">
                <span class="cancelDelivery" @click="cancelOrdernoeh(item.id)">取消订单</span>
                <span class="orderPay" @click="nowPayright(item.id)">立即支付</span>
           </div>
           <!---->
  <div class="bgHr"></div>
        </div>
         
    </div>
      <router-link  :to="{path:'/'}">
     <div class="gobackHomeOrderkld"></div>
      </router-link>
     <div class="searbillbg" v-if="shopcARTstate" style="text-align: center;">
        
没有相应的订单记录
    </div>
 
</div>
</template>
<script type="text/ecmascript-6">

 import headerConmon from '../../headerConmon/index';
//getOrderInfoByCondition
  import {getOrderInfoByCondition,updateOderStatusInfoById}  from 'api/index'
import {commonParams} from 'api/config';
export default {


  components: {
 headerConmon
 
  },
  data() {
			return {
     activINdex:0,
      orderCondition:{},
      orderMYlist:{},
      orderProductAttributes:{},
      shopcARTstate:false,
      numme:0
			}
      
		},
   
    
    computed:{
         
    },
  created(){


      if(this.$store.state.pay.activINdex>0){
       console.log(this.$store.state.pay.activINdex)
        this.getOrderInfoByCondition(30,this.$store.state.pay.activINdex-1)
      }else{
     
       
          this.getOrderInfoByCondition(-1,20)
      }

  },
   mounted() {
	   
     
    },
   methods: {
    myOrderactive(a,b,c){



      this.activINdex=c
 
        this.$store.dispatch('setactivINdex',c);
        this.orderMYlist=[];
      this.getOrderInfoByCondition(a,b)

    },
    getOrderInfoByCondition(a,b){
      console.log(b)
      var _this=this;
     this.orderCondition.all=a,
     this.orderCondition.status=b
     console.log("ceshi"+  this.orderCondition.status)


      getOrderInfoByCondition(commonParams.searxhshopsParams({
        token:this.$store.state.login.token,
        orderCondition:JSON.stringify(this.orderCondition)
      
    })).then((res)=>{
      
        if(res.data.status==1){
          if(res.data.data.length>0){
             this.shopcARTstate=false
              this.orderMYlist=res.data.data
                  for(var i=0;i<res.data.data.length;i++){
                      this.numme=0

                      for(var k=0;k<res.data.data[i].orderProductAttributes.length;k++){
                            
                                this.numme+=res.data.data[i].orderProductAttributes[k].account
                      }
                      
              
                  this.orderMYlist[i].numme=this.numme
                  }

          }else{
            this.shopcARTstate=true
              this.orderMYlist=[]
          }
   
      
        }

      })
    },
    goORderdetail(orderDetail,b){
     
       this.$router.push({path:orderDetail,query:{id:b}})
    },

    
         cancelOrdernoeh(a){
      var _this=this;
        var a=a;
         updateOderStatusInfoById(
           commonParams.searxhshopsParams({
        token:this.$store.state.login.token,
        orderId:a,
        status:10

      
    })).then((res)=>{
      console.log(res)
             if(res.data.status==1){
        
             _this.$store.dispatch('toast',"删除订单成功");
            this.getOrderInfoByCondition(3,0)
             

             }

       })
     },
         nowPayright(a){
           var a=a;
     console.log(a)
         this.$router.push({
            path:'/sureOrder',query:{title:"立即支付",orderSSId:a}})

     },
    
   }
 

}
</script>

<style lang="scss">
.searbillbg {
    width: 6.66667rem;
    height: 2.66667rem;
    color: #999;
    font-size: 0.42667rem;
    background-size: contain;
    position: absolute;
    z-index: 300;
    top: -0.66667rem;
    margin-left: -3.33333rem;
    left: 50%;
    top: 33%;
}
 .MyOrdertab{
   width: rem(750);
     height: rem(90);
     line-height: rem(90);
     ul{
       width:100%;
     
     
       margin: 0 auto;
     }
     ul li{
       float: left;
       width: 25%;
       text-align: center;
       font-size: rem(26);
       color: #333;
       position: relative;
      
     }


 }


 .myOrderactive{
    color: #09b980 !important;
     span{
        
         position: absolute;
         left: 50%;
         bottom: rem(-3);
         display: inline-block;
         height: rem(5);
         
          background-color: #09b980;
           border-radius: rem(220);
          margin-left: rem(-40);
         width: rem(85);
         text-align: center;
       }
 }
 .orderTitle{
   width: rem(750);
   padding: rem(30) 0;
   overflow: hidden;
   span{
     font-size: rem(24);
     color: #999999;
   }

 }
 .orderList{
  width: rem(750);
  overflow: hidden;
  ul li{
    width: rem(750);
    background-color: #fafafa;
    padding: rem(18) 0;
      border-bottom: 1px solid #ebebeb;
  }
  .orderListItem{
    padding: rem(0) rem(30);
    overflow: hidden;
  }
  .orderListItemLeft{
    width: rem(166);
    
    height: rem(166);
    text-align: center;
    img{
     max-width: 100%;
    }
  }
  .orderListItemRight{
    width: rem(500);
   
    .orderListItemRightTitle{
    
          font-size: 0.34667rem;
      color: #333;
      width: 100%;
      margin-bottom: 0.15rem;
      overflow: hidden;
      -webkit-line-clamp: 2;
      -moz-line-clamp: 2;
      -ms-line-clamp: 2;
      -o-line-clamp: 2;
      line-clamp: 2;
      -webkit-box-orient: vertical;
      -moz-box-orient: vertical;
      -ms-box-orient: vertical;
      -o-box-orient: vertical;
      box-orient: vertical;
      display: -webkit-box;
      display: -moz-box;
      display: -ms-box;
      display: -o-box;
      display: box;
      word-break: break-all;
      height: 0.88rem;
      line-height: 0.453rem;
    }
    
  }
}
.orderListItemfont{
  overflow: hidden;
  margin-top: rem(50);
  .orderListItemMoney{
       color: #333;
       font-size: rem(30);
  }
}
.orderListItemNum{
  margin-top: rem(10);
  font-size: rem(20);
  color: #333;
}
 //
 .totalOrder{
    color: #333 !important;
    font-weight: bold;
 }
//  .gobackHomeOrderkld{
//    width: rem(160);
//    height: rem(160);
//    position: absolute;
//    bottom: rem(120);
//    right: rem(30);
//    z-index: 30000;
 //    background-size: cover;
//  }
  .cancelDelivery{
    border:1px solid #ebebeb;
    color: #333;
  }
  .orderPay{
       color: #ffffff;
       background-color: #ff6666;
  }
  .orderfootRight span {
    display: inline-block;
    font-size: 0.37333rem;
    width: 2.13333rem;
    text-align: center;
    line-height: 0.86667rem;
    height: 0.86667rem;
    border-radius: 0.12rem;
    margin-right: 0.4rem;
}
</style>
