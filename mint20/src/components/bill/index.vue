<template>
<div class="billBOxdds">
  
<!--<headerConmon/> -->
<!--选择账单-->
 <div class="billTimeBox">
    <div class="billBoxItem">
       <!--左边-->
       <div class="fl" @click="popup(true)">
         <span>{{billState}}</span>
         <span ><img class="unselected" src="../../commom/img/unselected.png"/></span>

       </div>
       <div>

       </div>
       <!---->
        <div class="midbill">

        </div>
       <!---->
        <div class="fr"  @click="timeShow(true)">
         <span>{{timeState}}</span>
         <span ><img class="unselected" src="../../commom/img/unselected.png"/></span>

       </div>


    </div>
    <!--收入信息  -->
  

 </div>

  <div class="timeBoxItemd">
      <span>{{timeBoxItemdDayNume}}</span>
       <span>支出￥{{billListTotal.outTotal}}<em style="margin-left:.3rem;">收入￥{{billListTotal.inTotal}}</em></span>
      
    </div>
    <!--账单列表   billList-->
    <div class="billListBox">
      <Scroll
       ref="scroll"
      :autoUpdate="true"
   
      @pullingDown="loadRefresh"
      @pullingUp="loadMore"
      >
      <ul class="billRecode">
          <!--<router-link :to="{path:'/billDetail',query:{tid:item.id,transactionType:item.transactionType}}"  v-for="(item,index) 
           in billList" :key="index">-->
        <li  v-for="(item,index) 
           in billList" :key="index" @click="otherShow(item)">
          <!--左边-->
          <span>
             <img class="billeLILeft" v-if="item.transactionType == 0" src='../../commom/img/icon-income.png'/>
              <img class="billeLILeft" v-else-if="item.transactionType == 1" src='../../commom/img/iconwithdrawal.png'/>
               <img class="billeLILeft" v-else-if="item.transactionType == 4" src='../../commom/img/icon-shopping.png'/>
                <img class="billeLILeft" v-else-if="item.transactionType!=0&& item.transactionType!=1&&item.transactionType!=4" 
                src='../../commom/img/icon-other.png'/>
             </span>
             <!--右边-->
             <div class="billRights fr">
               <!--左边-->
               <div class="bilisLefrg fl">
               
                 <span class="shopingFint"  v-if="item.transactionType == 0" >商城购物</span>
                   <span class="shopingFint" v-else-if="item.transactionType == 1" >提现</span>
                     <span class="shopingFint"  v-else-if="item.transactionType == 4" >投放收入</span>
              <span class="shopingFint" v-else-if="item.transactionType!=0&& item.transactionType!=1&&item.transactionType!=4" >其他</span>
                 <span class="billTimeFont" style="color:#999999;">{{item.createTime}}</span>

               </div>

                <span class="fr shopirightngFint "  v-if="item.transactionType == 0" >-{{item.amount}}</span>
                   <span class="fr shopirightngFint "  v-else-if="item.transactionType == 1" >-{{item.amount}}</span>
                     <span class="fr shopirightngFint "  v-else-if="item.transactionType == 4" >{{item.amount}}</span>
                       <span class="fr shopirightngFint " 
                       :class="item.transactionType!=0&& item.transactionType!=1&&item.transactionType!=8?'addClodbILL':''"
                        v-else-if="item.transactionType!=0&& item.transactionType!=1&&item.transactionType!=8" >+{{item.amount}}</span>
               <!--<span class="fr shopirightngFint addClodbILL">-312</span>-->

             </div>

        </li>
          <!--</router-link>-->
      </ul>

      </Scroll>
    </div>

    <!--账单结束-->

      <!--弹出-->
       <!--查询类型-->
     
     
 <mt-popup v-model="popupAgeNum"  position="bottom" modal='true' closeOnClickModal='true'>
  <slot>
     <div class="addressListBox">
          <div class="addressList">
                <!--标题-->
             <div class="adressTitle">

               <span class="font">选择类型</span>
               <span class="adressRight">
                 <img  @click="popup(false)" class="img"
                src='../../commom/img/btn_cancel.png' /></span>
                    <ul class="addressAgeBox">
                      <li  v-for="(item,index) in ageList" :key="index" 
                      :class="regAitive==index?'regAitive':'regAitiveNormal'"
                       @click="addressAgeBox(index,item.age)"
                      >

                        {{item.age}}
                      </li>
                      
                    </ul>
                   

             </div>

          </div>
      
    </div>
  </slot>
        
