import * as React from "react";
import { Link, Route, Routes } from "react-router-dom";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
// import MenuIcon from '@mui/icons-material/Menu';
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
// import AdbIcon from '@mui/icons-material/Adb';

const pages = [
	<Link className="no-underline" to="/customers">
		Customers
	</Link>,
	<Link className="no-underline" to="/receipts">
		Receipts
	</Link>,

	<Link className="no-underline" to="/dependents">
		Dependents
	</Link>,
	<Link to="/Employees" className="no-underline">
		Employees
	</Link>,
	<Link to="/Packages" className="no-underline">
		Packages
	</Link>,
	<Link to="/Locations" className="no-underline">
		Locations
	</Link>,
	<Link to="/Drives" className="no-underline">
		Drives
	</Link>,
	<Link to="/Vehicles" className="no-underline">
		Vehicles
	</Link>,
	<Link to="/Accomodation" className="no-underline">
		Accomodation
	</Link>,
	<Link to="/AccBelongsTo" className="no-underline">
		AccBelongsTo
	</Link>,
	<Link to="/EWorksIn" className="no-underline">
		EWorksIn
	</Link>,
	<Link to="/CustBuys" className="no-underline">
		CustBuys
	</Link>,
	<Link to="/PackageHas" className="no-underline">
		PackageHas
	</Link>,
];
const settings = [
	<Link className="no-underline" to="/customers">
		Customers
	</Link>,
	<Link className="no-underline" to="/receipts">
		Receipts
	</Link>,

	<Link className="no-underline" to="/dependents">
		Dependents
	</Link>,
	<Link to="/Employees" className="no-underline">
		Employees
	</Link>,
	<Link to="/Packages" className="no-underline">
		Packages
	</Link>,
	<Link to="/Locations" className="no-underline">
		Locations
	</Link>,
	<Link to="/Drives" className="no-underline">
		Drives
	</Link>,
	<Link to="/Drives" className="no-underline">
		Vehicles
	</Link>,
	<Link to="/Accomodation" className="no-underline">
		Accomodation
	</Link>,
	<Link to="/AccBelongsTo" className="no-underline">
		AccBelongsTo
	</Link>,
	<Link to="/EWorksIn" className="no-underline">
		EWorksIn
	</Link>,
	<Link to="/CustBuys" className="no-underline">
		CustBuys
	</Link>,
	<Link to="/PackageHas" className="no-underline">
		PackageHas
	</Link>,
];

function ResponsiveAppBar() {
	const [anchorElNav, setAnchorElNav] = React.useState();
	const [anchorElUser, setAnchorElUser] = React.useState();

	const handleOpenNavMenu = (event) => {
		setAnchorElNav(event.currentTarget);
	};
	const handleOpenUserMenu = (event) => {
		setAnchorElUser(event.currentTarget);
	};

	const handleCloseNavMenu = () => {
		setAnchorElNav(null);
	};

	const handleCloseUserMenu = () => {
		setAnchorElUser(null);
	};

	return (
		<AppBar position="static">
			<Container maxWidth="xl">
				<Toolbar disableGutters>
					{/* <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} /> */}
					<Typography
						variant="h6"
						noWrap
						component="a"
						href="/"
						sx={{
							mr: 2,
							display: { xs: "none", md: "flex" },
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						LOGO
					</Typography>

					<Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
						<Menu
							id="menu-appbar"
							anchorEl={anchorElNav}
							anchorOrigin={{
								vertical: "bottom",
								horizontal: "left",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "left",
							}}
							open={Boolean(anchorElNav)}
							onClose={handleCloseNavMenu}
							sx={{
								display: { xs: "block", md: "none" },
							}}
						>
							{pages.map((page) => (
								<MenuItem key={page} onClick={handleCloseNavMenu}>
									{/* <Typography textAlign="center">{page}</Typography> */}
									{page}
								</MenuItem>
							))}
						</Menu>
					</Box>
					{/* <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} /> */}
					<Typography
						variant="h5"
						noWrap
						component="a"
						href=""
						sx={{
							mr: 2,
							display: { xs: "flex", md: "none" },
							flexGrow: 1,
							fontFamily: "monospace",
							fontWeight: 700,
							letterSpacing: ".3rem",
							color: "inherit",
							textDecoration: "none",
						}}
					>
						LOGO
					</Typography>
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{pages.map((page) => (
							// <Button
							//   key={page}
							//   onClick={handleCloseNavMenu}
							//   sx={{ my: 2, color: 'white', display: 'block' }}
							// >
							<div
								className="p-2 m-2  trnasition hover:bg-blue-100 text-black font-bold duration-500  rounded"
								key={page}
							>
								{page}
							</div>

							// </Button>
						))}
						<button onClick={localStorage.removeItem("signIn") }> LOG OUT </button>
					</Box>

					<Box sx={{ flexGrow: 0 }}>
						<Tooltip title="Open settings">
							<IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
								<Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
							</IconButton>
						</Tooltip>
						<Menu
							sx={{ mt: "45px" }}
							id="menu-appbar"
							anchorEl={anchorElUser}
							anchorOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							keepMounted
							transformOrigin={{
								vertical: "top",
								horizontal: "right",
							}}
							open={Boolean(anchorElUser)}
							onClose={handleCloseUserMenu}
						>
							{settings.map((setting) => (
								<MenuItem key={setting} onClick={handleCloseUserMenu}>
									<Typography textAlign="center">{setting}</Typography>
								</MenuItem>
							))}
						</Menu>
					</Box>
				</Toolbar>
			</Container>
		</AppBar>
	);
}
export default ResponsiveAppBar;
