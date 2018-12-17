<template>
    <div class="serachList">
        <!--热门搜索-->
        <div class="hotSearch">
             <span>
                 <img class="searchIcon" src="../../commom/img/search-02.png"/>热门搜索 
                 
                 
                 </span>
               <ul>
                   <li v-for="(item,index)  in searchList" :key="index">
                      <a  @click='hotSearchlist($event)'>{{item}}</a>

                   </li>
                  
                  
                  

               </ul>
        </div>
        <!--历史搜索-->
      
         <div class="hotSearch" v-if="historyList!=null">
             <span @click="remove"><img class="historyIcon" src="../../commom/img/search-01.png"/>历史搜索
              <img class="delIcon fr" src="../../commom/img/search-03.png"/>
              </span>
               <ul>
                   <li  v-for="(item,index)  in historyList" :key="index">
                     <a  @click='hotSearchlist($event)'>  {{item}}</a>
                </li>
                  
                  

               </ul>
        </div>


    </div>
</template>

<script>
    export default {
        data(){
            return{
             
            }
        },
   props:{
       searchList:{
           type:Array,
           default: null
        }
     },
      mounted() {
	   
      //  this.fleter();
     
    }, created(){
      
    //    this.historyList=this.$store.state.search.historyList.split(',')
    //   if( this.$store.state.search.historyList!=null && this.$store.state.search.historyList!=""){
    //          this.historyList=this.$store.state.search.historyList.split(',')
    //     }
     
     
  },
      
    computed: {
			historyList() {
            var _self=this;
             
               
        if( _self.$store.state.search.historyList!=null && _self.$store.state.search.historyList!=""){
           if(!Array.isArray(_self.$store.state.search.historyList)){
						_self.$store.state.search.historyList= _self.$store.state.search.historyList.split(',')
				         }

                    return  _self.$store.state.search.historyList;
        }
				
			}
		},

    	watch: {
            historyList(){
                var _self=this;
              
            
              
                  if(_self.$store.state.search.historyList!=null && _self.$store.state.search.historyList!=""){
                     if(!Array.isArray(_self.$store.state.search.historyList)){
						_self.$store.state.search.historyList= _self.$store.state.search.historyList.split(',')
				         }

                    return  _self.$store.state.search.historyList;

                  }else{
                     return [] ;
                  }
				
			
            }
        },
       
        methods: {
            hotSearchlist(e){
            
               this.$emit('searchTest',e.currentTarget.innerText)
               this.$store.dispatch('modifysearchListState',false);
            

            },
            // fleter(){
             
            //     if(this.$store.state.search.historyList.length>0){
            //        this.historyList=this.$store.state.search.historyList.split(',')
                     
            //     }
               
             
            // },
            remove(){
                 this.$store.dispatch('removehistoryList',[]);
                
            }
        }
       
        
    }
</script>

<style scoped lang="scss">
$baseFontSize: 75 !default;
@function rem($px) {
  @return $px / $baseFontSize * 1rem;
}
 .serachList{
     border-top: 1px solid #e3e3e3;
     width: rem(750);
     height: auto;
     overflow: hidden;
     .hotSearch{
         padding-top: rem(50);
         overflow: hidden;
      width: rem(693);
      margin: 0 auto;
      .historyIcon{
          width: rem(30);
          height: rem(30);
          vertical-align: rem(-5);
           margin-right: rem(20);
          margin-top: rem(20);
      }
      .delIcon{
          width: rem(32);
          height: rem(28); 
          vertical-align: rem(-5);
           margin-right: rem(20);
            margin-top: rem(20);
         
      }
      .searchIcon{
          width: rem(26);
          height: rem(32);
           vertical-align: rem(-5);
          margin-right: rem(20);
          margin-top: rem(5);
      }
      span{
          font-size: rem(30);
         
          color: #999;

      }
      ul{
          margin-top: rem(32);
          width: 100%;
          overflow: hidden;
          li{
               float: left;
             padding:rem(17) rem(35);
              text-align: center;
             
              background-color: #f6f6f6;
              color: #333;
              font-size: rem(26);
              border-radius: rem(220);
             
              margin-right: rem(18);
              margin-bottom: rem(20);
             a{
                  cursor: pointer;
             }

          }
      }
     }
 }  
</style>