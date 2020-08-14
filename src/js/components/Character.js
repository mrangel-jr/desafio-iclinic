/* eslint-disable react/prop-types */
import React from "react";
import { Link } from "react-router-dom";
import axios from "../utils/axios";
import Spinner from "./Spinner";

export default class Character extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			force:
				props.location !== undefined
					? props.location.state.force
					: props.location,
			name:
				props.location !== undefined
					? props.location.state.name
					: props.location,
			fetching: false,
		};
		this.characteres =
			props.location !== undefined
				? props.location.state.characteres
				: props.location;
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
		this.setState({ fetching: true }, () => {
			Promise.all(names.map((name) => this.getForce(name))).then((data) => {
				const result = data[0].time < data[1].time ? data[0] : data[1];
				this.setState({
					force: result.force,
					name: result.name,
					fetching: false,
				});
			});
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
					<span
						className={`character_navigation_text character_navigation_text--${force}`}
					>
						back
					</span>
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
					{fetching && <Spinner fetching={fetching}/>}
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
