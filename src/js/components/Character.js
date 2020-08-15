/* eslint-disable react/prop-types */
import React, { useEffect, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { MainContext } from "./MainContext";
import Spinner from "./Spinner";

export default function Character() {
	const { force, name, fetchData } = useContext(MainContext);

	const [fetching, setFetch] = useState(false);

	useEffect(() => {
		async function consumeData() {
			await fetchData()
				.then(() => setFetch(false));
		}
		if (fetching) {
			consumeData();
		}
	}, [fetching]);

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
