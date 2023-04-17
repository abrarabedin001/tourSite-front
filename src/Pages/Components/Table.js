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
	let rows = props.Data;
	let toapi = props.toapi;
	let delapi = props.toapi;
	const signIn = JSON.parse(localStorage.getItem("signIn"));
	let location = useLocation().pathname;
	let ctx = useContext(UserContext);
	let show = false;
	let showUpdate = false;
	if (
		signIn?.mode === "Admin" ||
		(location === "/dependents" && signIn?.mode === "Customer") ||
		(location === "/CustBuys" && signIn?.mode === "Customer")
	) {
		show = true;
	}
	if (
		(signIn?.mode === "Admin" && location === "/EWorksIn") ||
		(signIn?.mode === "Admin" && location === "/customers")||
		(signIn?.mode === "Admin" && location === "/dependents")||
		(signIn?.mode === "Customer" && location === "/dependents")
	) {
		showUpdate = true;
	} else {
		showUpdate = false;
	}

	// console.log(rows)
	const delValue = async (Id) => {
		try {
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

	const updateHandler = (e, rows) => {
		console.log(rows);
		console.log("running update handler");
		let link = " ";
		if (location === "/EWorksIn") {
			link = props.toapi + "All/" + rows["Lid"] + "/" + rows["Emp_id"];
		} else if (location === "/customers") {
			link = props.toapi + "All/" + rows["Id"];
		}

		props.setApi(link);
		console.log("Aikhane");
		console.log(link);
	};
	const deleteHandler = (e, rows) => {
		props.setState(!props.State);
		// let col_name = rows.object.key()
		console.log(props.to);
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
			delValues(rows["Emp_id"], rows["Vlicense"]);
		} else if (vehicles) {
			delValue(rows["License"]);
		} else if (receipts) {
			delValue(rows["Receipt_id"]);
		} else if (packages_has) {
			delValues(rows["Lid"], rows["Pid"]);
		} else if (customebuys) {
			delValues(rows["Cid"], rows["Pid"]);
		} else if (dependents) {
			delValues(rows["Cid"], rows["Dname"]);
		} else if (eworksIn) {
			delValues(rows["Lid"], rows["Emp_id"]);
		} else if (cushire) {
			delValues(rows["Cid"], rows["Vlicense"]);
		} else if (cusbook) {
			delValues(rows["Cid"], rows["Aid"]);
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
					{rows.map((row) => (
						<TableRow
							key={row.id}
							sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
							className="mt-5 font-bold "
						>
							{props.keys.map((key) => (
								<TableCell component="th" scope="row">
									{row[key]}
								</TableCell>
							))}
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
