<template>
<div>

  <span >
           <input type="button" class="fr codeNorm marginCode"  :class="codeState?'codeDafult':'code'" 
                 v-model="codeMsg" @click="getCode" :disabled="codeDisabled" />
         </span>
</div>



</template>


<script type="text/ecmascript-6">





export default {

  //vuex
  // store,

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

@import '../../assets/passwork';
</style>
