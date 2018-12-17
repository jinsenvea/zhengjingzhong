<template>
<div>

  <div class="loadingNOwgh">

  加载中....请稍后
</div>


</div>

</template>


<script type="text/ecmascript-6">

//  import store from './vuex/store.js'
import {weixinLogin} from 'api/login'
import {commonParams,ERR_OK} from 'api/config'


export default {

  //vuex
  // store,
  components: {
   
  },
  data() {
			return {
      
codeStringMe:commonParams.getUrlKey("code")
			}
      
		},
    
    computed:{
         
    },
  created(){
    this._weixinLoginNew()

  },
   mounted() {

   
     
    },
   methods: {
     
         _weixinLoginNew(){
           var ad=this.codeStringMe;

            this.$store.dispatch('setcodeString',ad);
       var arrCode=[];
     
    arrCode=this.codeStringMe.split("_");
     
  

        weixinLogin(commonParams.searxhshopsParams({
            code:arrCode[0]
          
        })).then((res)=>{
         
          if(res.data.status==1){

          

            if(res.data.data.token!=null && res.data.data.token!=undefined &&res.data.data.token!=''){
               this.$store.dispatch('setToken',res.data.data.token);
              }
             

         this.$store.dispatch('setwxOpenId',res.data.data.openid);
           if(arrCode[1]!=''){
              this.$router.push({path:arrCode[1]})
           }else{
           this.$router.push({path:'/'})
           }
            
        
              

          }

         })
      

     },
   
  }

}
</script>

<style lang="scss">
.loadingNOwgh{
  width: rem(750);
  text-align: center;
  color: #999;
  font-size: rem(32);
  margin-top: rem(240);
}
</style>
