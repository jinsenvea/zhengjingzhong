<template>
<div class="contain" >
       <div class="">

            <!--搜索-->
        <v-search ></v-search>
        
             <!--中间部分加载 上啦 下拉-->
   <div class="scrollBox">
           <Scroll
             ref="scroll"
      :autoUpdate="true"
       @pullingDown="loadRefresh"
      @pullingUp="loadMore"
           >
            
                     <mt-swipe  class="mySwiper"   :auto="5000">
                    <mt-swipe-item v-for="(item,index) in banneradlist" :key="index" style="float:left;">
 <router-link  :to="{path:'/productListBox',query:{productId:item.actAdvId,title:'产品列表',productUrl:item.adImgUrl}}" >
                        <img v-lazy="item.adImgUrl"/>
 </router-link>
                    </mt-swipe-item>
                    
                
                </mt-swipe>

                    
                <!--菜单    :to="{path:'/management',query:{title:'收货地址'}}"-->
                <div class="banner">
                    <router-link :to="{path:'/secondary',query:{title:item.categoryName,categoryId:item.id}}" class="items" v-for="(item,index) in bannerlist" :key="index">
                        <img v-lazy="item.smallImgUrl" alt="">
                        <span>{{item.categoryName}}</span>
                    </router-link>
                </div>
        <!--公告-->
        <div class="announcement">
          <em class="announcementindebg"></em>
           <span class="fl">公告</span>
            <div id="demo" class="qimo8">
                 <div class="qimo">
                <div id="demo1">
                <ul>
                                    
                                
                                    <li v-for="(item,index)  in getNoticesList"  :key="index">
                                      <a href="#">{{item.nheadline}}</a>
                                      </li>
                                
                            
                </ul>
                </div>
                <div id="demo2">
                
                </div>
            </div>
            </div>
           
        </div>


    <!--宣传-->
    <div class="bgHr"></div>
   
        <div class="aDentrance">
            
             
          
          <div class="aDentranceItem fl"   @click="weekSelling(Activelistfrist,1)">
                
                    
                <div class="aDentranceItemLeft" >
                          <span class="addsFirst" style="color:#008a41;">{{Activelistfrist.acTheme}}</span>
                       
                          <span  class="secodrFont">{{Activelistfrist.acContext}}</span>

                        </div>
                        <!--右边-->
                        <div class="aDentranceItemRight">
                        <img v-lazy="Activelistfrist.adImgUrl">

                        </div>
                        <em></em>
                  <!--</router-link>-->

             </div>
               <!--actAdvId-->
                <div class="aDentranceItem fl"  >
                  <router-link  :to="{path:'/dailyrushed',query:{actAdvId:ActivelistSecond.actAdvId}}">
                    <div class="aDentranceItemLeft">
                        <span class="addsFirst" style="color:#fc6562;">{{ActivelistSecond.acTheme}}</span>
                        <!--<span  class="secodrFont">{{ActivelistSecond.acTitle}}</span>-->
                         <span  class="secodrFont" v-if="ActivelistSecond.acContext">{{ActivelistSecond.acContext}}</span>
                      

                      </div>
                      <!--右边-->
                      <div class="aDentranceItemRight">
                        <img v-lazy="ActivelistSecond.adImgUrl">

                      </div>
                      <em></em>

                      </router-link>
                  </div>
             
               <div class="aDentranceItem fl" @click="grouppurchase" >
                <div class="aDentranceItemLeft">
                   <span class="addsFirst" style="color:#f5445e;">{{ActivelistThird.acTheme}}</span>
                   <!--<span  class="secodrFont">{{ActivelistThird.acTitle}}</span>-->
                     <span  class="secodrFont" v-if="ActivelistThird.acContext">{{ActivelistSecond.acContext}}</span>
                 

                 </div>
                 <!--右边-->
                 <div class="aDentranceItemRight">
                   <img v-lazy="ActivelistThird.adImgUrl">

                 </div>
                 <em></em>


             </div>
               <!---->
               <div class="aDentranceItem fl"   @click="weekSelling(ActivelistFourth,2)">

               
                 <div class="aDentranceItemLeft">
                   <span class="addsFirst" style="color:#fc6562;">{{ActivelistFourth.acTheme}}</span>
                   <!--<span  class="secodrFont">{{ActivelistFourth.acTitle}}
