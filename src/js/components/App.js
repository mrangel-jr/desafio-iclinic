import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "../routes";
import MainProvider from "./MainContext";

export default function App() {
	return (
		<MainProvider>
			<BrowserRouter>
				<Routes />
			</BrowserRouter>
		</MainProvider>
	);
}
