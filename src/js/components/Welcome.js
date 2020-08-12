/* eslint-disable react/prop-types */
import React from "react";
import axios from "../utils/axios";

export default class Welcome extends React.Component {
	constructor(props) {
		super(props);
		this.characteres = {
			luke: {
				force: "light",
				url: "https://swapi.dev/api/people/1",
			},
			darth: {
				force: "dark",
				url: "https://swapi.dev/api/people/4",
			},
		};
		this.getForce = this.getForce.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	async getForce(character) {
		const char = this.characteres[character];
		let result = await axios()
			.get(char.url)
			.then((res) => ({
				force: char.force,
				name: res.data.name,
				time: res.responseTimer,
			}));
		return result;
	}

	handleClick() {
		Promise.all([this.getForce("luke"), this.getForce("darth")]).then(
			(data) => {
				const result = data[0].time < data[1].time ? data[0] : data[1];
				this.props.history.push("/character", {
					force: result.force,
					name: result.name,
					characteres: this.characteres,
				});
			}
		);
	}

	render() {
		return (
			<div className="welcome">
				<div className="welcome_iclinic--title">
					Welcome to <b>iClinic</b>
				</div>
				<p className="welcome_iclinic--subtitle">FRONTEND CHALLENGE</p>
				<button onClick={this.handleClick} className="welcome_iclinic--start">
					START
				</button>
			</div>
		);
	}
}
