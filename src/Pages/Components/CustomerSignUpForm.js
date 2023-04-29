import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import * as React from "react";

import axios from "axios";

// const api = "http://localhost:3001/employees"

export default function CustomerSignUpForm(props) {
	const api = props.api;
	let component = " ";
	let location = useLocation().pathname;

	//props.toapi
	// props.data
	// let Keys = props.key
	// props.state
	// props.setState

	const toapi = props.toapi;

	const [Value, setValue] = useState({});
	const [Data, setData] = useState([]);
	const [Keys, setKeys] = useState([]);
	const [Error, setError] = useState(false);

	let obj = {};
	useEffect(() => {
		async function getData() {
			const res = await axios.get(api);
			setKeys(Object.keys(res.data.data[0]));
		}
		getData();
	}, [Error]);

	const fieldChecker = (key) => {
		const date_input = key.includes("date");
		const phone = key.includes("Phone");
		const hour = key.includes("Hour");
		const sHour = key.includes("hour");
		const password = key.includes("Password");
		// const
		if (date_input) {
			return (
				<div key={key} className="flex flex-col rounded mt-2 text-black">
					<label htmlFor={key} className="w-full text-left pl-2">
						{key}
					</label>
					<input
						type="date"
						id={key}
						className="p-2 m-2 w-sm rounded"
						onChange={(e) => handleChange(e, key)}
						placeholder={key}
					/>
				</div>
			);
		} else if (phone || hour || sHour) {
			return (
				<div
					key={key}
					className="flex flex-col rounded mt-2 font-bold text-black"
				>
					<label htmlFor={key} className="w-full text-left pl-2">
						{key}
					</label>
					<input
						type="number"
						id={key}
						defaultValue=""
						className="p-2 m-2 w-sm rounded"
						onChange={(e) => handleChange(e, key)}
						placeholder={key}
					/>
				</div>
			);
		} else if (password){
      return (
				<div
					key={key}
					className="flex flex-col rounded mt-2 font-bold text-black"
				>
					<label htmlFor={key} className="w-full text-left pl-2">
						{key}
					</label>
					<input
						type="password"
						id={key}
						className="p-2 m-2 w-sm rounded"
						onChange={(e) => handleChange(e, key)}
						placeholder={key}
						value={Value[key]?Value[key].split("T")[0]:""}
					/>
				</div>
			);
    }else {
			return (
				<div
					key={key}
					className="flex flex-col rounded mt-2 font-bold text-black"
				>
					<label htmlFor={key} className="w-full text-left pl-2">
						{key}
					</label>
					<input
						type="text"
						id={key}
						className="p-2 m-2 w-sm rounded"
						onChange={(e) => handleChange(e, key)}
						placeholder={key}
					/>
				</div>
			);
		}
	};

	const sendValue = async (data) => {
    
    try {
      // console.log("topai in sendValue")
      // console.log(toapi)
      // console.log(Value.Id)
      //localhost:3001/customer
      let toapi2 = toapi+"/"+Value.Id
      //localhost:3001/customer/01
      // console.log("topai in sendValue")
      // console.log(toapi2)
			const resp = await axios.get(toapi2);
      console.log("response:")
			let length = resp.data.data.length
      
      
      if (length===1){
        setError(true)
        return 0}


		} catch (err) {
      
			// Handle Error Here
			console.error(err);
		}
    let objLength = Object.keys(Value).length
    console.log(objLength)

    if(objLength===7){
      setError(false)
      console.log(Value.Password)
      
      try {
        const resp = await axios.post(toapi, data);
        console.log(resp.data);
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
    }
    else{
      setError(true)
    }
		
	};

	let handleChange = (e, key) => {
		console.log(e.target.value);
		console.log(key);
		obj[key] = e.target.value;
		setValue({ ...Value, ...obj });
		console.log(Value);
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		console.log("hurrah!!!");
		sendValue(Value);
    // if(Error===false){
    //   // props.setState(!props.State);
    //   setTimeout(() => {
    //     window.location.reload(true);
    //   }, 1000);
    // }
		
	};

	return (
		<div className="m-5">
			<div>
				<h1 className="bold font-bold text-2xl mb-3 text-white">Form input</h1>
				<form className="max-w-[500px] bg-blue-500 flex flex-wrap space-between flex-col rounded font-bold text-md text-white">
					{Keys.map((key) => fieldChecker(key))}
					<button
						onClick={handleSubmit}
						type="submit"
						className="bg-blue-200 rounded p-3 m-3 max-w-[200px] font-bold text-lg text-black"
					>
						Submit
					</button>
          {Error&&<p className="bg-rose-900 p-3 font-bold">This Id might already exist Or other Error</p>}
          
				</form>

			</div>
		</div>
	);
}



