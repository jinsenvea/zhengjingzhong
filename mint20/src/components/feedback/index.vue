<template>
 <!--意见反馈-->
       <div>
          <!--<headerConmon/>-->
        <div class="sdakjBOx">
           <textarea class="dsakjgjasghjngrin" rows="10" cols="30"
         @input="descInput"  @focus='tesagdhj' v-model="textareaText"
         maxlength="200">
         
       
         </textarea>
           <span class="remnantTsdsahkj">{{remnant}}/200</span>
        </div>
                      
      <div class="locklogin" @click="addFeedbackForm">提交</div>
       </div>
           
</template>


<script type="text/ecmascript-6">
import headerConmon from '../headerConmon/index';
import {addFeedbackForm} from 'api/index'
  import {commonParams} from 'api/config';
export default {

  //vuex
  // store,
  components: {
   headerConmon
  },
  data() {
			return {
        //切换底部图标
      activeState:false,
      textareaText:"请输入您的意见或建议",
      remnant:0
			}
      
		},
    
    computed:{
         
    },
  created(){

  },
   mounted() {
	   
     
    },
   methods: {
     descInput(){
   
      this.remnant =  this.textareaText.length;
      
     },
     tesagdhj(){
        if(this.textareaText=="请输入您的意见或建议"){
         this.textareaText=''
       }
     },
     addFeedbackForm(){
       var _this=this;

       addFeedbackForm(commonParams.searxhshopsParams({
         token:this.$store.state.login.token,
         clienteleIder:this.textareaText
        })).then((res)=>{
          if(res.data.status==1){
              this.$store.dispatch('toast',"感谢你的宝贵意见");
                setTimeout(function(){
                  _this.$router.push({path:"/setMEASKJGH",query:{title:"设置"}})
        },800)
          }
         

       })
     }
    
  }

}
</script>

<style scope  lang="scss">
@import '../../assets/passwork';
.dsakjgjasghjngrin{
  margin: rem(20) auto;
  width: rem(605);
  height: rem(478);
  background-color: #eeeeee;
  border: none;
  display: block;
  color: #999;
  font-size: rem(28);
  border-radius: rem(20);
  padding: rem(30);
}
.sdakjBOx{
  overflow: hidden;
  position: relative;
  padding-top: rem(56);
}
.remnantTsdsahkj{
  position: absolute;
  bottom:rem(40);
  right: rem(80);
  color: #999;
  font-size: rem(20);
}
</style>
