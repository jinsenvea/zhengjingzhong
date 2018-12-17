<template>
<div class="contantwebdjask">
  <!--头部 hotTitlweekSelling-->
  <div class="bgimgrushedheader">
     <div class="dailyrushedheader">
       <!--本周热卖 bgimgrushedheader-->
       <img src='../../commom/img/carzyTitle.png'/>
       <!--呐及专区-->
     
       <span class="hotTitlweekSellingback" @click="routerback"></span>


     </div>
   
  </div>
  <div class="hotListweekSelling" style="background-color: #faf7f4;">
     <Scroll
             ref="scroll"
      :autoUpdate="true"
   
      @pullingDown="loadRefresh"
      @pullingUp="loadMore"
           >
        <ul>
          <router-link  v-for="(item,index)  in list" :key="index"
                 :to="{path:'/productDetail',query:{productId:item.id}}" >
          
            <li  >

                  <!--左边-->
                  <div class="left fl">
                    <img  v-lazy='item.productImgUrl'/>

                  </div>
                  <!---->
                  <div class="right fl">
                    <span class="fontSize">{{item.productName}}</span>
                    
                  <div class="rightItem">
                    <!--左边-->
                    <div class="rightItemleft">
                      <span class="delPrice"><del>￥{{item.priceDiscount}}</del></span>
                        <span class="normalPrice">￥{{item.price}}</span>
                    </div>
                  <p   class="rightItemRightbgimgrushedheader fr"> </p>
                   


                  </div>

                  </div>


                </li>
          </router-link>
             
                
                
        </ul>
        </Scroll>
  </div>

  
</div>



</template>


<script type="text/ecmascript-6">

//  import store from './vuex/store.js'
import Scroll from "../../lib";
import {getWeekHotSaleById} from 'api/index'
import {timeout} from "../../lib/Scroll/utils";
export default {

  //vuex
  // store,
  components: {
   Scroll
  },
  data() {
			return {
         list:[],
         rightInajizhuanquState:false,
         productVo:{
           bannerId:this.$route.query.actAdvId,
            pageStar:1,//页码
             pagesize:5//条数
          },

			}
      
		},
    
    computed:{
         
    },
  created(){
    this._getList()
      if(this.$route.query.num){
        if(this.$route.query.num==1){
          this.rightInajizhuanquState=true
        }else{
          this.rightInajizhuanquState=false
        }
      }

  },
   mounted() {
	   
     
    },
   methods: {
 routerback: function () {
      this.$router.back(-1)
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


if(this.$store.state.login.city!=''){
this.productVo.city=this.$store.state.login.city
}else{
this.productVo.city='广州市'
}


    
     var _this=this;
     let param = new URLSearchParams();
          param.append("productVo",JSON.stringify(this.productVo));
      getWeekHotSaleById(param).then((res)=>{
              if(res.data.status==1){
              
                
                _this.count =res.data.count;
               
                this.list= res.data.data;
                console.log( res.data.data)
                
              }
             })
          

      },
  async    more(){
      await timeout(1000);
        var _self=this;
          this.productVo.pageStar=this.productVo.pageStar+1;
         let param = new URLSearchParams();
         param.append("productVo",JSON.stringify(this.productVo));
          getWeekHotSaleById(param).then((res)=>{
                    if(res.data.status==1){
                      if(res.data.data.length>0){
                      _self.list=_self.list.concat(res.data.data)
                      
                      }else{
                        return false
                      }
                    
                  
                  
                    }
                  })
      }
 
   
  }

}
</script>

<style lang="scss">
@import '../../assets/weekSellingdjsghja'


</style>
