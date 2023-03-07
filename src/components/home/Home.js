
import React, { Component } from 'react'
import ProductCard from './ProductCard'
import { Container, Row } from 'react-bootstrap'
import axios from 'axios';


export default class Home extends Component {
constructor(props){
  super(props);
  this.state={
    articles:[],
    articleChoisie:[]
  }
}

componentDidMount(){
  this.getAllArticles()
 // this.props.haveAllProduct(this.state.articleChoisie)

}

componentDidUpdate(){
}

getAllArticles= ()=>{
  axios.get("http://localhost:4500/articles").then(res=>{
   
    if(res.data !==null && res.data.length !==0){
     this.setState({
      ...this.state,
      articles :res.data
    })
    }
  })
}

avoirArticles=(article)=>{
  let newList = this.state.articleChoisie;
  newList.push(article)
  this.setState({
    ...this.state,
    articleChoisie:newList
  })
  console.log("list of articls: ");
  this.state.articleChoisie.map(a=>{
    console.log(a.libeller);

  })
}

sentData=(data)=>{
 return this.props.addToLIst(data)
}

  render() {
    return (
      <div>
       
        <Container style={{marginTop:30}}>
      <Row>
       {this.state.articles.map((d,index)=>{
       return <div key={index} style={{marginTop:30,width:'10rem'}} >
        
           <ProductCard data={d} avoirArticles={this.props.addToLIst} />
        
        </div>
       })}
       
      </Row>
    </Container>
      </div>
    )
  }
}
