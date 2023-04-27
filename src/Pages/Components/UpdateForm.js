import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import * as React from "react";

import axios from "axios";

// const api = "http://localhost:3001/employees"

export default function UpdateForm(props) {
	const signIn = JSON.parse(localStorage.getItem("signIn"));

	let component = " ";
	let location = useLocation().pathname;
	let dataRef = useRef([""]);
  const d = new Date();
  let Booking_date = d.toISOString().slice(0, 19).split('T')[0];

	//props.toapi
	// props.data
	// let Keys = props.key
	// props.state
	// props.setState

	let toapi = props.toapi;

	const [Value, setValue] = useState({});
	const [Data, setData] = useState([]);
	const [Keys, setKeys] = useState([]);
  let bkDate = ""
  let CID = ""
	let obj = {};
	useEffect(() => {
		let api = props.api;
    console.log("inside useeffect")
		console.log(props.data);
		async function getData() {
			// console.log("running Dependent update form");
			const res = await axios.get(api);
			// console.log(res.data.data);
			// console.log(Object.keys(res.data.data[0]));
			setKeys(Object.keys(res.data.data[0]));
			setData(Object.values(res.data.data[0]));
			setValue(res.data.data[0]);
      // console.log(Keys)
      // console.log(Data)
      // console.log(Value)
			// console.log("kaj korse");
			// console.log(api);
			// console.log("printing key and data and value:");
			// console.log(Keys, Data,Value);
		}
		getData();
	}, [props.api]);

	const fieldChecker = (key, index) => {
		const date_input = key.includes("date");
		const date_input2 = key.includes("Date");
		const phone = key.includes("Phone");
		const hour = key.includes("Hour");
		const sHour = key.includes("hour");
    const password = key.includes("Password")
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
    //     placeholder="Paid_unpaid"
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
        placeholder="test"
        value={Value[key]?Value[key]:""}
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
              // onChange={(e) => handleChange(e, key)}
              placeholder="test"
              value={Value[key]?Value[key].split("T")[0]:""}
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
						placeholder="test"
						value={Value[key]?Value[key].split("T")[0]:""}
					/>
				</div>
			);
    }
    else if (phone || hour || sHour) {
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
						className="p-2 m-2 w-sm rounded"
						onChange={(e) => handleChange(e, key)}
						placeholder="test"
						value={Value[key]?Value[key]:""}
					/>
				</div>
			);
		} 
    else {
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
						placeholder="test"
						value={Value[key]?Value[key]:""}
					/>
				</div>
			);
		}
    // return(
    //   <div>
    //     {key}
    //     {Data[index]}
    //   </div>
    // )
	};

	const sendValue = async (data) => {
		try {
			console.log(data);
			let api = props.api;
			api = api.replace("All", "");
			console.log(api);
			let sendData = data;
			console.log("data123: ", sendData);
			const resp = await axios.patch(api, sendData);
			console.log(resp.data);
		} catch (err) {
			// Handle Error Here
			console.error(err);
		}
	};

	let handleChange = (e, key) => {
		console.log("handleChange");
		// console.log(e.target.value);
		// console.log(key);
		obj[key] = e.target.value;
		setValue({ ...Value, ...obj });
		setData(Object.values(Value));
		// console.log(Value);
    // console.log(Keys,Data)
	};
	const handleSubmit = (e) => {
		e.preventDefault();
		// console.log("hurrah!!!");
		// console.log(Value);
    
    e.preventDefault();
		console.log("hurrah!!!");
    if(location==="/CustBuys"&&signIn.mode==="Customer"){
      console.log("inside handle submit")
      let Value2 = {...Value,Cid:signIn.id,Booking_date:Value["Booking_date"],Paid_unpaid:Value["Paid_unpaid"]}
      console.log(Value2)
      sendValue(Value2);
    }else{
      sendValue(Value);
    }
		

		
		
    // props.setState(!props.State);
		// setTimeout(() => {
		// 	window.location.reload(true);
		// }, 500);

		props.setState(!props.State);
	};

	if (signIn) {
		// console.log("check Sign in ");
		// console.log(location);
		// console.log(location === "/dependents");
		if (
			signIn.mode === "Admin" ||
      (signIn.mode === "Customer" && location === "/dependents")||
      (signIn.mode === "Customer" && location === "/CustBuys")
			
		) {
			component = (
				<div>
					<h1 className="bold font-bold text-2xl mb-3 text-white">
						Update Form
					</h1>
					<form className="max-w-[500px] bg-blue-500 flex flex-wrap space-between flex-col rounded font-bold text-md text-white">
						{Keys.map((key, index) => fieldChecker(key, index))}
						<button
							onClick={handleSubmit}
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
