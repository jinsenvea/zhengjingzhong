<template>

<div class="classificationBox">
  <!--左边-->
  <div class="classificationLeft">
     <ul>
          <li class="active">

            <span>厨房优选</span>
          </li>
          <li >

            <span>家居生活</span>
          </li>
          <li>

            <span>吃货一族</span>
          </li>
          <li>

            <span>清洁专区</span>
          </li>
          <li>

            <span>美妆个护</span>
          </li>
          <li>

            <span>2元专区</span>
          </li>
           <li>

            <span>9.9专区</span>
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
              <li v-for="item in list" >
            
                <span class="product">
                  <img :src="item.productImgUrl"/>
                  </span>
                <!--右边-->
                <div class="productBox">
                  <span class="productBoxFont">{{item.productName}}</span>
                <em class="brandBg"></em>
                  <p><em class="">￥</em><em style="margin:0 0.05rem ;">{{item.price}}</em><del>￥{{item.priceRaw}}</del></p>
                </div>
            </li>
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

import {getCategoryOfProduct} from 'api/classification'
export default {

  //vuex
  // store,
  components: {
      Scroll
  },
  data() {
			return {
       
        list: [],
          a:1,  //第几页
        bottomTip: '查看更多',
        b:5,// 一页显示多少条,
        count:0,//总数,
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
        this.loadRefresh()
      },
   methods: {

async loadRefresh() {
      this.productVo.pageStar= 1;
    
      this.list = await this._getList();
      // console.log(this.list);
    },
    async loadMore() {
       var self = this;

      self.productVo.pageStar=self.productVo.pageStar+1;
       
    //  this.pageIndex = this.pageIndex + 1;
      var data = await self._getList();
      console.log("this.pageIndex",   self.productVo.pageStar);
      console.log("data", data);
      self.list = self.list.concat(data);
      console.log(self.list)
    
      // this.count < this.list.length
      console.log(self.productVo.pageStar)
      console.log('判断临界'+self.productVo.pageStar *  self.productVo.pageSize )
       console.log('总条数'+  self.count )
      self.count <  self.productVo.pageStar *  self.productVo.pageSize
        ? self.$refs.scroll.update(true)
        : ""; // 判断是否已达最后一页?如果已是最后一页，可调用this.$refs.scroll.update(true)关闭上拉
      console.log(this.pageIndex);
      console.log(this.list.length);
    },


    
   async _getList() {
    await  timeout(500);
      var self = this;

      self.productVo.pageStar=self.productVo.pageStar+1;
         let param = new URLSearchParams();
         param.append("productVo",JSON.stringify(self.productVo));
  return   getCategoryOfProduct(param).then((res)=>{
              if(res.data.status==1){
                if(res.data.data.length>0){
            //    _self.list=_self.list.concat(res.data.data)
                   self.count =res.data.count;

      //   // return res.data.shopList;
      //   // console.log(res.data.shopList);
            return res.data.data;
                }else{
                  return false
                }
              
            
             
              }
             })

      // return listshops({
      //   pageIndex: this.pageIndex,
      //   pageSize: this.pageSize
      // }).then(res => {
      //   // var _this = this;
      //   // setTimeout(() => {
      //   // _this.content = res.data.shopList;
      //   _this.count = res.data.count;
      //   // return res.data.shopList;
      //   // console.log(res.data.shopList);
      //   return res.data.shopList;
      //   // }, 500);
      // });


    }
      
      
  }

}
</script>

<style scoped  lang="scss">
$baseFontSize: 75 !default;
@function rem($px) {
  @return $px / $baseFontSize * 1rem;
}
.classificationBox{
  width: rem(750);
   position: absolute;
    top: rem(109);
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
   
    
      font-style: rem(28);
      color: #333;
      font-weight: bold;
    
   
  }
   ul li.active {
      background-color: #fff;
     span{
        border-left: 2px solid #09b980;
      color: #09b980;
      
     }
     
    }

}
.classificationRight{
  flex: 1;
  
  bottom: 0;
  
 
  ul li{
    border-bottom: 1px solid #f3f3f3;
    padding: rem(16) 0;
    overflow: hidden;
    p{
      margin-top: rem(25);
      em{
        font-size: rem(28);
        color: #09b980;
      }
      del{

        font-size: rem(18);
        color: #bfbfbf;
      }
    }
      .product{
        display: inline-block;
        float: left;
        width: rem(166);
        height: rem(166);
        text-align: center;
        img{
          max-width: 100%;
        }
      }
      .productBox{
        margin-left: rem(20);
        float: left;
        span{
          display: block;
        }
         .productBoxFont{

          font-size: 0.34667rem;
      color: #333;
      width: rem(320);
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
