import React from "react";

import { Switch, Route } from "react-router-dom";

import Welcome from "../components/Welcome";
import Character from "../components/Character";

const Routes = () => (
	<Switch>
		<Route exact path="/" component={Welcome} />
		<Route exact path="/character" component={Character} />
	</Switch>
);

export default Routes;
