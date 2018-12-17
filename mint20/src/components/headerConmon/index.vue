<template>
<div>

  <div class="headerconcom">
     <span class="back" @click="backheader"></span>
     <span class="title" >{{this.$route.query.title}}</span>

   </div>
</div>



</template>


<script type="text/ecmascript-6">





export default {


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
  backheader(){
     this.$router.back(-1)
  }
   
  }

}
</script>

<style lang="scss">


.headerconcom{

  width: rem(750);
     height: 1.2rem;
    line-height: 1.2rem;
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
