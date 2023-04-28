import { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import * as React from "react";

import axios from "axios";

// const api = "http://localhost:3001/employees"

export default function SignUp(props) {
	const signIn = JSON.parse(localStorage.getItem("signIn"));
	const api = props.api;
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
			//console.log(Data)
			setKeys(Object.keys(res.data.data[0]));
		}
		getData();
	}, []);

	const fieldChecker = (key) => {
		const date_input = key.includes("date");
		const phone = key.includes("Phone");
		const hour = key.includes("Hour");
		const sHour = key.includes("hour");
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
		} else {
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
		sendValue(Value);

		props.setState(!props.State);
		setTimeout(() => {
			window.location.reload(true);
		}, 1000);
	};

	return (
		<div className="m-5">
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
			</form>
		</div>
	);
}

//// Wahid working

// import { useEffect, useState, useRef } from "react";
// import { useLocation } from "react-router-dom";
// import * as React from "react";
// import axios from "axios";

// // // const api = "http://localhost:3001/employees"

// export default function SignUp(props) {
//   const signIn = JSON.parse(localStorage.getItem("signIn"));
//   const api = props.api;
//   //props.toapi
//   // props.data
//   // let Keys = props.key
//   // props.state
//   // props.setState

//   const toapi = props.toapi;

//   const [Value, setValue] = useState({});
//   const [Data, setData] = useState([]);
//   const [Keys, setKeys] = useState([]);
//   const [Errors, setErrors] = useState({});

//   let obj = {};

//   useEffect(() => {
//     async function getData() {
//       const res = await axios.get(api);
//       setKeys(Object.keys(res.data.data[0]));
//     }
//     getData();
//   }, []);

//   const fieldChecker = (key) => {
//     const date_input = key.includes("date");
//     const phone = key.includes("Phone");
//     const hour = key.includes("Hour");
//     const sHour = key.includes("hour");
//     // const
//     if (date_input) {
//       return (
//         <div key={key} className="flex flex-col rounded mt-2 text-black">
//           <label htmlFor={key} className="w-full text-left pl-2">
//             {key}
//           </label>
//           <input
//             type="date"
//             id={key}
//             className="p-2 m-2 w-sm rounded"
//             onChange={(e) => handleChange(e, key)}
//             placeholder={key}
//           />
//           {Errors[key] && (
//             <span className="text-red-500">{Errors[key]}</span>
//           )}
//         </div>
//       );
//     } else if (phone || hour || sHour) {
//       return (
//         <div
//           key={key}
//           className="flex flex-col rounded mt-2 font-bold text-black"
//         >
//           <label htmlFor={key} className="w-full text-left pl-2">
//             {key}
//           </label>
//           <input
//             type="number"
//             id={key}
//             defaultValue=""
//             className="p-2 m-2 w-sm rounded"
//             onChange={(e) => handleChange(e, key)}
//             placeholder={key}
//           />
//           {Errors[key] && (
//             <span className="text-red-500">{Errors[key]}</span>
//           )}
//         </div>
//       );
//     } else {
//       return (
//         <div
//           key={key}
//           className="flex flex-col rounded mt-2 font-bold text-black"
//         >
//           <label htmlFor={key} className="w-full text-left pl-2">
//             {key}
//           </label>
//           <input
//             type="text"
//             id={key}
//             className="p-2 m-2 w-sm rounded"
//             onChange={(e) => handleChange(e, key)}
//             placeholder={key}
//           />
//           {Errors[key] && (
//             <span className="text-red-500">{Errors[key]}</span>
//           )}
//         </div>
//       );
//     }
//   };

//   const validateForm = () => {
//     let errors = {};
//     let isValid = true;

//     // Validate required fields
//     Keys.forEach((key) => {
//       if (!Value[key]) {
//         errors[key] = `${key} is required`;
//         isValid = false;
//       }
//     });


// // Validate email address
// const validateEmailAddress = (email) => {
//   let isValid = true;
//   if (!validateEmail(email)) {
//     errors.email = "Email address is invalid";
//     isValid = false;
//   }
//   return isValid;
// };

// // Validate form
// const isValidForm = () => {
//   let isValid = true;
//   // Validate required fields
//   Keys.forEach((key) => {
//     if (!Value[key]) {
//       errors[key] = `${key} is required`;
//       isValid = false;
//     }
//   });

//   // Validate email address
//   if (toapi === "employees") {
//     if (!validateEmailAddress(Value.email)) {
//       isValid = false;
//     }
//   }
//   setErrors(errors);
//   return isValid;
// };

// // Handle input changes
// const handleChange = (e, key) => {
//   setValue({ ...Value, [key]: e.target.value });
// };

// // Handle form submission
// const handleSubmit = async (e) => {
//   e.preventDefault();
//   if (isValidForm()) {
//     try {
//       const response = await axios.post(`${api}/${toapi}`, Value);
//       setData([...Data, response.data.data]);
//       setErrors({});
//       setValue({});
//       alert("Successfully saved data.");
//     } catch (error) {
//       console.log(error);
//     }
//   }
// };

// return (
//   <div>
//     {signIn ? (
//       <div className="bg-gray-200 min-h-screen flex justify-center items-center">
//         <form
//           className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
//           onSubmit={(e) => handleSubmit(e)}
//         >
//           <div className="text-center mb-4">
//             <h1 className="text-xl font-bold">Sign Up</h1>
//           </div>

//           {Keys.map((key) => fieldChecker(key))}

//           <div className="flex items-center justify-between">
//             <button
//               className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
//               type="submit"
//             >
//               Sign Up
//             </button>
//           </div>
//         </form>
//       </div>
//     ) : (
//       <h1>Not authorized</h1>
//     )}
//   </div>
// );
// }

//Validate an Email in an Input field


// export default function SignUp() {

//   const [email, setEmail] = useState('');
//   const [error, setError] = useState(null);

//   function isValidEmail(email) {
//     return /\S+@\S+\.\S+/.test(email);
//   }

//   const handleChange = event => {
//     if (!isValidEmail(event.target.value)) {
//       setError('Email is invalid');
//     } else {
//       setError(null);
//     }

//     setEmail(event.target.value);
//   };

//   return (
//     <div>
//       <input
//         id="email"
//         name="email"
//         value={email}
//         onChange={handleChange}
//       />

//       {error && <h2 style={{color: 'red'}}>{error}</h2>}
//     </div>
//   );
// }




