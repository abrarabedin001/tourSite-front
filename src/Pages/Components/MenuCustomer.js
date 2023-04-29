import * as React from "react";
// import { Link, Route, Routes } from "react-router-dom";
import { Link, Route, Routes,useLocation } from "react-router-dom";

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

	{link:"/customers",
		label:"Customers"},
   
    {
      link: "/dependents",
      label: "Dependents"
    },
    {
      link: "/CustBuys",
      label: "Package Booking"
    },
    {
      link: "/CusBook",
      label: "Hotel Reservation"
    },
    {
      link: "/CusHire",
      label: "Vehicle Assigned"
    },
 
    {
      link: "/Packages",
      label: "Packages"
    },
    {
      link: "/Locations",
      label: "Locations"
    },
    {
      link: "/Accomodation",
      label: "Hotels"
    },
    {
      link: "/AccBelongsTo",
      label: "Package Hotels"
    },   
    {
      link: "/PackageHas",
      label: "Package locations"
    }
];
const settings = [
	<Link className="no-underline" to="/customers">
		Customers
	</Link>,

	<Link className="no-underline" to="/dependents">
		Dependents
	</Link>,
	<Link to="/CustBuys" className="no-underline">
		Package Booking
	</Link>,
	<Link to="/CusBook" className="no-underline">
		Lodging Reservation
	</Link>,
	<Link to="/CusHire" className="no-underline">
		Vehicle Assigned
	</Link>,
	<Link to="/Packages" className="no-underline">
		Packages
	</Link>,
	<Link to="/Locations" className="no-underline">
		Locations
	</Link>,
	<Link to="/Accomodation" className="no-underline">
		Lodging
	</Link>,
	<Link to="/AccBelongsTo" className="no-underline">
		Location lodging
	</Link>,
	<Link to="/PackageHas" className="no-underline">
		Package locations
	</Link>,
];

function ResponsiveAppBar() {
  let location = useLocation().pathname;
	const [anchorElNav, setAnchorElNav] = React.useState();
	const [anchorElUser, setAnchorElUser] = React.useState();
  let [active,setActive] = React.useState("")

  let navOnClick = (label)=>{
    console.log("nav link")
    setActive(label)
  }

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
				
					<Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
						{pages.map((page) => (
							
								<Link onClick={()=>{navOnClick(page.label)}} className={location===page.link?"bg-blue-900 p-2 hover:bg-blue-900 font-bold text-lg text-center":"bg-blue hover:bg-blue-900 p-2 font-bold text-lg text-center"} to={page.link}>
                  {page.label}
                  </Link>
							
						))}
					</Box>
              {/* Settings */}
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
