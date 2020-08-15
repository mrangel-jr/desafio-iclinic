/* eslint-disable react/prop-types */
import React, {  useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "../utils/axios";
import Spinner from "./Spinner";

export default function Character() {
	const { location } = useHistory();
	const [{ force, name }, setData] = useState({
		force: location.state.force,
		name: location.state.name,
	});
	const [fetching, setFetch] = useState(false);
	const { characteres } = location.state;

	useEffect(() => {
		const fetchData = async () => {
			const names = Object.keys(characteres);
			Promise.all(names.map((name) => getForce(name))).then((data) => {
				const { force, name } = data[0].time < data[1].time ? data[0] : data[1];
				setData({ force, name });
				setFetch(false);
			});
		};
		if (fetching) {
			fetchData();
		}
	}, [fetching]);

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
					onClick={() => setFetch(true)}
					className={`character_content_button character_content_button--${force}`}
				>
					choose your path again, Padawan
				</button>
				<div className="character_content_avatar">
					<div className={`character_content_avatar--${force}`}></div>
				</div>
				{fetching && <Spinner fetching />}
				<div
					className={`character_content_message character_content_message--${force}`}
				>
					<span className="character_content_message_main">
						{`Your master is `}
					</span>
					<b>{name}</b>
				</div>
			</div>
		</div>
	);
}
