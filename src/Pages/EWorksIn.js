import { useEffect, useState, useRef } from "react";
import * as React from "react";
import Table from "./Components/Table";
import Form from "./Components/Form";
import UpdateForm from "./Components/UpdateForm";

import axios from "axios";

let api = "http://localhost:3001/eworksin";
let api2 = "http://localhost:3001/eworksinAll";
const toapi = "http://localhost:3001/eworksin";

export function EWorksIn() {
	const dataRef = useRef([]);
	const [Data, setData] = useState([]);
	const [Keys, setKeys] = useState([]);
	const [State, setState] = useState(false);
	const [apiClean, setApi] = useState(api2);
  const [showForm , setShowForm] = useState(false);


	const signIn = JSON.parse(localStorage.getItem("signIn"));

	useEffect(() => {
		async function getData() {
			if (signIn.mode === "Employee") {
				// console.log("ki hoise");
				console.log(signIn.id);
				api = api + "/" + signIn.id;
				console.log(api);
			}
			const res = await axios.get(api);
			// console.log(res.data.data)
			 setKeys(await Object.keys(await res.data.data[0]));
			dataRef.current = await res.data.data;

			await setData(res.data.data);
		}
		getData();
	}, [State]);
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
