import axios, { all } from "axios"
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom"


function ClientProfile(){

  const loctaion = useLocation();
  const id = loctaion.state.idClient;
  const [user,setUser] = useState({nom:'',cin:0,prenom:'',adress:'',tel:'',role:''})
  const [devis,setDevis] = useState([])
  const nav = useNavigate()
  const [total,setToal] = useState([]);
  

  const getAllDevis=()=>{
    axios.get(`http://localhost:4500/clients/${id}/mesDevis`).then(res=>{
      let t=[];
      if(res.data!==null && res.data.length!==0){
        setDevis(res.data)
       
        for(let i=0;i<res.data.length;i++){
        t[i]=0
        for(let j=0;j< res.data[i].listArticles.length;j++){
          t[i]=t[i]+ res.data[i].listArticles[j].prixUnitaire; 
        }

        }
        
        setToal(t)
      }else{
        setDevis([])
      }
    
    
    })
  };

  const getUserDetails=()=>{
    axios.get(`http://localhost:4500/clients/${id}`).then(res=>{
      if(res.data!==null){
        setUser({
          adress:res.data.adress,
          cin:res.data.cin,
          nom:res.data.nom,
          prenom:res.data.prenom,
          role:res.data.role,
          tel:res.data.tel
      })
      }
    })
  }

  useEffect(()=>{
     getAllDevis()
     getUserDetails()
  },[]);



  return(
    
    <div className="container" style={{marginTop:40}}>
       Welcome back {user.nom} {user.prenom}
      <div style={{float:'right'}}>
       
        <button className="btn btn-danger" style={{marginLeft:50,float:'right'}} onClick={()=>{
            nav('/login')
          }} >
          logout
          </button>
          <button className="btn btn-primary" style={{marginLeft:60,float:'right'}}  onClick={()=>{
            nav('/creeDevis?id='+id,{state:{id:id}})}} >
            Creer Devis
          </button>
      </div>
         <br/>
      
      <div className="font-weight-bold text-capitalize">    this is your Devi's list: </div>
          <br/>
        <div className="container">
        <table className="table table-hover table-bordered">
          <thead className="bg-info">
           <tr>
           <th scope="col">
              Num Devis
            </th>
            <th scope="col">
              date Devis
            </th>
            <th scope="col">
              Articles choisie
            </th>
            <th scope="col">
              Total HT
            </th>
           </tr>
          </thead>
          <tbody>
          
                  {devis.map((d,i)=>{
              
              return <tr key={i}>
                <td>{d.numDevis} </td>
                <td>{d.dateCreation} </td>
                <td>{d.listArticles.length===0? "Pas d'Articles": d.listArticles.map((l,t)=>{
                  return <span key={t}>{l.libeller}   <br/>
                  </span>
                })} </td>
                
                <td>
               {total[i]}
                </td>
              </tr>
              })}
              
             </tbody>

            </table>
        </div>

    </div>
  
   
  )
}
export default ClientProfile;