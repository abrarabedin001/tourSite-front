import { useState, createContext } from "react";
import ReactDOM from "react-dom/client";

export const UserContext = createContext({
	mode: "None",
});

export function AppStore(props) {
	const changeMode = (mode) => {
		return 0;
	};

	let mode = { mode: "user" };

	return (
		<UserContext.Provider value={mode}>{props.children}</UserContext.Provider>
	);
}
