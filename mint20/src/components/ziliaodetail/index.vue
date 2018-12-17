<template>
<div class="contentbox">
   <!--头部-->
    <!--<headerConmon/>-->

   <!--修改列表-->
   <div class="ewditBoxnow">
     <ul>

       <li>
         <span class="ewditBoxFont" >姓名</span>
         <input class="input" type="text" placeholder="请输入姓名" v-model="lityName"/>
         
       </li>
          
        <li @click="popup(true)">
 
         <span class="ewditBoxFont">年龄段</span>
         <input class="input" placeholder="请选择你的年龄段" readonly="readonly" v-model="ageNum"/>
         <span class="fr btnGo"></span>
       </li>
        <li @click="button">


 
         <span class="ewditBoxFont" >省市区</span>
         <input class="input" type="text" placeholder="请选择省市区" readonly="readonly"  v-if="!cituState" />
         <span class="input" v-if="cituState" > {{provinceValue ? provinceValue : ''}}
        {{cityValue ? cityValue : ''}}
        {{areaValue ? areaValue : ''}}</span>
         <span class="fr btnGo"></span>
       </li>
       <li  @click="popupArea(true)">
 
         <span class="ewditBoxFont">小区</span>
         <input class="input" placeholder="请选择你的所在的小区"  readonly="readonly" v-model="areaNumNow"/>
         <span class="fr btnGo"></span>
       </li>
        <li>
 
         <span class="ewditBoxFont">详细地址</span>
         <input class="input" placeholder="请输入详细地址" v-model="detailAddress"/>
       
       </li>
       
     </ul>


   </div>
   <!--省市区-->
    <mt-popup v-model="popupVisible4" position="bottom" modal='true' closeOnClickModal='true'>
      <!---->
      <div class="proCityArea">
        <!--头部标题 switchvalue-->
          <div class="proCityAreaTitle">
            <span class="fl" @click="cancelbuttonnow" >取消</span>
             <span class="fr" style="color:#09b980;" @click="cancelbutton">确定</span>


          </div>
               <mt-picker :slots="provinceSlots" @change="provinceChange" class="picker"></mt-picker>
              <mt-picker :slots="citySlots" @change="cityChange" class="picker"></mt-picker>
              <mt-picker :slots="areaSlots" @change="areaChange" class="picker"></mt-picker>

             

      </div>
    </mt-popup>
    <!--年龄段-->
     
    <mt-popup v-model="popupAgeNum"  position="bottom" modal='true' closeOnClickModal='true'>
  <slot>
     <div class="addressListBox">
          <div class="addressList">
                <!--标题-->
             <div class="adressTitle">

               <span class="font">请选择年龄段</span>
               <span class="adressRight">
                 <img  @click="popup(false)" class="img"
                src='../../commom/img/btn_cancel.png' /></span>
                    <ul class="addressAgeBox">
                      <li  v-for="(item,index) in ageList" :key="index" 
                      :class="regAitive==index?'regAitive':'regAitiveNormal'"
                       @click="addressAgeBox(index,item.age)"
                      >

                        {{item.age}}
                      </li>
                      
                    </ul>
                   

             </div>

          </div>
      
    </div>
  </slot>
        
</mt-popup>
<!--选择小区-->
 
    <mt-popup v-model="popupAreanow"  position="bottom" modal='true' closeOnClickModal='true'>
  <slot>
     <div class="addressListBox">
          <div class="addressList">
                <!--标题-->
             <div class="adressTitle">

               <span class="font">请选择所在小区</span>
               <span class="adressRight">
                 <img  @click="popupArea(false)" class="img"
                src='../../commom/img/btn_cancel.png' /></span>
                   <!--<mt-picker :slots="areaListNow" @change="onValuesChange"></mt-picker>  areaListNow-->
                   <ul class="areaListBoxName">
                     <li  v-for="(item,index) in  areaListNow" :key="index" 
                      :class="areaListNowIndex==index?'regAitive':'regAitiveNormal'"
                       @click="addressAreaBox(index,item)"
                      >
          {{item}}
                     </li>

                   </ul>
                   

             </div>

          </div>
      
    </div>
  </slot>
        
