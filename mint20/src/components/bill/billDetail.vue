<template>
<div>

  <!--<div class="headerconcombill">
     <span class="back" @click="backheader"></span>
     <span class="title" >账单详情</span>
v-if="billDetailStateNowfalse"
   </div>-->
  
     <div class="" v-if="!billDetailStateNow||!billDetailStateNowfalse">

              <!--账单记录-->
   <div class="headerconcombillItem" v-if="this.$route.query.transactionType==1">
      <span class="dasdasbilkjgku">￥{{getTransactionFlowingList.amount}}</span>
      <span class="dasdasbilkjfont"  v-if="getTransactionFlowingList.state<3">处理中</span>
       <span class="dasdasbilkjfont"  v-if="getTransactionFlowingList.state>=3">交易完成</span>
      <ul class="billproadadasBox">
        <li class="firssuBISJ">处理进度</li>
         <li class="seceonsdah" :class="getTransactionFlowingList.state>=3?'seceonsfinish':''">
          
         </li>
          <li class="dasjhdkjthird"> 
            <span class="dasjhdkjthirdFIRST">处理进度</span>
              <span class="dasjhdkjthirdSECOND">处理进度</span>
                <span class="dasjhdkjTERHDKSAHKJ">处理进度</span>
            
          </li>
      </ul>

   </div>
   <!--账单记录列表-->

   <div class="setboxnwd setboxnwdative" v-if="!billDetailStateNow&&!billDetailStateNowfalse" >
     <ul>
      
     
        <li  v-if="this.$route.query.transactionType==1">
           <span class="fonName fl">提现到</span>
       
        <div class="fr">
           
           <span class="setMTitle activesasFontdsa" v-if="getTransactionFlowingList.withdraw==1">微信</span>
           <span class="setMTitle activesasFontdsa" v-if="getTransactionFlowingList.withdraw==0">支付宝</span>
         </div>
        
       </li>

        <li>
           <span class="fonName fl">帐单分类 </span>
       
        <div class="fr">
           
           <span class="setMTitle activesasFontdsa"  v-if="this.$route.query.transactionType == 0">商城购物</span>
            <span class="setMTitle activesasFontdsa" v-else-if="this.$route.query.transactionType == 1">提现</span>
             <span class="setMTitle activesasFontdsa"  v-else-if="this.$route.query.transactionType == 4">投放收入</span>
              <span class="setMTitle activesasFontdsa"  v-else-if="this.$route.query.transactionType!=0&& this.$route.query.transactionType!=1&&this.$route.query.transactionType!=4">其他</span>

         </div>
        
       </li>

        <li>
           <span class="fonName fl">创建时间</span>
       
        <div class="fr">
           
           <span class="setMTitle activesasFontdsa">{{getTransactionFlowingList.createTime}}</span>
         </div>
        
       </li>

        <li>
           <span class="fonName fl">订单号</span>
       
        <div class="fr">
           
           <span class="setMTitle activesasFontdsa">{{getTransactionFlowingList.transactionNo}}</span>
         </div>
        
       </li>

        <li>
           <span class="fonName fl">备注</span>
       
        <div class="fr">
         
           <span class="setMTitle activesasFontdsa" v-if="getTransactionFlowingList.state==5">申请退款</span>
            <span class="setMTitle activesasFontdsa" v-if="getTransactionFlowingList.state==4">申请退货</span>
             <span class="setMTitle activesasFontdsa" v-if="getTransactionFlowingList.state!=4&&getTransactionFlowingList.state!=5">其他</span>
         </div>
        
       </li>

       
      
      
     </ul>
    
   </div>

     </div>
     <div class="billDetailStateNows" v-if="billDetailStateNow">
        <span><img src='../../commom/img/icon_tips.png'/></span>
        <p>10月1号之前的不支持帐单详情查询哟~</p>

     </div>
      <div class="billDetailStateNows" v-if="billDetailStateNowfalse">
        <span><img src='../../commom/img/icon_tips.png' /></span>
        <p>没有你要查的数据哦</p>

     </div>
      

</div>



</template>


