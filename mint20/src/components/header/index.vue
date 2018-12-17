<template>
<div>

  <div class="header">
     <span class="back"></span>
     <span class="title">收货地址</span>

   </div>
</div>



</template>


<script type="text/ecmascript-6">

//  import store from './vuex/store.js'



export default {

  //vuex
  // store,
  components: {
   
  },
  data() {
			return {
      

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

<style lang="scss">

$baseFontSize: 75 !default;
@function rem($px) {
  @return $px / $baseFontSize * 1rem;
}
.header{

  width: rem(750);
  padding: rem(30) 0;
  background-color: #09b980;
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
</style>
