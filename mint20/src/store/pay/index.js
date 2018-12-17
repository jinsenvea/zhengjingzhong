

export default{
	state:{
	
			
		// 登录状态
		token:localStorage["token"]?localStorage["token"]:'',
		stateNum:localStorage["stateNum"]?localStorage["stateNum"]:'',
		orderState:0,
		wxOpenId:localStorage["wxOpenId"]?localStorage["wxOpenId"]:'',
		redirectPath:localStorage["redirectPath"]?localStorage["redirectPath"]:'',
		productID:localStorage["productID"]?localStorage["productID"]:'',
		orderlist:[],
		activINdex:localStorage["activINdex"]?localStorage["activINdex"]:0,
		totalPayNum:localStorage["totalPayNum"]?localStorage["totalPayNum"]:0,
		 
	},
  //注册
	mutations:{
		  	settotalPayNum(state,data){
				state.totalPayNum=data
					localStorage.setItem("totalPayNum",state.totalPayNum);		
			},
			//存入token    activINdex
			setToken(state,data){
				state.token=data
					localStorage.setItem("token",state.token);		
			},
			setactivINdex(state,data){
			
				state.activINdex=data
					console.log(9999)
					localStorage.setItem("activINdex",state.activINdex);		
			},
			
			setstateNum(state,data){
				state.stateNum=data
					localStorage.setItem("stateNum",state.stateNum);
			},
			//切换订单状态 productID
			modifyorderState(state,data){
			state.searchState=data
		  },
		  //存入openid
		  setwxOpenId(state,data){
			  state.wxOpenId=data
			  	localStorage.setItem("wxOpenId",state.wxOpenId);
		  },
		  //redirectPath
		   setredirectPath(state,data){
			  state.redirectPath=data
			  	localStorage.setItem("redirectPath",state.redirectPath);
		  },
		  steproductID(state,data){
            state.productID=data
		  },
		  setorderlist(state,data){
			 
			   state.orderlist.push(data);
         	
		  },
		  	//   清空订单列表
		delorderlist(state,data){
			 state.orderlist=[]
		}


	},
	//挂载
	  actions:{
		  //settotalPayNum
		    settotalPayNum(settotalPayNum,data){
				settotalPayNum.commit('settotalPayNum',data)
		  },
		  delorderlist(delorderlist){
				delorderlist.commit('delorderlist')
		  },
		  setToken(setToken,data){
			setToken.commit('setToken',data)
		},
		setactivINdex(setactivINdex,data){
			setactivINdex.commit('setactivINdex',data)
		},
		  modify(modify,data){
					modify.commit('modify',data)
	 	 },
		
			setstateNum(setstateNum,data){
			setstateNum.commit('setstateNum',data)
		},
		modifyorderState(modifyorderState,data){
			modifyorderState.commit('modifyorderState',data)
		},
		  setwxOpenId(setwxOpenId,data){
					setwxOpenId.commit('setwxOpenId',data)
	 	 },
		   setredirectPath(setredirectPath,data){
					setredirectPath.commit('setredirectPath',data)
	 	 },
		  steproductID(steproductID,data){
            steproductID.commit('steproductID',data)
		  },
		  setorderlist(setorderlist,data){
            setorderlist.commit('setorderlist',data)
		  },
	}

}  