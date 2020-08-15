/* eslint-disable react/prop-types */
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "../utils/axios";

export default function Welcome() {
	const history = useHistory();
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

	function handleClick() {
		const names = Object.keys(characteres);
		Promise.all(names.map((name) => getForce(name))).then((data) => {
			const { force, name } = data[0].time < data[1].time ? data[0] : data[1];
			history.push("/character", {
				force,
				name,
				characteres,
			});
		});
	}

	return (
		<div className="welcome">
			<div className="welcome_iclinic--title">
				Welcome to <b>iClinic</b>
			</div>
			<p className="welcome_iclinic--subtitle">FRONTEND CHALLENGE</p>
			<button onClick={handleClick} className="welcome_iclinic--start">
				START
			</button>
		</div>
	);
}