</span>-->
                   <span  class="secodrFont" v-if="ActivelistFourth.acContext">{{ActivelistFourth.acContext}}</span>

                 </div>
                 <!--右边-->
                 <div class="aDentranceItemRight">
                    <img v-lazy="ActivelistFourth.adImgUrl">

                 </div>
                 <em></em>

                
             </div>
            
              
        </div>
       
<!--宣传-->
        <div class="bgHr" ></div>
        <!--产品      <li v-for="item in list" >-->
            <div class="productBox" > 
              
                <span class='productTitle'>
                  <img  src="../../commom/img/products-03.png"/></span>
               
                    <div class="productBoxItem"  >
                       <router-link  v-for="(item,index)  in list" :key="index"
                 :to="{path:'/productDetail',query:{productId:item.id}}" >
                     
                     
                     
                        <div class="productBoxItemList"  :class="index%2==1?'fr':'fl'">
                          <!--<img src="../../commom/img/lazy-loading.png"/>-->
                            <img class="productBoxItemListImg" v-lazy="item.productImgUrl" />
                            <p class="productListTitle">{{item.productName}}</p>
                            <p class="producmonyNum">
                          
                                <span class='producmonyFomt fl'>￥{{item.price}}</span>
                             
                            </p>

                        </div>
                     
                          </router-link>

                    </div>
              

            </div>




               
        <!--end-->

          </Scroll>
       </div>
        <!--产品-->

                          
  </div>
    <Footer/>
      <div id='allmap' style=""></div>  
 </div>
</template>

<script>
import Search from "../common/search.vue";
import Footer from '../footer/index.vue';
import Scroll from "../../lib";
import {timeout} from "../../lib/Scroll/utils";
import {commonParams} from 'api/config';
import {getGuessYouLike,getNotices,getBannerByType,getHomeCategory} from 'api/index'

