<template>
<div class=''>
    <div class="goodsBigBox">

        <!--无登录 -->
   <div class="noLogin"  v-if="this.$store.state.login.token==''">
           <span>登录后才能同步购物车信息去结算哟</span>
           <router-link class="aloginNoem"  :to="{path:'/login'}">登录</router-link>
          
   </div>
   <!--头部-->
   <div class="headerShopCart" v-if="this.$store.state.login.token!=''&&shopList.length>0">
      <span><img class="imglogo" src="../../commom/img/imglogo.png"/> 呐吉岛</span>
     <!--<div class="back" @click="routerback"></div>
    <span class='h1'>购物车</span>-->
    <span class="editor fr" v-if="this.$store.state.shopCart.delstate"  @click="editShopcart(false)">编辑</span>
     <span class="editor fr" v-if="!this.$store.state.shopCart.delstate" 
      @click="editShopcart(true)">完成</span>

   </div>
  
   <!--购物车列表-->
   <div class="cart">
     <ul>
       <!--v-for="(item,index) in adressList" :key="index"-->
       <li v-for="(item,index) in shopList"  :key="index">
         <!--左边-->
         <span class="checkBox  fl active" @click="select(item)"
          v-bind:class="{'check':item.checked}"></span>
         <span class="cartProduxt fl">
            <img  v-lazy="item.productImgUrl"/>
         </span>
         <div class="cartRight fl">
           <span class="cartTitle" v-text="item.productName"></span>
            <p><em class=""></em><em style="margin:0 0.05rem ;">￥{{item.productPrice}}</em>
            <!--<del>￥{{item.price}}</del>-->
            </p>
         </div>
        <div class="chooseNumItem">
          <!--<img src="../../commom/img/min.png"/>-->
          <span class="min fl" @click="changeNumber(item,-1)"></span>
      
          <input class="text_box fl" type="text" value="0" disabled v-model="item.productAmount">
          <span class="add fr" @click="changeNumber(item,1)">
          </span>

        </div>

       </li>
     </ul>


   </div>
  <div class="searbillbgcartnow" v-if="shopList.length<=0" style="text-align: center;">
        
没有相应的购物车记录
    </div>

    <!--猜你喜欢产品-->
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

<!--猜你喜欢结束-->

    </div>
   <!--底部-->
   <div class="cartFoot" v-if="shopList.length>0">
      <span class="checkBox fl" @click="selectAll()" v-bind:class="{'check':checkAll}"></span>
      <span class="checkFont fl" @click="selectAll()">全选</span>
   
      <div class="fr cartFootRight" >
        
         <div class="cartFootItem fr" @click="settlement"  v-if="this.$store.state.shopCart.delstate" >
           结算({{allFlag}})

         </div>


          <div class=" cartFootItem del fr"  @click="delShopCart()" 
           v-if="!this.$store.state.shopCart.delstate">
           删除({{allFlag}})

         </div>
         <div class="fr">
           <span class="span ">合计</span>
         <span class="total "> {{total|changePrice}}</span>
        </div>

      </div>

   </div>
   <!--没有数据-->
 

    <!--返回首页-->
  <router-link  :to="{path:'/'}">
     <div class="gobackHomeOrderkld"></div>
      </router-link>
 
</div>
 
</template>


<script type="text/ecmascript-6">
import {getShopCatsOnSyuc,upShopCat,deleteShopCat}  from 'api/shopcart'
import {commonParams} from 'api/config';
 import {getUserInfoByToken}  from 'api/login'

 //购物车猜你喜欢


 import Scroll from "../../lib";
import {timeout} from "../../lib/Scroll/utils";

import {getGuessYouLike,getNotices,getBannerByType,getHomeCategory} from 'api/index'
//
//  import store from './vuex/store.js'
      



