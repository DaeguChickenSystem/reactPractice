//액션타입 정의
import update from 'react-addons-update';


//모듈 초기상태 정의
const initialState = {
  status: "ALL",
  view: "LOGIN",
  msg: "",
  past: "",
  future: "",
  auth: false
};

export default function reducer(state= initialState, action){

const { past, status, view} = state;



switch(action.type){
 case 'DETAIL':
  return update(state, {  status: { $set: "DETAIL"}, view:{ $set: "NEWPOST"}, past: { $set: {status:status, view: view}}  });
case 'LOGIN':
    return  update(state, {
            status: { $set: "ALL"}, view:{ $set: action.arg.view}, auth:{ $set:action.arg.auth}, past: { $set:  {status:status, view: view}}
    });
 case 'ALL':
   return  update(state, {
           status: { $set: "ALL"}, view:{ $set: action.arg.view}, msg:{ $set: action.arg.msg }, past: { $set:  {status:status, view: view}}
   });
 case 'NEWPOST':
   return update(state, {
       status: { $set: "DETAIL"} , view:{ $set: "NEWPOST" }, past: { $set:  {status:status, view: view}}
   });
 case 'SIDENAVI':
     return update(state, {
         status:{ $set: "SIDENAVI" }, past: { $set:  {status:status, view: view}}
 });
 case 'ERROR':
     return  update(state, {   status: { $set: "DETAIL"} , msg:{ $set: action.arg.msg }, past: { $set:  {status:status, view: view}} });
 default:
   return state;
   }
 }