import {getProductById,getReceiverAddressByUserId,productIsInventory,weixinconfig}  from 'api/shopcart'
import listings from "../classification/listings.vue";
export default {
  components: {
    "v-search": Search,
    Scroll,
    listings,
    Footer
  },
  data() {
    return {
        //F:\mint\src\commom\img\lazy-loading.png
         list: [],
         adress:'',
         //是否执行加载
          //出现加载更多
        allLoaded: false,
         productVo:{
           type:1,
           city:'',
            pageStar:1,//页码
             pagesize:8//条数
          },
          getNoticesList:[],
          banneradlist:[],
          a:1,  //第几页
        bottomTip: '查看更多',
        b:6,// 一页显示多少条,
        count:0,//总数,
        loading: false,
        allLoaded: false,
         //滑动
      demo01_index:0,
      timer:null,
      bannerlist:[],
      Activelistfrist:[],
      ActivelistSecond:[],
      ActivelistThird:[],
      ActivelistFourth:[]

     
    };
  },
 mounted() {

   if(this.$store.state.login.city==''){
        this.mapaDress()
   }
  
   



},
 created(){
//this.banner();
 this.timer=setInterval(this.Marquee,30);
   this._getList()
   this._getNotices()
   this._getBannerByType()
   this._getHomeCategory()
   this._getActiveType()
  },
methods: {
          weekSelling(item,num){
              var _this=this;
       var a=num;
               

                setTimeout(function(){
                    _this.$router.push({path:'/weekSelling',query:{actAdvId:item.actAdvId,num:a}})  
                },600)
          },
        grouppurchase(){
          this.$store.dispatch('toast',"功能开发中");

      },
        najizhunapp(){
            

        },
        Marquee(){
                        /*  公告滚动*/
        var demo = document.getElementById("demo");
        var demo1 = document.getElementById("demo1");
        var demo2 = document.getElementById("demo2");
        demo2.innerHTML=document.getElementById("demo1").innerHTML;

        if(demo.scrollLeft-demo2.offsetWidth>=0){
        
        demo.scrollLeft-=demo1.offsetWidth;
        }
        else{

        demo.scrollLeft++;
        
        }

            

        },
        // 测试请求数据  getBannerByType
        _getNotices(){
        getNotices().then((res)=>{
          var self=this;
                   
                    if(res.data.status==1){
                      self.getNoticesList=res.data.data
                    
                   
                    }else{
                    return false
                  }
                })
                },


      //测试
     async    loadRefresh() {
        await timeout(1000);
         this.productVo.pageStar=1;
         this.list =this._getList();
    
      },
     async  loadMore() {
        this.count < this.productVo.pageStar *this.productVo.pagesize? this.$refs.scroll.update(true): ""
        this.more();
    
        
      },

 


      
      // 初始化数据
  async  _getList(){
    
     var _this=this;
     let param = new URLSearchParams();
      if(this.adress!=''){
      this.productVo.city=this.adress
      }else{
           this.productVo.city='广州市'
      }

          param.append("productVo",JSON.stringify(this.productVo));
      getGuessYouLike(param).then((res)=>{
              if(res.data.status==1){
              
                
                _this.count =res.data.count;
               
                this.list= res.data.data;
               
                
              }
             })
          

      },
  async    more(){
      await timeout(1000);

       if(this.adress!=''){
      this.productVo.city=this.adress
      }else{
           this.productVo.city='广州市'
      }
        var _self=this;
          this.productVo.pageStar=this.productVo.pageStar+1;
         let param = new URLSearchParams();
         param.append("productVo",JSON.stringify(this.productVo));
     getGuessYouLike(param).then((res)=>{
              if(res.data.status==1){
                if(res.data.data.length>0){
                _self.list=_self.list.concat(res.data.data)
                
                }else{
                  return false
                }
              
            
             
              }
             })
      },
      _getBannerByType(){

        getBannerByType(commonParams.searxhshopsParams({type:1})).then((res)=>{
              if(res.data.status==1){
                     this.banneradlist=res.data.data
                     console.log(this.banneradlist)
                   
                  
                   
                    }

        })
      },
      //可以和_getBannerByType合并 用vux写
       _getActiveType(){

        getBannerByType(commonParams.searxhshopsParams({type:4})).then((res)=>{
              if(res.data.status==1){
                    //  this.Activelist=
                  
                   this.Activelistfrist=res.data.data[0]
                     this.ActivelistFourth=res.data.data[3]
                       this.ActivelistThird=res.data.data[2]
                    this.ActivelistSecond=res.data.data[1]
                  
    
                    }

        })
      },
      // 分类接口
      _getHomeCategory(){
        getHomeCategory().then((res)=>{

             if(res.data.status==1){
             
                     this.bannerlist=res.data.data
                    
                
                    
                   
                    }
 
        })
        
      },

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
          
      _this.adress=addComp.city
       _this.$store.dispatch('setcity',addComp.city);
     
         
     

     });


    },
      
      


},

  beforeDestroy () {
    clearInterval(this.timer)
  }
 
};
</script>

<style scope  lang="scss">
.announcementindebg{
     background: url('../../commom/img/indebg.png') center center no-repeat; 
     position: absolute;
     right: 0;
     top: 0;
     width: rem(244);
     height: rem(80);
     z-index: 300;
}
.contain{
    width: 100%;
    height: 100% ;
     
    
}
.aDentranceItemLeft{
  float: left;
  margin-left: rem(30);
   width: rem(185);
   height: rem(156);
  
   span{
     display: block;
     text-align: left;
     
   }
   .addsFirst{
     font-size: rem(32);
     margin-bottom: rem(16);
   }
   .secodrFont{
       margin-bottom: rem(8);
     font-size: rem(28);
     color: #9c9c9c;
   }
}
.aDentranceItemRight{
  margin-top: rem(10);
  float: right;
  width: rem(130);
  margin-right: rem(18);
  text-align: center;
  height: rem(182);

  img{
   max-width: 100%; 
  }
}
.mySwiper {
  width: rem(750);
  height: rem(320) !important;
      overflow: hidden;
  .vux-indicator.custom-bottom {
    bottom: rem(11);
   
   
    
  }
  .vux-icon-dot{
      background-color: #fff;
      opacity: 0.76;
  }
   .vux-icon-dot.active{
        background-color: #fff !important;
    }
  
  img {
    width: 100%;
    height: 100%;
  }
}

