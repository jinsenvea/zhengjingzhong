<template>
 <!--底部-->
        <div class="footerHome">

            <ul>

               <router-link :to="{name:'home'}" tag="li" exact>
                    <span class="icon-home"></span>
                    <span class="footeFont">首页</span>
                   </router-link>
                  <router-link :to="{name:'shoppingCart'}" tag="li" exact>
                    <span class="icon-shopcart"></span>
                    <span class="footeFont">购物车</span>
                  </router-link>
                  <router-link :to="{name:'myset'}" tag="li" exact>
                  <span class="icon-set"></span>
                    <span class="footeFont">我的</span>
                  </router-link>
            </ul>
        </div>

</template>


<script type="text/ecmascript-6">
export default {

  //vuex
  // store,
  components: {
   
  },
  data() {
			return {
       
 //切换底部图标
      activeState:false,
			}
      
		},
    
    computed:{
         
    },
  created(){

  },
   mounted() {
	   
     
    },
   methods: {
    
  }

}
</script>

<style scope  lang="scss">
@import '../../commom/style.css';

$baseFontSize: 75 !default;
@function rem($px) {
  @return $px / $baseFontSize * 1rem;
}
// 底部
    .footerHome{
            position: fixed;
    bottom: 0;
    background-color: #fff;
    z-index: 20;
        width: rem(750);
       padding:rem(15)  0;
       overflow: hidden;
      -moz-box-shadow:0px -2px 14px #F0F0F0; 
      -webkit-box-shadow:0px -2px 14px #F0F0F0; 
      box-shadow:0px -2px 14px #F0F0F0;
      ul li{
          width: 33.3%;
          text-align: center;
         
          float: left;
          list-style: none;
           
          
            span{
                display: block;
                font-size: rem(43);
                color: #2c2c2c;
                
            }
           
            .footeFont{
                
                font-size: rem(22);
                margin-top: rem(11);
                color: #2c2c2c;
                }
      }
       ul li.router-link-active{
            span{
                  color: #09b980;

            }
         
           }
    }
</style>
