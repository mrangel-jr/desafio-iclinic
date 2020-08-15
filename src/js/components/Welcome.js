/* eslint-disable react/prop-types */
import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import {MainContext} from './MainContext'

export default function Welcome() {
	const history = useHistory();
	const {fetchData} = useContext(MainContext);

	function handleClick() {
		fetchData().then(() => history.push("/character"))
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
