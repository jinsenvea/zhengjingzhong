<template>
<div>
     <div class="orderListBigBox">

     
   <!--订单状态-->
    <div class="orderStateBox" :style="statusORder==0?'height: 3.17rem;':'height: 5.36rem;'">
             <!--头部-->
        <div class="orderStateheader">
          <div class="back" @click="routerback"></div>
          <!--<span class='h1'>订单详情</span>-->
        

        </div>
           <!--订单状态-->
           <div class="orderStateItem">
              <!--左边-->
               <div class="orderStateLeft fl">
                  <div class="orderStateLeftTop">
                    <span>订单编号:</span>
                     <span class="orderStateFont">{{this.orderMYlisdsdt.orderNo}}</span>
                   

                  </div>
                    <!--<span class="orderStateFont copy">复制</span>-->
                   <div class="orderStateLeftDown">
                      <span>下单时间:</span>
                     <span class="orderStateFont">{{this.orderMYlisdsdt.createTime}}</span>
                     

                  </div>


               </div>
               <!--右边  this.$store.state.pay.orderState-->
               <span class="fr orStateFont"  v-if="statusORder==12||statusORder==13||statusORder==1" >待收货</span>
                <span class="fr orStateFont" v-if="statusORder==0" >待支付</span>
                  <span class="fr orStateFont" v-if="statusORder==2" >已完成</span>
           </div>
           <!-- 配货趋势  icon_delivery-->

              <div class="orederDetailState" v-if="statusORder==12||statusORder==13||statusORder==2">
                 <ul>

                   <li>
                     <span class="firstOrder"  v-if="statusORder==12||statusORder==13||statusORder==2">
                       <img src='../../../commom/img/icon_dispensing.png'/></span>
                     <!--未选中-->
                     

                   </li>
                    <li>
                     <span class="secondOrder"  v-if="statusORder==13||statusORder==2">
                       <img src='../../../commom/img/icon_delivery.png'/></span>
                     <!--未选中-->
                     <span class="secondOrder"  v-if="statusORder==12">
                       <img src='../../../commom/img/icon_deliverycheck.png'/></span>

                   </li>
                    <li>
                     <span class="thirdOrder"  v-if="statusORder==2"><img src='../../../commom/img/icon_received.png'/></span>
                        <!--未选中-->
                     <span class="thirdOrder"  v-if="statusORder!=2"><img src='../../../commom/img/icon_receivedcheck.png'/></span>

                   </li>
                 </ul>


              </div>
           <div>
             
           </div>

    </diV>
   <!--订单地址-->

   <div class="adressItemBox">
              <div class="adressItemordernmhjg">
                <span class="adressIcon fl"> <img src='../../../commom/img/icon_address.png'/></span>

             <div class="fr adressItemsdas"> 
                    <div class="first">
                    <span class="fl">{{getUSER.receiver}}</span>
                      <span class="fr">{{getUSER.phone}}</span>
                  </div>
                  <div class="adressItemName">{{getUSER.detailAddress}}
                  </div>
             </div>
            
            </div>
            <!--底部-->
            <div class="adressItemOrderBg"></div>
  </div>
    <div class="bgHr" ></div>
    <!---->
    <div class="bgBox">
      <span><img class="imglogo" src="../../../commom/img/imglogo.png"/> 呐吉岛</span>

    </div>
    <!--订单产品-->
    <div class="orderList">
      <ul>
       
                              <li v-for="(itemnext,index) in orderMYlisdsdt.orderProductAttributes" :key="index" >
                                
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
    <!--优惠券-->
      <!--<div class="bgBox ">
      <span class="fl orderColor" style="margin-left: 0.4rem;">优惠</span>
        <span class="fr freight orderColor" style="margin-right: 0.4rem;">
          <em>暂无</em>
        </span>

    </div>-->
    <!--运费-->
    <!--<div class="bgBox ">
      <span class="fl orderColor" style="margin-left: 0.4rem;">运费</span>
        <span class="fr freight orderColor" style="margin-right: 0.4rem;">
          +￥<em>8.00</em>
        </span>

    </div>-->
     <!--总金额-->
    <div class="bgBox ">
      <span class="fl totalOrder" style="margin-left: 0.4rem;">总金额</span>
        <span class="fr freight" style="margin-right: 0.4rem;">
          ￥<em>{{orderMYlisdsdt.amount}}</em>
        </span>

    </div>
    <!--买家留言-->
      <div class="bgBox ">
      <span class="fl" style="margin-left: 0.4rem;margin-top:0.01rem;">买家留言：</span>
        <span class="fl" >
         <span class="shopFont" >{{orderMYlisdsdt.remarks}}</span>
        </span>

    </div>
   
    <!--备注-->
    <div class="suceeBg">

    </div>
     </div>

      <!--底部-->
      <div class="footer" style="    z-index: 20000;">
             <!--联系客服-->
               <a href="tel:02082511517">
             <span class="customerservice"  :class="statusORder!=2?'left':''">
               <img  src="../../../commom/img/customerservice.png"/>
               联系客服
             </span></a>
             <!--提醒发货-->
             <div  class="orderfootRight" :class="statusORder!=2?'fr':''" >
               <div class="" v-if="statusORder==12||statusORder==13">
            <router-link  :to="{path:'/afterSales',query:{title:'申请售后',id:this.$route.query.id}}">
                  <span class="cancelDelivery"  >申请售后</span>
                </router-link>
             <span class="delivery" @click="goodsshou" >  收货</span>
               </div>
                   
               <div v-if="statusORder==0">

                   <span class="cancelDelivery" @click="cancelOrdernoeh">取消订单</span>
                <span class="orderPay" @click="nowPayright()">立即支付</span>

               </div>
             </div>

      </div>
 
