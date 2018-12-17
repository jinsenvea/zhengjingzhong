<template>
<div class="sehtdsa">
     <!--头部-->
    <!--<headerConmon/>-->

   <div class="setboxnwd" id='setboxnwd'>
     <ul>
      
         <router-link :to="{path:'/feedback',query:{title:'意见反馈'}}">
        <li>
         <span class="setMTitle fl ">意见反馈</span>
        <div class="fr">
            
          <span class="fr bghngo "><img  class="" src="../../commom/img/btnGo.png"/></span>
         </div>
        
       </li>
       
         </router-link>
            <router-link :to="{path:'/aboutUs',query:{title:'关于我们'}}">
              <li>
              <span class="setMTitle fl ">关于我们</span>
              <div class="fr">
                  
                <span class="fr bghngo "><img  class="" src="../../commom/img/btnGo.png"/></span>
              </div>
              
            </li>
       
         </router-link>
       
     </ul>
    
   </div>
   <div class="exitBox" @click="exitUser">退出帐号
   </div>

</div>
  

</template>


<script type="text/ecmascript-6">
import {exitUser} from 'api/index'
  import {commonParams} from 'api/config';
import headerConmon from '../headerConmon/index';



export default {

  //vuex
  // store,
  components: {
  headerConmon
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
     exitUser(){
       exitUser(commonParams.searxhshopsParams({
         token:this.$store.state.login.token
        })).then((res)=>{
          if(res.data.status==1){
            console.log(res)
             this.$store.dispatch('setToken',"");
          
            this.$store.dispatch('setredirectPath','');
            this.$store.dispatch('steproductID'," ");
            this.$router.push({path:"/login"})
                     
          }
       })
     }
         
  }

}
</script>
<style lang="scss">

@import '../../assets/set';

.exitBox{
width: rem(750);
border-top: 1px solid #e5e5e5;
border-bottom: 1px solid #e5e5e5;
color: #ff6666;
font-size:0.37333rem;
text-align: center;
padding:0.42667rem 0;
margin-top: 0.38rem;
background-color: #fff;
}
#setboxnwd{
  ul li{
    width: 100%;
    margin: 0;
    .setMTitle {
      margin-left: rem(30);
    }
  }
}
</style>
