
import { useEffect,useState,useRef } from 'react'
import * as React from 'react';
import Table from './Components/Table';
import Form from './Components/Form';
import UpdateForm from "./Components/UpdateForm";


import axios from 'axios';

const api = "http://localhost:3001/drives"
let api2 = "http://localhost:3001/drivesAll";

const toapi = "http://localhost:3001/drives"


export function Drives() {
	const dataRef = useRef([]);
	const [Data, setData] = useState([]);
	const [Keys, setKeys] = useState([]);
	const [State, setState] = useState(false);
	const [apiClean, setApi] = useState(api2);
  const [showForm , setShowForm] = useState(false);

	// const signIn = JSON.parse(localStorage.getItem("signIn"));

	useEffect(() => {
		async function getData() {
			// if (signIn.mode === "Employee") {
			// 	// console.log("ki hoise");
			// 	console.log(signIn.id);
			// 	api = api + "/" + signIn.id;
			// 	console.log(api);
			// }
			const res = await axios.get(api);
			// console.log(res.data.data)
			setKeys(Object.keys(res.data.data[0]));
			dataRef.current = res.data.data;

			setData(res.data.data);
		}
		getData();
	}, []);
	return (
		<div>
			<Table
				Data={Data}
				keys={Keys}
				toapi={toapi}
				state={State}
				setState={setState}
				className=""
				setApi={setApi}
        setShowForm ={setShowForm}

			/>
			<div className="flex">
				<Form
					api={api}
					toapi={toapi}
					data={Data}
					state={State}
					setState={setState}
				/>
				{showForm&&<UpdateForm
					api={apiClean}
					toapi={toapi}
					data={Data}
					state={State}
					setState={setState}
				/>}
			</div>
		</div>
	);
}
