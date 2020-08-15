import React, { useState, createContext } from "react";
import axios from "../utils/axios";

export const MainContext = createContext();

// eslint-disable-next-line react/prop-types
export default function MainProvider({ children }) {
	const characteres = {
		luke: {
			force: "light",
			url: "http://localhost:8081/luke",
		},
		darth: {
			force: "dark",
			url: "http://localhost:8081/darth",
		},
	};
	const [{ force, name }, setData] = useState({});

	async function getForce(character) {
		const char = characteres[character];
		let result = await axios()
			.get(char.url)
			.then((res) => ({
				force: char.force,
				name: res.data.name,
				time: res.responseTimer,
			}));
		return result;
	}

	function fetchData() {
		const names = Object.keys(characteres);
		return Promise.all(names.map((name) => getForce(name)))
			.then((data) => {
				const result = data[0].time < data[1].time ? data[0] : data[1];
				return result;
			})
			.then(({ force, name }) => setData({ force, name }));
	}

	return (
		<MainContext.Provider value={{ force, name, fetchData }}>
			{children}
		</MainContext.Provider>
	);
}
