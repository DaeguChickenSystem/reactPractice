import React from 'react';
import { connect } from 'react-redux';
import { listRequest, layerRequest, postRequest } from '../actions/action';
import Ham from '../resource/ham.png';
import Edit from '../resource/edit.png';


class HELPLIST extends React.Component {

    constructor(props) {
        super(props);
        this.state={"test":""};
        this.list=[];
        this.addChange=this.addChange.bind(this);
        this.listView=this.listView.bind(this);
        this.checklistView=this.checklistView.bind(this);
        this.addCount=this.addCount.bind(this);
        this.showDetail=this.showDetail.bind(this);
        this.add=this.add.bind(this);
        this.sideNavi=this.sideNavi.bind(this);
        this.ham=Ham;
        this.edit=Edit;
        console.log("리스트");
        console.log(this.props);
    }

   componentDidMount() {
      this.props.listRequest({type:"LIST"});
    }

   addChange(e){
   if(e.keyCode==13){
    this.list.push({"title":document.getElementById("test").value, "cnt":0});
     // this.props.listRequest(e.target.value)
    this.props.listRequest({type:"INSERT", list: this.list});
    document.getElementById("test").value="";
   }
  }

 showDetail(arg){
  this.props.postRequest({type:"DETAILPOST", id:arg});

 }

 addCount(ev){
    this.list.map(function(e){
      if (ev.target.id==e.title){
      return {"title":e.title, "cnt":e.cnt++}
      }
    });
    this.props.listRequest({type:"INSERT", list: this.list});
  }

 add(){
     this.props.postRequest({type:"RESETPOST"});
     this.props.layerRequest({status:"NEWPOST"} );
 }

 checklistView(){
   const view=  this.props.list;
   if(view !==undefined){
   var ttt=view.map((a, i) => {
     if(a.check==true){
       return (<div className="content">
                     <div className="cntTitleCheck"  onClick={this.showDetail.bind(this, a._id)}>
                       (중요){a.title}
                     </div>
                     <div className="cntBody" id={a.title} >
                     <div className="cnt">
                      {a.contents}
                      </div>
                      <div className="postWriter">
                        <div className="writerTag">
                        {a.writer}
                        </div>
                       </div>
                     </div>
                     </div>)
     }
   })
      return ttt;
     }
    }

listView(){
  const view=  this.props.list;
  if(view !==undefined){
  var ttt=view.map((a, i) => {
  if(a.check!==true)
  return (<div className="content">
                <div className="cntTitle"  onClick={this.showDetail.bind(this, a._id)}> {a.title}  </div>
                 <div className="cntBody" id={a.title} >
                 <div className="cnt">
                  {a.contents}
                  </div>
                  <div className="postWriter">
                  <div className="writerTag">
                   {a.writer}
                   </div>
                   </div>
                  </div>
                </div>)
  })
     return ttt;
    }
   }


sideNavi(){
   this.props.layerRequest({status:"SIDENAVI"} );
}

    render() {
    const {todos} = this.props;
    return (
        <div>

        <div className="topMenu">
          <div className="sideMenu">
            <img  className="menu" src={this.ham} onClick={this.sideNavi} / >
          </div>
          <div className="menuTitle {this.props.view}"></div>
          <div className="searchButton"></div>
        </div>

            리스트{this.props.status}
            <button ></button>

            <div className="listbody">
             {this.checklistView()}
             {this.listView()}
            </div>

           <div className="addPost" onClick={this.add}>
            <img className="writeIcon" src={this.edit} />
           </div>
          </div>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        status: state.status.state,
        list: state.list.list,
        view: state.status.view,
        post: state.post.post
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        listRequest: (text) => {
            return dispatch(listRequest(text));
        },
        layerRequest: (arg) => {
            return dispatch(layerRequest(arg));
        },
        postRequest:  function(arg){
            return dispatch(postRequest(arg));
        }

    };
};


export default connect(mapStateToProps, mapDispatchToProps)(HELPLIST);
