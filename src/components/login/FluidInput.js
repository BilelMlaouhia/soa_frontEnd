import axios from "axios";
import React from "react";
import  "./FluidInputs.scss";
import { Navigate } from "react-router";

  
 class FluidInput extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        focused: false,
        value: "",
      };
    }
    focusField() {
      const { focused } = this.state;
      this.setState({
        focused: !focused
      });
    }
    handleChange(event) {
      const { target } = event;
      const { value } = target;
      if(this.props.label==="name"){
      this.props.getName(event.target.value);
    } else if(this.props.label==="password"){
      this.props.getPassword(event.target.value);
    }
      this.setState({
        value: value
      });
    }
    render() {
      const { type, label, style, id } = this.props;
      const { focused, value } = this.state;
      
      let inputClass = "fluid-input";
      if (focused) {
        inputClass += " fluid-input--focus";
      } else if (value !== "") {
        inputClass += " fluid-input--open";
      }
      
      return (
        <div className={inputClass} style={style}>
          <div className="fluid-input-holder">
            
            <input 
              className="fluid-input-input"
              type={type}
              id={id}
              onFocus={this.focusField.bind(this)}
              onBlur={this.focusField.bind(this)}
              onChange={this.handleChange.bind(this)}
              autoComplete="on"
            />
            <label className="fluid-input-label" forhtml={id}>{label}</label>
            
          </div>
        </div>
      );
    }
  }
  
  class Button extends React.Component {
    render() {
      return (
        <div className={`button ${this.props.buttonClass}`} onClick={this.props.onClick}>
          {this.props.buttonText}
        </div>
      );
    }
  }
  
 export class LoginContainer extends React.Component {
 
  constructor(props){
    super(props);
    this.state ={
      name:'',
      password:"hello",
      redirect:null,
      jwt:'',
      prenom:'',
      idClient:0,
     
    }
  }
  
  getName=(name)=>{
    this.setState({
      ...this.state,
      name:name
    })
  }

  getPassword=(password)=>{
    this.setState({
      ...this.state,
      password:password
    })
  }

  submitData=()=>{
    let detail;
    axios.post("http://localhost:4500/auth?nom="+this.state.name+"&password="+this.state.password).then(res=>{
    
      if(res.data!=="" && res.data!==null){
      

         detail = res.data.split(".");
   
        this.setState({
          ...this.state,
          jwt:res.data,
          prenom:detail[2],
        })
        console.log("after checking JWT is : \n"+detail);
        if(detail[3]==="Admin"){
          this.setState({
            ...this.state,
            idClient:detail[1],
            redirect:`/clients/${detail[1]}/Admin`,
          })
        }else{
          this.setState({
            ...this.state,
            idClient:detail[1],
            redirect:`/clients/${detail[1]}/user`,
          })
        }
       
        
      }

    });
  }

    render() {
     
      if (this.state.redirect!==null){
        return <Navigate to={this.state.redirect}  state={{idClient:this.state.idClient}}   />
      }
      const style = {
        margin: "15px 0"
      };
      return (
        <div className="login-container" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center', 
          height: '70vh',
          marginTop:80
         }}>
          <div className="title" >
         
           Login
          </div>
          <FluidInput type="text" label="name" getName={this.getName} id="name" style={style} />
          <FluidInput type="password" label="password" getPassword={this.getPassword} id="password"  style={style} />
          <Button buttonText="log in" buttonClass="login-button" onClick={this.submitData} />
         
        </div>
      );
    }
  }
  