</mt-popup>
  <!--选择时间-->
  <!--省市区-->
    <mt-popup v-model="popupVisible" position="bottom" modal='true' closeOnClickModal='true'>
      <!---->
      <div class="proCityArea">
        <!--头部标题 switchvalue @click="cancelbuttonnow"-->
          <div class="proCityAreaTitle">
            <span class="fl" @click="timeShow(false)" >取消</span>
             <span class="fr" style="color:#09b980;" @click="sureTimebill">确定</span>


          </div>
          <!--timeListIndex-->
          <div class="proCityAreaList">
              <ul  >
                <li   v-for="(item,index) in timeList" :key="index" 
                      :class="timeListIndex==index?'timeListIndexActive':'regAitiveNormal'"
                       @click="timeListIndexActive(index,item.age)">{{item.age}}</li>
               
              </ul>
       </div>
        
          <!--显示时间    pickerYear   pickerDay -->
          <mt-picker :slots="years" @change="yearsChange"   class="picker" 
           :class="!yearState?'':(yearState&&!dayState?'pickerYear':(yearState&&dayState?'pickerDay':''))"
           ></mt-picker>
          <mt-picker :slots="months"  @change="monthsChange" class="picker" v-if="yearState"
           :class="!yearState?'':(yearState&&!dayState?'pickerYear':(yearState&&dayState?'pickerDay':''))">
           </mt-picker>
          <mt-picker :slots="days" @change="daysChange"  class="picker" v-if="yearState&&dayState" 
          :class="!yearState?'':(yearState&&!dayState?'pickerYear':(yearState&&dayState?'pickerDay':''))"></mt-picker>


      </div>
    </mt-popup>
      <!--结束-->
       <div class="searbillbg" v-if="listState">
        
没有相应的账单记录，请重新查询
    </div>
</div>



</template>


<script type="text/ecmascript-6">

