<template>
<div class="contentbox">
   <!--头部-->
   
  <!--<headerConmon/>-->
   <!--修改列表-->
   <div class="ewditBoxnow">
     <ul>

       <li>
         <span class="ewditBoxFont" >收件人</span>
         <input class="input" type="text" placeholder="请输入姓名" v-model="receiver"/>
         
       </li>
        <li>
          
         <span class="ewditBoxFont">联系方式</span>
         <input class="input" type="text" placeholder="请输入联系方式" v-model="phone"  v-on:input="changeLenth"/>
         
       </li>
        <li @click="button">


 
         <span class="ewditBoxFont" >省市区</span>
         <input class="input" type="text" placeholder="请选择省市区" readonly="readonly"  v-if="!cituState" />
         <span class="input" v-if="cituState" > {{provinceValue ? provinceValue : ''}}
        {{cityValue ? cityValue : ''}}
        {{areaValue ? areaValue : ''}}</span>
         
       </li>
        
        <li>
 
         <span class="ewditBoxFont">详细地址</span>
         <input class="input" placeholder="请输入详细地址" v-model="detailAddress"/>
        
       </li>
        <li>
 
         <span class="ewditBoxFont">设为默认地址</span>
        
         <span class="fr switch"><mt-switch v-model="switchvalue"></mt-switch></span>
       </li>
       
     </ul>


   </div>
   <!--省市区-->
    <mt-popup v-model="popupVisible4" position="bottom" modal='true' closeOnClickModal='true'>
      <!---->
      <div class="proCityArea">
        <!--头部标题 switchvalue-->
          <div class="proCityAreaTitle">
            <span class="fl" @click="cancelbuttonnow">取消</span>
             <span class="fr" style="color:#09b980;" @click="cancelbutton">确定</span>


          </div>
               <mt-picker :slots="provinceSlots" @change="provinceChange" class="picker"></mt-picker>
              <mt-picker :slots="citySlots" @change="cityChange" class="picker"></mt-picker>
              <mt-picker :slots="areaSlots" @change="areaChange" class="picker"></mt-picker>

      </div>
    </mt-popup>
 <div class="locklogin" @click="_saveReceiverAddress">保存</div>
   
</div>
</template>
<script type="text/ecmascript-6">
 import {CITY_DATA} from '../../api/city'
import headerConmon from '../headerConmon/index';
import { Toast } from 'mint-ui';
import {saveReceiverAddress} from 'api/editAdress'
export default {

  //vuex
  // store,
  components: {
 headerConmon
 
  },
  data() {
			return {
  switchvalue:false,
  // 省市区属性
  popupVisible4:false,
  cituState:false,
        provinceSlots:[
          {
//            values:this.getProvince()  //页面mounted完毕就加载数据
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
      changeLenth(){
       
           if(this.phone.length>=11){
             //改变状态
          
               
                  this.phone = this.phone.slice(0, 11);
            }
             
            
             
     },
            button(){
        this.popupVisible4 = true
        this.getProvince()
        this.flag = 1
      },
     
      cancelbutton(){
         this.popupVisible4 = false;
         this.cituState=true;
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
            
  _this.$store.dispatch('toast',"收件人姓名不能为空");

            }else if(_this.phone==''){
               
                 _this.$store.dispatch('toast',"收件人联系方式不能为空");

            }else if(_this.provinceValue==''){
               
                 _this.$store.dispatch('toast',"请选择收货地址的省市区");

            }else if(_this.detailAddress==''){
               
                 _this.$store.dispatch('toast',"详细地址不能为空");

            }else{
              //上述可优化
             
                        this.receiverAddress.receiver=this.receiver;
                  this.receiverAddress.phone=this.phone;
                  this.receiverAddress.pro=this.provinceValue;//省
                  this.receiverAddress.city=this.cityValue;//市
                  this.receiverAddress.area=this.areaValue;//区
                  this.receiverAddress.detailAddress=this.detailAddress;
                    if(this.switchvalue){
                          this.receiverAddress.status=0;
                        }else{
                          this.receiverAddress.status=1;
                        }
                              let param = new URLSearchParams();
                  param.append("receiverAddress",JSON.stringify(this.receiverAddress));  
                  param.append("token",this.$store.state.login.token);    

                    saveReceiverAddress(param).then((res)=>{
                      if(res.data.status==1){
                       

                             this.$store.dispatch('toast',res.data.message);


                      setTimeout(function(){

                          _this.$router.push({path:'/management'})

                      },1000)

                      }else{
                          this.$store.dispatch('toast',res.data.message);
                      }
                      
                    }) 
            }
       
               
                
                

                
        }
    
   }
  

}
</script>

<style  lang="scss">
 @import '../../assets/adress';
</style>
