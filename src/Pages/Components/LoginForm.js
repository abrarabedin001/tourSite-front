import { useEffect, useState, useRef, useContext } from "react";
import { UserContext } from "../../Store/AppStore";
import * as React from "react";

import axios from "axios";

const api = "http://localhost:3001/employees";

export default function LoginForm(props) {
	let ctx = useContext(UserContext);

	const api = props.api;
	//props.toapi
	// props.data
	// let Keys = props.key
	// props.state
	// props.setState

	const toapi = "http://localhost:3001/authenticate";
	const [Value, setValue] = useState({});
	const [Data, setData] = useState([]);
	const [Keys, setKeys] = useState([]);
	const IdRef = useRef("");
	const PasswordRef = useRef("");

	useEffect(() => {
		async function getData() {
			const res = await axios.get(api);
			setKeys(Object.keys(res.data.data[0]));
		}
		getData();
	}, []);

	const sendValue = async (data) => {
		try {
			let link =
				toapi + "/" + IdRef.current.value + "/" + PasswordRef.current.value;
			console.log(link);
			const resp = await axios.get(link);
			let employee = resp.data.data[0];
			if (employee) {
				console.log(employee);
				console.log(ctx);
				if (employee.Id === "01") {
					console.log("1");
					ctx.changeMode("Admin", employee.Id);
				} else {
					console.log("2");
					ctx.changeMode("Employee", employee.Id);
				}
				console.log(ctx.a["mode"]);
			}
			window.location.reload(true);
		} catch (err) {
			console.error(err);
		}
	};

	const handleSubmit = () => {
		console.log(IdRef.current.value, PasswordRef.current.value);
		sendValue(Value);
	};

	return (
		<div className="m-5 ">
			<h1 className="bold font-bold text-2xl mb-3 text-white">
				Employee Sign in
			</h1>
			<div className="max-w-[500px] bg-blue-500 flex flex-wrap space-between flex-col rounded font-bold text-md text-white">
				<div
					key="Id"
					className="flex flex-col rounded mt-2 font-bold text-black"
				>
					<label htmlFor="Id" className="w-full text-left pl-2">
						Id
					</label>
					<input
						type="text"
						ref={IdRef}
						id="Id"
						className="p-2 m-2 w-sm rounded"
						placeholder="Id"
					/>
				</div>
				<div
					key="Password"
					className="flex flex-col rounded mt-2 font-bold text-black"
				>
					<label htmlFor="Id" className="w-full text-left pl-2">
						Password
					</label>
					<input
						ref={PasswordRef}
						type="password"
						id="password"
						className="p-2 m-2 w-sm rounded"
						placeholder="password"
					/>
				</div>
				<button
					onClick={handleSubmit}
					className="bg-blue-200 rounded p-3 m-3 max-w-[200px] font-bold text-lg text-black"
				>
					Submit
				</button>
			</div>
		</div>
	);
}
