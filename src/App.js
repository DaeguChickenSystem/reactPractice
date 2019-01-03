import React, { Component } from 'react';
import {MODAL, HELPLIST, DETAIL, LOGIN, SIDENAVI} from './containers'
import { connect } from 'react-redux';
import './App.css';
import {  layerRequest } from './actions/action';



class App extends Component {

 constructor(props){
   super(props);
   this.side = this.side.bind(this);
   this.login = this.login.bind(this);
 }

login(){
  const login = sessionStorage.getItem('auth');

  if(login===null || login ==="false"){
    return (
      <LOGIN />
    )
  }else if(login ==="true"){
      return (
      <HELPLIST />
    )
  }
}

 side(){
   const status = this.props.status;
   if(status==="SIDENAVI"){
     return (
       <div>
       <MODAL />
       <SIDENAVI />
       </div>
     )
   }
 }

  render() {
    return (
      <div>
        {this.login()}
        {this.props.status==="DETAIL"?  <MODAL/> : ""}
        {this.side()}
     </div>
    );
  }
}
const mapStateToProps = (state) => {
    return {
      status: state.status.status,
      view: state.status.view,
      msg:  state.status.msg
    };
};


const mapDispatchToProps = (dispatch) => {
    return {
        layerRequest: (arg) => {
            return dispatch(layerRequest(arg));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
