import { useEffect, useState, useRef, useContext } from "react";
import * as React from "react";
import Table from "./Components/Table";
import Form from "./Components/Form";

import axios from "axios";

let api = "http://localhost:3001/customers";
const toapi = "http://localhost:3001/customers";

export function Customers() {
	const dataRef = useRef([]);
	const [Data, setData] = useState([]);
	const [Keys, setKeys] = useState([]);
	const [State, setState] = useState(false);
	useEffect(() => {
		async function getData() {
			const signIn = JSON.parse(localStorage.getItem("signIn"));
			if (signIn.mode == "Customer") {
				// console.log("ki hoise");
				console.log(signIn.id);
				api = api + "/" + signIn.id;
				console.log(api);
			}
			const res = await axios.get(api);
			// console.log(res.data)
			setKeys(Object.keys(res.data.data[0]));
			// console.log(Keys)
			dataRef.current = res.data.data;
			setData(res.data.data);
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
			/>
			<Form
				api={api}
				toapi={toapi}
				data={Data}
				state={State}
				setState={setState}
			/>
		</div>
	);
}
