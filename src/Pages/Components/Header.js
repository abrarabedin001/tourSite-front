import { useContext, useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Customers } from "../Customers";
import { Employees } from "../Employees";
import { Packages } from "../Packages";
import { Locations } from "../Locations";
import { Drives } from "../Drives";
import { Vehicles } from "../Vehicles";
import { Accomodation } from "../Accomodation";
import { AccBelongsTo } from "../AccBelongsTo";
import { EWorksIn } from "../EWorksIn";
import { CustBuys } from "../CustBuys";
import { PackageHas } from "../PackageHas";
import { Dependents } from "../Dependents";
import { Receipts } from "../Receipts";

import { AppStore } from "../../Store/AppStore";
// import { UserContext } from "./Store/AppStore";
import { UserContext } from "../../Store/AppStore";
// import Table from './Table';

import LoginForm from "./LoginForm";
import LoginFormCustomer from "./LoginFormCustomer";
import { CustomerSignUp } from "./CustomerSignUp";

import { Container } from "@mui/material";
import Menu from "./Menu";
import MenuAdmin from "./MenuAdmin";
import MenuCustomer from "./MenuCustomer";
import MenuEmployee from "./MenuEmployee";

function Header() {
	let ctx = useContext(UserContext);
	const signIn = JSON.parse(localStorage.getItem("signIn"));
	const handleLogOut = () => {
		localStorage.removeItem("signIn");
		window.location.reload(true);
	};
	console.log("signIn:  ");
	if (signIn) {
		console.log(signIn);
	}
	useEffect(() => {}, [ctx]);

	let [show, setShow] = useState("None");
	const [visible, setVisible] = useState(false);

	console.log("Header");
	console.log(ctx.a["mode"]);

	return (
		<div className="App ">
			{signIn ? (
				<div>
					{signIn.mode == "Admin" ? <MenuAdmin /> : ""}
					{signIn.mode == "Customer" ? <MenuCustomer /> : ""}
					{signIn.mode == "Employee" ? <MenuEmployee /> : ""}
				</div>
			) : (
				" "
			)}
			{signIn ? (
				<header className="App-header">
					<Container>
						<Routes>
							<Route path="/Customers" element={<Customers />} />
							<Route path="/Receipts" element={<Receipts />} />
							<Route path="/Dependents" element={<Dependents />} />
							<Route path="/Employees" element={<Employees />} />
							<Route path="/Packages" element={<Packages />} />
							<Route path="/Locations" element={<Locations />} />
							<Route path="/Drives" element={<Drives />} />
							<Route path="/Vehicles" element={<Vehicles />} />
							<Route path="/Accomodation" element={<Accomodation />} />
							<Route path="/AccBelongsTo" element={<AccBelongsTo />} />
							<Route path="/EWorksIn" element={<EWorksIn />} />
							<Route path="/CustBuys" element={<CustBuys />} />
							<Route path="/PackageHas" element={<PackageHas />} />
						</Routes>
					</Container>

					<button
						className="w-[120px] bg-white p-3 m-3 font-bold"
						onClick={handleLogOut}
					>
						Log out
					</button>
				</header>
			) : (
				" "
			)}

			{!signIn ? (
				<div className="flex justify-center flex-row">
					<LoginForm setVisible={setVisible} />
					<LoginFormCustomer setVisible={setVisible} />
					<CustomerSignUp setVisible={setVisible} />
				</div>
			) : (
				" "
			)}
		</div>
	);
}

export default Header;
