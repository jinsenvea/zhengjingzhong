import Vue from 'vue';

export default{
	state:{
		goodsList:localStorage["goodsList"]?localStorage["goodsList"]: [],
		//curIndex:''  
    delstate:true
	},
		//挂载
actions:{
     
		//加入购物车
		modifyShopping(modifyShopping,data){
			modifyShopping.commit('modifyShopping',data)
		},
    modifyShoppingNum(modifyShoppingNum,{id,productAmount}){
        modifyShoppingNum.commit('modifyShoppingNum',{id,productAmount})
    },
    //添加集合
    addShopCartList(addShopCartList,data){
              addShopCartList.commit('addShopCartList',data)
    },
    //修改编辑和删除按钮
    changeState(changeState,data){
    
      changeState.commit('changeState',data)

    },
    //deleteGoods
      deleteGoods(deleteGoods,data){
    
      deleteGoods.commit('deleteGoods',data)

    },


  },
  //注册
	mutations:{
     //修改购车数量
    modifyShoppingNum(state,{id,productAmount}){
      console.log(state.goodsList)
      var data=JSON.parse(state.goodsList)
    
    data.forEach(el=>{
        if(el.productId == id){
         //修改
          el.productAmount= productAmount;
			 localStorage.setItem("goodsList", JSON.stringify(data))
          return;
        }
      });
    },
		//加入购物车
	modifyShopping(state,data) {
      // 这里有个坑
      let flag = true;
      console.log(data);
  //   
     //判断是否第一次添加
  
      if(state.goodsList.length==0){
       
        state.goodsList.push(data);
        
        localStorage.setItem("goodsList",JSON.stringify(state.goodsList));
        return;
      }else{
//第二次添加数据
console.log(9999)
         state.goodsList = JSON.parse(localStorage.getItem('goodsList'));
        state.goodsList.forEach(el=>{
        if(el.productId == data.productId){
         //修改
          el.productAmount=el.productAmount+data.productAmount;
           flag = false;
          return;
        }
      });
      if(flag){
        state.goodsList.push(data);
      }
      Vue.set(state.goodsList,data);
      // 全局的状态修改之后, 记得在本地持久化存储一下, 这样刷新页面或者关闭重开页面数据不会丢失
      //   localStorage.setItem('shopping', JSON.stringify(state.shopping));
      localStorage.setItem("goodsList", JSON.stringify(state.goodsList));

      }
  
       
    
    },

   //添加购物车大集合
   addShopCartList(state,data){
        state.goodsList=data
          localStorage.setItem("goodsList", state.goodsList);
   },
//删除本地数据
		deleteGoods(state,index){
   state.goodsList = JSON.parse(localStorage.getItem('goodsList'));
			state.goodsList.splice(index,1);		
			localStorage.setItem("goodsList",JSON.stringify(state.goodsList));
		},
	//更新相应购物车数据	
		updateGoods(state,data){
			const {index,key,value}=data;
			state.goodsList[index][key]=value;	
			localStorage.setItem("goodsList",JSON.stringify(state.goodsList));
		},
    //修改编辑和删除按钮
    changeState(state,data){
      state.delstate=data

    }
	}
}