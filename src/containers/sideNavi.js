import React from 'react';
import { connect } from 'react-redux';
import { listRequest, layerRequest } from '../actions/action';

class sideNavi extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
          <div>
           <div className="sideNavi">사이드나비</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(sideNavi);
