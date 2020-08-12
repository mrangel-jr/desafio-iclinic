/* eslint-disable react/prop-types */
import React from "react";
import axios from "../utils/axios";

export default class Welcome extends React.Component {
	constructor(props) {
		super(props);
		this.characteres = {
			luke: {
				force: "light",
				url: "http://localhost:8081/luke",
			},
			darth: {
				force: "dark",
				url: "http://localhost:8081/darth",
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
		const names = Object.keys(this.characteres);
		Promise.all(names.map((name) => this.getForce(name))).then((data) => {
			const result = data[0].time < data[1].time ? data[0] : data[1];
			this.props.history.push("/character", {
				force: result.force,
				name: result.name,
				characteres: this.characteres,
			});
		});
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
