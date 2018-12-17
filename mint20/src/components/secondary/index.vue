<template>
<div class="containesssecondary">
  <!--头部 -->
  
<!--<headerConmon/>-->

         
   <!----> 
   <div class="choseItem" @click="choseItem">
       <img src='../../commom/img/icon_arrow.png' :class="thirdCategoryFalse?'choseItemActive':''">
      </div>
    <div class="secondaryItem">
      <ul>
           <li class=""   v-for="(item,index) in thirdCategory" :key="index"
           @click="thirdCategoryCheck(index,item.id)"   :class="index==thirdCategoryIndex?'active':''">
                  {{item.thirdCategoryName}}
           </li>
      
      
      </ul>
     

    </div>
       <!--选择-->
    <div class="selectBox" v-if="thirdCategoryFalse">
      <ul>
        <li class=""   v-for="(item,index) in thirdCategory" :key="index"
           @click="thirdCategoryCheckchoseItem(index,item.id)"   :class="index==thirdCategoryIndex?'active':''">
                  {{item.thirdCategoryName}}
           </li>
        
      </ul>

    </div>
   <!---->
    <div class="scrollSecondary">
   <Scroll ref="scroll" 
:autoUpdate="true"
@pullingDown="loadRefresh"
@pullingUp="loadMore"

>
  

          <div class="bannerBox">
     <img  v-lazy="category.bigImgUrl" />
     </div>
  
   <!--产品 list-->
             <!--产品      <li v-for="item in list" >-->
               
            <div class="productBoxlistNow" > 
              
              
                <!--<span class='productTitle'>
                  <img  src="../../commom/img/products-03.png"/></span>-->
               
                    <div class="productBoxItem"  >
                         <router-link  v-for="(item,index)  in list" :key="index"
                 :to="{path:'/productDetail',query:{productId:item.id}}" >
                     
                        <div class="productBoxItemList"  :class="index%2==1?'fr':'fl'">
                            <img class="productBoxItemListImg" v-lazy="item.productImgUrl"/>
                            <p class="productListTitle">{{item.productName}}</p>
                            <p class="producmonyNum">
                          
                                <span class='producmonyFomt fl'>￥{{item.price}}</span>
                             
                            </p>

                        </div>
                     
                          </router-link>

                    </div>
            

            </div>
   <!--</div>-->
   </Scroll>   
</div>        
                 <!--滚动jieshu-->
                 <div class="selectBoxBgNOW" v-if="thirdCategoryFalse" @click="selectBoxBgNOWfunc"></div>
      
  </div>
  
</div>

</template>


<script type="text/ecmascript-6">
 
    import headerConmon from '../headerConmon/index';
import {getThirdCategoryTitle,getProductByTitle}  from 'api/classification'
 import {commonParams} from 'api/config';
 import {timeout} from "../../lib/Scroll/utils";
import Scroll from "../../lib";
export default {

  //vuex
  // store,  getProductByThirdCategory
  components: {
   Scroll,
   headerConmon
  },
  data() {
			return {
        list: [],
        count:0,
        thirdCategoryIndex:0,
        loading: false,
        selectBoxBgNOW:false,
        allLoaded: false,
        
       thirdCategory:[],
       thirdCategoryFalse:false,
   
        category:[],
        thirdCategoryProductVo:{
            "categoryId":this.$route.query.categoryId,
            "pageStar": 1,
            "pagesize": 8,
            'city':'',
            "thirdCategoryId":-1


        }

			}
      
		},
    
    computed:{
         
    },
  created(){

  },
   mounted() {
	    this._getList()
    this._getThirdCategoryTitle()
     
    },
   methods: {
     selectBoxBgNOWfunc(){
        this.thirdCategoryFalse=false
     },
     choseItem(){

           if(this.thirdCategoryFalse){
             this.thirdCategoryFalse=false
           }else{
               this.thirdCategoryFalse=true
           }
     },
    
     _getThirdCategoryTitle(){
         let param = new URLSearchParams();
          param.append("thirdCategoryProductVo",JSON.stringify(this.thirdCategoryProductVo));
       getThirdCategoryTitle(param).then((res)=>{
        
           if(res.data.status==1){
             this.thirdCategory=res.data.data.thirdCategory
             this.category=res.data.data.category
           }
       })
     },
    
     async    loadRefresh() {
        await timeout(1000);
         this.thirdCategoryProductVo.pageStar=1;
         this.list =this._getList();
    
      },
     async  loadMore() {
        this.count < this.thirdCategoryProductVo.pageStar *this.thirdCategoryProductVo.pagesize?
         this.$refs.scroll.update(true): ""
        this.more();
    
        
      },

 

      
    
  async  _getList(){
 if(this.$store.state.login.city!=''){
      this.thirdCategoryProductVo.city=this.$store.state.login.city
      }else{
           this.thirdCategoryProductVo.city='广州市'
      }

    
     var _this=this;

   
          let param = new URLSearchParams();
          param.append("thirdCategoryProductVo",JSON.stringify(this.thirdCategoryProductVo));
       getProductByTitle(param).then((res)=>{
        console.log(res)
         if(res.data.status==1){
            
                _this.count =res.data.count;
               
                _this.list= res.data.data;
                console.log( _this.list)
         }

       })
          

      },

  async more(){
      await timeout(1000);
       if(this.$store.state.login.city!=''){
      this.thirdCategoryProductVo.city=this.$store.state.login.city
      }else{
           this.thirdCategoryProductVo.city='广州市'
      }
        var _self=this;
          this.thirdCategoryProductVo.pageStar=this.thirdCategoryProductVo.pageStar+1;
         let param = new URLSearchParams();
         param.append("thirdCategoryProductVo",JSON.stringify(this.thirdCategoryProductVo));
     getProductByTitle(param).then((res)=>{
              if(res.data.status==1){
                if(res.data.data.length>0){
                 
               _self.list=_self.list.concat(res.data.data)
                
                }else{
                  return false
                }
              
            
             
              }
             })
      }, 
      thirdCategoryCheck(a,b){
        this.list=[]
       this.thirdCategoryIndex=a;
        this.thirdCategoryProductVo.thirdCategoryId=b;
        
          this._getList();

      },
      thirdCategoryCheckchoseItem(a,b){
         this.list=[]
       this.thirdCategoryIndex=a;
        this.thirdCategoryProductVo.thirdCategoryId=b;
       
           if(this.thirdCategoryFalse){
             this.thirdCategoryFalse=false
           }else{
               this.thirdCategoryFalse=true
           }
        
          this._getList();
      }   
  }

}
</script>

