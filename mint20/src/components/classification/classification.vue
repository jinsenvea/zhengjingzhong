<template>

<div class="classificationBox">
  <!--左边-->
  <div class="classificationLeft">
     <ul>
          <li class=""   v-for="(item,index) in bannerlist" :key="index"
           @click="classificationCheck(item,index)"  :class="index==classificationIndex?'active':''">

            <span>{{item.categoryName}}</span>
          </li>
         
        

     </ul>

  </div>
  <!--右边-->

   <div class="classificationRight" >
      
        <Scroll
      ref="scroll"
      :autoUpdate="true"
   
      @pullingDown="loadRefresh"
      @pullingUp="loadMore">
             <ul  >

                <!--<router-link  v-for="(item,index)  in list" :key="index"
                >-->
                 <router-link v-for="(item,index) in list"  :key="index" 
                  :to="{path:'/productDetail',query:{productId:item.id}}" >
              <li >
            
                <span class="product">
                  <img v-lazy="item.productImgUrl"/>
                  </span>
                <!--右边-->
                <div class="productBoxclassification">
                  <span class="productBoxFont">{{item.productName}}</span>
                <!--<em class="brandBg"></em>-->
                  <p><em >￥</em><em style="margin:0 0.05rem ;">{{item.price}}</em><del>￥{{item.priceDiscount}}</del></p>
                </div>
            </li>
                 </router-link>
        </ul>
      
    </Scroll>



      
        
   </div>
   
 
</div>
</div>
</template>


<script type="text/ecmascript-6">

//  import store from './vuex/store.js'

import Scroll from "../../lib";
import { timeout } from "../../lib/Scroll/utils";
import {getHomeCategory} from 'api/index'
import {getCategoryOfProduct} from 'api/classification'
export default {

  //vuex
  // store,
  components: {
      Scroll
  },
  data() {
			return {
       bannerlist:[],
        list: [],
          a:1,  //第几页
        bottomTip: '查看更多',
        b:5,// 一页显示多少条,
        count:0,//总数,
        classificationIndex:0,
        t:'',
      //初始化无限加载相关参数
        queryLoading: false,
        moreLoading: false,
        //出现加载更多
        allLoaded: false,
         productVo:{
           categoryId:1,
            pageStar:1,//页码
             pagesize:6,//条数
          }


			}
      
		},
    
    computed:{
         
    },
  created(){
      
  },
   mounted() {
      //初始化数据
       
        this._getHomeCategory()
      },
   methods: {



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
     if(this.$store.state.login.city!=''){
this.productVo.city=this.$store.state.login.city
}else{
this.productVo.city='广州市'
}

          let param = new URLSearchParams();
          param.append("productVo",JSON.stringify(this.productVo));
      getCategoryOfProduct(param).then((res)=>{
              if(res.data.status==1){
                  console.log(typeof(res.data.data))
                _this.count =res.data.count;
                console.log(res.data.data)
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
     getCategoryOfProduct(param).then((res)=>{
              if(res.data.status==1){
                if(res.data.data.length>0){
                _self.list=_self.list.concat(res.data.data)
                
                }else{
                  return false
                }
              
            
             
              }
             })
      },
         // 分类接口
      _getHomeCategory(){
        getHomeCategory().then((res)=>{

             if(res.data.status==1){
               console.log()
                this.productVo.categoryId=    res.data.data[0].id
                     this.bannerlist=res.data.data
                 
               
                     this._getList()
                   
                    }
 
        })
        
      },
      // 二级分类切换
      classificationCheck(a,b){
         
          this.productVo.categoryId=a.id

          this.classificationIndex=b;
          this.list=[]
            this._getList()

      }
      
      
  }

}
</script>

<style scoped  lang="scss">

.classificationBox{
  width: rem(750);
   position: absolute;
    top: rem(100);
 bottom: 0;

   overflow: hidden;

 display: flex;
  
 
}
.classificationLeft{
  width: rem(170);
  box-sizing: border-box;

  background-color: #f6f6f6;
  ul li{
     padding: rem(32) 0;
  }
  ul li span{
    display: inline-block;
    width: 100%;
    height: rem(44);
   
    line-height: rem(44);
    text-align: center;
    vertical-align: middle;
    font-size: rem(28);
   
    
   
      color: #333;
     
    
   
  }
   ul li.active {
      background-color: #fff;
      font-weight: bold;
     span{
        border-left: 2px solid #09b980;
      color: #09b980;
      
     }
     
    }

}
.vue-slim-better-scroll{
   width: rem(750-170);
}
.classificationRight{
  width: rem(750-170);
  background-color: #fff;
  bottom: 0;
      bottom: 0;
    right: 0;
    position: relative;
  
 
  ul li{
     width: rem(750-170);
    border-bottom: 1px solid #f3f3f3;
    padding: rem(16) 0;
    overflow: hidden;
    p{
      margin-top: rem(25);
      em{
        font-size: rem(35);
        color: #09b980;
      }
      del{

        font-size: rem(22);
        color: #bfbfbf;
      }
    }
      .product{
        display: inline-block;
        float: left;
      
            margin-left: 0.2rem;
        width: rem(166);
        height: rem(166);
        text-align: center;
        img{
          max-width: 100%;
        }
      }
      .productBoxclassification{
       
          width: rem(330);
          overflow: hidden;
         
        margin-right: rem(15);
        float: right;
        p{
          text-align: left;
          margin-top: rem(68);
        }
        span{
          display: block;
        }
         .productBoxFont{
           margin-top: 0;

          font-size:rem(26);
      color: #333;
      width: rem(300);
      margin-bottom: 0.15rem;
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
         .brandBg{
          
           padding: rem(3) rem(17);
           color: #bfbfbf;
           font-size: rem(26);
           margin-top: rem(8);
           border-radius: rem(20);
           img{
             width: rem(25);
             vertical-align: rem(-2);
             margin-right: rem(5);
             height: rem(25);
           }

         }
      }
  }
}

</style>
