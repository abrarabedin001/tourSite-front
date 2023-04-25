import { useEffect, useState, useRef } from "react";
import * as React from "react";
import Table from "./Components/Table";
import Form from "./Components/Form";

import axios from "axios";

let api = "http://localhost:3001/CusHire";
const toapi = "http://localhost:3001/CusHire";

export function CusHire() {
	const dataRef = useRef([]);
	const [Data, setData] = useState([]);
	const [Keys, setKeys] = useState([]);
	const [State, setState] = useState(false);
	useEffect(() => {
		async function getData() {
			const signIn = JSON.parse(localStorage.getItem("signIn"));
			if (signIn.mode === "Customer") {
				// console.log("ki hoise");
				console.log(signIn.id);
				api = api + "/" + signIn.id;
				console.log(api);
			}

			const res = await axios.get(api);
			await setKeys(await Object.keys(await res.data.data[0]));
			dataRef.current = await  res.data.data;

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
			/>
			<Form
				api="http://localhost:3001/CusHire"
				toapi="http://localhost:3001/CusHire"
				data={Data}
				state={State}
				setState={setState}
			/>
		</div>
	);
}
