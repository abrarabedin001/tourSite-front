import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import * as React from "react";

import axios from "axios";

// const api = "http://localhost:3001/employees"

export default function Form(props) {
	const signIn = JSON.parse(localStorage.getItem("signIn"));
	const api = props.api + "All";
	let component = " ";
	let location = useLocation().pathname;
  const d = new Date();
  let Booking_date = d.toISOString().slice(0, 19).split('T')[0];

	//props.toapi
	// props.data
	// let Keys = props.key
	// props.state
	// props.setState

	const toapi = props.toapi;

	const [Value, setValue] = useState({});
	const [Data, setData] = useState([]);
	const [Keys, setKeys] = useState([]);

	let obj = {};
	useEffect(() => {
		async function getData() {
			const res = await axios.get(api);
			setKeys(Object.keys(res.data.data[0]));
		}
		getData();
	}, []);

	const fieldChecker = (key,index) => {
		const date_input = key.includes("date");
		const date_input2 = key.includes("Date");
		const phone = key.includes("Phone");
		const hour = key.includes("Hour");
		const sHour = key.includes("hour");
		const password = key.includes("Password");
		// const
		if(key==="Paid_unpaid"&&signIn.mode==="Customer"){
    //   return <div
    //   key={key}
    //   className="flex flex-col rounded mt-2 font-bold text-black"
    // >
    //   <label htmlFor={key} className="w-full text-left pl-2">
    //     {key}
    //   </label>
    //   <input
    //     type="text"
    //     id={key}
    //     className="p-2 m-2 w-sm rounded"
    //     // onChange={(e) => handleChange(e, key)}
    //     placeholder="test"
    //     value={Value[key]?Value[key]:""}
    //   />
    // </div>
    }else if(key==="Cid"&&signIn.mode==="Customer"){
      return <div
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
        // onChange={(e) => handleChange(e, key)}
        placeholder={key}
        value={signIn.id}
      />
    </div>
    }else if (date_input || date_input2) {
			if (key==="Booking_date"){
        let date = new Date().toLocaleString()
        return (
          <div
            key={key}
            className="flex flex-col rounded mt-2 font-bold text-black"
          >
            <label htmlFor={key} className="w-full text-left pl-2">
              {key}
            </label>
            <input
              type="date"
              id={key}
              className="p-2 m-2 w-sm rounded"
              onChange={(e) => handleChange(e, key)}
              placeholder="test"
              value={Booking_date.split(" ")[0]}
            />
          </div>
        );
      }else{
        return (
          <div
            key={key}
            className="flex flex-col rounded mt-2 font-bold text-black"
          >
            <label htmlFor={key} className="w-full text-left pl-2">
              {key}
            </label>
            <input
              type="date"
              id={key}
              className="p-2 m-2 w-sm rounded"
              onChange={(e) => handleChange(e, key)}
              placeholder="test"
              value={Value[key]?Value[key].split("T")[0]:""}
            />
          </div>
        );
      }
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
    }else if (phone || hour || sHour) {
			return (
				<div
					key={index}
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
		} else {
			return (
				<div
					key={index}
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
			console.log(data);
			const resp = await axios.post(toapi, data);
			console.log(resp.data);
		} catch (err) {
			// Handle Error Here
			console.error(err);
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
    if(location==="/CustBuys"&&signIn.mode==="Customer"){
      console.log("inside handle submit")
      let Value2 = {...Value,Cid:signIn.id,Booking_date:Booking_date.split(" ")[0],Paid_unpaid:"0"}
      console.log(Value2)
      sendValue(Value2);
    }else{
      sendValue(Value);
    }
		

		props.setState(!props.State);
		setTimeout(() => {
			window.location.reload(true);
		}, 500);
	};

	if (signIn) {
		console.log(location);
		console.log(location === "/dependents");
		if (
      signIn.mode === "Admin" ||
      (signIn.mode === "Customer" && location === "/dependents")||
      (signIn.mode === "Customer" && location === "/CustBuys")
		) {
			component = (
				<div>
					<h1 className="bold font-bold text-2xl mb-3 text-white">
						Form input
					</h1>
					<form className="max-w-[500px] bg-blue-500 flex flex-wrap space-between flex-col rounded font-bold text-md text-white">
						{Keys.map((key,index) => fieldChecker(key,index))}
						<button
							onClick={handleSubmit}
							type="submit"
							className="bg-blue-200 rounded p-3 m-3 max-w-[200px] font-bold text-lg text-black"
						>
							Submit
						</button>
					</form>
				</div>
			);
		}
	}

	return <div className="m-5">{component}</div>;
}
