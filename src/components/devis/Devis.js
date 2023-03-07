import axios from 'axios';
import React, { useEffect, useMemo, useState } from 'react'
import { Button, Card } from 'react-bootstrap';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import Home from '../home/Home.js'

 function Devis() {  
  const [listChosie,setListChosie] = useState([]);
  const navigate = useNavigate();
  const params = useLocation().search;
  const search = new URLSearchParams(params);
  const memo = useMemo();

  const saveDevis=()=>{
   let cd = new Date()
   let dateCreation = cd.getDate() +'/'+(1+cd.getMonth())+'/'+cd.getFullYear();

   let devis = {
      numDevis:0,
      dateCreation:dateCreation,
      listArticles:listChosie,
      ownerCin:search.get("id")
  }
  console.log(devis);
   axios.post("http://localhost:4500/devis",devis).then(res=>{
    console.log("done posting: "+JSON.stringify(res));
   }).then(()=>{
    navigate(-1);
   })
  
  }
  
  const addToLIst=(product)=>{
    
   if(product) {
     let newList = [...listChosie];
    newList.push(product)
    setListChosie(newList)
    console.log(newList)
  }
   
  }
  useEffect(()=>{
   
  },[])
  
  return (
    <div className="container">
      
      <Button variant='primary' style={{float:'left',marginTop:30}} 
        onClick={()=>{navigate(-1)}} >
        back
      </Button>
    <br/>

  
      <div style={{fontSize:40, marginTop:35}}>
     
        <strong>NOUVEAU DEVIS</strong>
        <br/>
        <Button variant='primary' style={{float:'right'}} 
        onClick={()=>{saveDevis()}} >
        valider Devis
      </Button>
      <br/>
      </div>
      
     <table  className="table table-striped" style={{marginTop:60}}>
      <thead >
        <th>
          Num
        </th>
        <th>
          Libeller
        </th>
        <th>
          Image
        </th>
        <th>
          Qte Disponible
        </th>
      </thead>

      <tbody>
       
      { listChosie.map((d,i)=>{
        return <tr key={i}>
          
            <th> {i+1} </th>
            <td>{d.libeller} </td>
            <td> <Card.Img style={{width:50,height:50}} variant='top' src={d.image} /> </td>
            <td> {d.quantiterEnStock} </td>
            
        </tr>
      })}
       
      </tbody>

     </table>

     <Home addToLIst={addToLIst} />
    </div>
  )
}
export default Devis;