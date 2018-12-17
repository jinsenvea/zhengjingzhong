import {getValidateCodeBybase,getAuthCode} from 'api/login'
import {commonParams} from 'api/config'
//全局提示组件
import { Toast } from 'mint-ui';
//loading
import { Indicator } from 'mint-ui';

export default{
	state:{
	
			
		// 登录状态
		token:localStorage["token"]?localStorage["token"]:'',
		stateNum:localStorage["stateNum"]?localStorage["stateNum"]:'',
		// 存入用户openId
		openId:localStorage["openId"]?localStorage["openId"]:'',
		//倒计时
		codeState:false, //获取验证吗为true
        codeMsg: '获取验证码',
        // 是否禁用按钮
        codeDisabled: false,
		  // 倒计时秒数
  		countdown: 60,
		 // 定时器
  		timer: null,
		  //图形验证地址
	    verifyPhone:'',
		// loading 状态
		najizhuanqu:localStorage["najizhuanqu"]?localStorage["najizhuanqu"]:'',
		city:localStorage["city"]?localStorage["city"]:'',
		codeString:localStorage["codeString"]?localStorage["codeString"]:'',
		//保存用户手机号码
		phonetkj:localStorage["phonetkj"]?localStorage["phonetkj"]:'',
		
		
	
		
	},
  //注册
	mutations:{

setphonetkj(state,data){
				state.phonetkj=data;
				localStorage.setItem("phonetkj",state.phonetkj);		
			},

//保存loading code
		setcodeString(state,data){
				state.codeString=data;
				localStorage.setItem("codeString",state.codeString);		
			},
	
		royterBack(){
			this.$router.back(-1)
		},
		
			setcity(state,data){
				state.city=data;
				localStorage.setItem("city",state.city);		
			},
		  
			setToken(state,data){
				state.token=data;
				localStorage.setItem("token",state.token);		
			},
			
			setnajizhuanqu(state,data){
				state.setnajizhuanqu=data;
				localStorage.setItem("najizhuanqu",state.setnajizhuanqu);		
			},
			setstateNum(state,data){
				state.stateNum=data
					localStorage.setItem("stateNum",state.stateNum);
			},
			
			setopenId(state,data){
				state.openId=data
					localStorage.setItem("openId",state.token);		
			},
		
	      changeCodeState(state,data){
					state.codeState=data
		  },
		  changeCode(state){
			  
		 state.codeState=false
		
		    clearInterval(state.timer);
			state.codeMsg="获取验证码"
			state.countdown =60;
			state.timer=null
			state.codeDisabled = false;
			  
		  },
	
		verifyPhone(state){
        
             getValidateCodeBybase().then((res)=>{
				 if(res.data.status==1){
					
					 state.verifyPhone="data:image/png;base64,"+res.data.data
					
				 }else if(res.data.status==0){
					 console.log(res.data.message)
                     
				 }
			 })
                    
		},
 	
		getCode(state) {
			
				
			
					if(state.codeState){

				
						if (!state.timer) {
						
						state.timer = setInterval(() => {
						if (state.countdown > 0 && state.countdown <= 60) {
							
							state.countdown--;
							if (state.countdown !== 0) {

							state.codeState=true
								state.codeDisabled = true
							
							state.codeMsg = "" + state.countdown +'s'+ "";
						} else {
							
							
							this.commit('changeCode')
				
							}
						}
						}, 1000)
					}
					}

			},
	
	  getAuthCode(state,{a,b}){
		
          getAuthCode(commonParams.searxhshopsParams({
           phone:a,randCode:b
          })).then((res)=>{
			  if(res.data.status==0){
					this.commit('toast',res.data.message)
					
					
				 }
		  })
	  },
	 
 		toast(state,data){
         let instance = Toast(data);
        setTimeout(() => {
        instance.close();
        },1200);
       },

	   IndicatorOpen(state,data){
		 
           Indicator.open();
		  
	   },
	    IndicatorClose(state,data){
			
			Indicator.close();
	   }


   
	},

	  actions:{

	// setphonetkj
		
		  setphonetkj(setphonetkj,data){
			  setphonetkj.commit('setphonetkj',data)	
			},

			
		  setcodeString(setcodeString,data){
			  setcodeString.commit('setcodeString',data)	
			},

		  setcity(setcity,data){
				
					setcity.commit('setcity',data)	
			},

		  setnajizhuanqu(setnajizhuanqu,data){
			setnajizhuanqu.commit('setnajizhuanqu',data)
		  },
				IndicatorOpen(IndicatorOpen){
					
						IndicatorOpen.commit('IndicatorOpen')
			},
			IndicatorClose(IndicatorClose){
				
						IndicatorClose.commit('IndicatorClose')
			},
			setToken(setToken,data){
			     setToken.commit('setToken',data)
	          	},
		
			setstateNum(setstateNum,data){
		    	setstateNum.commit('setstateNum',data)
		     },
			 setopenId(setopenId,data){
		    	setopenId.commit('setopenId',data)
		     },
			 	
	      changeCodeState(changeCodeState,data){
						changeCodeState.commit('changeCodeState',data)
		  },
		  	
	      changeCode(changeCode,data){
						changeCode.commit('changeCode',data)
		  },
		  getCode(getCode){
             getCode.commit('getCode')
		  },
		  verifyPhone(verifyPhone){
			  verifyPhone.commit('verifyPhone')

		  },
		  getAuthCode(getAuthCode,data){
			  getAuthCode.commit('getAuthCode',data)

		  },
	
		  
		toast(toast,data){
			  toast.commit('toast',data)

		  },

	}

}