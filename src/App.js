import React, { useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Redirect } from "react-router-dom";
import Jobs from "./page/Jobs";
import Login from "./page/Login";
import Details from "./page/Details";
import { useSelector } from "react-redux";

function App() {
	// let [user, setUser] = useState(false); //if user is true, then login , failse not login
	let user = useSelector((state) => state.user);
	const ProtectedRoute = (props) => {
		//if user is login -> show detail page
		//if user is not login -> show login page
		if (user.isAuthenticated === true) {
			return <Route {...props} />;
		} else {
			return <Redirect to="/login" />;
		}
	};

	return (
		<div>
			<Switch>
				<ProtectedRoute path="/jobs/:id" render={(props) => <Details {...props} />} />
				<Route path="/jobs/:id" component={Details} />
				<Route path="/jobs" component={Jobs} />
				<Route path="/login" component={Login} />
				<Route path="/" component={Jobs} />
			</Switch>
		</div>
	);
}

export default App;