import Scroll from "../../lib";
import {timeout} from "../../lib/Scroll/utils";
import headerConmon from '../headerConmon/index';
import {pageTransactionFlowingCondition} from 'api/login'
import {commonParams,ERR_OK} from 'api/config'
export default {


  data() {
			return {
      popupAgeNum:false,
       ageList:[{age:'全部'},{age:'收入'},{age:'支出'}],
         timeList:[{age:'按年查询'},{age:'按月查询'},{age:'按日查询'}],
        regAitive:0,
        timeListIndex:0,
        popupVisible:false,
        year:"",
        yearState:false,
        dayState:false,
        listState:false,
        billState:"全部",
        timeState:"时间",
        timeBoxItemdDayNume:'',
        month:'',
        day:'',
        count:'',
        billList:[],
        billListTotal:[],
        yearArr:[],
        years:[
            {
            values:[]
          }
          ],
            months:[{
            values:[]
          }],
            days:[{
            values:[]
          }],
          webPageAble:{
            data:{
              
            },
            pageNumber:0,//当前页码
            pageSize:5,
          }
			}
      
		},
    
  components: {
 headerConmon,
 Scroll
 
  },
  created(){
this.InitializeTime()
this._getList()
  },
   mounted() {
	   this.timeBoxItemdDayNume=new Date().getFullYear();
     
    },
   methods: {
     otherShow(item){
       //:to="{path:'/billDetail',query:{tid:item.id,transactionType:item.transactionType}}"  v-for="(item,index) 
            if(item.transactionType!=0&& item.transactionType!=1&&item.transactionType!=4){
               this.$store.dispatch('toast',"功能开发中");
            }else{
                this.$router.push({path:'/billDetail',query:{tid:item.id,transactionType:item.transactionType}})
            }
     },
      timeShow(a){
        this.popupVisible=a
      },
     InitializeTime(){
      
       var _this=this
      console.log(typeof(_this.years.values))
           const date = new Date()
        for (let i = 1990; i <= date.getFullYear(); i++) {
     
       _this.years[0].values.push(i)
      
        }

        for (let i = 1; i <= 12; i++) {
          _this.months[0].values.push(i)
        }

        for (let i = 1; i <= 31; i++) {
          _this.days[0].values.push(i)
        }
     },


   yearsChange(picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
      this.year=values[0]
   
    },
                 
  
     monthsChange(picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
      this.month= values[0]
    },
     daysChange(picker, values) {
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
       this.day=values[0]
    },
     popup(a){
        this.popupAgeNum=a
      },
  async    addressAgeBox(a,b){

              this.regAitive=a
              this.billState=b
             this.webPageAble.pageNumber=0;

              this._getList()
               await timeout(300);
               this.popupAgeNum=false

    },
     timeListIndexActive(a,b){
        this.timeListIndex=a
        if(a==1){
         
          this.yearState=true
            this.dayState=false
         
          
        }else if(a>1){
        this.dayState=true
         this.yearState=true
         
        }else{
           this.dayState=false
               this.yearState=false
                
        }
   
      },
      sureTimebill(){
        this.popupVisible=false
        
        if(  this.timeListIndex==0){
                this.timeState=this.year
             }else if( this.timeListIndex==1){
              this.timeState=this.year+"-"+this.month
             }else{
            this.timeState=this.year+"-"+this.month+"-"+this.day
             }
              this.timeBoxItemdDayNume= this.timeState
             this._getList()
      },


       async  _getList(){

         if(this.timeState=="时间"){
             this.webPageAble.data.createTime=new Date().getFullYear();
         }else{
            this.webPageAble.data.createTime=this.timeState
         }
       //0 收入 1支出
      if(this.regAitive==0){
          this.webPageAble.data.expendOrIncome = "";
      }else {
       this.webPageAble.data.expendOrIncome =this.regAitive-1;

      }
     

        pageTransactionFlowingCondition(commonParams.searxhshopsParams({
         webPageAbleStr:JSON.stringify(this.webPageAble),token:this.$store.state.login.token
          })).then((res)=>{
          console.log(res)
          if(res.data.status==1){
                console.log(res)
             if(res.data.data.data.length>0){
                this.listState=false
            //  this.billListNume=

            console.log(res.data.data)
            this.billListTotal=res.data.data
               this.billList=res.data.data.data
               //.data
             this.count=res.data.data.count
                
                }else{
                   this.billList=[]
                   this.listState=true
                  return false
                }
           
            
          }
        })
      },
        
      //测试
     async    loadRefresh() {
     
        await timeout(1000);
         this.webPageAble.pageNumber=0;
         this.billList =this._getList();
    
      },
     async  loadMore() {
        this.count < this.webPageAble.pageNumber *this.webPageAble.pageSize? this.$refs.scroll.update(true): ""
        this.more();
    
        
      },

 
  async    more(){
      await timeout(1000);
        var _self=this;
          this.webPageAble.pageNumber= this.webPageAble.pageNumber+1;
         pageTransactionFlowingCondition(commonParams.searxhshopsParams({
         webPageAbleStr:JSON.stringify(this.webPageAble),token:this.$store.state.login.token
          })).then((res)=>{
              if(res.data.status==1){
                if(res.data.data.data.length>0){
                   this.listState=false
                
                
              _self.billList=_self.billList.concat(res.data.data.data)
           
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
 @import '../../assets/productDetail';
.billTimeBox{
  width: rem(750);
  height: rem(80);
  margin: 0 auto;
  overflow: hidden;
  text-align: center;
  background-color: #09b980;
  color: #fff;
  font-size: rem(32);
  .billBoxItem{
    width: rem(546);
    margin: 0 auto;
    margin-top: rem(20);
    
    position: relative;
    text-align: center;
  }
  .unselected{
  width: rem(18);
  height: rem(9);
  vertical-align: middle;
  margin-left: rem(5);
  }
}
   .searbillbg{
       width: rem(500);
       height: rem(200);
     color: #999;
     font-size: rem(32);
       background-size: contain;
   
           position: absolute;
    z-index: 300;
    top: rem(-100/2);
    margin-left: rem(-500/2);
    left: 50%;
    top: 33%;

   } 
.timeBoxItemd{
  width: rem(750);
 padding: rem(20) ;
  
  background-color: #f4f8f4;
  color: #999999;
  span{
    display: block;
    margin-bottom: rem(12);
  }
  font-size: rem(24);
}
.billListBox{
  width: rem(750);
  height: auto;
  position: absolute;
  background-color: #fff;
      top: 2.66667rem;
  
 bottom: 0;
  ul li{
    padding: rem(32) 0;
  }



}

.billeLILeft{
  width: rem(84);
  height: rem(84);
  margin-left: rem(30);
}
.billRights{
  width: rem(622);
  border-bottom: 1px solid #e2e2e2;
  padding-bottom: rem(40);
  overflow: hidden;
  
}
.bilisLefrg{
  span{
    display: block;

  }
}
.shopingFint{
  font-size: rem(32);
  color: #000;
  margin-bottom: rem(20);
}
.shopirightngFint{
  font-size: rem(32);
  color: #000;
  font-weight: bold;
  margin-right: rem(30);
}
.billTimeFont{
  font-size: rem(24);
  color: #999;
}
.addClodbILL{
  color: #ff701a;
}
.billBOxdds{
  background-color: #f4f8f4;
  height: 100%;
}


.billRecode :last-child .billRights{
   border:none;
 }
 .midbill{
   position: absolute;
   border-left: 1px solid #fff;
   width:rem(2);
   height: rem(30);
   z-index: 10;
   left: 50%;
   margin-left:rem(-2);

 }
   .addressAgeBox{
    width: rem(700);
    margin: rem(80) auto;
    margin-left: rem(44);
    overflow: hidden;
    li{
     
      width: rem(160);
      height: rem(63);
      text-align: center;
      line-height: rem(63);
      margin-right: rem(60);
      border-radius: rem(10);
     
      font-size: rem(30);
      float: left;
      margin-bottom: rem(40);

    }

  }
  .regAitive{
    background-color: #3ac799;
    color: #fff;
    border: 1px solid transparent;
  }
  .areaListBoxName{
      width: rem(700);
      height: rem(450);
    margin: 0 auto;
    margin-top: rem(50);
   
    overflow-x: hidden;
    overflow-y: auto;
    li{
        border-radius: rem(10);
     padding: rem(15); 
     margin-bottom: rem(20);
    
     width: 40%;
     font-size: rem(20);
     text-align: center;
     float: left;
    }
  }
    .regAitiveNormal{
     border: 1px solid #d2d2d2;
       color: #000;
  }
.proCityArea {
  width: 10rem;
  height: 7.5rem;
  bottom: 0;
  left: 0; }
  .proCityAreaTitle {
    width: 9.33333rem;
    height: 0.93333rem;
    margin: 0.4rem;
    color: #333;
    font-size: 0.4rem;
}
.proCityAreaList{
  width: rem(750);
  text-align: center;
  ul{
    width: rem(690);
    margin: 0 auto;
   
  }
  ul li{
    width: rem(173);
    height: rem(52);
    margin-right: rem(78);
    line-height: rem(52);
    color: #2a2a2a;
    font-size: rem(28);
    border: 1px solid #d0d0d0;
    float: left;
    border-radius: rem(220);

  }
   ul li:last-child{
     margin-right: 0;
   }
      ul li.timeListIndexActive{
   background-color: #3ac799;
    color: #fff;
    border: 1px solid transparent;
}
}
.picker{
  width: 100%;
  text-align: center;
  float: left;
}
.pickerYear{
  width: 50%;
}
.pickerDay{
  width: 33.3%;
}
</style>
