<template>
<div class="contentorj">


 <!--<headerConmon/>-->
 <div class="afertBox">
   <span class="afterFont">请选择您要申请的类型</span>
   <ul>
     <li @click="actibINx(0)">
       <span class="afterIcon"><img src='../../../commom/img/icon_re_success.png'/></span>
       <span class="afertFont">退款</span>
       <span class="fr checkBox" :class="attrInx==0?'check':''"></span>

     </li>
      <li @click="actibINx(1)">
       <span class="afterIcon"><img src='../../../commom/img/iconrefund_success.png'/></span>
       <span class="afertFont">退货</span>
       <span class="fr checkBox" :class="attrInx==1?'check':''"></span>

     </li>

   </ul>

 </div>
 <!--dibu-->
 <div class="afterSalesfOOTER">
   <ul>
     <li class="suerAPPly fl" @click="wxdsdsdpay()">确定申请</li>
      <li class="fl customerService">
        <span class="customerServiceFont">联系客服</span>
        <span class="customerServiceDSA">020-3888-5678</span>
      </li>
   </ul>

 </div>


 <!--确定申请-->
 <!--加入购物车-->

<!--选择支付方式-->
<mt-popup v-model="popupShopcartss"  position="bottom" modal='true' closeOnClickModal='true'>
  <slot>
     <div class="addressListBox">
          <div class="addressList">
                <!--标题-->
             <div class="adressTitle">

               
               <span class="adressRight"><img  @click="wxdsddsddsdpay(false)" class="img"
                src='../../../commom/img/btn_cancel.png' /></span>
                 
                   

             </div>
             <div class="dashhkjahdkjaoui">
                     <span><img src='../../../commom/img/submissionofsuccess.png'/></span>
                     <span class="dasfhfont">提交成功，稍后会有专员联系您</span>
             </div>
            

          </div>
        <div class="newAddress" @click="setactivINdex(0)" >确定</div>
    </div>
  </slot>
        
</mt-popup>












</div>



</template>


<script type="text/ecmascript-6">

 import headerConmon from '../../headerConmon/index';

  import {updateOderStatusInfoById}  from 'api/index'
import {commonParams} from 'api/config';

export default {
  components: {
 headerConmon
 
  },

  data() {
			return {
      popupShopcartss:false,
      attrInx:0,
      status:10
			}
      
		},
    
    computed:{
         
    },
  created(){

  },
   mounted() {
	   
     
    },
   methods: {
       actibINx(a){
         this.attrInx=a
        
       },
         setactivINdex(a){
      var _this=this;
       this.$store.dispatch('setactivINdex',a);
     setTimeout(function(){
 _this.$router.push({path:'/myorder',query:{title:'我的订单'}})

     },1000)
     },
       wxdsddsddsdpay(a){
          this.popupShopcartss=a
       },
       wxdsdsdpay(){
          if(this.attrInx==0){
            // 退款
            this.status=5
          }else if(this.attrInx==1){
 this.status=4
          }
          //  this.popupShopcartss=a
          var _this=this;
         updateOderStatusInfoById(
           commonParams.searxhshopsParams({
        token:this.$store.state.login.token,
        orderId:this.$route.query.id,
        status: this.status

      
    })).then((res)=>{
      console.log(res)
             if(res.data.status==1){
        
          //    _this.$store.dispatch('toast',"s");
          //    setTimeout(function(){
          //  _this.$router.push({path:'/myorder',query:{title:'我的订单'}})
          //    },600)
             this.popupShopcartss=true

             }else{
                _this.$store.dispatch('toast',"申请失败");
             }

       })
       },
       cancelOrdernoeh(){
      
     }
     

   
  }

}
</script>

<style lang="scss">

.contentorj{
  width: rem(750);
  height: 100%;
  background-color: #f5f5f5;
}
.afertBox{
  width: rem(750);
  padding-top: rem(55);
  background-color: #fff;
  ul li{
    width: rem(750);
    border-bottom: 1px solid #e5e5e5;
    padding: rem(40) rem(30);

  }
}
.afterFont{
  font-size: rem(28);
  color: #999;
  margin-left: rem(30);
}
.afterIcon{
  img{
    width: rem(40);
  height: rem(40);
   vertical-align: rem(-10);
  }
}
.afertFont{
  font-size: rem(28);
  color: #333;
  font-weight: bold;
  margin-left: rem(10);
 
}
.checkBox {
    width: 0.50667rem;
    height: 0.50667rem;
    border-radius: 50%;
    display: inline-block;
    margin-right: 0.8rem;
    border: 1px solid #d7d7d7;
}
.check{
    background: url('../../../commom/img/checkTrue.png')  center center no-repeat;
     background-size: contain;
      border: 1px solid transparent;
  }
  .afterSalesfOOTER{
    height: rem(100);
    width: rem(750);
    position: fixed;
    bottom: 0;
    background-color: #fff;
  }
  .suerAPPly{
    width: 50%;
    height: rem(100);
    line-height: rem(100);
    background-color: #09b980;
    text-align: center;
    color: #fff;
    font-size: rem(30);
  }
  .customerService{
    width: 50%;
      height: rem(100);
   
    background-color: #ffbb02;
    text-align: center;
    span{
      display: block;
      color: #fff;

    }
  }
  .customerServiceFont{
    font-size: rem(24);
    margin-top: rem(15);
    margin-bottom: rem(10);
    opacity: 0.7;
  }
  .customerServiceDSA{
    font-size: rem(30);
  }
  .addressList{
   width: rem(750);
 border-radius:  rem(20)  rem(20) 0px 0px;
   background-color: #fff;
   height: auto;
   position: relative;
  //    border: 1px solid transparent;
  //  border-radius: rem(20);
   min-height: rem(620);
  
   overflow-x: hidden;
   overflow-y: auto;

 }   
  .newAddress{
   position: absolute;
   bottom: 0;
   width: rem(750);
    font-size: rem(30);
   height: rem(99);
   line-height: rem(99);
   text-align: center;
   background-color: #09b980;
   color: #fff;
 }
  .adressTitle{
   width: rem(750);
   padding: rem(45) 0;
   text-align: center;
   position: relative;
   .font{
     font-size: rem(28);
     color: #999999;
   }
   .adressRight{
     position: absolute;
     right: rem(30);
     
     }
    .img{
      width: rem(29);
      height: rem(29);
      margin-right: rem(30);
    }
  } 
  .dashhkjahdkjaoui{
    span{
      display: block;
    }
    text-align: center;
    margin-top: rem(65);
    img{
      
      width: rem(186);
    height: rem(192);
    }
    .dasfhfont{
      color: #333;
      font-size: rem(36);
    }
  }
</style>
