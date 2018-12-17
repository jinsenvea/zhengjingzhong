<template>
<div class="productBox" > 
              
                
                <router-link  v-for="(item,index)  in list" :key="index"
                 :to="{path:'/productDetail',query:{productId:item.id}}">
                    <div class="productBoxItem"  >
                     
                        <div class="productBoxItemList" :class="index%2==1?'fr':'fl'" >
                            <img class="productBoxItemListImg"  v-lazy="item.productImgUrl"/>
                            <p class="productListTitle">{{item.productName}}</p>
                            <p class="producmonyNum">
                          
                                <span class='producmonyFomt fl'>￥{{item.price}}</span>
                             
                            </p>

                        </div>
                     
                        

                    </div>
                </router-link>

</div>

</template>
<script type="text/ecmascript-6">

//  import store from './vuex/store.js'


export default {
  props:{
     
         list:{
           type:Array,
          default: null
        }
   },

  data() {
			return {
 
			}
      
		},
   
   
  created(){
    console.log(this.list)
   
  },
   mounted() {


	  
     
    },
   methods: {
     
          
    
   }
  ,
  beforeDestroy () {
    
  }

}
</script>

<style  lang="scss">
$baseFontSize: 75 !default;
@function rem($px) {
  @return $px / $baseFontSize * 1rem;
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
                 overflow: hidden;
                 text-align: center;
                 border-radius: rem(8);
                 margin-bottom: rem(18);
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
                     margin-top: rem(10);
                     
                 }

             }
     }
     .productBoxItemList:nth-of-type(even){
         float: right;
          }
         

    }

</style>
