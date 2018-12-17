<template>
<div>
     <div class="orderListBigBox">
 <!--<headerConmon/>-->
 
   <!--订单地址-->
  
   <div class="adressItemBoxnowdsa">
              <div class="adressItemmyorderjkldakjhj">
                <span class="adressIconmekjghkj fl"> <img src='../../../commom/img/icon_address.png'/></span>

             <div class="fl adressItemsdasMyItemMynow"> 
                    <div class="first">
                    <span class="fl">{{getUSER.receiver}}</span>
                      <span class="fr">{{getUSER.phone}}</span>
                  </div>
                  <div class="adressItemName">{{getUSER.detailAddress}}
                  </div>
             </div>
             <!--<span class="fr btnGo">
               <img class="btnGoBg" src="../../../commom/img/btnGo.png"/>
               </span>-->
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
      <ul v-if="!this.$route.query.orderSSId">

        
          <li v-for="(item,index) in orderlist" :key="index"  >
     
          <div class="orderListItem">
            <!--左边-->
            <div class="orderListItemLeft fl">
              <img v-lazy="item.productImgUrl"/>
            </div>
            <!--右边-->
             <div class="orderListItemRight fr"> 
                <div class="orderListItemRightTitle">
                     {{item.productName}}
                </div>
                <div class="orderListItemfont">
                  <span class="orderListItemMoney fl">￥{{item.productPrice}}</span>
                  <span class='orderListItemNum fr'>X<em>{{item.productAmount}}</em></span>
                </div>

             </div>

          </div>
        </li>
        
      </ul>
       <ul v-if="this.$route.query.orderSSId">

        
         
          <li v-for="(item,index) in orderConditionListNwds" :key="index"  >
     
          <div class="orderListItem">
            <!--左边-->
            <div class="orderListItemLeft fl">
              <img :src="item.pruductImgUrl"/>
            </div>
            <!--右边-->
             <div class="orderListItemRight fr"> 
                <div class="orderListItemRightTitle">
                     {{item.productName}}
                </div>
                <div class="orderListItemfont">
                  <span class="orderListItemMoney fl">￥{{item.price}}</span>
                  <span class='orderListItemNum fr'>X<em>{{item.account}}</em></span>
                </div>

             </div>

          </div>
        </li>
      </ul>

    </div>
    <!--优惠券-->
     <!--<div class="bgBox ">
      <span class="fl">
        <img class="iconcoupon" src="../../../commom/img/iconcoupon.png"/> 优惠劵
        </span>
        <span class="fr">
          <img class="btnGoBg" style="margin-right: 0.4rem;" src='../../../commom/img/btnGo.png'>
        </span>

    </div>
    <! 运费-->
    <!--<div class="bgBox ">
      <span class="fl" style="margin-left: 0.4rem;">运费</span>
        <span class="fr freight" style="margin-right: 0.4rem;">
          +￥<em>8.00</em>
        </span>

    </div>-->
    <!--备注-->
      <div class="bgBox ">
      <span class="fl" style="margin-left: 0.4rem;margin-top:0.01rem;">备注：</span>
        <span class="fl" >
          <!--<textarea rows="3" cols="20"  class="shopFont" v-model="remarks">-->
        <textarea class="shopdsdsaaFont" rows="10" cols="30"
              @focus='tesagdhj' v-model="remarks"
              maxlength="85">
              </textarea>
               
       
        </span>

    </div>
    <!--合计-->
     <div class="bgBox">
     
        <div class="fr" >
           <span>共{{allFlagORder}}件，合计:</span>
           <span class="freight" style="margin-right: 0.4rem;">￥{{totalorder.toFixed(2)}}</span>
        </div>

    </div>
    <!--备注-->
    <div class="suceeBg">
