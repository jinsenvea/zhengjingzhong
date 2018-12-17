<template>
<div class="">
  
  <!--轮播-->
   
       <div class="goodsBigBox">

             <mt-swipe  class="myssdsSwiper productDetailList"   :auto="5000">
            <mt-swipe-item v-for="(item,index) in shopList.productImgs" :key="index" style="float:left;">

                <img v-lazy="item.imgPath"/>
            </mt-swipe-item>
            
                
        </mt-swipe>
           <div class="soldproduct" v-if="inventoryState">已售馨</div>
         <div class="back" @click="routerback">

         </div>
         <div class="productDetaiBox">
           <span class="productDetaiTitle">{{shopList.productName}}</span>
             <!--<span class="brandBg"><img src='../../commom/img/brand-01.png' />长寿花</span>-->
           <p><em class="">￥</em><em style="margin:0 0.05rem ;">{{shopList.price}}</em>
               <del v-if="shopList.price!=shopList.priceDiscount">￥{{shopList.priceDiscount}}</del>
           </p>
             <!--配送地址-->
             <div class="addressBox" @click="popup(true)">
               <span class="fl addressFont">送至</span>
               <span class="fl address">{{adress}}</span>
               <span class="fr addressImg"> 
                  <img src='../../commom/img/icon_arrow.png'>
                  </span>


             </div>

         </div>
          <!--返回-->

      <!--产品详情-->
      <div class="productDetaiBoxItem">
            <span class='productBg'><img src="../../commom/img/productBg.png"/></span>
            <div class="productDetaiBoxItemBox" v-html="shopList.productText">
                 {{shopList.productText}}

            </div>


      </div>
    </div>



      <!--底部-->
      <div class="listFooter">
        <ul>
          <li class="share" @click="shaeShareState(true)">
            <span class="imgHeight"> <img class="img" src='../../commom/img/icon_share.png'/></span>
              <span class="fontHeight" >分享</span>
          </li>
           <li class="shareShopping">
              <router-link  
                 :to="{path:'/shoppingCart'}">
            <span class="imgHeight"> <img class="iconShopping" src='../../commom/img/icon_shopping.png'/></span>
           
              <span class="fontShopHeight">购物车</span>
            </router-link>
              <!--<em>{{shopcartLength}}</em>-->
          </li>
           <li class="goShopCart" v-if="!inventoryState" @click="payOrder"> 立即购买

          </li>
          <li class="addShopCart" v-if="!inventoryState" @click="popupAdd(true)"> 加入购物车

          </li>
          <li class="goShopCart" v-if="inventoryState" style="background-color:#999;" > 立即购买

          </li>
          <li class="addShopCart" v-if="inventoryState"  style="background-color:#666;" > 加入购物车

          </li>
          
        </ul>

      


      </div>

 <!--选择地址-->
<mt-popup v-model="popupVisible"  position="bottom" modal='true' closeOnClickModal='true'>
  <slot>
     <div class="addressListBox">
          <div class="addressList">
                <!--标题-->
             <div class="adressTitle">

               <span class="font">配送地址</span>
               <span class="adressRight"><img  @click="popup(false)" class="img"
                src='../../commom/img/btn_cancel.png' /></span>
                    <ul class="adressItem">
                      <li v-for="(item,index) in adressList" :key="index" @click="adressCheck(item,index)" >
                        <span class="fl mapIcon" >
                          <img src='../../commom/img/icon_address.png'/></span>
                        <span class="fl address " style="margin-top:0.06rem;" >{{item.detailAddress}}</span>
                        <span class="fr checkBox" :class="index==adressIndex?'check':''" ></span>
                      </li>
                      

                    </ul>
                   

             </div>

          </div>
            <router-link class="fooSise" :to="{path:'/editadress',query:{title:'新建地址'}}">
        <div class="newAddress">新建地址</div>

  </router-link>
       
     
   
   
    </div>
  </slot>
        
</mt-popup>
<div class="SHARbGKDSJAK" v-if="ShareState" @click="shaeShareState(false)" ></div>
 <div id='allmap' style=""></div>
