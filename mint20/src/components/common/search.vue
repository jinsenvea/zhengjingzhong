<template>
   <div class="content">
      <div class="search" 
      :style="this.$store.state.search.searchState>1?'  background-color:#09b980; ':'border-bottom:none;'" >
       <input type="text" placeholder="请搜索商品" class="searchIpt" 
        v-model='searchText'  @focus="gochange(2,'/search')"
 v-on:input="searchProductByAntistop()">
 <!--跳转分类-->
       <img v-if="this.$store.state.search.searchState==1"  src="../../assets/images/search_05.png" alt="" class="seachMore"
        @click="gosearch(3,'/search')">
       <img src="../../assets/images/search1_03.jpg" alt="" class="seachImg">
       <span v-if="this.$store.state.search.searchState>1" class="seachFont"  @click="goseadshrch(1,'/')" >取消</span>
       
    </div>
    <!--分类-->
    <classification  v-if="this.$store.state.search.searchState==3&&this.$route.query.searchStateNum!=''"/>
    <!--搜索列表-->
    <listings 
     v-if="this.$store.state.search.searchState==2&&this.$store.state.search.searchListState==false"
      :list="list" />
    <!--历史-->
    <SearchList 
    v-on:searchTest="searchne"
    v-if="this.$store.state.search.searchListState" 
    :searchList="searchList"


    />
    <!--无数据-->
    <div class="searbg" v-if="nodata">
        

    </div>
    
   </div>
</template>

<script>
import SearchList from "../common/searchList.vue";
import listings from "../classification/listings.vue";
import classification from "../classification/classification.vue";
import {commonParams} from 'api/config';
import {timeout} from "../../lib/Scroll/utils";
import {searchProductByAntistop,getHotSearchAll} from 'api/classification'

    export default {
         data(){
            return{
                list:[],
                searchList:[],
               nodata:false,
                t:'',
                searchText:'',
                classificationState:true,
                listingsState:false,
                searchcity:''
            }
        },
       components: {
            SearchList,
            classification,
            listings
        },
        
 created(){
    
        this.getHotSearchAll();
     
   if(this.$route.query.searchStateNum==""||typeof(this.$route.query.searchStateNum)=='undefined'){
   
        this.$store.state.search.searchState=1

       this.$store.state.search.searchListState=false
   }

       
        
  },
       
        methods: {
             gochange(a,b){
                 this.$store.dispatch('modifysearchListState',true);
                  this.$store.dispatch('modify',a);
                //   this.$router.push(b)    this.$route.query.searchStateNum
                 this.$router.push({path:b,query:{searchStateNum:3}})
               
             
            },
            searchne(data){
                this.searchText=data;
                this.searchProductByAntistop()

            },
            gosearch(a,b){
                this.$store.dispatch('modify',a);
               this.$store.dispatch('modifysearchListState',false);
            
                 this.$router.push({path:b,query:{searchStateNum:3}})
              

            },
            goseadshrch(a,b){
                        this.$store.dispatch('modify',a);
               this.$store.dispatch('modifysearchListState',false);
                 this.$router.push({path:b,query:{searchStateNum:""}})
            },
            //搜索
            searchProductByAntistop(){
                 //  this.$store.dispatch('modify',2);
if(this.$store.state.login.city!=''){
this.searchcity=this.$store.state.login.city
}else{
this.searchcity='广州市'
}
                console.log(333)
                var _self=this;
                 _self.list=[];
                 _self.nodata=false
            //  _self.$store.dispatch('addhistoryList',this.searchText)
      if(this.$store.state.search.searchState==2){
                
                     if(_self.searchText.length>0){
                         _self.$store.dispatch('modifysearchListState',false);
                     searchProductByAntistop(commonParams.searxhshopsParams({antistop:this.searchText,city:this.searchcity})).then((res)=>{
                           if(res.data.status==1){
                             if(JSON.stringify(res.data.data) === '[]'){
                                this.$store.dispatch('modify',2);
                                this.nodata=true
                             }else{
                                  _self.list=res.data.data;
                                   _self.$store.dispatch('addhistoryList',this.searchText)
                             }
                                   
                                    

                           }
                       })
                }else{
                    _self.$store.dispatch('modifysearchListState',true);
                 _self.getHotSearchAll()
               }         
               
                }else{
                        this.$store.dispatch('modify',2);
                }
              

            },
            //热门搜索
            getHotSearchAll(){
                var _self=this;
           if(_self.$store.state.search.searchListState){
               getHotSearchAll().then((res)=>{
                    if(res.data.status==1){
                         _self.searchList=  res.data.data
                    }
                 
                    })

                }
            }

       }
}
</script>

<style scoped lang="scss">


$baseFontSize: 75 !default;
@function rem($px) {
  @return $px / $baseFontSize * 1rem;
}
.content{
    
   
}
    .search{
        width:rem(750);
         position: relative;
        background:#fff;
        padding:rem(16) 0.4rem;
       
        box-sizing: border-box;
        justify-content:space-between;
        align-items:center;
      
        // justify-content:center;
        .searchIpt{
            width:8.25rem;
            height:rem(70);
            border-radius:rem(5);
            background-color: #f6f6f6;
           font-size: rem(30);
           
           color: #333;
            border:none;
            padding-left: rem(70);
            box-sizing: border-box;
        }
        .seachMore{
            float: right;
            height: rem(30);
            width: rem(40);
            margin-left: rem(10);
          margin-top: 0.25rem;
           
            
        }
        .seachFont{
             font-size: rem(30);
            color: #fff;
                float: right;
    margin-top: 0.25rem;
        }
        .seachImg{
            width: rem(32);
            height: rem(30); ;
            position: absolute;
            top: rem(38);
            left: rem(55);
        }
    }
    .classification{
        border-bottom: 1px solid #e3e3e3;
        position: fixed;
        
       
    }
   .searbg{
       width: rem(362);
       height: rem(200);
       background: url('../../commom/img/nosearch.png') center center no-repeat;
       background-size: contain;
       margin: rem(100) auto;

   } 
</style>