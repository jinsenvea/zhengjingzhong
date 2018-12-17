<template>
<div class="">

<!--
 <headerConmon/>-->
  <!--搜索-->
 <div style="padding-top: 0.36rem;
    padding-bottom: 0.25333rem;">
    <div class="orderSearch">
      <img class="fl" src='../../../assets/images/search1_03.jpg'/>
    <input class="fl orderSearchinput" placeholder="请搜索商品名称/订单编号" type="text"
    v-on:input ="inputFunc" 
   
    
    
    v-model='searchText'/>
      <!--v-on:input="searchProductByAntistop()"-->

  </div>
 </div>

 
 <!--订单列表-->
 <div class="searOrderListbj">
            <div class="searOrderListbjiTEM"  v-for="(item,index) in orderMYlist" :key="index" >
                      <div class="bgHr" ></div>
                    <div class="bgBox">
                        <span class="orderLIshdfon">订单编号 {{item.orderNo}} </span>
                        <span class="orderASDHJstate"  v-if="item.status==8">
                          <img  class="imglogo" src="../../../commom/img/icon_refund.png"/>退款成功</span>
                       <span class="orderASDHJstate"v-if="item.status==7">
                           <img class="imglogo" src="../../../commom/img/icon_failure.png"/>退款失败
                         </span>
                           <span class="orderASDHJstate" v-if="item.status==9">
                              <img class="imglogo" src="../../../commom/img/icon_returngoods.png"/>退货成功
                         </span>
                           <span class="orderASDHJstate"  v-if="item.status==6">
                                <img class="imglogo" src="../../../commom/img/icon_failure.png"/>退货失败
                         </span>
                           <span class="orderASDHJstate"  v-if="item.status==5||item.status==4">
                              <img class="imglogo" src="../../../commom/img/icon_handle.png"/>申请中
                         </span>
                             

                          
                           
                        
                             

                  </div>
                <!--订单列表-->
          <div class="orderListsearchNow">
              <ul>
                <li v-for="(itemnext,index) in item.orderProductAttributes" :key="index">
                  <!---->
                  <div class="orderListItem">
                    <!--左边-->
                    <div class="orderListItemLeft fl">
                      <img :src="itemnext.pruductImgUrl"/>
                    </div>
                    <!--右边-->
                    <div class="orderListItemRight fr"> 
                        <div class="orderListItemRightTitle">
        
                        </div>
                        <div class="orderListItemfont">
                          <span class="orderListItemMoney fl">￥{{itemnext.price}}</span>
                          <span class='orderListItemNum fr'>X<em>{{itemnext.account}}</em></span>
                        </div>

                    </div>

                  </div>

                        





                </li>
              </ul>
                    <p class="hsdjsmkyh" v-if="item.status==8">注：该商品退款成功</p>
                     <p class="hsdjsmkyh"  v-if="item.status==7">注：该商品退款失败</p>
                      <p class="hsdjsmkyh" v-if="item.status==9">注：该商品退货成功</p>
                       <p class="hsdjsmkyh" v-if="item.status==6">注：该商品退货失败</p>
                        <p class="hsdjsmkyh" v-if="item.status==11">注：该商品申请中</p>
                              

                           
                </div>
               
        </div>
                      <!--订单列表-->
        </div>
         <div class="searbillbg" v-if="shopcARTstate" style="text-align: center;">
        
没有相应的订单记录
    </div>
 

 </div>
 
</div>



</template>


<script type="text/ecmascript-6">

 import headerConmon from '../../headerConmon/index';

 import {getOrderInfoByCondition}  from 'api/index'
import {commonParams} from 'api/config';

export default {
  components: {
 headerConmon
 
  },

  data() {
			return {
        attrInx:0,
        orderMYlist:{},
        orderCondition:{},
        searchText:'',
        shopcARTstate:false
			}
      
		},
    
    computed:{
         
    },
  created(){

  },
   mounted() {
     
      this.orderCondition.productName="";
       this.orderCondition.orderNo="";
       if(this.$store.state.login.token!=''){
          this.orderCondition.status=3
            this.getOrderInfoByCondition()
       }else{
               this.$router.push({path:'/login'})
                 this.$store.dispatch('setredirectPath',_this.$route.path); 
       }
	  
     
    },
   methods: {
     inputFunc(){
      

         this.orderCondition.keyWord=this.searchText
          this.getOrderInfoByCondition()
     
         

      //   this.getOrderInfoByCondition(3,"","")
     },
      isRealNum(val){
          // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除
          if(val === "" || val ==null){
              return false;
          }
          if(!isNaN(val)){
              return true;
          }else{
              return false;
          }
    },  
       actibINx(a){
         this.attrInx=a
       },
    getOrderInfoByCondition(){
     
         getOrderInfoByCondition(commonParams.searxhshopsParams({
        token:this.$store.state.login.token,
        orderCondition:JSON.stringify(this.orderCondition)
      
    })).then((res)=>{
      
        if(res.data.status==1){
          if(res.data.data.length>0){
            
             this.shopcARTstate=false
              this.orderMYlist=res.data.data
                 

          }else{
             this.shopcARTstate=true
              this.orderMYlist=[]
          }
   
      
        }

      })
    },
    // 查询
    
   
  }

}
</script>

<style lang="scss">
.orderASDHJstate{
  position: absolute;
  right: rem(30);

}
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
.orderSearch{
  overflow: hidden;
  width: rem(590);
  margin: 0 auto;
 padding: rem(19) 0;
  border-radius: rem(8);
  background-color: #f6f6f6;
  text-align: center;
  img{
    width: rem(35);
    margin-left: rem(95);
    margin-right: rem(30);
    height: rem(35);
  }
}
.orderSearchinput {
    width:rem(360);
   margin-top: rem(-2);
    border-radius: 0.06667rem;
    background-color: #f6f6f6;
    font-size:rem(28);
    color: #b9b9b9;
    border: none;
  
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
}
.searOrderListbj{
  width: rem(750);
}
.bgBox{
  overflow: hidden;
  width: rem(750);
  padding: rem(25) 0;
    border-bottom: 1px solid #d8d8d8;
  border-bottom: 1px solid #ebebeb;
  color: #333;
  font-size: rem(28);
  .imglogo{
    margin-right: rem(15);
    width: rem(34);
    height: rem(34);
       vertical-align: -0.09rem;
       font-size: rem(28);color: #333;
  }
  .iconcoupon{
     margin-left: rem(30);
      width: rem(32);
    height: rem(22);
           vertical-align: -0.01rem;
  }
}
.orderLIshdfon{
  margin-left: rem(30);
  font-size: rem(24);
  color: #999;
}
.orderListsearchNow{
  width: rem(750);
  overflow: hidden;
  ul li{
    width: rem(750);
   
    padding: rem(18) 0;
     
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

.hsdjsmkyh{
  font-size: rem(24);
  color: #999;
  margin-left: rem(30);
  padding-bottom: rem(30);
  padding-top: rem(15);
}
</style>
