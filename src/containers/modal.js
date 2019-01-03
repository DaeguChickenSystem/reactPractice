import React from 'react';
import { connect } from 'react-redux';
import { ALERT, POST} from 'components/detail'
import { layerRequest } from '../actions/action';
class MODAL extends React.Component {

    constructor(props) {
        super(props);
        this.default=this.default.bind(this);
    }


    default(evnet){
      event.stopPropagation();
      event.preventDefault();

      const undo = this.props.past;
      this.props.layerRequest(undo);
    }


    render() {
        return (
          <div>
          <div className="modal" onClick={this.default}></div>
          <div>{this.props.msg}  </div>

          {(() => {
            switch (this.props.view) {
              case "NEWPOST":   return <POST type='NEW'/>;
              case "CHECKPOST": return <POST type='detail' />;
              default:      return <ALERT/>;
            }
          })()}
          <div> <this.props.view/> </div>
          </div>
        );
    }
}




const mapStateToProps = (state) => {
    return {
      status: state.status.status,
      view: state.status.view,
      past: state.status.past,
      msg: state.status.msg
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        layerRequest: (arg) => {
            return dispatch(layerRequest(arg));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MODAL);