.banner {
  display: flex;
  flex-wrap: wrap;
 overflow: hidden;
  padding: rem(5) rem(0);
  margin: rem(20) auto;
  .items {
    width: 25%;
    height: rem(194);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
    font-size: rem(25);
    background: #fff;
    color: #000;
    img {
      width: rem(98);
      height: rem(98);
    }
    span {
      margin-top: rem(10);
      font-size: rem(25);
      color: #696969;
    }
  }
}
//公告
.announcement{
    width: rem(750);
    margin: 0 auto;
    padding: rem(25) rem(0) 0;
    overflow: hidden;
    position: relative;
  
    border-top: 1px solid  #e5e5e5;
     border-bottom: 1px solid  #e5e5e5;
    
     span{
         margin-top:  -0.0075rem;
         margin-left: rem(30);
         color: #ff623e;
         font-size: rem(18);
         background-color: #ffe6e0;
         border: 1px solid #ff623e;
         padding: rem(4) rem(6);
         border-radius: rem(6);

     }
}
.text-scroll {
 
  border-left: none;
  border-right: none;
  width: rem(600);
}
.text-scroll p{
  font-size: rem(22);
  text-align: center;
 
  color: #333;
}
// 外层
.containBox{
   padding: 0 0 rem(120);
}

//公告
.qimo8{
	width:rem(630);
	 margin: 0px auto;
    height: 0.78667rem;
   
   
    position: relative;
    overflow: hidden;}
.qimo8 .qimo {/*width:99999999px;*/width:8000%; }
.qimo8 .qimo div{ float:left;}
.qimo8 .qimo ul{float:left;  overflow:hidden; zoom:1;}
.qimo8 .qimo ul li{float:left; line-height:0.4266rem; list-style:none;}
#demo1 li a,#demo2 li a{
 color:#333;
 font-size:rem(26);

}
// end


.aDentrance{
    width: rem(750);
    padding: rem(20) 0;
    overflow: hidden;
    border-bottom:1px solid #e5e5e5;
    overflow: hidden;
     .aDentranceItem:nth-of-type(even){
           border-right: none;
          }
         
      .aDentranceItem{
             width: 49.5%;
          border-bottom: 1px solid #e5e5e5;
          border-right: 1px solid #e5e5e5;
          height: rem(216);
          position: relative;
          text-align: right;
        
          img{
              
              width: rem(320);
              height: rem(192);
              margin-right: rem(30);
          }
          em{
              display: inline;
              width: rem(110);
              height: rem(26);
              background: url('../../commom/img/products-02.png') center center no-repeat; 
              background-size: contain;
              position: absolute;
              left: rem(30);
              bottom: rem(32);

          }
      }
      
       .aDentranceItem:nth-of-type(3),.aDentranceItem:nth-of-type(4){
        padding-top: rem(15);
            border-bottom: none;
           
          
          }

    }
    .productBox{
      overflow: hidden;
        width: rem(750);
        padding-top:rem(30);
        text-align: center;
        .productTitle{

            img{
                width: rem(280);
                height: rem(22);
            }
        }
    
     .productBoxItem{
             width: rem(690);
             margin: rem(35) auto;
   
.productBoxItemList{
                 width: rem(332);
                 border: 1px solid #e5e5e5;
                 height: auto;
                 text-align: center;
                 overflow: hidden;
                 margin-bottom: rem(18);
                 border-radius: rem(8);
                 .productListTitle{
                     margin-top:rem(19);
                    font-size:rem(28);
                    width:rem(293);
                    overflow:hidden;
                    text-overflow:ellipsis;
                    display:-webkit-box;
                    -webkit-line-clamp:2;
                    -webkit-box-orient:vertical;
                    word-break:break-word;
                    color: #232326;
                    margin:0px auto;
                    line-height:0.44rem;
                    margin-bottom:3px;
                    text-align:left;
   
                 }
                 .producmonyNum{
                     margin: rem(25) auto;
                      width: rem(293);
                      overflow: hidden;
                         .producmonyNumimg{
                            width: 0.57333rem;
                            height: 0.57333rem;
                            vertical-align: middle;
                          }
                          .producmonyFomt{
                              font-size: rem(35);
                              color: #09b980;
                              margin-left: rem(5);
                              margin-top: rem(2);

                          }
                          .producmonadd{
                              width: rem(34);
                              height: rem(34);
                             margin-top: rem(5)
                          }

                 }
                 .productBoxItemListImg{
                     height: rem(330);
                     width: 100%;
                     margin-bottom: rem(10);
                     
                 }

             }
     }
     

    }
   //首页上拉加载布局
  .scrollBox{
   position: absolute;
   top: rem(100);
   overflow: hidden;
   bottom:rem(100);
   display: flex;
  }  
   



</style>