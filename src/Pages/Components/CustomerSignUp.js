import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";

import * as React from "react";
// import Table from './Components/Table';
import Form from "./Form";

import axios from "axios";

const api = "http://localhost:3001/customers";
const toapi = "http://localhost:3001/customers";

export function CustomerSignUp() {
	const dataRef = useRef([]);
	const [Data, setData] = useState([]);
	const [Keys, setKeys] = useState([]);
	const [State, setState] = useState(false);

	useEffect(() => {
		async function getData() {
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
