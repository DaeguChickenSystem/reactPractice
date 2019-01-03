import React from 'react';
import { connect } from 'react-redux';
import { listRequest, layerRequest } from 'actions/action';

class Alert extends React.Component {

    constructor(props) {
        super(props);
        this.default = this.default.bind(this);
        this.msg = this.msg.bind(this);
    }

    default(){
      const undo = this.props.past;

      undo.msg="";
            console.log(undo);
      this.props.layerRequest(undo);
    }

    msg(){
      if(this.props.msg!==undefined&&this.props.msg!==""){
        return(
            <div className="alertBody">
            <div className="alertContent">
              {this.props.msg}
            </div>
            <div className="alertButton" onClick={this.default}>
              확인
            </div>
            </div>
        )
      }
    }

    render() {
        return (
          <div>
            {this.msg()}
          </div>
        );
    }
}






const mapStateToProps = (state) => {
    return {
      past:  state.status.past,
      status: state.status.status,
      list: state.list.list,
      msg: state.status.msg,
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        layerRequest: (arg) => {
            return dispatch(layerRequest(arg));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Alert);
