<template>
<div>
<!--搜素框-->
        <div class="mymapaDRESSbOX">
          <input type="text" placeholder="请搜索呐吉岛地址" class="searchIpt" />
          <img src="../../assets/images/search1_03.jpg" alt="" class="seachImg">

      </div>
      <!--地图显示位置-->
      <div class="mylocationnow">
        <div class="">

        </div>

      </div>
</div>
</template>
<script type="text/ecmascript-6">
import {login,verifyPhone,phoneLogin} from 'api/login'
import {commonParams,ERR_OK} from 'api/config'
import {hexMD5} from '../../commom/js/md5'

import md5 from "md5";


export default {

  
  data() {
			return {
  
			}
      
		},
   
    
    computed:{
         
    },
  created(){
    
 
  
  },
  
   methods: {
    

    
   }
  ,
  beforeDestroy () {
   
  }

}
</script>

<style  lang="scss">
.mylocationnow{
  border: 1px solid red;
  width: rem(692);
  height: rem(172);
  background-color: #fafafa;
  position: absolute;
  margin-left: rem(-(692/2));
  z-index: 20000;
  left: 50%;
  bottom: rem(20);
}
.mymapaDRESSbOX{
   width:rem(750);
         position: relative;
        background:#fff;
        padding:rem(16) 0.4rem;
       
        box-sizing: border-box;
        justify-content:space-between;
        align-items:center;
        background-color: #09b980;
        text-align: center;
        .seachImg{
            width: rem(32);
            height: rem(30); ;
            position: absolute;
            top: rem(38);
            left: rem(180);
        }
      
  
}
.searchIpt{
            width:8.25rem;
            height:rem(70);
            border-radius:rem(5);
            background-color: #f6f6f6;
           font-size: rem(30);
           
           color: #b9b9b9;
            border:none;
            padding-left: rem(160);
            box-sizing: border-box;
        }
</style>
