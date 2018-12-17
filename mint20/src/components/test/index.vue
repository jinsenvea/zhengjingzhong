<template>
    <div class="contant">
        <div class="bgimg">
           
              <div class="header">
                  <img src='../../commom/img/carzyTitle.png'/>
                  <span class="back"></span>


             </div>
        </div>

        <!--pro-->
        <div class="hotList">
          <ul>
          
            <li>

               <div class="productBoxItemList">
                    <img class="productBoxItemListImg"  src="../../commom/img/products-04.jpg"/>
                    <p class="productListTitle">不锈钢多功能圆形晾内衣不锈钢多功能圆形晾内衣不锈钢多功能圆形晾内衣不锈钢多功能圆形晾内衣不锈钢多功能圆形晾内衣不锈钢多功能圆形晾内衣袜架30夹 只售黄埔</p>
                    <p class="producmonyNum">
                      
                        <span class='producmonyFomt fl'>¥28.00</span>
                        
                    </p>

                </div>
            </li>
             <li>

               <div class="productBoxItemList">
                    <img class="productBoxItemListImg"  src="../../commom/img/products-04.jpg"/>
                    <p class="productListTitle">不锈钢多功能圆形晾内衣不锈钢多功能圆形晾内衣不锈钢多功能圆形晾内衣不锈钢多功能圆形晾内衣不锈钢多功能圆形晾内衣不锈钢多功能圆形晾内衣袜架30夹 只售黄埔</p>
                    <p class="producmonyNum">
                      
                        <span class='producmonyFomt fl'>¥28.00</span>
                        
                    </p>

                </div>
            </li>
             <li>

               <div class="productBoxItemList">
                    <img class="productBoxItemListImg"  src="../../commom/img/products-04.jpg"/>
                    <p class="productListTitle">不锈钢多功能圆形晾内衣不锈钢多功能圆形晾内衣不锈钢多功能圆形晾内衣不锈钢多功能圆形晾内衣不锈钢多功能圆形晾内衣不锈钢多功能圆形晾内衣袜架30夹 只售黄埔</p>
                    <p class="producmonyNum">
                      
                        <span class='producmonyFomt fl'>¥28.00</span>
                        
                    </p>

                </div>
            </li>
             <li>

               <div class="productBoxItemList">
                    <img class="productBoxItemListImg"  src="../../commom/img/products-04.jpg"/>
                    <p class="productListTitle">不锈钢多功能圆形晾内衣不锈钢多功能圆形晾内衣不锈钢多功能圆形晾内衣不锈钢多功能圆形晾内衣不锈钢多功能圆形晾内衣不锈钢多功能圆形晾内衣袜架30夹 只售黄埔</p>
                    <p class="producmonyNum">
                      
                        <span class='producmonyFomt fl'>¥28.00</span>
                        
                    </p>

                </div>
            </li>
              
          </ul>
             <!--没有更多商品-->
      

        </div>
        
          <div class="noMore" style="display:none;">没有更多商品</div>
      
    </div>
</template>

<script>
export default {
  data() {
    return {
      hotItemList: [
        {
          src: "",
          title: "不锈钢不锈钢不锈钢不锈钢不锈钢不锈钢不锈",
          price: "28.00"
        },
        {
          src: "",
          title: "不锈钢不锈钢不锈钢不锈钢不锈钢不锈钢不锈",
          price: "28.00"
        },
        {
          src: "",
          title: "不锈钢不锈钢不锈钢不锈钢不锈钢不锈钢不锈",
          price: "28.00"
        },
        {
          src: "",
          title: "不锈钢不锈钢不锈钢不锈钢不锈钢不锈钢不锈",
          price: "28.00"
        }
      ]
    };
  },
  created() {
  },
  methods: {
  }
};
</script>

<style scoped lang="scss">
$baseFontSize: 75 !default;
@function rem($px) {
  @return $px / $baseFontSize * 1rem;
}
.contant{
height: 100%;
  background-color: #faf7f4;
  position: relative;
}
.bgimg {
  width: rem(750);
  height: rem(300);
  background: url('../../commom/img/carzy.png') center center no-repeat;
  background-size:cover;
   .header{
    padding: rem(30) 0;
    text-align: center;
    img{
      height: rem(52);
      width: rem(230);
    }

  }
}
.back{
  position: absolute;
  background: url('../../commom/img/back.png') center center no-repeat;
  width: rem(18);
  height: rem(24);
  left: rem(30);
  top: 0.58rem;
  background-size: contain;

}

  
.hotList{
  width: rem(710);
  border-radius: rem(10);
  margin-left: rem((-710/2));
  left: 50%;
   position: absolute;
   top: rem(160);
   bottom: 0;
   
   background-color: #ffffff;
   ul li{
     width: 49.6%;
     float: left;
     border-right: 1px solid #e5e5e5;
     border-bottom: 1px solid #e5e5e5;
     height: rem(495);
     text-align: center;
   }
    ul li:nth-of-type(even){
       border-right:none;


   }
     ul li:nth-last-child(1), ul li:nth-last-child(2){
 border-bottom:none;
     }
 }

  .productBoxItemList{
                 width: 100%;
               
                 height: rem(498);
                 text-align: center;
              
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
                     margin:0 auto;
                     margin-top: rem(30);
                      width: rem(293);
                      overflow: hidden;
                        
                          .producmonyFomt{
                              font-size: rem(35);
                              color: #09b980;
                              margin-left: rem(5);
                              margin-top: rem(2);

                          }
                       

                 }
                 .productBoxItemListImg{
                     height: rem(300);
                     width: 100%;
                     margin-top: rem(10);
                     margin-bottom: rem(18);
                     
                 }

             }
</style>