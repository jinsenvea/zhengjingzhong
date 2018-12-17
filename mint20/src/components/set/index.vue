<template>
<div class="containe ">
  <div class="goodsBigBox">
   <div class="" :class="getUserInfo.isJoin==1?'setmetshjhBox':'setmetshjhBoxisJoinBg'">
       <div class="setBoxTitle">
          <!-- 钱包-->
          <div class="wallet fl">
            <span class="walletTtile">{{getUserInfo.balance}}</span>
          
             <span class="walletfONT">钱包</span>

          </div>
          
         <!--头像,query:{title:'收货地址'}-->
           <router-link :to="{path:'/set',query:{title:'我的资料'}}">
                <div class="setBoxportrait">
                  <img :src='getUserInfo.portrait'/>

                </div>
           </router-link>
          <div class="wallet fr">
            <span class="walletTtile">{{getUserInfo.protectionMoney}}</span>
          
             <span class="walletfONT">呐吉金</span>

          </div>
         
       </div>
      <!--名称-->
      <div class="setName">
         <span class="setTitle">{{getUserInfo.realityName}}</span>
          <span class="setNum">{{getUserInfo.phone}}</span>


      </div>
      <!--进度条-->
     
             <div class="progressItemBox" v-if="getUserInfo.isJoin==1">

                        	<div class="progress">
		                         		<!-- 进度条颜色   v-bind:style="{width: widthData}" -->
		            		<div class="progressLoading" id='progressLoading'  :style="{width:widthData+'%'}"></div>
		                         	
		   </div>
                                                      
                                <div class="progressBoxItem">
                                  <span class="fl">{{getUserInfo.totalPrice}}</span>
                                  <span class="progressFont">兑换进度 / 呐吉金</span>
                                  <span class="fr">666</span>

                                </div>
             </div>

   </div>
   <!--我的订单-->
   <div class="orderBox">
      <div class="orderBoxItem">
         <span class="fl orderfont">我的订单</span>
          <span class="fr backBg"><img src="../../commom/img/btnGo.png"/></span>
            <!--<router-link  :to="{path:'/myorder',query:{title:'我的订单'}}">-->
         <span class="fr chaoMore"  @click="setactivINdex(0)">查看更多</span>
            <!--</router-link>-->
         

      </div>
      <!--订单状态-->
      <ul class="orderState">
         <!--<router-link :to="{path:'/myorder',query:{title:'我的订单',activINdex:1}}">-->
        <li @click="setactivINdex(1)">
           <span><img src="../../commom/img/pendingpayment.png"/></span>
           <span>待付款</span>

        </li>
         <!--</router-link>-->
          <!--<router-link :to="{path:'/myorder',query:{title:'我的订单',activINdex:2}}">-->
        <li @click="setactivINdex(2)">
           <span><img src="../../commom/img/pendingdelivery.png"/></span>
           <span>待收货</span>

        </li>
          <!--</router-link>-->

           <!--<router-link :to="{path:'/myorder',query:{title:'我的订单',activINdex:3}}">-->
        <li @click="setactivINdex(3)">
           <span><img src="../../commom/img/completed.png"/></span>
           <span>已完成</span>

        </li>
           <!--</router-link>-->
        <li>
             <router-link :to="{path:'/afterList',query:{title:'退款/售后'}}">
           <span><img src="../../commom/img/refundoraftersale.png"/></span>
           <span>退款/售后</span>
             </router-link>

        </li>
      </ul>

   </div>
  <div class="bgHr"></div>
    <div class="setListBox">
       <ul>
         
         <li>
            <router-link :to="{path:'/withdrawal',query:{title:'提现'}}">
           <span><img src="../../commom/img/putforward.png"/></span>
           <span>提现</span>
            </router-link>
         </li>
          <li>
               <router-link :to="{path:'/bill',query:{title:'我的账单'}}">
           <span><img src="../../commom/img/bills.png"/></span>
           <span>个人账单</span>
               </router-link>
         </li>
          <li @click="grouppurchase">
           <span><img src="../../commom/img/grouppurchase.png"/></span>
           <span>团购</span>
         </li>
          <li @click="grouppurchase">
           <span><img src="../../commom/img/coupon.png"/></span>
           <span>优惠券</span>
         </li>
         
          <li>
            
             <router-link :to="{path:'/management',query:{title:'收货地址'}}">
           <span><img src="../../commom/img/address.png"/></span>
           <span>收货地址</span>
             </router-link>
         </li>
         <a href="tel:02082511517">
          <li>
           <span><img src="../../commom/img/customerservice.png"/></span>
           <span>客服</span>
         </li>
         </a>
              <router-link :to="{path:'/problems',query:{title:'常见问题'}}">
                  <li>
                  <span><img src="../../commom/img/problem.png"/></span>
                  <span>常见问题</span>
                </li>
              </router-link>
                 <router-link :to="{path:'/setMEASKJGH',query:{title:'设置'}}">
          <li>
           <span><img src="../../commom/img/setup.png"/></span>
           <span>设置</span>
         </li>
                 </router-link>
       </ul>
      

    </div>
    </div>
  <Footer />
 
</div>

</template>


<script type="text/ecmascript-6">


import Footer from '../footer/index.vue';

import {getUserInfo} from 'api/login'
  import {commonParams} from 'api/config';
export default {

  //vuex
  // store,
  components: {
   Footer
  },
  data() {
			return {
       getUserInfo:[],
       widthData:0,
       totalPrice:0,
       timerNumState:null

			}
      
		},
    
    computed:{
         
    },
  created(){
   
      this._getUserInfo()
      this.loadingdKh()
     
  },
   mounted() {
	   
     
    },
   methods: {

     //
     
      tartget(){
        var _this=this;
        if(this.$store.state.login.token==''){
                this.$store.dispatch('setredirectPath','/login');
              setTimeout(function(){
                 _this.$router.push({path:'/'})
              },1000)
              }
      },

    grouppurchase(){
        this.$store.dispatch('toast',"功能开发中");

    },

     setactivINdex(a){
      
       this.$store.dispatch('setactivINdex',a);
      this.$router.push({path:'/myorder',query:{title:'我的订单'}})
     },
     //登录
  _getUserInfo(){
    var _this=this;
       getUserInfo( commonParams.searxhshopsParams({token:this.$store.state.login.token})).then((res)=>{
           if(res.data.status==1){
             console.log(res)
             this.getUserInfo=res.data.data
             var phone=this.getUserInfo.phone;
             console.log(phone)
            
             this.$store.dispatch('setphonetkj',phone);
           
            this.totalPrice =res.data.data.totalPrice
           }else{
             setTimeout(function(){
                      _this.$store.dispatch('setredirectPath',_this.$route.path);
                    _this.$router.push({path:'/login'})
                  },100)
            
           }
       
       })
  },
  orderState(a,b){
    //modifyorderState
    

      this.$store.dispatch('modifyorderState',res.data.data.token);
        this.$router.push({path:'/'})
  },
  // 进度条
    loadingdKh(){
    
     
     var _this=this;
      _this.timerNumState=setInterval(function(){
        _this.widthData=(_this.totalPrice/666)*100;
      },500);
    }
  },
    beforeDestroy () {
    clearInterval(this.timerNumState)
  }

}
</script>
<style lang="scss">
@import '../../assets/mysetPersonal'
</style>
