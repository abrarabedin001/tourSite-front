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
	useEffect(() => {
		//ctx.changeMode2()
	}, []);
	
	console.log("Header")
	
	console.log(ctx.a["mode"]);
	let [show, setShow] = useState("None");
	const [visible, setVisible] = useState(false);
	console.log("Header");
	console.log(ctx.a["mode"]);

	return (

			<div className="App ">
				{ctx.a["mode"] == "Admin" ? <MenuAdmin /> : ""}
				{ctx.a["mode"] == "user" ? "LOL" : ""}
				{ctx.a["mode"] == "Customer" ? <MenuCustomer /> : ""}
				{ctx.a["mode"] == "Employee" ? <MenuEmployee /> : ""}

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
				</header>
				<div className="flex justify-center flex-row">
					{console.log(show)}
					{ctx.a["mode"] == "user"? <LoginForm setVisible={setVisible} /> : ""}
					{ctx.a["mode"] == "user"?  <LoginFormCustomer setVisible={setVisible} /> : ""}
					{ctx.a["mode"] == "user"? <CustomerSignUp setVisible={setVisible} /> : ""}
				</div>
			</div>

	);
}

export default Header;