支付完成后尽快为您发货
    </div>
     </div>

      <!--底部-->
      <div class="footerSurdsadjklhkj">
        <span class='fr sureOrder'  @click="insertOrder">确认</span>
        <span class="fr total"><em class="fl" style="margin-top:-0.01rem;">合计：</em><em class="emconh fl">￥{{totalorder.toFixed(2)}}</em></span>

      </div>
 

 <!--支付弹出-->
 <div class="payOrderOBJiTENDSss" v-if="payOrderOBJiTEWEIX">
          <span  style="color:#999;font-size:0.32rem;margin-top: 0.2rem;
    margin-bottom: 0.2rem;">你还需支付</span>
           <span class="shenyuMonkey"  style="color:#09b980;margin-top:0.2rem;">￥{{(totalorder-protectionMoney).toFixed(2)}}</span>
       <div class="payOrderstenhj">您的呐吉币余额不足，请问是否使用微信支付剩余金额？
       </div>
      <div class="payordrefhjmhdjagd">
        <div class="payordrefhjmhdjagdWidth">

            <span class="CANCELOrderMYIHbuTTON" @click="cancleORDASHJ(false)">取消</span>
           
             <span class="surrOrderMYIHbuTTON" v-if="!sureOrderStateWeixin"  @click="surrOrderMYIHbuTTONdsa"> 确定</span>
               <span class="surrOrderMYIHbuTTON"  v-if="sureOrderStateWeixin" style="color:#999;"> 确定</span>

        </div>
         

        

      </div>
 </div>
 <div class="vmodelOrderhjg" v-if="payOrderOBJiTEWEIX" @click="cancleORDASHJ(false)">

 </div>
 <!--选择支付方式-->
<mt-popup v-model="payVisible"  position="bottom" modal='true' closeOnClickModal='true'>
  <slot>
     <div class="addressListBox">
          <div class="addressList">
                <!--标题-->
             <div class="adressTitle">

               <span class="font">选择支付方式</span>
               <span class="adressRight"><img  @click="sureOrder(false)" class="img"
                src='../../../commom/img/btn_cancel.png' /></span>
                 
                   

             </div>
              <ul class="payVisible">
                    <li @click="changeINdex(1,'钱包')">
                       <span class="fl payIConmy"><img src="../../../commom/img/insufficient-02.png"/></span>
                       <span class="fl payFont">钱包</span>
                       <span class="fl payNOum">(剩余¥ {{balance}})</span>
                       <span class="fr checkpayBox" :class="payIndex==1?'check':''" ></span>
                   
                    </li>
                     <li @click="changeINdex(2,'呐吉金')">
                       <span class="fl payIConmy"><img src="../../../commom/img/insufficient-01.png"/></span>
                       <span class="fl payFont">呐吉金</span>
                       <span class="fl payNOum">(剩余¥ {{protectionMoney}})</span>
                       <span class="fr checkpayBox" :class="payIndex==2?'check':''" ></span>

                    </li>
                     <li  @click="changeINdex(3,'微信支付')">
                       <span class="fl payIConmy"><img src="../../../commom/img/insufficient-03.png"/></span>
                       <span class="fl payFont">微信支付</span>
                     
                       <span class="fr checkpayBox" :class="payIndex==3?'check':''" 
                       
                        ></span>

                    </li>
                  </ul>

          </div>
        <div class="newAddress" @click="wxpay"><span>{{payStyleName}}</span>￥<span>{{totalorder.toFixed(2)}}</span></div>
    </div>
  </slot>
        
</mt-popup>
<!--返回首页-->
  <router-link  :to="{path:'/'}">
     <div class="gobackHomeOrderkld"></div>
      </router-link>

</div>
</template>
<script type="text/ecmascript-6">
 import {commonParams} from 'api/config';

import {getReceiverAddressByUserId} from 'api/editAdress'
  import {insertOrder,nagebiPay,walletPay,weiXinPay,getOrderInfoByCondition,nagebiMixturePay,cancelPay}  from 'api/index'
import headerConmon from '../../headerConmon/index';
 import {getUserInfo}  from 'api/login'