<!--加入购物车-->
<mt-popup v-model="popupShopcart"  position="bottom" modal='true' closeOnClickModal='true'>
  <slot>
         <div class="showPro">
      <div class="proDetail">
        <div class="imgWrap">
          <img :src="shopItem.productImgUrl" alt="">
        </div>
        <div class="proContent">
          <p class="productName">{{shopItem.productName}}</p>
          <p class="priceWrap">
            <span>￥{{shopList.price}}</span>
            <del v-if="shopList.price!=shopList.priceDiscount">￥{{shopList.priceDiscount}}</del>
          </p>
          <span class="closed"  @click="poShopcart(false)"><img src="../../commom/img/btn_cancel.png" alt=""></span>
        </div>
      </div>
      <div class="countWrap">
        <span class="text">请选择购买数量</span>
        <div class="chooseNumItem">
          <span class="min fl" @click="changeNumber(shopItem,-1)"></span>
      
          <input class="text_box fl" type="text" value="0" disabled v-model="shopItem.productAmount">
          <span class="add fr" @click="changeNumber(shopItem,1)">
          </span>
        
        </div>
      </div>
      <span class="SureBtn" @click="addToCar()" v-if="addPayAndshopCart">加入购物车</span>
       <span class="SureBtn" @click="addToOrder()" v-if="!addPayAndshopCart">确定</span>
      
    </div>
  </slot>
        
</mt-popup>
<!--返回首页-->
  <router-link  :to="{path:'/'}">
     <div class="gobackHomeOrderkld"></div>
      </router-link>

</div>

</template>


<script type="text/ecmascript-6">
import {getProductById,getReceiverAddressByUserId,productIsInventory,weixinconfig}  from 'api/shopcart'
 import {commonParams} from 'api/config';
 import {addShopCat}  from 'api/shopcart'
 import {getUserInfoByToken,getUserInfo}  from 'api/login'

