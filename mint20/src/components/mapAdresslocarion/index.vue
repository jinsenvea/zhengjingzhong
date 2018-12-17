<template>
<div>
<!--搜素框-->
   
        <div id='allmap' style=""></div>  
        <div class="p">经度{{jindu}}</div>
          <div class="p">纬度{{weidu}}</div>
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
        jindu:'',
        weidu:''

  
			}
      
		},
   
    
    computed:{
         
    },
  created(){
    

  
  },
   mounted() {
 this.mapaDress()
  
   



},
  
   methods: {

      mapaDress(){
        var _this=this;
        var map = new BMap.Map('allmap');
      var point = new BMap.Point(116.331398,39.897445);
      map.centerAndZoom(point,12);

      var geolocation = new BMap.Geolocation();
      // 开启SDK辅助定位
      geolocation.enableSDKLocation();
      geolocation.getCurrentPosition(function(r){
      
        if(this.getStatus() == BMAP_STATUS_SUCCESS){
          var mk = new BMap.Marker(r.point);
          map.addOverlay(mk);
          map.panTo(r.point);
           _this.test(r.point);

       
  _this.jindu=r.point.lng;
        _this.weidu=r.point.lat
              
        }
        else {
          
        
        }        
      });
      },
    test(point){
      var _this=this;

        var geoc = new BMap.Geocoder();
        geoc.getLocation(point, function(rs){
      
          var addComp = rs.addressComponents;
          
      _this.adress=addComp.city
       _this.$store.dispatch('setcity',addComp.city);
     
         
     

     });


    }
      
 
  
   }
}
</script>

<style  lang="scss">
.p{
  padding: 1rem;
}
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
