import { useState, createContext, useEffect } from "react";
import ReactDOM from "react-dom/client";

let changeMode = (mode) => {};

export const UserContext = createContext();

export function AppStore(props) {
	let s1 = {
		mode: "user",
		id: "00",
	};
	const [a, setMode] = useState(s1);
	const changeMode = (name, id) => {
		let b = { mode: name, id: id };
		setMode({ ...a, ...b });
		console.log("kaj  kore");
		console.log(a.mode);
		console.log("kaj  kore");
	};

	useEffect(() => {
		console.log("Mode updated:", a);
		if (a.mode != "user") {
			localStorage.setItem("signIn", JSON.stringify(a));
		}
	}, [a]);

	return (
		<UserContext.Provider value={{ a, changeMode }}>
			{props.children}
		</UserContext.Provider>
	);
}
