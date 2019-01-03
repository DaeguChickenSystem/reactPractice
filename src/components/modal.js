import React from 'react';
import { connect } from 'react-redux';
import { ALERT, POST} from 'components/detail'
import { listRequest, layerRequest } from '../actions/action';

class modal extends React.Component {

    constructor(props) {
        super(props);
        this.default=this.default.bind(this);
    }


  default(){
   const detail;
   if(this.props.view== "NEWPOST"){
     detail = <POST type='NEW'/>
   }else if(this.props.view== "CHECKPOST"){
     detail = <POST type='detail' />
   }else{
     detail = <ALERT/>
   }
     return detail
  }

    render() {
        return (
          <div>
           {detail()}
          </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
      status: state.status.status,
      list: state.list.list,
      view: state.list.view
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        layerRequest: (arg) => {
            return dispatch(layerRequest(arg));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(modal);
