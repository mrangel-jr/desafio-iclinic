import React from "react";
import PropTypes from "react-proptypes";

export default function Spinner({ fetching }) {
	return (
		<div id="spinner">
			{fetching && (
				<div className="spinner_loader">
					<div className="bounce1"></div>
					<div className="bounce2"></div>
					<div className="bounce3"></div>
				</div>
			)}
		</div>
	);
}

Spinner.propTypes = {
	fetching: PropTypes.bool.isRequired,
};