export default {

  //vuex
  // store,
  components: {
   
  },
  data() {
			return {
        // 全选判定
        checkAll: false,
        flag:false,
        // 总价
        total: 0,
         list: [],
        shopList:[],
        allFlag:0,
       //购物车删除id集合\
        productids:[],
        //本地缓存下标
        localStorageIndex:[],
        shopcARTstate:false,
        loginState:false,
        checkedStateNow:false,
         productVo:{
           type:2,
           city:'',
            pageStar:1,//页码
             pagesize:100//条数
          },
          //购车车对象
        }
      
		},
    // 监听数据变化
	watch: {
		// 监听商品列表的变化
		shopList: {
			// 变化后处理的方法，对handler进行方法定义
			handler: function () {
				// 定义全选Falg
        	this.allFlag=0;
          	// 置空总价
				this.total = 0;
				// 遍历shoplist
				for (var i in this.shopList) {
					// 判断是否选中
					if (this.shopList[i].checked == true) {
						this.allFlag++;
           
         
            // 对选中的元素与总价累加
						this.total += this.shopList[i].productPrice * this.shopList[i].productAmount;

           
					}
				}
				// 判断选中个数是否与shoplist长度相同，即判断全选
				if (this.allFlag == this.shopList.length) {
					this.checkAll = true;
				} else {
					this.checkAll = false;
				}
			},
		
			deep: true
		}
	},
    // 定义过滤方法
	filters: {
		// 传入原始value然后返回处理后数据
		changePrice: function (value) {
			// toFixed(2)：保留两位小数(引用老师原句：该数值应为后端处理传过来的数据，前端进行计算容易丢失精度)
			return "￥" + value.toFixed(2);
		}
	},
    computed:{
         
    },
  created(){
    this._getUserInfo()
    
    this.load();
  
     this._getShopCatsOnSyuc();
      this._getList()
      
  


  },
   mounted() {
	  
     
    },
   methods: {



//购物车猜你喜欢

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
        if(this.$store.state.login.city!=''){
this.productVo.city=this.$store.state.login.city
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

        if(this.$store.state.login.city!=''){
this.productVo.city=this.$store.state.login.city
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
//结束


























     // 选中方法item为选中的元素
		select: function (item) {
			// 如果该item的checked属性为false或者不存在
			if (!item.checked) {
				// 则$set设置checked属性为true，并且加入对象的监听，如果直接item.checked=true，就无法监听，重点。
				this.$set(item, "checked", true);
			}
			// checked为真
			else
				// 取反
				item.checked = !item.checked;
      console.log(item)
		},
		// 全选方法，flag判断全选或者取消全选
		selectAll: function () {
			
			var _this = this;
			// 如果flag不为真
			if (!this.flag) {
				// vm对象的checkAll属性赋值为真
				this.checkAll = true;
        this.flag=true;
				// 遍历shopList属性，参数ele为当前遍历的对象
				this.shopList.forEach(function (ele) {
					// 同上理，如果该对象不存在checked属性，或者为false
					if (!ele.checked) {
						// 赋值为真并且监听
						_this.$set(ele, "checked", true);
					}
				
				});
			}
			// 如果flag为假，即取消全选
			else {
				// 反向操作
				this.checkAll = false;
        this.flag=false;
				// 反向操作，再次强调：$set赋值整个Vue实例才会对其进行监听*3
				this.shopList.forEach(function (ele) {
					// 判断条件与之前相反
					if (ele.checked) {
						_this.$set(ele, "checked", false);
					}
				
				});
			}
		},
    // 调整数量的方法，flag判断加减
		changeNumber: function (item, flag) {
     
			// 大于0为加
			if (flag > 0) {
			 
				item.productAmount++;
       
        var id=item.productId;
        var productAmount=item.productAmount;
        this.$store.dispatch('modifyShoppingNum',{id,productAmount});
       
          delete item.checked
         //修改购车车
        this._upShopCat(item)
         
			}
			// 小于0
			else {
				// item数量自减1
				item.productAmount--;
         var id=item.productId;
           console.log(item)
        var productAmount=item.productAmount;
        this.$store.dispatch('modifyShoppingNum',{id,productAmount});
				// 如果数量小于1
				if (item.productAmount < 1)
					// 始终赋值为1，则数量无法小于1
					item.productAmount = 1;
           //修改购车车

             delete item.checked
            this._upShopCat(item)
          
			}
		},

    
    load(){
      var _this=this;
       	_this.shopList.forEach(function (ele) {
           console.log(ele)
					// 判断条件与之前相反
					_this.$set(ele, "productAmount", "1");
				
				});
    },
    //加入购物车
    _getShopCatsOnSyuc(){
      var _this=this;
      // 判断token存在
      if(this.$store.state.login.token!=''){
     
        let param = new URLSearchParams();
        param.append("token",this.$store.state.login.token);
        param.append('context','')
        this._getShopCatsOnSyusadc(param)


      }else{
     
        
        if(_this.$store.state.shopCart.goodsList!=''&&_this.$store.state.shopCart.goodsList!=null ){
           for(var i=0;i<JSON.parse(localStorage.getItem("goodsList")).length;i++){
             this.shopList.push({
               productImgUrl:  JSON.parse(localStorage.getItem("goodsList"))[i].productImgUrl,
               productName:   JSON.parse(localStorage.getItem("goodsList"))[i].productName,
               productPrice:  JSON.parse(localStorage.getItem("goodsList"))[i].productPrice, 
                productAmount:  JSON.parse(localStorage.getItem("goodsList"))[i].productAmount,
                productId:JSON.parse(localStorage.getItem("goodsList"))[i].productId
             })
        
           }
    
      //= ;
         
                
      }else{
         this.shopcARTstate=true
             
        }
 
      }

    },
    // 更新购物车
    _upShopCat(item){
        if(this.$store.state.login.token!=''){
            let param = new URLSearchParams();
           param.append("token",this.$store.state.login.token);
            param.append('context',JSON.stringify(item))
        
            upShopCat(param).then((res)=>{
              if(res.data.status==1){
                 this.$store.dispatch('toast',res.data.message);
               
              }
               
            })

          }

    },
    _getShopCatsOnSyusadc(param){
       getShopCatsOnSyuc(param).then((res)=>{
            if(res.data.status==1){
              // 
                  if(res.data.data==null){
                
                  this.shopcARTstate=true
                }else{
                    var data=JSON.stringify(res.data.data);
                    this.$store.dispatch('addShopCartList',data);
                    console.log("ceshi")
                    console.log(this.$store.state.shopCart.goodsList)
               this.shopList=res.data.data
               this.shopcARTstate=false
                  }

            
             
            }
          
          })
    },
    editShopcart(a){

          //修改状态
              this.$store.dispatch('changeState',a);

    },
    //删除购物车
    delShopCart(){
      this.localStorageIndex=[]
	this.checkedStateNow=false
       	for (var i in this.shopList) {
					// 判断是否选中
					if (this.shopList[i].checked == true) {
			
        this.localStorageIndex.push(i)
            this.productids.push(this.shopList[i].productId)
          
						this.checkedStateNow=true
					}
				}



  if(this.checkedStateNow&&this.$store.state.login.token!=''){

             let param = new URLSearchParams();
         	 param.append("token",this.$store.state.login.token);
          param.append("productids",JSON.stringify(this.productids));
          deleteShopCat(param).then((res)=>{
              if(res.data.status==1){
                this.shopList=[]
                this.$store.dispatch('toast',res.data.message);
                 this._getShopCatsOnSyuc()
                     

              }
              

      })
         
        }else if(this.checkedStateNow&&this.$store.state.login.token==''){
            
             for(var i=0;i<this.localStorageIndex.length;i++){
            this.$store.dispatch('deleteGoods',this.localStorageIndex[i]);
             }
             if(JSON.parse(localStorage.getItem("goodsList")).length>0){
              
               

console.log(JSON.parse(localStorage.getItem("goodsList")))
this.shopList=[]

                for(var i=0;i<JSON.parse(localStorage.getItem("goodsList")).length;i++){
             this.shopList.push({
               productImgUrl:  JSON.parse(localStorage.getItem("goodsList"))[i].productImgUrl,
               productName:   JSON.parse(localStorage.getItem("goodsList"))[i].productName,
               productPrice:  JSON.parse(localStorage.getItem("goodsList"))[i].productPrice, 
                productAmount:  JSON.parse(localStorage.getItem("goodsList"))[i].productAmount,
                productId:JSON.parse(localStorage.getItem("goodsList"))[i].productId
             })
           //  console.log(JSON.parse(_this.$store.state.shopCart.goodsList)[i].productId)
           }

             }else{
            
               this.shopList=[]
             }
          
        



        }else{
 this.$store.dispatch('toast',"请选择你要删除的商品");

 
        }

       
   
    },
     routerback: function () {
      this.$router.back(-1)
    },
    settlement(){
      var _this=this;
this.checkedStateNow=false
      
         this.$store.dispatch('delorderlist');
             	for (var i in this.shopList) {
					// 判断是否选中
					if (this.shopList[i].checked == true) {
					
           //this.shopList[i]
           this.$store.dispatch('setorderlist',this.shopList[i]);
            // 对选中的元素与总价累加
				this.checkedStateNow=true
            
           
					}
				}
      
        if(	this.checkedStateNow){

//  确定用户是否有openId
          if(this.$store.state.pay.wxOpenId){
              this.$router.push({
            path:'/sureOrder',query:{title:"确定订单",shopCartStateNow:3}})

          }else{
              _this.$store.dispatch('toast',"请到登录页用微信登录");
      
        // openid 为空  setwxOpenId  setredirectPath  stezproductID
              setTimeout(function(){
                
                  _this.$store.dispatch('setredirectPath',_this.$route.path);
                   
                      _this.$router.push({
                        path:'/login'})
                      
                  },1900)
       
          }
           
        }else{
 this.$store.dispatch('toast',"请选择你要结算的商品");
        }
        
    },
    //用户是否有openid
     _getUserInfo(){
       getUserInfoByToken( commonParams.searxhshopsParams({token:this.$store.state.login.token})).then((res)=>{
           if(res.data.status==1){
       
         
            this.$store.dispatch('setwxOpenId',res.data.data.wxOpenId);
             
           }
       
       })
  }
    
       

   
  }

}
</script>

<style  lang="scss">
//
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
//此处可以优化
.headerShopCart{
      overflow: hidden;
    width: 10rem;
    padding: 0.33333rem 0;
    border-top: 1px solid #eeeeee;
    
    color: #333;
    font-size: 0.37333rem;
    .imglogo{
    margin-left: rem(30);
    width: rem(34);
    height: rem(34);
       vertical-align: -0.09rem;
  }
  .iconcoupon{
     margin-left: rem(30);
      width: rem(32);
    height: rem(22);
           vertical-align: -0.01rem;
  }
.editor{
   font-size: rem(28);
     color: #09b980;
     position: absolute;
     right: rem(30);
}
  
}

.searbillbgcartnow {
    width: 6.66667rem;
    height: 2.66667rem;
    line-height: 2.6667rem;
    color: #999;
    font-size: 0.42667rem;
    margin: 0.32rem auto;
    overflow: hidden;
  
}
input[disabled]{background-color:#fff;}
// header end
  .noLogin{
    width: rem(750);
    padding: rem(30) 0;
    background-color: #f7f7f7;
    font-size: rem(26);
    overflow: hidden;
    color: #c8c8c8;
    position: relative;
   
     border-top: 1px solid #e5e5e5;
     span{
       margin-left: rem(30);
      
     }
     .aloginNoem{
       display: inline-block;
       width: rem(112);
       text-align: center;
       line-height: rem(49);
      position: absolute;
     right: rem(30);
      top: 0.25rem;
      color: #999;
       height: rem(49);
       border: 1px solid #d5d5d5;
     }

  }
 
  .cart{
    width: rem(750);
    height: auto;
    overflow: hidden;
    border-top:1px solid #e5e5e5; 
    ul li{
      padding: rem(36) rem(30);
      height: auto;
      overflow: hidden;
      position: relative;
       border-bottom:1px solid #e5e5e5; 
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
    .checkBox.active{
 margin-top: rem((165-38)/2);
     }
   .cartProduxt{
      display: inline-block;
      width: rem(165);
      height: rem(165);
      text-align: center;
      img{
        max-width: 100%;
      }
    }
    .cartRight{
       .cartTitle{
   display:inline-block;
    font-size:rem(28);
    margin-left: rem(20);
    color: #333;
    width:rem(380);
     overflow: hidden;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -moz-line-clamp: 2;
    -ms-line-clamp: 2;
    -o-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
    -moz-box-orient: vertical;
    -ms-box-orient: vertical;
    -o-box-orient: vertical;
    box-orient: vertical;
    display: -webkit-box;
    display: -moz-box;
    display: -ms-box;
    display: -o-box;
    display: box;
    word-break: break-all;
    height: 0.88rem;
    line-height: 0.453rem;
         
       }
        p {
          margin-top: rem(65);
          margin-left: rem(20);
              em{
                font-size: rem(30);
                color: #09b980;
              }
            del{
              font-style: rem(18);
                color: #bfbfbf;
            }
          }
     
    }
  
  //选中
  .check{
    background: url('../../commom/img/checkTrue.png')  center center no-repeat;
     background-size: contain;
      border: 1px solid transparent;
  }
  .chooseNumItem{
    width: rem(166);
    height: rem(44);
    border: 1px solid #d5d5d5;
    overflow: hidden;
    position: absolute;
    right: rem(30);
    bottom: rem(40);
  }
    .min {
     
      float: left;
      text-align: center;
      display: inline-block;
      width: rem(46);
        border: none;
        border-right: 1px solid #d5d5d5;
      background-size: contain;
    
      height: rem(46);
          line-height:  rem(46);
          background: url('../../commom/img/shopCartreduce.png') center center no-repeat;
          background-size: 100% 100%;
      // img{
      //   width: rem(26);
      //   height: 0.15rem;
      
      // }
      // line-height: rem(46);
    
   
    
    }

    .text_box {
      margin: 0;
      padding: 0;
      width: rem(65.5);
      height: rem(46);
      font-size: 0.4rem;
      line-height: 0.34667rem;
      border: none;
      text-align: center;
      color: #333;
      outline: 0;
    }

    .add {
      text-align: center;

      display: inline-block;
      width: rem(46);
      height: rem(46);
      line-height: rem(46);
      border: none;
      border-left: 1px solid #d5d5d5;
       background: url('../../commom/img/icon_addto.png') center center no-repeat;
          background-size: 100% 100%;
     
      // background-size: contain;
      // margin-top: rem(-3);
    }
.cartFoot{
  width: rem(750);
  height: rem(96);
  background-color: #fff;
  z-index: 33;
  
   overflow: hidden;
      -moz-box-shadow:0px -2px 14px #F0F0F0; 
      -webkit-box-shadow:0px -2px 14px #F0F0F0; 
      box-shadow:0px -2px 14px #F0F0F0;
         position: fixed;
    bottom: 0;
   .checkBox{
     margin-left: rem(30);
     margin-top: rem((96-38)/2);
   }
}
 .cartFootItem{
    width: rem(254);
    background-color: #09b980;
    line-height: 100%;
    height:  rem(96);
    line-height: rem(96);
    float: right;
    font-size: rem(30);
    text-align: center;
    color: #fff;
    }
.checkFont{
  font-size: rem(30);
  color: #333;
   margin-top: rem((96-29)/2);
}
.cartFootRight{
  overflow: hidden;
  width: rem(500);
 
  height: 100%;
  span{
    display: block;
    text-align: right;
    margin-right: rem(20);
    
   
    
  }
  .span{
    font-size: rem(24);
     color: #333;
     margin-top: rem(10);
     margin-bottom: rem(12);
     

  }
}
.total{
  font-size: rem(32);
  color: #09b980;
}
.del{
  background-color: #ff6666;
}
</style>
