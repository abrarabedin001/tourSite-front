import { useState, createContext, useEffect } from "react";
import ReactDOM from "react-dom/client";

let changeMode = (mode) => {};

export const UserContext = createContext();

export function AppStore(props) {
	let s1 = {
		mode: "user",
	};
	const [a, setMode] = useState(s1);
	const changeMode = (name) => {
		let b = { mode: name };
		setMode({ ...a, ...b });
		console.log("kaj  kore");
		console.log(a.mode);
		console.log("kaj  kore");
	};
	const changeMode2 = (name) => {
		let b = { mode: "Employee" };
		setMode({ ...a, ...b });
		console.log("kaj  kore 2");
		console.log(a.mode);
		console.log("kaj  kore 2");
	};
	useEffect(() => {
		console.log("Mode updated:", a.mode);
	}, [a.mode]);

	return (
		<UserContext.Provider value={{ a, changeMode, changeMode2 }}>
			{props.children}
		</UserContext.Provider>
	);
}
