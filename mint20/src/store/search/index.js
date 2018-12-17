

export default{

	
	state:{
	
		historyList:localStorage["historyList"]?localStorage["historyList"]: [],  
		searchState:1,
		searchText:'',
		searchListState:false
		 
	},
  
	mutations:{
		  	modify(state,data){
			state.searchState=data
		  },
		
			 	modifyText(state,data){
			state.searchText=data
		
		  },
		
			modifysearchListState(state,data){
				state.searchListState=data
			},
		
			addhistoryList(state,data){
				
				 if(!Array.isArray(state.historyList)){
						state.historyList = state.historyList.split(',')
				 }
					if(state.historyList.length>=6){
 						state.historyList.splice(state.historyList.length-1,1);
						console.log(state.historyList)
				}else{
					 state.historyList.splice(0,0,data)
				}
				localStorage.setItem("historyList",state.historyList);		
		
			},
		
		removehistoryList(state,data){
				state.historyList=data;
			 localStorage.removeItem("historyList");
		}
			


	},
	//挂载
	  actions:{
     //修改 searchState
      modify(modify,data){
					modify.commit('modify',data)
	 	 },
		  modifyText(modifyText,data){
			modifyText.commit('modifyText',data)
	 	 },
			modifysearchListState(modifysearchListState,data){
				modifysearchListState.commit('modifysearchListState',data)
			},
				//历史搜索
				addhistoryList(addhistoryList,data){
					addhistoryList.commit('addhistoryList',data)

				},
					//清除本地缓存  localStorage.removeItem(TOKEN_KEY);
		removehistoryList(removehistoryList,data){
			
			 	removehistoryList.commit('removehistoryList',data)
		}


  }

}