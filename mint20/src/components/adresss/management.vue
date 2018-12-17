<template>
<div>


  
   <!--地址-->
   <div class="editBoxmanhghjg">
      <!--头部-->
       <!--<headerConmon/>-->
          <ul>
            
            <li v-for="(item,index) in getReceiverAddress" :key="index">

                <div class="adressItemBox">
                    <div class="adressItemlist">
                    <div class="first">
                      <span class="fl">{{item.receiver}}</span>
                        <span class="fr">{{item.phone}}</span>
                    </div>
                    <div class="adressItemName">{{item.detailAddress}}
                    </div>
                  </div>
                </div>
              <div class="editCheckBox">
              <span @click="_updateReceiverAddressStatus(item.id,index)">

                  <span class="checkBox fl" :class="checkindex==index?'check':''"></span>
                <span class="chefont fl " >设为默认</span>
              </span>
              
                <span class="fr delGo"  @click="_deleteReceiverAddressById(item.id)"><img src='../../commom/img/icon_delete.png'/>删除</span>
              
                <!--<router-link class="fooSise" :to="{path:'/editadress',query:{title:'新建地址'}}">-->
                  <router-link  class="fr editGo" :to="{path:'/editpassaddress',query:{id:item.id,title:'编辑地址'}}"><img src='../../commom/img/icon_edit.png'/>
                编辑</router-link>
      
              
              </div>
              <div class="hrColor"></div>
            </li>
            
          </ul>

   </div>
   
        <div class="footermangenadreffj" >
          
        <router-link class="foodsdsSise" :to="{path:'/editadress',query:{title:'新建地址'}}">
          
          <span class="addfooteradressdsdasda">+</span> <span>新建地址</span> 
          </router-link>
        </div>
    
</div>
</template>
<script type="text/ecmascript-6">
   
import headerConmon from '../headerConmon/index';
import {getReceiverAddressByUserId,updateReceiverAddressStatus,deleteReceiverAddressById} from 'api/editAdress'
 import {commonParams} from 'api/config';
 import { Toast } from 'mint-ui';
export default {

  //vuex
  // store,
  components: {
  headerConmon
 
  },
  data() {
			return {
              getReceiverAddress:[],
              checkindex:0
			}
      
		},
   
    
    computed:{
         
    },
  created(){

  },
   mounted() {
	   this._getReceiverAddressByUserId();
     
    },
   methods: {
      _getReceiverAddressByUserId(){
        //

            getReceiverAddressByUserId(commonParams.searxhshopsParams({token:this.$store.state.login.token})).then((res)=>{
              console.log(res)
              if(res.data.status==1){
                    this.getReceiverAddress=res.data.data
              }

            })

      },
      _updateReceiverAddressStatus(a,b){
        var _this=this;
            updateReceiverAddressStatus(commonParams.searxhshopsParams({token:this.$store.state.login.token,id:a})).then((res)=>{
              if(res.data.status==1){
                console.log(66666666)
                this.checkindex=b
                                _this.toast("修改默认地址成功")

                }
            })
      },
       toast(a){
         let instance = Toast(a);
        setTimeout(() => {
        instance.close();
        }, 1500);
       }
     ,
     _deleteReceiverAddressById(a){
       deleteReceiverAddressById(commonParams.searxhshopsParams({token:this.$store.state.login.token,id:a})).then((res)=>{
          if(res.data.status==1){
               
              
                                this.toast("删除地址成功")
                                this._getReceiverAddressByUserId()

                }
         
       })
     }

    
   }
  

}
</script>

<style  lang="scss">



.editBoxmanhghjg{
position: relative;
    z-index: 9;
    padding: 0 0 1.63333rem;
    min-height: 100%;
    overflow: hidden;
  ul li{

    .adressItemBox{
 border-bottom: 1px solid #d8d8d8;
 width: rem(750);
 overflow: hidden;
    }
   
    .adressItemlist{
     
       padding: rem(32)  rem(32);

      
    .first{
      font-size: rem(30);
      color: #333;
      overflow: hidden;
      margin-bottom: rem(23);
    }
    .adressItemName{
       font-size: rem(30);
      color: #333;
      height: auto;
      width: 100%;
      text-align: left;
    }
   
    }
    .editCheckBox{
      padding: rem(20) rem(30);
      border-bottom: 1px solid #d8d8d8;
      overflow: hidden;
    }
  }
}
  .checkBox{
    width: rem(38);
    height: rem(38);
    border-radius: 50%;
    display: inline-block;
     margin-right: rem(20) ;
     border: 1px solid #d7d7d7;
    
  }
 //选中
  .check{
    background: url('../../commom/img/checkTrue.png')  center center no-repeat;
     background-size: contain;
      border: 1px solid transparent;
  }
  .chefont{
    color: #333;
    font-size: rem(26);
        margin-top: 0.12rem;
  }
  .editGo{
    margin-top: 0.12rem;
    color: #333;
    img{
      width: rem(29);
      height: rem(29);
      vertical-align: -0.085rem;
      margin-right: 0.2rem;
      margin-top: -0.12rem;
    }
  }
   .delGo{
    margin-top: 0.12rem;
    img{
      width: rem(32);
      height: rem(29);
       vertical-align: -0.08rem;
        margin-right: rem(15);
        margin-left: rem(30);
    }
  }
  .hrColor{
    background-color: #f5f5f5;
    height: rem(20);
  }
  .footermangenadreffj{
    width: rem(750);
    height: rem(99);
    line-height: rem(99);
    text-align: center;
    position: fixed;
    background-color: #09b980;
    bottom: 0;
        z-index: 20;
    color: #fff;
    font-size: rem(30);
  }
  .addfooteradressdsdasda{
    font-size: rem(60);
    vertical-align: -0.1rem;
  }
  .foodsdsSise{
    width: rem(200);
    margin: 0 auto;
    color: #fff;
  }
</style>
