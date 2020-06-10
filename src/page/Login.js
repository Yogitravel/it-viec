import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

export default function Login() {
	const dispatch = useDispatch();
	let history = useHistory();
	let [email, setEmail] = useState(null);
	let [password, setPassword] = useState(null);

	const login = (e) => {
		e.preventDefault(); //block refresh
		let user = { email: email, password: password }; // create a new variable named user and user have email and password property inside
		dispatch({ type: "LOGIN", payload: user });
		//send type(LOGIN) and payload(user) to the reducer
		history.goBack(); // go back
	};

	return (
		<div className="login-page">
			<h1> Please Login </h1>
			<Form>
				<Form.Group controlId="formBasicEmail">
					<Form.Label>Email address </Form.Label>
					<Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} />
					<Form.Text className="text-muted">We'll never share your email with anyone else.</Form.Text>
				</Form.Group>

				<Form.Group controlId="formBasicPassword">
					<Form.Label>Password</Form.Label>
					<Form.Control type="password" placeholder="Password" />
				</Form.Group>
				<Form.Group controlId="formBasicCheckbox">
					<Form.Check type="checkbox" label="Check me out" onChange={(e) => setPassword(e.target.value)} />
				</Form.Group>
				<Button onClick={(e) => login(e)} variant="primary" type="submit">
					Login
				</Button>
			</Form>
		</div>
	);
}
