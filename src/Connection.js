import React, { Component } from 'react';

export default class Connection extends Component {
  constructor(props){
    super(props);
    this.state={
      userName:'',
      password:''
    }
  }

  getUserName(userName){
    this.setState({
      ...this.state,
      userName:userName
    })
  }

  getPassword(password){
    this.setState({
      ...this.state,
      password:password
    })
  }
   getData=()=>{
    const name= this.state.userName;
    const pass=this.state.password; 
    alert("hello there "+name+" and password: "+pass)
  }

  render() {
    return (
      <div>
       <br/><br/><br/>
       <label>User Name</label>
        <input type="text"  onChange={(e)=> this.getUserName(e.target.value)}/>
        <br/><br/>
        <label>Password</label>
        <input type="password" onChange={(e)=> this.getPassword(e.target.value)}/>
        <br/><br/>
        <button type="button" onClick={this.getData}>Connect</button>
        <br/><br/>
        <span>{this.state.userName} </span>
        </div>
    )
  }
}