import {deleteShopCat}  from 'api/shopcart'
export default {


  components: {
 headerConmon
 
  },
  data() {
			return {
        payVisible:false,
        payOrderOBJiTEWEIX:false,
        payStyleName:'钱包',
        najidaoPayNum:0,
        payIndex:1,
         ip:"",
        getUSER:[],
        remarks:'请留下你的宝贵意见',
        allFlagORder:0,
        cancelorderNums:0,
        totalorder:0,
        remnant:0,
        orderNumNowCancel:0,
        orderlist:[],
        // 混合支付确定状态
        sureOrderStateWeixin:false,
         //购物车删除id集合
        productids:[],
        balance:"",//钱包
        protectionMoney:"",//呐吉币
        payWeixinState:false,
        lackbalanceState:false,
        orderMessage:{
          remarks:"",
          addresId:0,
          map:{

          }

        },
        pay:{
          orderid:'',
           payType:''
          
        },
        weixinpay:{

        },
         orderCondition:{
           id:this.$route.query.orderSSId,
           
         },
         orderConditionListNwds:[]
			}
      
		},
   
    
  watch: {


    // 监听是否离开
     $route: {
        handler: function(val, oldVal){
          console.log(val);
        },
        // 深度观察监听
        deep: true
  },

		// 监听商品列表的变化
		orderlist: {
			// 变化后处理的方法，对handler进行方法定义
			handler: function () {
				// 定义全选Falg
		//总件数
        	this.allFlagORder=0;
      
				this.totalorder = 0;
        for(var i in this.orderlist){
          // 总价
         this.totalorder+=this.orderlist[i].productPrice* this.orderlist[i].productAmount;
         this.allFlagORder+=this.orderlist[i].productAmount;
   
        this.orderMessage.map[this.orderlist[i].productId]=this.orderlist[i].productAmount
        
        
        }
			
			},
		
			deep: true
		},
    	orderConditionListNwds: {
			// 变化后处理的方法，对handler进行方法定义
			handler: function () {
				// 定义全选Falg
		//总件数
        	this.allFlagORder=0;
      
				this.totalorder = 0;
        for(var i in this.orderConditionListNwds){
          // 总价
         this.totalorder+=this.orderConditionListNwds[i].price* this.orderConditionListNwds[i].account;
         this.allFlagORder+=this.orderConditionListNwds[i].account;
   
        this.orderMessage.map[this.orderConditionListNwds[i].productId]=this.orderConditionListNwds[i].account
        
        
        }
			
			},
		
			deep: true
		}
	},
  created(){
  
  this.orderlist=this.$store.state.pay.orderlist
 
    
  },
   mounted() {
	   this._getReceiverAddressByUserId()
     this._getUserInfo()
     this.ip=returnCitySN.cip
     if(this.$route.query.orderSSId){
      
        this.getOrderInfoByCondition()
     }
     

    
    },
   methods: {

   cancleORDASHJ(a){
      this.payOrderOBJiTEWEIX=a
      this._cancelPay()
   },
     tesagdhj(){
        if(this.remarks=="请留下你的宝贵意见"){
         this.remarks=''
       }
     },
      changeINdex(a,b){
        this.payIndex=a
        this.payStyleName=b
      },
      sureOrder(a){
        this.payVisible=a
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
  _getUserInfo(){
       getUserInfo(commonParams.searxhshopsParams({token:this.$store.state.login.token})).then((res)=>{
           if(res.data.status==1){
          
               this.balance=res.data.data.balance
                this.protectionMoney=res.data.data.protectionMoney            
              

             
           }
       
       })
  },
    insertOrder(){
  var _this=this;
      console.log()
      if(this.orderMessage.addresId>0){
       
      _this.cancelMoreOrder();

       if(_this.$route.query.orderSSId){
      
           this.payVisible=true
          
                this.weixinpay.orderid=_this.$route.query.orderSSId
                 this.pay.orderid=_this.$route.query.orderSSId

             this.orderNumNowCancel=_this.$route.query.orderSSId
             
        }else{
              if(this.remarks=="请留下你的宝贵意见"){
                      this.orderMessage.remarks=''
                }else{
                            this.orderMessage.remarks=this.remarks
                }
                if(this.cancelorderNums==0){
                                        
                      insertOrder(commonParams.searxhshopsParams({
                        token:this.$store.state.login.token,
                        orderMessage:JSON.stringify(this.orderMessage),
                      
                      })).then((res)=>{
                        //要修改
                        if(res.data.status==1){
                          this.payVisible=true
                          this.pay.orderid=res.data.data
                          
                             this.cancelorderNums++;
                          
                           this.orderNumNowCancel=res.data.data

                        }else if(res.data.status==-1){
                      this.$store.dispatch('toast',"库存不足");
                        }else{

                            this.$store.dispatch('toast',res.data.message);
                            setTimeout(function(){
                              _this.$router.go(-1);
                            },1000)
                        }
                    

                      })

                }else{
                      this.$store.dispatch('toast',"6秒内请勿重复下订单.");
                }
           
        }
      }else{
         this.$store.dispatch('toast',"请设置你的地址");
      }
     
  
    
    },
    wxpay(){
  
  this.sureOrderStateWeixin=false;
      if(this.payStyleName=="钱包"){
      
              this.pay.payType=2,
              this.pay.payMoney=0,
              this._walletPay()
           
       
      }else if(this.payStyleName=="呐吉金"){
          //余额不足
            if(this.totalorder>this.protectionMoney){
        

        
            
              this._nagebiMixturePay()
              }else{
                this.pay.payType=1,
               
                this._nagebiPay()

           }
     
       
      }else if(this.payStyleName=="微信支付"){
        
          // console.log("微信支付")
          // 总价钱
         
           this.WxPayBtn(1,this.totalorder)
      }
      
  

          

    },
  
//防止多次点击订单
    cancelMoreOrder(){
      var _this=this;
      setTimeout(function(){
  _this.cancelorderNums=0
      },6000)
    },
     // 查询订单
     getOrderInfoByCondition(){
       getOrderInfoByCondition(commonParams.searxhshopsParams({
        token:this.$store.state.login.token,
        orderCondition:JSON.stringify(this.orderCondition)
      
    })).then((res)=>{
      console.log(res)
             if(res.data.status==1){
               this.orderConditionListNwds=res.data.data[0].orderProductAttributes
       
          
          
             

             }

       })
     },

    //呐吉金支付
    _nagebiPay(){
       var settotalPayNum=this.totalorder
      var _this=this;
            nagebiPay(commonParams.searxhshopsParams({
              token:this.$store.state.login.token,
              pay:JSON.stringify(this.pay)
            })).then((res)=>{
             
              if(res.data.status==1){
              this.payVisible=false
              //购物车过来的
                  if(this.$route.query.shopCartStateNow==3){
                    
                            _this.delShopCart()
                             _this.$store.dispatch('toast',"支付成功");
                            
                  
                         setTimeout(function(){
                      

                                _this.$store.dispatch('settotalPayNum',settotalPayNum);
                                        _this.$router.push({path:'/paySucess'})
                    },650)

                    }else{
                        _this.$store.dispatch('toast',"支付成功");
                        
                setTimeout(function(){
               



                                      

                                _this.$store.dispatch('settotalPayNum',settotalPayNum);
                                        _this.$router.push({path:'/paySucess'})
                    },650)
                    }

              }else if(res.data.status==2){
                this.payVisible=false
                this.pay.ip=this.ip
                //重新调接口
                    _this.$store.dispatch('toast',res.data.data);

                     setTimeout(function(){
                    _this.$store.dispatch('setactivINdex',1);
                      _this.$router.push({path:'/myorder',query:{title:'我的订单'}})
                  },1000)
              

              }else{
                  _this.$store.dispatch('toast',"订单已支付请不要重复支付");
              }

            })
    },
    //钱包  res.data.status==1
    _walletPay(){
      var _this=this;
      var settotalPayNum=this.totalorder
 
       walletPay(commonParams.searxhshopsParams({
              token:this.$store.state.login.token,
              pay:JSON.stringify(this.pay)
            })).then((res)=>{
               if(res.data.status==1){
                   this.payVisible=false
                  //  购物车订单
                    if(this.$route.query.shopCartStateNow==3){
                            this.delShopCart()
                             _this.$store.dispatch('toast',"支付成功");
                             
                      setTimeout(function(){
                      
                    
                  _this.$store.dispatch('settotalPayNum',settotalPayNum);
                          _this.$router.push({path:'/paySucess'})
                        
                         
                          //传递总价
                             
                    },650)
                    

                    }else{
                        _this.$store.dispatch('toast',"支付成功");
                         
                          //传递总价
                             _this.$store.dispatch('settotalPayNum',settotalPayNum);
                          setTimeout(function(){
                      
                         _this.$router.push({path:'/paySucess'})

                          
                    },650)
                    }
                        

              }else if(res.data.status==2){
                  this.payVisible=false
                   _this.$store.dispatch('toast',"钱包余额不足");
             setTimeout(function(){
                    _this.$store.dispatch('setactivINdex',1);
                      _this.$router.push({path:'/myorder',query:{title:'我的订单'}})
                  },1000)
               
              }else{
                 this.payVisible=false
                   _this.$store.dispatch('toast',"订单异常，请重新选择");
             setTimeout(function(){
                    _this.$store.dispatch('setactivINdex',1);
                      _this.$router.push({path:'/myorder',query:{title:'我的订单'}})
                  },1000)
              }
           
         
       })
    },
    // 删除购物车
        delShopCart(){

       	for (var i in this.orderlist) {
            this.productids.push(this.orderlist[i].productId)
				
				}
       
         let param = new URLSearchParams();
         	 param.append("token",this.$store.state.login.token);
          param.append("productids",JSON.stringify(this.productids));
          deleteShopCat(param).then((res)=>{
              if(res.data.status==1){
              
                      
              }
              

      })
    },
    //呐吉金混合支付
    _nagebiMixturePay(){
      var _this=this;
      nagebiMixturePay(
                     commonParams.searxhshopsParams({
              token:this.$store.state.login.token,
              pay:JSON.stringify(this.pay)
            })
                   ).then((res)=>{
                      if(res.data.status==1){
                        this.payVisible=false
                        this.najidaoPayNum=res.data.data
                         this.payOrderOBJiTEWEIX=true

                      }else{
                         this.payVisible=false
                         setTimeout(function(){
                           this.$store.dispatch('toast',"网络异常");},14000)
                         
                      }
                   })
    },
         
    lackbalance(){
  //
      this.lackbalance=true


    },
      surrOrderMYIHbuTTONdsa(){
             this.payOrderOBJiTEWEIX=false;
            this.sureOrderStateWeixin=true
          
            
        this.WxPayBtn(2,this.najidaoPayNum)
        
      
    },
    //
    // 微信支付
     WxPayBtn(num,total){
       var _this=this;
       _this.weixinpay.ip=this.ip;
      _this.weixinpay.orderid=this.pay.orderid;
        _this.weixinpay.type=num;
        _this.weixinpay.total=total.toFixed(2);

      //  /openid
                  //xdvr21uzoumw2p41
              weiXinPay(commonParams.searxhshopsParams({
                //
              token:this.$store.state.login.token,
              pay:JSON.stringify(_this.weixinpay)
            })).then(function (success) {
         
                           if(success.data.data){
                            // _this
                                     _this.payVisible=false
                               _this.jsApiCall(success.data.data,_this)

                           }
                           
                           

                        },function (error) {
                            alert(JSON.stringify(error))
                        })
   },
    //正式发起微信支付
                jsApiCall(jsapi,a){
                 
                
                    WeixinJSBridge.invoke(
                        'getBrandWCPayRequest',
                        jsapi,
                        function (res) {
                            if (res.err_msg == "get_brand_wcpay_request:ok") {
                               
                               
                                if(a.$route.query.shopCartStateNow==3){
                                   a.delShopCart()
                                    
                                       setTimeout(function(){
                                          a.$router.push({path:'/paySucess',query:{moykey:a.totalorder}})
                                           var settotalPayNum=a.totalorder

                                    a.$store.dispatch('settotalPayNum',settotalPayNum);
                                        a.$router.push({path:'/paySucess'})

                                          
                                     },650)
                                     
                                    }else{
                                      

                                       var settotalPayNum=a.totalorder

                                a.$store.dispatch('settotalPayNum',settotalPayNum);
                                        a.$router.push({path:'/paySucess'})
                                       
                                     }




                            }else if (res.err_msg === 'get_brand_wcpay_request:cancel') {
                                       a.$store.dispatch('toast','你好，你取消支付');
                                        if( a.weixinpay.type=2){
                                            a._cancelPay()
                                          a.$store.dispatch('setactivINdex',1);
                                             a.$router.push({path:'/myorder',query:{title:'我的订单'}})
                                        }else{
                                      
                                            a.$store.dispatch('setactivINdex',1);
                                             a.$router.push({path:'/myorder',query:{title:'我的订单'}})
                                        }



　　　　　                       　} else if (res.err_msg === 'get_brand_wcpay_request:fail') {
                                  a.$store.dispatch('toast','网络异常，请重试');

　　　　　                   　} else {
                           
                                // alert("支付失败")
                                if( a.weixinpay.type=2){
                                            a._cancelPay()
                                               a.$store.dispatch('setactivINdex',1);
                                             a.$router.push({path:'/myorder',query:{title:'我的订单'}})

                                        }
                        a.$store.dispatch('toast','你好，你支付失败');
                                   
                                          a.$store.dispatch('setactivINdex',1);
                                             a.$router.push({path:'/myorder',query:{title:'我的订单'}})
                                alert(JSON.stringify(res.err_msg))
                            }
                        }
                    );
                },
                // 取消订单
                _cancelPay(){
                  var _this=this;
                  cancelPay(commonParams.searxhshopsParams({
                //
              token:this.$store.state.login.token,
              orderNo:this.orderNumNowCancel

            })
            ).then((res)=>{
              if(res.data.status==1){
                  this.$store.dispatch('toast','你好，你取消支付');
                  setTimeout(function(){
                    _this.$store.dispatch('setactivINdex',1);
                      _this.$router.push({path:'/myorder',query:{title:'我的订单'}})
                  },1000)
              }
                   
                  })

                }


    
   }


}
</script>

<style lang="scss">
.shenyuMonkey{
  font-size: rem(60);


}
 //  surrOrderMYIHbuTTON  CANCELOrderMYIHbuTTON
 .surrOrderMYIHbuTTON{
   text-align: center;
   font-size: rem(36);
   color: #09b980;
   float: right;
   }
   .CANCELOrderMYIHbuTTON{
     font-size: rem(36);
   color: #383838;
     float: left;
   }
.payOrderstenhj{
  width: rem(440);
  margin: 0 auto;
  line-height: rem(52);
  margin-top: rem(20);
   text-align: center;
  font-size: rem(32);
  color: #232323;
 
  padding-bottom: rem(60);

}
.payordrefhjmhdjagd{
  width: rem(540);
  height: rem(84);
  line-height: rem(84);
  border-top: 1px solid #eeeeee;
   margin: 0 auto;
 
   text-align: center;
  
   .payordrefhjmhdjagdWidth{
     width: rem(400);
       margin: rem(20) auto;

   }

}
.vmodelOrderhjg{
  position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    opacity: 0.5;
    background: #000;
    z-index: 30;
   

}
.payOrderOBJiTENDSss{
 padding-top: rem(30);
  border-radius: rem(15);
  width: rem(593);
  height: rem(435);
  background-color: #fff;
  z-index: 3000;
  text-align: center;
  position: fixed;
  left: 50%;
  top: 50%;
  margin-left: rem(-593/2);
  margin-top: rem(-485/2);
  span{
    display: block;
  }

}
.weixingBoxItem{
  width: rem(750);
  text-align: center;
  font-size: rem(30);
  color: #999;
}
.weiximesdgButton{
  width: rem(750);
  height: rem(120);
  margin-top: rem(125);
  text-align: center;

  span{

    display: inline-block;
   width: rem(180);
    height: rem(75);
    border-radius: rem(15);
    background-color: #09b980;
    text-align: center;
    color: #fff;
    line-height: rem(75);
    font-size: rem(30);
   


  }
}

.fontASDHJH{
  margin-top: rem(36);
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
     right: 0 !important;
     
     }
    .img{
      width: rem(29);
      height: rem(29);
      margin-right: rem(30);
    }
  } 