</div>
</template>
<script type="text/ecmascript-6">

  import {getOrderInfoByCondition,updateOderStatusInfoById}  from 'api/index'
import {getReceiverAddressByUserId} from 'api/editAdress'
import {commonParams} from 'api/config';
export default {


  components: {
 
 
  },
  data() {
			return {
         orderCondition:{
           id:this.$route.query.id
           
         },
         statusORder:0,
         orderMYlisdsdt:{},
         shopItemORder:[],
         getUSER:[],
         orderMessage:{addresId:0}
			}
      
		},
   
    
    computed:{
         
    },
  created(){

  },
   mounted() {
	   this.getOrderInfoByCondition()
     this._getReceiverAddressByUserId()
     
    },
   methods: {
     cancelOrdernoeh(){
      var _this=this;
         updateOderStatusInfoById(
           commonParams.searxhshopsParams({
        token:this.$store.state.login.token,
        orderId:this.$route.query.id,
        status:10

      
    })).then((res)=>{
      console.log(res)
             if(res.data.status==1){
        
             _this.$store.dispatch('toast',"删除订单成功");
             setTimeout(function(){
           _this.$router.push({path:'/myorder',query:{title:'我的订单'}})
             },600)
             

             }

       })
     },
     
     goodsshou(){
            var _this=this;
         updateOderStatusInfoById(
           commonParams.searxhshopsParams({
        token:this.$store.state.login.token,
        orderId:this.$route.query.id,
        status:2

      
    })).then((res)=>{
      console.log(res)
             if(res.data.status==1){
        
             _this.$store.dispatch('toast',"感谢你的及时收货");
             setTimeout(function(){
           _this.getOrderInfoByCondition();
             },400)
             

             }

       })
     },
    // 查询订单
     getOrderInfoByCondition(){
       
       getOrderInfoByCondition(commonParams.searxhshopsParams({
        token:this.$store.state.login.token,
        orderCondition:JSON.stringify(this.orderCondition)
      
    })).then((res)=>{
      console.log(res)
             if(res.data.status==1){
            this.statusORder=res.data.data[0].status
            this.orderMYlisdsdt=res.data.data[0]
          
             

             }

       })
     },
    //  立即支付
     nowPayright(){
     
         this.$router.push({
            path:'/sureOrder',query:{title:"立即支付",orderSSId:this.orderMYlisdsdt.id}})

     },
       routerback: function () {
      this.$router.back(-1)
            },
   _getReceiverAddressByUserId(){
        //shopCartStateNow

            getReceiverAddressByUserId(commonParams.searxhshopsParams({token:this.$store.state.login.token})).then((res)=>{
            
              if(res.data.status==1){
              
                    this.getUSER=res.data.data[0]
                  this.orderMessage.addresId= res.data.data[0].id
                  
              }

            })

      },
   
    
   }
 

}
</script>

<style lang="scss">
@import '../../../assets/orderDetail'
  
</style>