</mt-popup>


     <div class="locklogin" @click="savePasswork">确定</div>
</div>
</template>
<script type="text/ecmascript-6">
 import {CITY_DATA} from '../../api/city'

import headerConmon from '../headerConmon/index';
import {getPolt,addweixinopenid} from 'api/editAdress'
 import {commonParams} from 'api/config';
export default {

  //vuex
  
  // store,
  components: {
 headerConmon
 
  },
  data() {
			return {
        lityName:'',
ageNum:'',
areaNum:'',
areaNumNow:'',
popupAreanow:false,
detailAddress:'',
  switchvalue:false,
  popupAgeNum:false,
  // 省市区属性
  popupVisible4:false,
  cituState:false,
  areaListNow: [ ],
  regAitive:0,
  areaListNowIndex:0,
  ageList:[{age:'20岁收下'},{age:'20-30'},{age:'30-40'},{age:'40-50'},{age:'50以上'}],
        provinceSlots:[
          {
//         "20岁收下","20-30","30-40","40-50","50以上"
            values:[]
          }
        ],
        
       
        citySlots:[
          {
            values:[]
          }
        ],
        areaSlots:[
          {
            values:[]
          }
        ],
        flag:0,//解决mounted完毕不存在数据所有values找不到，会报错的问题，用一个标识控制。
        provinceValue:'',
        cityValue:'',
        areaValue:'',
        receiver:'',//收货人
        phone:'',//收货人电话
       
        detailAddress:'',//收货人电话
        status:0,
        // 新增地址需要的对象
        receiverAddress:{
          "receiver": "string",
          "phone": "string",
          "area": "string",
          "city": "string",
          "detailAddress": "string",
          "plot": "string",
          "pro": "string",
          "status": 0
        }
			}
      
		},
    watch:{
      provinceValue(v){
        this.citySlots[0].values = this.city
      },
      cityValue(v){
        this.areaSlots[0].values = this.area
      }
    },
    
    computed:{
      city(){
        let city = {}
        let cityAll = []
        for (var i in CITY_DATA){
          if (this.provinceValue == CITY_DATA[i].name){
            city = CITY_DATA[i].city
          }
        }
        for (var i in city){
          cityAll.push(city[i].name)
        }
        return cityAll
      },
      area(){
        let city = {}
        let area = {}
        for (var i in CITY_DATA){
          if (this.provinceValue == CITY_DATA[i].name){
            city = CITY_DATA[i].city
          }
        }
        for (var k in city){
          if(this.cityValue == city[k].name){
            area = city[k].area
          }
        }
        return area
      }
    },
  created(){
   

  },
   mounted() {
	  
     
    },
   methods: {
      onValuesChange(picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    },

     //省市区
            button(){
        this.popupVisible4 = true
        this.getProvince()
        this.flag = 1
        //查询小区
       //
       
      },
     
      cancelbutton(){
         this.popupVisible4 = false;
         this.cituState=true;
         this.getPolt()
      },
      cancelbuttonnow(){
         this.popupVisible4 = false;
         this.cituState=false;
          this.provinceValue=''//省
         
      },
      provinceChange(picker,values){
        if (this.flag == 0){
          return
        }
        this.provinceValue = values[0]
      },
      cityChange(picker,values){
        if (this.flag == 0){
          return
        }
        this.cityValue = values[0]
      },
      areaChange(picker,values){
        if (this.flag == 0){
          return
        }
        this.areaValue = values[0]
      },
      getProvince(){
        let pros = []
        for (var i in CITY_DATA){
          pros.push(CITY_DATA[i].name)
        }
//        return pros //页面mounted完毕就加载
        this.provinceSlots[0].values = pros
      },
  //上诉抽离
//此处可以优化
        _saveReceiverAddress(){
         
        var _this=this;
         //  参数
         
          //收件人
            if(_this.receiver==''){
         
                 this.$store.dispatch('toast',"收件人姓名不能为空");


            }else if(_this.phone==''){
               
                    this.$store.dispatch('toast',"收件人联系方式不能为空");
                 

            }else if(_this.provinceValue==''){
               

                   this.$store.dispatch('toast',"请选择收货地址的省市区");

            }else if(_this.detailAddress==''){
              
                  this.$store.dispatch('toast',"收件人详细地址");

            }else{
              //上述可优化
             
                        this.receiverAddress.receiver=this.receiver;
                  this.receiverAddress.phone=this.phone;
                  this.receiverAddress.pro=this.provinceValue;//省
                  this.receiverAddress.city=this.cityValue;//市
                  this.receiverAddress.area=this.areaValue;//区
                  this.receiverAddress.detailAddress=this.detailAddress;
                    if(this.switchvalue){
                          this.receiverAddress.status=1;
                        }else{
                          this.receiverAddress.status=0;
                        }
                              let param = new URLSearchParams();
                  param.append("receiverAddress",JSON.stringify(this.receiverAddress));  
                  param.append("token",this.$store.state.login.token);    

                    saveReceiverAddress(param).then((res)=>{
                      if(res.data.status==1){
                         
                      this.$store.dispatch('toast',res.data.message);
                      }
                      
                    }) 
            }
       
               
                
                

                
        },

     addressAgeBox(a,b){
          this.regAitive=a;
          this.ageNum=b
          this.popupAgeNum=false



     },
       addressAreaBox(a,b){
         this.areaListNowIndex=a
 this.areaNumNow=b
 this.popupAreanow=false

       },

        
        savePasswork(){
          var _this=this;

        
          addweixinopenid(commonParams.searxhshopsParams({
          phone: this.$route.query.phone,
          password: this.$route.query.password,
          province: this.provinceValue,
          city:this.cityValue,
          district: this.areaValue,
          plot:this.areaNumNow,
          addrss: this.detailAddress,
          realityName:this.lityName,
          openid:this.$store.state.pay.wxOpenId,
          age: this.regAitive
        })).then((res)=>{
          if(res.data.status==1){
           
             if(this.$store.state.pay.redirectPath!=''&&this.$store.state.pay.redirectPath!=null){
                _this.$store.dispatch('toast',"恭喜你补齐资料成功");

                setTimeout(function(){
                       _this.$store.dispatch('setToken',res.data.data.token);
                        _this.$router.push({path:_this.$store.state.pay.redirectPath})
                 },800)
               
              }else{
                 _this.$store.dispatch('toast',"恭喜你补齐资料成功");


                     setTimeout(function(){
                       _this.$router.push({path:'/'})
                 },800)
                          
              }

               
                

          }else{
              _this.$store.dispatch('toast',res.data.message);
          }
           
          })
          
        },
        popup(a){
this.popupAgeNum=a

// this.ageNum
        },
        popupArea(a){
this.popupAreanow=a
        },
        getPolt(){

       
          getPolt(commonParams.searxhshopsParams({
        province:this.provinceValue,
        city: this.cityValue,
        district: this.areaValue
          })).then((res)=>{
            console.log(res)

            if(res.data.status==1){
      this.areaListNow=res.data.data
            
            }
          })
        }

             
 
    
   }
  

}
</script>

<style  lang="scss">

 @import '../../assets/adress';
  @import '../../assets/productDetail';
  .addressAgeBox{
    width: rem(700);
    margin: rem(80) auto;
    margin-left: rem(44);
    overflow: hidden;
    li{
     
      width: rem(160);
      height: rem(63);
      text-align: center;
      line-height: rem(63);
      margin-right: rem(60);
      border-radius: rem(10);
     
      font-size: rem(30);
      float: left;
      margin-bottom: rem(40);

    }

  }
  .regAitiveNormal{
     border: 1px solid #d2d2d2;
       color: #000;
  }
  .regAitive{
    background-color: #3ac799;
    color: #fff;
    border: 1px solid transparent;
  }
  .areaListBoxName{
      width: rem(700);
      height: rem(450);
    margin: 0 auto;
    margin-top: rem(50);
   
    overflow-x: hidden;
    overflow-y: auto;
    li{
        border-radius: rem(10);
     padding: rem(15); 
     margin-bottom: rem(20);
    
     width: 40%;
     font-size: rem(20);
     text-align: center;
     float: left;
    }
  }
 .areaListBoxName li:nth-of-type(odd){
   float: left;
 }
  .areaListBoxName li:nth-of-type(even){
   float: right;
 }
</style>
