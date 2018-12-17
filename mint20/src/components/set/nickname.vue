<template>
<div class="contentset">
    <!--<headerConmon/>-->
  <!--<div class="header">
     <span class="back"></span>
     <span class="title">修改昵称</span>
     ddfdsf

   </div>-->
 
  <div class="nameBxo">
    <div class="nameBxoItem"> 
     <input type="text" placeholder="请输入要修改的昵称" class="input" v-model="mynane">
     <span class="fr"><img  class="img"
                src='../../commom/img/btn_cancel.png' /></span>


    </div>

  </div>
   <div class="nameBxoItem"> 
    <span class="nameBxoItemFont">昵称不能输入空格，支持数字和下划线</span>


    </div>
   
        <div class="locklogin" @click="savePasswork">保存</div>
</div>

</template>


<script type="text/ecmascript-6">

  
import headerConmon from '../headerConmon/index';

import {updateUserName} from 'api/login'
  import {commonParams} from 'api/config';
export default {

  
    components: {
  headerConmon
  },
  data() {
			return {
     mynane:'',
      

			}
      
		},
    
    computed:{
         
    },
  created(){
      
  },
   mounted() {
	   
     
    },
   methods: {
  savePasswork(){

          let param = new URLSearchParams();
              param.append("token",this.$store.state.login.token);
                param.append("newName",this.mynane);
    updateUserName(param).then((res)=>{
                if(res.data.status==1){
                this.$store.dispatch('toast',"修改昵称成功");
            }else{
               this.$store.dispatch('toast',res.data.message);
            }
    })
  }
  }

}
</script>
<style lang="scss">


.contentset{
  height: 100%;
  background-color: #f5f5f5;

}
.input {
    display: inline;
    height: 0.5rem;
    font-size: 0.37333rem;
    margin-top: -0.1rem;
   
    color: #333;
}
.nameBxoItem{
  padding: rem(0) rem(30);
 .img{
width: rem(29);
height: rem(29);

}
}
.nameBxo{
  width: rem(750);
  background-color: #ffffff;
  padding: rem(42) 0;
  margin-bottom: rem(25);
}
.nameBxoItemFont{
  font-size: rem(26);

  color: #999;
}


</style>
