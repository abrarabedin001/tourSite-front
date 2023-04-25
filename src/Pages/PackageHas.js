
import { useEffect,useState,useRef } from 'react'
import * as React from 'react';
import Table from './Components/Table';
import Form from './Components/Form';


import axios from 'axios';

const api = "http://localhost:3001/package_has"
const toapi = "http://localhost:3001/package_has"


export function PackageHas() {

  const dataRef = useRef([])
  const[Data,setData] = useState([]);
  const[Keys,setKeys] = useState([]);
  const[State,setState] = useState(false)
  useEffect(
    ()=>{
     async function getData(){
      
      const res = await axios.get(api)
      // console.log(res.data.data)
      setKeys(await Object.keys(await res.data.data[0]))
      dataRef.current = await res.data.data
      
      await setData(res.data.data)
      
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


