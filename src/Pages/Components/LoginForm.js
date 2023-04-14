import { useEffect, useState, useRef } from "react";
import * as React from "react";

import axios from "axios";

// const api = "http://localhost:3001/employees"

export default function LoginForm(props) {
	const api = props.api;
	//props.toapi
	// props.data
	// let Keys = props.key
	// props.state
	// props.setState
	//   props.setVisible

	const toapi = "http://localhost:3001/authenticate";

	const [Value, setValue] = useState({});
	const [Data, setData] = useState([]);
	const [Keys, setKeys] = useState([]);
	const IdRef = useRef("");
	const PasswordRef = useRef("");
	let obj = {};
	useEffect(() => {
		async function getData() {
			const res = await axios.get(api);
			setKeys(Object.keys(res.data.data[0]));
		}
		getData();
	}, []);

	//   const fieldChecker=(key)=>{

	//     const date_input = key.includes("date")
	//     const phone = key.includes("Phone")
	//     const hour = key.includes("Hour")
	//     const sHour = key.includes("hour")
	//     // const
	//     if (date_input){
	//       return <div key={key} className='flex flex-col rounded mt-2 text-black' >
	//                 <label htmlFor={key} className='w-full text-left pl-2'>{key}</label>
	//                 <input type="date" id={key} className="p-2 m-2 w-sm rounded" onChange={e=>handleChange(e,key)} placeholder="test"/>
	//             </div>

	//     }else if(phone||hour||sHour){
	//       return <div key={key}  className='flex flex-col rounded mt-2 font-bold text-black' >
	//                 <label htmlFor={key} className='w-full text-left pl-2'>{key}</label>
	//                 <input type="number" id={key} defaultValue="" className="p-2 m-2 w-sm rounded" onChange={e=>handleChange(e,key)} placeholder="test"/>
	//             </div>

	//     }else{
	//       return <div key={key}  className='flex flex-col rounded mt-2 font-bold text-black' >
	//                 <label htmlFor={key} className='w-full text-left pl-2'>{key}</label>
	//                 <input type="text" id={key} className="p-2 m-2 w-sm rounded" onChange={e=>handleChange(e,key)} placeholder="test"/>
	//             </div>
	//     }

	//   }

	const sendValue = async (data) => {
		try {
			let link =
				toapi + "/" + IdRef.current.value + "/" + PasswordRef.current.value;
			console.log(link);
			const resp = await axios.get(link);
			let customer = resp.data.data[0];
			if (customer) {
				props.setVisible(true);
			}
		} catch (err) {
			// Handle Error Here
			console.error(err);
		}
	};

	//   let handleChange=(e,key)=>{
	//     console.log(e.target.value)
	//     console.log(key)
	//     obj[key]=e.target.value
	//     setValue({...Value,...obj})
	//     console.log(Value)
	//   }
	const handleSubmit = () => {
		// e.preventDefault()
		console.log(IdRef.current.value, PasswordRef.current.value);
		sendValue(Value);

		// props.setState(!props.State)
	};

	return (
		<div className="m-5 ">
			{/* onSubmit={handleSubmit} */}
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
						placeholder="test"
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
						type="text"
						id="Id"
						className="p-2 m-2 w-sm rounded"
						placeholder="test"
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
