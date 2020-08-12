/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axios";

export default class Character extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			force: props.location.state.force,
			name: props.location.state.name,
			fetching: false,
		};
		this.characteres = props.location.state.characteres;
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
		this.setState({ fetching: true }, () => {
			Promise.all([this.getForce("luke"), this.getForce("darth")]).then(
				(data) => {
					const result = data[0].time < data[1].time ? data[0] : data[1];
					this.setState({
						force: result.force,
						name: result.name,
						fetching: false,
					});
				}
			);
		});
	}

	render() {
		const { force, name, fetching } = this.state;
		return (
			<div className={`character character--${force}`}>
				<div className="character_navigation">
					<Link
						to="/"
						className={`character_navigation_arrow character_navigation_arrow--${force}`}
					/>
					<span className={`character_navigation_text--${force}`}>back</span>
				</div>
				<div className={`character_content character_content--${force}`}>
					<button
						disabled={fetching}
						onClick={this.handleClick}
						className={`character_content_button character_content_button--${force}`}
					>
						choose your path again, Padawan
					</button>
					<div className="character_content_avatar">
						<div className={`character_content_avatar--${force}`}></div>
					</div>
					<div
						className={`character_content_message character_content_message--${force}`}
					>
						<span className="character_content_message_main">
							{`You master is `}
						</span>
						<b>{name}</b>
					</div>
				</div>
			</div>
		);
	}
}
