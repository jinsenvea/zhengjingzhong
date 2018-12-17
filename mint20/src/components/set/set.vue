<template>
<div class="sehtdsa">
     <!--头部-->
    <!--<headerConmon/>-->

   <div class="setboxnwd">
     <ul>
       <li>
         
         <span class="setMTitle fl firstbghngo">头像</span>
        <div class="fr">
            <span class="imgShow">
                <input  class="headerFile" type="file" name="file" id="file" @change="update($event)" />
           <img  class="" ref='headeImg' :src="getUserInfo.portrait"/>
           
         </span>
          <span class="fr bghngo firstbghngo"><img  class="" src="../../commom/img/btnGo.png"/></span>
         </div>
        
       </li>
         <router-link :to="{path:'/nickname',query:{title:'修改昵称'}}">
        <li>
         <span class="setMTitle fl ">昵称</span>
        <div class="fr">
            <span class="fonName">{{getUserInfo.realityName}}</span>
          <span class="fr bghngo "><img  class="" src="../../commom/img/btnGo.png"/></span>
         </div>
        
       </li>
         </router-link>
        <router-link :to="{path:'/ModifyPhone',query:{title:'绑定手机号',phone:getUserInfo.phone}}">
       <li>
           
         <span class="setMTitle fl ">绑定手机号</span>
        <div class="fr">
           <span class="fonName">{{getUserInfo.phone}}</span>
          <span class="fr bghngo "><img  class="" src="../../commom/img/btnGo.png"/></span>
         </div>
        
       </li>
         </router-link>
          <router-link :to="{path:'/forgetPasswork',query:{title:'修改密码',phone:getUserInfo.phone}}">
        <li >
         
         <span class="setMTitle fl ">修改密码</span>
        <div class="fr">
           <span class="fonName"></span>
          <span class="fr bghngo "><img  class="" src="../../commom/img/btnGo.png"/></span>
         </div>
         
       </li>
        </router-link>
          <router-link @click="changepasswordState" :to="{path:'/management',query:{title:'收货地址'}}">
            <li>
              
              <span class="setMTitle fl ">收货地址</span>
              <div class="fr">
                <span class="fonName"></span>
                <span class="fr bghngo "><img  class="" src="../../commom/img/btnGo.png"/></span>
              </div>
              
            </li>
         </router-link>
      
     </ul>
    
   </div>

</div>
  

</template>


<script type="text/ecmascript-6">
import {getUserInfo,uploadImg} from 'api/login'
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
       getUserInfo:[]

			}
      
		},
    
    computed:{
         
    },
  created(){

  },
   mounted() {
	   this._getUserInfo()
     
    },
   methods: {
          //登录
      _getUserInfo(){
          getUserInfo( commonParams.searxhshopsParams({token:this.$store.state.login.token})).then((res)=>{
              if(res.data.status==1){
                console.log(res)
                this.getUserInfo=res.data.data
              }
          
          })
      },
      changepasswordState(){
        console.log(66666666)
           this.$store.dispatch('changepasswordState',true);
      },
       //上传头像
     update(e){
       
           let file = e.target.files[0];             
          let param = new FormData(); //创建form对象  
          param.append('multipartFile',file,file.name);//通过append向form对象添加数据 
            param.append('token',this.$store.state.login.token);//通过append向form对象添加数据   
          param.append('chunk','0');//添加form表单中其他数据  
            uploadImg(param).then((res)=>{
              console.log(res)
             if(res.data.status==1){
               this.$refs.headeImg.src=res.data.data;
             }

              
            })
        
        
     }
  }

}
</script>
<style lang="scss">

@import '../../assets/set';
.headerFile {
  position: absolute;
  font-size: 100px;
  right: 0;
  top: 0;
  opacity: 0;

  filter: alpha(opacity=0);
  cursor: pointer;
  border: 1px solid red;
   width: rem(750);
    height: 1.06667rem;
}
.imgShow{
  position: relative;
     
}
</style>
