//액션타입 정의
import update from 'react-addons-update';


//모듈 초기상태 정의
const initialState = {
  number: 0,
  state: "NOTHING",
  list: []
};

export default function reducer(state= initialState, action){

 switch(action.type){
  case 'LIST':
    return update(state, {
            list: { $set: action.list}
    });
  case 'INSERT':
    return  update(state, {
            list: { $set: action.list}
    });
  default:
    return state;
    }
 }
