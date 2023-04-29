import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { UserContext } from "../../Store/AppStore";
import { useLocation } from "react-router-dom";
import { useEffect, useState, useRef, useContext } from "react";

import axios from "axios";

export default function DenseTable(props) {
	//props.keys
	// props.State
	// props.setState
	//props.setApi
  //props.setShowForm
  // props.Data 
  // localhost:3001/customer
  // localhost:3001/customer
	let rows = props.Data;
	let toapi = props.toapi;
	let delapi = props.toapi;
  // admin?customer?employee
	const signIn = JSON.parse(localStorage.getItem("signIn")); 
	let location = useLocation().pathname;
	let ctx = useContext(UserContext);
	let show = false;
	let showUpdate = false;
  let showAdd = false;

	if (
		signIn?.mode === "Admin" ||
		(location === "/dependents" && signIn?.mode === "Customer") ||
		(location === "/CustBuys" && signIn?.mode === "Customer")
	) {
		show = true;
	}
	if (
		(signIn?.mode === "Admin" && location === "/EWorksIn") ||
		(signIn?.mode === "Admin" && location === "/customers") ||
		(signIn?.mode === "Admin" && location === "/dependents") ||
		(signIn?.mode === "Customer" && location === "/dependents")||
		(signIn?.mode === "Admin" && location === "/Employees")||
    (signIn?.mode === "Admin" && location === "/Packages")||
    (signIn?.mode === "Admin" && location === "/Drives")||
    (signIn?.mode === "Admin" && location === "/CustBuys")||
    (signIn?.mode === "Customer" && location === "/CustBuys")||
    (signIn?.mode === "Admin" && location === "/Vehicles")




	) {
		showUpdate = true;
	} else {
		showUpdate = false;
	}

  if (
		
    (signIn?.mode === "Customer" && location === "/Packages")
	) {
		showAdd = true;
	} else {
		showAdd = false;
	}
  // showAdd

	// console.log(rows)
	const delValue = async (Id) => {
		try {
  // localhost:3001/customer/03

			let link = delapi + "/" + Id;
			console.log(link);
			const resp = await axios.delete(link);
		} catch (err) {
			// Handle Error Here
			console.error(err);
		}
	};
	const delValues = async (Id1, Id2) => {
		try {
			console.log(Id1);
			let link = delapi + "/" + Id1 + "/" + Id2;

			console.log(link);
			console.log("delapi");
			const resp = await axios.delete(link);
		} catch (err) {
			// Handle Error Here
			console.error(err);
		}
	};

  // DEALS WITH DATES
  const delValues2 = async (Id1, Id2,Id3) => {
		try {

        const myArray = Id3.split("T");
        Id3 = myArray[0]
   
			
			let link = delapi + "/" + Id1 + "/" + Id2+"/"+Id3;

			console.log(link);
			console.log("delapi");
			const resp = await axios.delete(link);
		} catch (err) {
			// Handle Error Here
			console.error(err);
		}
	};
  //DEALS WITH IDS AS THIRD PARAM

  const addHandler = (e, rows) => {
		console.log(rows);
		console.log("running update handler");
		let addLink = "http://localhost:3001/custbuystest" 
		let addLink2 = "http://localhost:3001/custbuys" 
    let Pid = rows["Id"]
    // Cid, Pid, Start_date, End_date,Paid_unpaid

    let Cid =  signIn.id
    const d = new Date();

  //   const MOMENT = require( 'moment' );
  // let datetime = MOMENT().format( 'YYYY-MM-DD  HH:mm:ss.000' );
    let Booking_date = d.toISOString().slice(0, 19).split('T')[0];
	let Start_date=null
    let End_date = null
    let Paid_unpaid = 0
    let obj = {
      "Cid":Cid,
      "Pid":Pid,
	  "Booking_date":Booking_date,
      "Start_date":Start_date,
      "End_date":End_date,
      "Paid_unpaid":Paid_unpaid
    }
    const sendValue = async (link1,link2,data) => {
      try {
        let link = link1 + "/" + data.Cid + "/" + data.Pid +"/"+data.Booking_date;
        console.log(link);
        console.log("exp")
        const resp = await axios.get(link);
        console.log(resp)
        if (resp.data.data.message.length>0){
          console.log("Positive")
          // console.log(resp.data.data.message.length)
          // console.log(resp.data.data.message)
        }else{
          console.log("Negative")

          const resp = await axios.post(link2,data);
        }
        // let customer = resp.data.data[0];
        console.log(resp)
      } catch (err) {
        // Handle Error Here
        console.error(err);
      }
      // window.location.reload(true);
    };
    sendValue(addLink,addLink2 ,obj)
    console.log(obj)
	};

	const updateHandler = (e, rows) => {
    
		console.log(rows);
		console.log("running update handler");
		let link = " ";
		if (location === "/EWorksIn") {
			link = props.toapi + "All/" + rows["Lid"] + "/" + rows["Emp_id"]+"/"+rows["Date"];
		} else if (location === "/customers") {
			link = props.toapi + "All/" + rows["Id"];
		} else if (location === "/dependents") {
			link = props.toapi + "All/" + rows["Cid"] + "/" + rows["Dname"];
		} else if(location === "/Employees"){
			link = props.toapi + "All/" + rows["Id"];
		}else if(location === "/Packages"){
			link = props.toapi + "All/" + rows["Id"];
		}
    else if(location === "/CustBuys"){
			link = props.toapi + "All/" + rows["Cid"]+"/"+rows["Pid"]+"/"+rows["Booking_date"].split("T")[0];
		}
    else if(location === "/Vehicles"){
			link = props.toapi + "All/" + rows["License"];
		}
		props.setApi(link);
		console.log("Aikhane");
		console.log(link);
    props.setShowForm(true)
	};
	const deleteHandler = (e, rows) => {
    console.log("state of state")
    console.log(props.state)
    if(props.state==="e"){
      props.setState("j");
    }else{
      props.setState("e");
    }


		// let col_name = rows.object.key()
		
		let acc_belongsTo = props.toapi.includes("/accBelongTo");
		let drives = props.toapi.includes("/drives");
		let vehicles = props.toapi.includes("/vehicles");
		let packages_has = props.toapi.includes("/package_has");
		let customebuys = props.toapi.includes("/custbuys");
		let dependents = props.toapi.includes("/dependents");
		let eworksIn = props.toapi.includes("/eworksin");
		let receipts = props.toapi.includes("/receipts");
		let cushire = props.toapi.includes("/CusHire");
		let cusbook = props.toapi.includes("/cusbook");

		if (acc_belongsTo) {
			console.log(rows);
			delValues(rows["Aid"], rows["Pid"]);
		} else if (drives) {
			delValues2(rows["Emp_id"], rows["Vlicense"],rows["date"]);
		} else if (vehicles) {
			delValue(rows["License"]);
		} else if (receipts) {
			delValue(rows["Receipt_id"]);
		} else if (packages_has) {
			delValues(rows["Lid"], rows["Pid"]);
		} else if (customebuys) {
			delValues2(rows["Cid"], rows["Pid"],rows["Booking_date"]);
		} else if (dependents) {
			delValues(rows["Cid"], rows["Dname"]);
		} else if (eworksIn) {
			delValues(rows["Lid"], rows["Emp_id"]);
		} else if (cushire) {
			delValues2(rows["Cid"], rows["Vlicense"],rows["date"]);
		} else if (cusbook) {
			delValues2(rows["Cid"], rows["Aid"],rows["Date"]);
		} else {
			delValue(rows["Id"]);
		}
	};

	// console.log(keys,Values)
	return (
		<TableContainer component={Paper} className="mt-5 font-bold ">
			<Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
				{/* ///Column names */}
				<TableHead>
					<TableRow key="special">
						{props.keys.map((key) => (
							<TableCell>{key}</TableCell>
						))}
					</TableRow>
				</TableHead>

				{/* Data Bearing Columns */}
				<TableBody>
					{rows.map((row,index) => (
						<TableRow
							key={index}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							className="mt-5 font-bold "
						>
							{props.keys.map((key,ind) => (
								<TableCell component="th" scope="row" >
                  {(key.includes("Date")||key.includes("date"))&&row[key]? row[key].split("T")[0] :row[key]}
									
								</TableCell>
							))}
              <TableCell align="right">
								{showAdd && (
									row["Availability"]?<button
										className="p-2 m-2 bg-green-700 rounded-lg text-white font-bold"
										// onClick={(e, rows) = addHandler(e, row)}
                    onClick={(e, rows) => addHandler(e, row)}
									>
										Add
									</button>:" "
								)}
							</TableCell>
							<TableCell align="right">
								{showUpdate && (
									<button
										className="p-2 m-2 bg-green-700 rounded-lg text-white font-bold"
										onClick={(e, rows) => updateHandler(e, row)}
									>
										Update
									</button>
								)}
							</TableCell>

							<TableCell align="right">
								{show && (
									<button
										className="p-2 m-2 bg-red-700 rounded-lg text-white font-bold"
										onClick={(e, rows) => deleteHandler(e, row)}
									>
										Delete
									</button>
								)}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</TableContainer>
	);
}
