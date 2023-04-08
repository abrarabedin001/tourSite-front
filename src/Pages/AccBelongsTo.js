
import { useEffect,useState,useRef } from 'react'
import * as React from 'react';
import Table from './Components/Table';
import Form from './Components/Form';

import axios from 'axios';

const api = "http://localhost:3001/accBelongTo"
const toapi = "http://localhost:3001/accBelongTo"


export function AccBelongsTo() {

  const dataRef = useRef([])
  const[Data,setData] = useState([]);
  const[Keys,setKeys] = useState([]);
  const[State,setState] = useState(false)
  useEffect(
    ()=>{
     async function getData(){
      
      const res = await axios.get(api)
      // console.log(res.data.data)
      setKeys(Object.keys(res.data.data[0]))
      dataRef.current = res.data.data
      
      setData(res.data.data)
      
     } 
     getData()
     
     
    }
    ,[State]

    
  )
  return (
    <div>

     

      <Table Data={Data} keys={Keys} toapi={toapi} state={State} setState={setState} className=""/>
      <Form api={api} toapi={toapi} data={Data} state={State} setState={setState} />
      
      
      
    </div>
  );
}