<script type="text/ecmascript-6">


import {getTransactionFlowingByid} from 'api/login'

import {commonParams,ERR_OK} from 'api/config'

export default {


  data() {
			return {
       getTransactionFlowingList:[],
       billDetailStateNow:false,
       billDetailStateNowfalse:false


			}
      
		},
    
    computed:{
         
    },
  created(){
    this._getTransactionFlowingByid()

  },
   mounted() {
	   
     
    },
   methods: {
  backheader(){
     this.$router.back(-1)
  },

 
  _getTransactionFlowingByid(){
    var _this=this;
      getTransactionFlowingByid(commonParams.searxhshopsParams({
            tid:this.$route.query.tid,
            token:this.$store.state.login.token,
            transactionType:this.$route.query.transactionType
              })).then((res)=>{
                if(res.data.status==1){
                   if(res.data.data!=null){
                                      var arr=[];
                              arr=res.data.data.createTime.split('-')
                              console.log(parseFloat(arr[0]+arr[1]))
                        if(parseFloat(arr[0]+arr[1])>201809){
                              this.billDetailStateNow=false
                                this.getTransactionFlowingList=res.data.data
                        }else{
                          this.billDetailStateNow=true
                        }
                     

                   }else{
                   
                   
                   

                        _this.$store.dispatch('toast',"系统异常");

                  
                   }
                       
                
               
                }
               

        })
  }
   
  }

}
</script>

<style lang="scss">

@import '../../assets/set';
.billDetailStateNows{
  width: rem(750);
  margin-top: rem(264);
  text-align: center;
  img{
    width: rem(120);
    height: rem(120);
  }
  p{
 font-size: rem(28);
 color: #666;
 margin-top: rem(65);
  }

}
.headerconcombill{
 background: url('../../commom/img/billDetail.png') center center no-repeat;
  width: rem(750);
     height: rem(100);
    line-height:rem(95);
background-size: cover;
  text-align: center;
  position: relative;
  .back{
    
         position: absolute;
  background: url('../../commom/img/back.png') center center no-repeat;
  width: rem(18);
  height: rem(24);
  left: rem(30);
  top: rem(35);
  background-size: contain;
  }
  .title{

    color: #fff;
    font-size: rem(32);
  }


}
.headerconcombillItem{
  width: rem(750);
  text-align: center;
  span{
    display: block;
  }
}
.dasdasbilkjgku{
  width: rem(750);
  text-align: center;
  color: #333;
  font-size: rem(54);
  margin-top: rem(85);
}
.dasdasbilkjfont{
  font-size: rem(28);
  color: #fe8917;
  margin-top: rem(24);
  margin-bottom: rem(50);
}
.billproadadasBox{
  width: rem(690);
  margin: 0 auto;
  overflow: hidden;
  margin-bottom: rem(50);

  li{
    float: left;
   width: 32.2%;
    
  }
}
.firssuBISJ{
  text-align: left;
  font-size: rem(28);
  color: #999;

}
.seceonsdah{
 
  height: rem(216);
 background: url('../../commom/img/img_uncomplete.png') center center no-repeat;
 background-size: 100% 100%; 

}
.seceonsfinish{
 
  height: rem(216);
 background: url('../../commom/img/img_complete.png') center center no-repeat;
 background-size: 100% 100%; 

}
.dasjhdkjthird{
  text-align: right;
  color: #999;
  font-size: rem(22);
  position: relative;
  height: rem(216);
}
.dasjhdkjthirdFIRST{
  position: absolute;
  top: 0;
  right: 0;
}

//dasjhdkjthirdSECOND  dasjhdkjTERHDKSAHKJ
.dasjhdkjthirdSECOND{
  position: absolute;
  top:45%;
  right: 0;
}
.dasjhdkjTERHDKSAHKJ{
  position: absolute;
  right: 0;
  bottom: 0;
}
.activesasFontdsa{
  margin-right: rem(30);
}
.setboxnwdative{
  padding-bottom: rem(30);
  ul li{
    border-bottom: 1px dashed #e5e5e5 !important;
  }
}
</style>
