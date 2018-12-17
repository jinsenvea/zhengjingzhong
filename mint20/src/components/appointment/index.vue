<template>
<div class="contentbox">
   <!--头部-->
    <!--<headerConmon/>-->

   <!--修改列表-->
   <div class="ewditBoxnow">
     <ul>
  <!--username:'',
        userPhone:'',
        detail:'',
        classificatiob:'' -->
       <li>
         <span class="ewditBoxFont" >姓名</span>
         <input class="input" type="text" placeholder="请输入姓名" readonly="readonly" v-model="username"/>
         
       </li>
         <li>
         <span class="ewditBoxFont" >电话</span>
         <input class="input" type="text" placeholder="请输入姓名" readonly="readonly" v-model="userPhone" />
         
       </li>
        <li>
 
         <span class="ewditBoxFont">会面时间</span>
         <input class="input" placeholder="" readonly="readonly" v-model="appointmentTime"/>
       
       </li>
          
       
        <li>
 
         <span class="ewditBoxFont">详细地址</span>
         <input class="input" placeholder="请输入详细地址" readonly="readonly" v-model="detail"/>
       
       </li>
        
        <li>
 
         <span class="ewditBoxFont">分类名</span>
         <input class="input" placeholder="请输入详细地址"  readonly="readonly" v-model="classificatiob"/>
       
       </li>
       
     </ul>


   </div>
  
   


     <div class="sucehappioh">

       <span @click="suecjasg">确定</span>
         <span @click="sucehappiohShowState=true">取消</span>
     </div>
     <!--弹出-->
     <div class="sucehappiohShow" v-if="sucehappiohShowState">
        <div class="sucehappiohShowTitle">取消原因</div>
          <input class="input" placeholder="请输入原因" v-model="remark" />
          <div class="sucehappiohShowSure">
            <span @click="cancleRecycleOrderinfo">确定</span>
             <span @click="sucehappiohShowState=false">取消</span>

          </div>

     </div>
      <div class="sucehShowshdskh" v-if="sucehappiohShowState">
        

     </div>
</div>
</template>
<script type="text/ecmascript-6">
 import {CITY_DATA} from '../../api/city'

import headerConmon from '../headerConmon/index';
import {getRecycleOrderinfoById,cancleRecycleOrderinfo,recycleOrderinfoComplete} from 'api/classification'
 import {commonParams} from 'api/config';
 
 //
export default {

  //vuex
  // store,
  components: {
 headerConmon
 
  },
  data() {
			return {
        recycleCondition:{

        },
        sucehappiohShowState:false,
        recycleConditionlist:[],
        username:'',
        userPhone:'',
        detail:'',
        classificatiob:'',
        remark:'',
        appointmentTime:''
       
			}
      
		},
    watch:{
     
    },
    
    computed:{
      
    },
  created(){
   
this.getRecycleOrderinfoById()
  },
   mounted() {
	  
     
    },
   methods: {
     suecjasg(){
         this.recycleCondition.recycleId= commonParams.getUrlKey("recycleId")
         this.recycleCondition.recycleStatus=3
        let param = new URLSearchParams();
            param.append("recycleCondition",JSON.stringify(this.recycleCondition));
       recycleOrderinfoComplete(param).then((res)=>{
        if(res.data.status==1){


                
        this.$store.dispatch('toast',res.data.message);
              
                  

               }else{
                   this.$store.dispatch('toast',res.data.message);
               }
       })  


     },
    
// 取消
     cancleRecycleOrderinfo(){
       var _this=this;
        this.recycleCondition.recycleId= commonParams.getUrlKey("recycleId")
        //recycleStatus
         this.recycleCondition.recycleStatus=4
          this.recycleCondition.remark=this.remark
        let param = new URLSearchParams();
            param.append("recycleCondition",JSON.stringify(this.recycleCondition));
           cancleRecycleOrderinfo(param).then((res)=>{
             console.log(res)
               if(res.data.status==1){
this.sucehappiohShowState=false

                 setTimeout(function(){
_this.$store.dispatch('toast',res.data.message);
                 },800)
                  

               }else{
                   this.$store.dispatch('toast',res.data.message);
               }

           })
     },
     getRecycleOrderinfoById(){
       this.recycleCondition.recycleId= commonParams.getUrlKey("recycleId")
      

        let param = new URLSearchParams();
            param.append("recycleCondition",JSON.stringify(this.recycleCondition));
       getRecycleOrderinfoById(param).then((res)=>{
         if(res.data.status==1){
        
console.log(res.data.data)
           this.username=  res.data.data.userName
         

          this.userPhone=  res.data.data.userPhone
          this.detail=  res.data.data.plot+  res.data.data.detailAddress
          this.appointmentTime=res.data.data.appointmentTime
         console.log(res.data.data.recycleCategory)

         
for(var i=0;i< res.data.data.recycleCategory.length;i++){
 
  this.classificatiob+= res.data.data.recycleCategory[i].cateName+','
}
 
 this.classificatiob=this.classificatiob.substring(0,this.classificatiob.length-1)

         // this.classificatiob= res.data.data.userPhone
       
         

         }
         
       })

     }
    
             
 
    
   }
  

}
</script>

<style  lang="scss">

 @import '../../assets/adress';
  @import '../../assets/productDetail';
  .sucehappiohShowSure{
   

    width: 100%;
    border-top: 1px solid #eeeeee;
  text-align: center;
    margin-top: 2.5rem;
     input{
      padding-top: 0.5rem;
    }
    span{
      display: inline-block;
      width: 30%;
     
      height: 0.95rem;
      text-align: center;
      line-height: 0.95rem;
      font-size: 0.42rem;
      border: 1px solid  #09b980;
     color: #09b980;
      margin-top: 0.45rem;
      border-radius: 0.3rem;
    }
  }
 .sucehappioh{
   width: 10rem;
   text-align: center;
   margin-top: 1rem;
   span{
     width: 3rem;
     display: inline-block;
     border: 1px solid  #09b980;
     color: #09b980;
     padding: 0.3rem;
     font-size: 0.4rem;
     cursor: pointer;
     border-radius: 2rem;
   }

 }
 .sucehShowshdskh{
   width: 100%;
   height: 100%;
   background-color: #000;
   z-index: 50;
   position: fixed;
   left: 0;
   top: 0;
   opacity: 0.3;
 }
 .sucehappiohShow{
   width: 8rem;
   height: 6rem;
   position: fixed;
   z-index: 60;
   background-color: #fff;
   margin-left: -4rem;
   margin-top: -3rem;
   left: 50%;
   top:45%;
   border-radius: 0.2rem;

 }
 .sucehappiohShowTitle{
   width: 100%;
   height: 0.4rem;
   text-align: center;
   font-size: 0.42rem;
   color: #333;
 padding: 0.4rem 0;
 }
</style>
