import axios from 'axios';

export function listRequest(text) {

    return (dispatch) => {

    if(text.type=="LIST"){
      axios.post('/api/post/list',{}).then(response =>{ dispatch({ type: "LIST", list: response.data })
     }).catch(response =>{dispatch(layerRequest({status:"ERROR", msg:"실패하였습니다."}));});

   }else if(text.type=="UPDATE"){
     axios.post('/api/post/update',{arg: text.list}).then(response =>{console.log(response.data)

   }).catch(response =>{dispatch(layerRequest({status:"ERROR", msg:"실패하였습니다[업데이트]."}));});

   }else{

      return axios.post('/api/post/add',{
                  list: text.list
                }).then(response =>{
                   dispatch({ type: text.type, list: {list: response.data}});

                }).catch(response =>{
                  dispatch(layerRequest({status:"ERROR", msg:"실패하였습니다."}));
                });
    }
    };
}

export function layerRequest(arg) {

    return (dispatch) => {
       dispatch({
              type: arg.status,
              arg
        })
    };
}

export function postRequest(arg) {
    return (dispatch) => {
          console.log(arg);
      if(arg.type ==="RESETPOST"){
        dispatch(arg)
      }else{
       return axios.post('/api/post/detail',{
                   id: arg.id
                 }).then(response =>{
                    dispatch({ type: "DETAILPOST", arg: response.data});
                    dispatch(layerRequest({status:"DETAIL"}));
                 }).catch(response =>{
                   dispatch(layerRequest({status:"ERROR", msg:"오류가 발생하였습니다."}));

                 });
         }
      }
}


export function loginRequest(arg){

return (dispatch) => {

if(arg.type=="signin"){

return axios.post('/api/account/signin',{
        username: arg.param.username,
        password: arg.param.password
      }).then(response =>{
          sessionStorage.setItem('auth','true');
          dispatch(layerRequest({status:"LOGIN", view:"LIST", auth:true}));
          dispatch(listRequest({type:"LIST"}));
     }).catch(response =>{dispatch(layerRequest({status:"ERROR", msg:"로그인에 실패하였습니다."}));
   });
}else if(arg.type=="signup"){
  return axios.post('/api/account/signup',{
          username: arg.param.username,
          password: arg.param.password
        }).then(response =>{
            dispatch(layerRequest({status:"ERROR", msg:"계정추가 완료"}));
            document.getElementById('idText').value ="";
            document.getElementById('pwText').value ="";
       }).catch(response =>{dispatch(layerRequest({status:"ERROR", msg:"계정생성실패"}));
     });
}
  };
}