<style  lang="scss">
.containesssecondary{
  height: 100%;
  width: 100%;
}
.scrollSecondary{
  position: absolute;
top: rem(100);
overflow: hidden;
bottom:0;
z-index: 100;
display: flex;
}
.secondaryHeader{
   padding: rem(30) 0;
   position: relative;
   text-align: center;
   border-bottom: 1px solid #e3e3e3;
   font-size: rem(32);
   color: #333;
  }
  .back{
  position: absolute;
  background: url('../../commom/img/btn-back.png') center center no-repeat;
  width: rem(18);
  height: rem(24);
  left: rem(30);
  top: rem(35);
  background-size: contain;

}

.secondaryItem{
  padding: rem(30) 0;
  width: rem(750);
  position: absolute;
  z-index: 3001;
  background-color: #fff;
  overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
   
 
  ul{
width: rem(1500);
height: rem(20);
    margin-left: rem(30);
   
  }

  ul li{
    float: left;
    margin-right: rem(40);
    font-size: rem(28);
    color: #333;
     
   
  }
   .active{
      color: #09b980;
      font-weight: bold;
    }
   

}
// 隐藏滚动条
.secondaryItem::-webkit-scrollbar {
    display: none;
}
.bannerBox{
  width: rem(750);
  
  margin: 0 auto;
  img{
    width: 100%;
    height: rem(234);
    
  }
}

//chanp
 .productBoxlistNow{
    
        width: rem(750);
      
        text-align:center;

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
                 overflow: hidden;
                 text-align: center;
                 margin-bottom: rem(18);
                   border-radius: rem(8);
                 .productListTitle{
                     margin-top: rem(19);
                        font-size: rem(28);
                    width: rem(293);
                    overflow: hidden;
                    text-overflow: ellipsis;
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    word-break: break-word;
                    color: #232326;
                    margin: 0px auto;
                    line-height: 0.44rem;
                    margin-bottom: 3px;
                    text-align: left;
   
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
    .noMore{
        font-size: rem(26);
        color: #d4d4d4;
        text-align: center;
        width: 100%;
        padding: rem(36) 0;
    }
  //以上代码需要优化
.selectBoxBgNOW{
  position: absolute;
  z-index: 2000;
  top: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  background-color: #000;
  opacity: 0.5;
  
}

  
  .selectBox{
   position:absolute;
 left:0;
 top:0.7rem;
 padding-top:0.74667rem;
 z-index:2002;
 width:10rem;
border-radius: 0 0 rem(12) rem(12);
 background-color:#fff;
 height:auto;
 overflow:hidden;
 padding-bottom: rem(20);

    ul {
      margin-left: rem(30);
    }
   ul li{
     border: 1px solid #e3e3e3;
     float: left ;
     width: rem(150);
     height: rem(63);
     text-align: center;
     line-height: rem(63);
     font-size: rem(28);
     color: #333;
     border-radius:rem(10);
     margin-bottom: rem(30);
     margin-right:0.3rem;

   }
    ul li.active{
      background-color: #3ac799;
      color: #fff;
       border: 1px solid transparent;
    }
  }  
.choseItem{
   width:rem(83);
   height: rem(83); 
    position: absolute;
  
    z-index: 3300;
    background-color: #ffffff;
    text-align: center;
    line-height: rem(83);
     right:0;
      top: 1.21333rem;

  img{
      max-width: rem(24);
    transform:rotate(0deg);
-ms-transform:rotate(0deg); 	/* IE 9 */
-moz-transform:rotate(0deg); 	/* Firefox */
-webkit-transform:rotate(0deg); /* Safari 和 Chrome */
-o-transform:rotate(0deg);
		-webkit-transition: -webkit-transform 0.45s ease-in; /* Safari 和 Chrome */
		-moz-transition:-moz-transform 0.45s ease-in; 	/* Firefox */
		-o-transition:-o-transform 0.54s ease-in; 	/* Opera */
		transition:transform 0.45s ease-in;
      
  }
  }


.choseItemActive{
  -ms-transform:rotate(180deg) !important; 	/* IE 9 */
		-moz-transform:rotate(180deg) !important; 	/* Firefox */
		-webkit-transform:rotate(180deg) !important; /* Safari 和 Chrome */
		-o-transform:rotate(180deg) !important; 	/* Opera */
		transform:rotate(180deg) !important;
 
		-webkit-transition: -webkit-transform 0.45s ease-in; /* Safari 和 Chrome */
		-moz-transition:-moz-transform 0.45s ease-in; 	/* Firefox */
		-o-transition:-o-transform 0.45s ease-in; 	/* Opera */
		transition:transform 0.45s ease-in;
}
</style>
