import React from 'react';
import Button from 'react-bootstrap/Button';

import {Card } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

 function ProductCard({data , avoirArticles}) {

  const navigation = useNavigate()
  const sentData=(data)=>{
   navigation('/creeDevis',{state:{d:data}})
  }
  
  return (
    <Card className='h-100 shadow-sm bg-white rounded' style={{color:'black'}}>
      <Card.Header>
      <Card.Title className='text-center text-capitalize'>
              {data.libeller} 

          </Card.Title>
      </Card.Header>
    
    
      <Card.Body className='d-flex flex-colum'>
        
      <Card.Img  variant='top' src={data.image} />
    
      </Card.Body>
      <Card.Footer> prix: {data.prixUnitaire} TND
      <br/> <br/>
      <Button variant="primary" onClick={()=>{avoirArticles(data)}} >Ajouter</Button>
      </Card.Footer>
      
    </Card>
  );
}
export default ProductCard;