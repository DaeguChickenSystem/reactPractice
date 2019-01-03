import React from 'react';
import { connect } from 'react-redux';
import { listRequest, layerRequest, postRequest } from 'actions/action';
import Switch from 'react-toggle-switch'
import DatePicker from 'react-datepicker'
import moment from 'moment'


class Post extends React.Component {

    constructor(props) {
        super(props);
        this.toggleSwitch=this.toggleSwitch.bind(this);
        this.state={
            switched: false,
           startDate: moment(),
           post: this.props.post
        }
        this.list=this.props.list;
        this.test=this.test.bind(this);
        this.addChange=this.addChange.bind(this);
        this.handleChange=this.handleChange.bind(this);
      }

      componentDidMount() {
         const check = this.props.post.check;
          if(check !== undefined ){
            this.setState(prevState => {
              return {
                switched: check
              };
            });
          }
       }

    addChange(e){
      if(this.props.post.length ===0){
       // this.list.push({"title":document.getElementById("postTitleInput").value, "contents":document.getElementById("postContentInput").value ,"cnt":0, "check":this.state.switched, "date": this.state.startDate});
       this.props.listRequest({type:"INSERT", list: {"title":document.getElementById("postTitleInput").value, "contents":document.getElementById("postContentInput").value ,"cnt":0, "check":this.state.switched, "date": this.state.startDate}, view: this.props.past});
     }else{
       this.props.listRequest({type:"UPDATE", list: {"_id": this.props.post._id,"title":document.getElementById("postTitleInput").value, "contents":document.getElementById("postContentInput").value ,"cnt":0, "check":this.state.switched, "date": this.state.startDate}, view: this.props.past});
     }

     const undo = this.props.past;
     this.props.layerRequest(undo);
     this.props.listRequest({type:"LIST"});
    }

    test(){
      const undo = this.props.past;

      this.props.layerRequest(undo);
     }

    handleChange(date){
      this.setState({ startDate: date });
    }

    toggleSwitch () {
       this.setState(prevState => {
         return {
           switched: !prevState.switched
         };
       });
     };

  onInputChange (arg){
    this.setState(prevState => {
      return {
        post: arg
      };
    });
  }

    render() {
        return (
          <div>
          <div className="post">
             <div className="postName">[제목]</div>
             <div className="postHead postElement">
                <div className="postTitle postDiv">
                  <input type="text" id="postTitleInput" className="postTitleBody postInput" value={this.state.post.title}  onChange={e=> this.onInputChange(e.target.value)}/>
                </div>
             </div>
              <div  className="postName">[내용]</div>
             <div className="postBody postElement">
                 <div className="postContent postDiv">
                  <input type="text" id="postContentInput" className="postContentBody postInput" value={this.state.post.contents}  onChange={e=> this.onInputChange(e.target.value)} />
                 </div>
             </div>

             <div  className="postName">
             <p>[중요여부]</p>
             <Switch onClick={this.toggleSwitch} on={this.state.switched}/>
             </div>


             {this.state.switched===true?
               <div> <DatePicker selected={this.state.startDate} onChange={this.handleChange} /> </div>
              :""
             }
                   <div className="postSubmit" onClick={this.addChange} > 저장 </div>
             </div>

          </div>

        );
    }
}

const mapStateToProps = (state) => {
    return {
      status: state.status.status,
      past: state.status.past,
      list: state.list.list,
      post: state.post.post
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        layerRequest: (arg) => {
            return dispatch(layerRequest(arg));
        },
        listRequest: (text) => {
            return dispatch(listRequest(text));
        },
        postRequest: (arg) => {
            return dispatch(postRequest(arg));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
