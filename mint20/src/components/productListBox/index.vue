<template>
<div>
   <!---->
   <!---->
     <!--<headerConmon/>-->
     <div class="prodlistBoxItemHeader">
       <!--<div class="back" @click="routerback" style=""></div>-->
                  <div class="prodlistBoxItem">
            <img :src='this.$route.query.productUrl'/>

          </div>

     </div>
      <!--<div class="back"></div>-->
   
   <!--产品列表-->
      <listings :list="list" />


</div>



</template>


<script type="text/ecmascript-6">

import headerConmon from '../headerConmon/index';

import listings from "../classification/listings.vue";
import {getWeekHotSaleById} from 'api/index'
export default {


  data() {
			return {
      list:[],
       productVo:{
           bannerId:this.$route.query.productId,
            pageStar:1,//页码
             pagesize:50//条数
          },

			}
      
		},
    
    computed:{
         
    },
  created(){
this._getList()
  },
   mounted() {
	   
     
    },
   components: {
   headerConmon,
   listings
  },
       methods: {
         routerback: function () {
      this.$router.back(-1)
            },
          _getList(){

             if(this.$store.state.login.city!=''){
      this.productVo.city=this.$store.state.login.city
      }else{
           this.productVo.city='广州市'
      }
    
     var _this=this;
     let param = new URLSearchParams();
          param.append("productVo",JSON.stringify(this.productVo));
      getWeekHotSaleById(param).then((res)=>{
              if(res.data.status==1){
              
               
                this.list= res.data.data;
                console.log( this.list)
                
              }
             })
          

      }
       }
  

}
</script>

<style lang="scss">
 @import '../../assets/productDetail';
.prodlistBoxItem{
  width: rem(750);
 
  img{
    width: 100%;
     max-height: 4.26667rem;
  }
}
.prodlistBoxItemHeader{
  width: rem(750);
 
 
  overflow: hidden;

  position: relative;
  text-align: center;
  color: #333;font-size: rem(32);

}
</style>