//上可以提去共有
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
  .adressItemBoxnowdsa{
 position: relative;
 width: rem(750);
 overflow: hidden;
 background-color: #fff;
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
    .adressItemmyorderjkldakjhj{
     
       padding: rem(32)  rem(32);
overflow: hidden;
      
    .first{
      font-size: rem(30);
      color: #888;
      overflow: hidden;
      margin-bottom: rem(23);
    }
    .adressItemName{
       font-size: rem(30);
      color: #888;
      height: auto;
      width: 100%;
      text-align: left;
    }
   
    }
    .editCheckBox{
      padding: rem(20) rem(30);
      border-bottom: 1px solid #d8d8d8;
      overflow: hidden;
    }

.adressIconmekjghkj{
  margin-top: rem(39);
  margin-right: rem(28);
    img{
        width: rem(34);
      height: rem(38);
    }
  }
.adressItemsdasMyItemMynow{
  width: rem(580);
}
.btnGo{
    margin-top: rem(39);
 
}
 .btnGoBg{
    width: rem(14);
    height: rem(26);
   
  }
.adressItemOrderBg{
   position: absolute;
   z-index: 33;
   bottom: 0;
   height: rem(5);
   width: rem(750);
   background-size: contain;
   background: url('../../../commom/img/imgaddress.png') center center no-repeat;
}
.bgBox{
  overflow: hidden;
  width: rem(750);
  padding: rem(25) 0;
    border-bottom: 1px solid #d8d8d8;
  border-bottom: 1px solid #ebebeb;
  background-color: #fff;
  color: #333;
  font-size: rem(28);
  .imglogo{
    margin-left: rem(30);
    width: rem(34);
    height: rem(34);
       vertical-align: -0.09rem;
  }
  .iconcoupon{
     margin-left: rem(30);
      width: rem(32);
    height: rem(22);
           vertical-align: -0.01rem;
  }
}
//可以优化
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
//可以优化
.orderListItemfont{
  overflow: hidden;
  margin-top: rem(50);
  .orderListItemMoney{
       color: #09b980;
       font-size: rem(30);
  }
}
.orderListItemNum{
  margin-top: rem(10);
  font-size: rem(20);
  color: #333;
}
.freight{
  font-size: rem(30);
  color: #09b980;
}
.shopFont{
border: none;
min-height: rem(150);
text-align: center;
  width: rem(600);
  color: #c5c5c5;

  
    font-size: rem(28);
  
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    word-break: break-word;
   
  
}
.suceeBg{
  width: rem(750);
  height: rem(125);
  line-height: rem(125);
  background-color: #f5f5f5;
  text-align: center;
  color: #bcbcbc;
  font-size: rem(28);


}
.orderListBigBox{
      position: absolute;
    z-index: 9;
    // padding: 0 0 1.33333rem;
    min-height: 100%;
    background-color: #f5f5f5;
   bottom: 1.33333rem;
   top: 0;
}
.footerSurdsadjklhkj{
  width: rem(750);
  height: rem(100);
  background-color: #fff;
  line-height: rem(100);
  z-index: 10;
  position: fixed;
  bottom: 0;
  .sureOrder{
    width: rem(260);
    height: rem(100);
    background-color: #09b980;
    text-align: center;
    color: #fff;
    line-height: rem(100);
    font-size: rem(30);
  }
  .total{
    font-size: rem(26);
    color: #333;
    margin-right: rem(26);
    
    .emconh{
      font-size: rem(32);
      color: #09b980;
    }
  }

}
.shopdsdsaaFont{
  width: rem(500);
  height: rem(200);
  border: none;
  background-color: #fff;
 padding-top: 0.05rem;
  border-radius: rem(10);
  color: #999;
}
.payVisible{
  width: rem(750);
  height: auto;
  overflow-x: hidden;
     padding-bottom: rem(110);
  li{
    padding: rem(28);
    overflow: hidden;
    border-bottom: 1px solid #e5e5e5;
  }
 
  .payIConmy{
    img{
      width: rem(91);
      height: rem(91);
    }
  }
  .payFont{
    font-size: rem(32);
     margin: 0 rem(20);
     margin-top: rem(28);
    color: #333;
    }
   
    .payNOum{
       margin-top: rem(28);
     font-size: rem(26);
     color: #999;
    
  }
  
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
    background: url('../../../commom/img/checkTrue.png')  center center no-repeat;
     background-size: contain;
      border: 1px solid transparent;
  }
</style>