import {updateReceiverAddressStatus} from 'api/editAdress'
export default {

  //vuex
  // store,
  components: {
   
  },
  data() {
			return {
      idExist:false,
      shopList:[],
       curIndex:-1,
      adressIndex:0,
      //选择地址属性
      popupVisible:false,
      popupShopcart:false,
      //库存状态
      inventoryState:false,
      //选择地址属性
      adressList:[],
      //分享属性
      ShareState:false,
       shopcartLength:0,
      //购买确定和选择购物车状态
       addPayAndshopCart:false,
       wxOpenId:"",
      //库存总量
      inventory:0,
      adress:'',
      num:1,
      appId:"",    
			timestamp:"",    
			nonceStr:"",    
			signature:"",
      productId:0,
      adreeefOMT:'',
    
      //购车车对象
       shopItem: {
                productId:"",
                productName: "",
                productPrice: "", //价格
                productImgUrl:'',
                productAmount:1,   //数量
                creationTime: "2018-08-08 11:11:22",
                productState: 1
   
            },
            //判断地址对象参数 
     conditon:{
            province:'',//省
            city:'',//市
            district:'',//区
            garbageBacketName:'',//小区
            productID:''//产品id
          },
       goodsList:[],
      

			}
      
		},
    
  
  created(){
    this.getProductId()
 this._getProductList();
 this._getUserInfo()
//  alert(commonParams.getUrlKey("ce"))
 
  
  },
   mounted() {
	  
   
    },
   methods: {


     getProductId(){
       //获取产品id
       if(this.$route.query.productId){
         this.productId=this.$route.query.productId
       } else if(this.$store.state.pay.productID){
         this.productId=this.$store.state.pay.productID
       }
       else{
          this.productId=commonParams.getUrlKey("productId")
       }
     
     },
     ShareStateCancel(a){
        this.ShareState=a
     },
     shaeShareState(a){
       this.ShareState=a
       this.shareNow();

     },
    //  加入购物车
      addToCar() {
       
        var _this=this;
        if(this.$store.state.login.token!=''){
  
              let param = new URLSearchParams();
                param.append("token",this.$store.state.login.token);
                param.append('context',JSON.stringify(_this.shopItem))
                

                addShopCat(param).then((res)=>{
                
                      if(res.data.status==1){
                     
                          this.popupShopcart=false
                          this.$store.dispatch('toast',res.data.message);
                            
                                      
                      }else if(res.data.status==6){
                         this.popupShopcart=false

                              _this.$store.dispatch('toast',"登录信息过期");
                              setTimeout(function() {
                                 _this.$store.dispatch('setredirectPath',_this.$route.path);
                                    _this.$store.dispatch('steproductID',_this.productId);
                                      _this.$router.push({path:'/login'})
                                
                              },1500);
                        
                      }
                
                })

               }else{
               
               // console.log(this.shopItem)
                //  本地缓存添加
                console.log(this.shopItem)
                  this.$store.dispatch('modifyShopping',this.shopItem);
                  
                  //  this.shopcartLength=this.$store.state.shopCart.goodsList.length
                   this.popupShopcart=false
                       this.$store.dispatch('toast',"添加购物车成功");
                        

                   }
        },
        // 获取商品信息
        _getProductList(){
          var _this=this;
            // 1获取商品信息
           getProductById(commonParams.searxhshopsParams({productId:this.productId}))
           .then((res)=>{
              

               if(res.data.status==1){
              

                 this.shopList=res.data.data
                this.shopItem.productId = res.data.data.id;
                this.shopItem.productPrice = res.data.data.price;
                this.shopItem.productName = res.data.data.productName;
                this.shopItem.productImgUrl = res.data.data.productImgs[0].imgPath;
                  
                     if(this.$store.state.login.token){
                    
                   
                        // 获取默认地址。
                        getReceiverAddressByUserId(commonParams.searxhshopsParams({token:this.$store.state.login.token}))
                        .then((res)=>{
                       
                          if(res.data.status==1){
                           

                      if(res.data.data.length>0){
console.log(333);
                           //  this.adress=res.data.data.pro+res.data.data.city+res.data.data.area+res.data.data[0].detailAddress
                              this.adressList=res.data.data;
                              this.adreeefOMT=res.data.data[0].pro+res.data.data[0].city+res.data.data[0].area;
                             this.adress=res.data.data[0].pro+res.data.data[0].city+res.data.data[0].area+res.data.data[0].detailAddress;
                          if(this.$store.state.login.city!=''){
                           
                            _this.conditon.city=this.$store.state.login.city
                            _this.conditon.productID=_this.productId
                          }else{
                            
                      _this.conditon.province=res.data.data[0].pro
                      _this.conditon.city=res.data.data[0].city
                      _this.conditon.district=res.data.data[0].area
                      _this.conditon.productID=_this.productId
                          }
                             

                                
                                //查询是否存在库存
                              
                               _this.getInventory( _this.conditon);

                      }

         
                             

                         
                           
                          }else{
                            //  this.$store.dispatch('toast',res.data.message);
                            
                          }
                         

                           
                        })
                        // 在确认库存
                        

                     }else{
// 没有登录

                        //  console.log("用户没有登录")
                      // 查询地址判断是否有库存
                      if(this.$store.state.login.city!=''){
                       this.conditon.city= this.$store.state.login.city
                         this.getInventory(this.conditon);

                      }else{
                            this.mapaDress()
                      }
                    
                     
                    
                    }


               }
           })


        },
        // 确认库存
      getInventory(a){
       let param = new URLSearchParams();
            param.append("conditon",JSON.stringify(a));
            productIsInventory(param).then((res)=>{
           
             if(res.data.status==1){
             
               if(res.data.data.inventoryState==0){
                    this.inventoryState=true
               }else{
                //  有库存
                 this.inventory=res.data.data.inventory
                 this.shopItem.productState=1
                
                  this.inventoryState=false
               }

             }

           })

        
      },   


// 百度地图具体位置
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
          
      _this.adress=addComp.province+addComp.city+addComp.district
          _this.conditon.province=addComp.province
          _this.conditon.city=addComp.city
          _this.conditon.district=addComp.district
          _this.conditon.productID=_this.productId
          _this.getInventory( _this.conditon);
         
     

     });


    },

        //
       popup(a){
          this.popupVisible=a
        },
         popupAdd(a){
          this.popupShopcart=a
          this.addPayAndshopCart=true
        },
       
        poShopcart(a){
              this.popupShopcart=false
        },
        adressCheck(a,b){
          this.adressIndex=b;
          this.adress=this.adreeefOMT+a.detailAddress;
         
             this._updateReceiverAddressStatus(a.id);
        },
        //修改默认地址
         _updateReceiverAddressStatus(a){
        var _this=this;
            updateReceiverAddressStatus(commonParams.searxhshopsParams(
              {token:this.$store.state.login.token,
                id:a
              })).then((res)=>{
              if(res.data.status==1){
               this.popupVisible=false
                // this.checkindex=b
                                // _this.toast("修改默认地址成功")

                }
            })
      },
        // 调整数量的方法，flag判断加减
		changeNumber: function (item, flag) {
     
			if (flag > 0) {
				// item数量自增1
      
				item.productAmount++;
      
      
			}
			// 小于0
			else {
				// item数量自减1
				item.productAmount--;
				// 如果数量小于1
				if (item.productAmount < 1)
					// 始终赋值为1，则数量无法小于1
					item.productAmount = 1;
			}
		},
    routerback: function () {
      this.$router.back(-1)
            },
            // 立即购买
       payOrder(){
         
         if(this.$store.state.login.token){
           this.popupShopcart=true
        this.addPayAndshopCart=false

                  
         }else{
          this.$store.dispatch('setredirectPath',this.$route.path);
         this.$store.dispatch('steproductID',this.productId);
          this.$router.push({
            path:'/login'})
        
        //     

         }
        
    },
    // 获取配置文件
    weixinconfig(){
    
        var sharUrl='http://www.najidao.com/#/productDetail?productId='+this.productId;
      weixinconfig(commonParams.searxhshopsParams({url:sharUrl})).then((res)=>{
      

        if(res.data.status==1){


           wx.config({    
			 			debug: false,    
			 			appId:res.data.data.appId,    
			 			timestamp: res.data.data.timestamp,    
						nonceStr:res.data.data.nonceStr ,    
			 			signature:res.data.data.signature,
						jsApiList: [    
							'onMenuShareTimeline',
                'onMenuShareAppMessage'
		                    
			 			]    
          });
          
        }

      })
    },

    // 分享
    shareNow(){
      var _this=this;
        _this.weixinconfig();

         wx.ready(function(){ 
        //调用分享朋友接口    productId:this.$route.query.productId
          wx.onMenuShareAppMessage({
            title: '产品信息', // 分享标题
            desc: '产品信息', // 分享描述
            link: 'http://www.najidao.com/#/productDetail?productId='+_this.productId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: '', // 分享图标
            type: 'link', // 分享类型,music、video或link，不填默认为link
            dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
            success: function () {
            // 用户确认分享后执行的回调函数
            console.log(123);
            },
            cancel: function () {
            // 用户取消分享后执行的回调函数
              console.log(456);
            }
            });
        
	        //调用分享朋友圈接口
            wx.onMenuShareTimeline({
              title: '产品信息', // 分享标题
              link: 'http://www.najidao.com/#/productDetail?productId='+_this.productId, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
              imgUrl: '', // 分享图标
              success: function () {
              // 用户确认分享后执行的回调函数
              },
              cancel: function () {
              // 用户取消分享后执行的回调函数
              }
              });
	        
		
    });
          

 

  },
  

    addToOrder(){
      var _this=this;
      if(this.wxOpenId!=""){
            this.$store.dispatch('delorderlist');
       this.$store.dispatch('setwxOpenId',this.wxOpenId);

      this.shopList.num=this.shopItem.productAmount
      this.$store.dispatch('setorderlist',this.shopItem);
       

     this.$router.push({
            path:'/sureOrder',query:{title:"确定订单"}})

      
     }else{
       _this.popupShopcart=false
        _this.$store.dispatch('toast',"请到登录页用微信登录");
      
        // openid 为空  setwxOpenId  setredirectPath  stezproductID
   setTimeout(function(){
    
      _this.$store.dispatch('setredirectPath',_this.$route.path);
         _this.$store.dispatch('steproductID',_this.productId);
          _this.$router.push({
            path:'/login'})
           
       },1900)
       
       
      }



      
    },
    _getUserInfo(){
       getUserInfoByToken( commonParams.searxhshopsParams({token:this.$store.state.login.token})).then((res)=>{
           if(res.data.status==1){
        //res.data.data.wxOpenId
           this.wxOpenId=res.data.data.wxOpenId

             console.log("wxOpenId"+ this.wxOpenId)
           }
       
       })
  }

 
    
   
  }

}
</script>

<style  lang="scss" scope>
 @import '../../assets/productDetail';
 
</style>
