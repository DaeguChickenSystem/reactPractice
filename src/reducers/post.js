//액션타입 정의
import update from 'react-addons-update';


//모듈 초기상태 정의
const initialState = {
 default: [],
 post: []
};

export default function reducer(state= initialState, action){

const { _id, title, content, writer} = state;

console.log(action);
switch(action.type){

 case 'DETAILPOST':
  return update(state, { post: {$set: action.arg} });
 case 'RESETPOST':
  return update(state, { $set: initialState });
 default:
   return state;
   }
 }
