import React from 'react';
import { connect } from 'react-redux';
import { layerRequest, loginRequest } from '../actions/action';
import axios from 'axios';


class login extends React.Component {

    constructor(props) {
        super(props);
        this.login=this.login.bind(this);
        this.signup=this.signup.bind(this);
    }

    login(){
      var id = document.getElementById('idText').value;
      var pw = document.getElementById('pwText').value;
      this.props.loginRequest(
         {type:"signin",param:{username:id, password: pw }}
       );
    }

    signup(){
      var id = document.getElementById('idText').value;
      var pw = document.getElementById('pwText').value;
      this.props.loginRequest(
         {type:"signup", param:{username:id, password: pw }}
       );
    }

    render() {
        return (

          <div className="loginForm">
            <div className="loginHead"></div>
            <div className="loginBody">
              <div className="idInput"><input type="textarea"  name="idInput" id="idText" placeholder="사용자아이디"/></div>
              <div className="pwInput"><input type="textarea"  name="pwInput" id="pwText" placeholder="비밀번호"/></div>
            </div>
            <div className="loginSubmit">
             <span className="apply btn" onClick={this.signup}>가입하기</span>
             <span className="login btn" onClick={this.login}>로그인</span>
            </div>
          </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        status: state.status.state,
        list: state.list.list
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        layerRequest: (arg) => {
            return dispatch(layerRequest(arg));
        },
        loginRequest: (arg)=>{
            return dispatch(loginRequest(arg));
        }
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(login);
