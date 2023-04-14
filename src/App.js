import { useContext } from "react";
import { Link, Route, Routes } from "react-router-dom";
import { Customers } from "./Pages/Customers";
import { Employees } from "./Pages/Employees";
import { Packages } from "./Pages/Packages";
import { Locations } from "./Pages/Locations";
import { Drives } from "./Pages/Drives";
import { Vehicles } from "./Pages/Vehicles";
import { Accomodation } from "./Pages/Accomodation";
import { AccBelongsTo } from "./Pages/AccBelongsTo";
import { EWorksIn } from "./Pages/EWorksIn";
import { CustBuys } from "./Pages/CustBuys";
import { PackageHas } from "./Pages/PackageHas";
import { Dependents } from "./Pages/Dependents";
import { Receipts } from "./Pages/Receipts";
import { useState } from "react";
import { AppStore } from "./Store/AppStore";
import { UserContext } from "./Store/AppStore";
// import Table from './Components/Table';

import LoginForm from "./Pages/Components/LoginForm";
import LoginFormCustomer from "./Pages/Components/LoginFormCustomer";
import { CustomerSignUp } from "./Pages/Components/CustomerSignUp";

import { Container } from "@mui/material";
import Menu from "./Pages/Components/Menu";
import MenuAdmin from "./Pages/Components/MenuAdmin";
import MenuCustomer from "./Pages/Components/MenuCustomer";
import MenuEmployee from "./Pages/Components/MenuEmployee";

function App() {
	const ctx = useContext(UserContext);
	const [visible, setVisible] = useState(false);

	return (
		<AppStore>
			<div className="App ">
				{ctx.mode == "None" ? <Menu /> : ""}
				{ctx.mode == "Admin" ? <MenuAdmin /> : ""}
				{ctx.mode == "Customer" ? <MenuCustomer /> : ""}
				{ctx.mode == "Employee" ? <MenuEmployee /> : ""}

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
					{!visible ? <LoginForm setVisible={setVisible} /> : ""}
					{!visible ? <LoginFormCustomer setVisible={setVisible} /> : ""}
					{!visible ? <CustomerSignUp setVisible={setVisible} /> : ""}
				</div>
			</div>
		</AppStore>
	);
}

export default App;
