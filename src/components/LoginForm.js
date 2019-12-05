import React from "react";

import AppBar from "material-ui/AppBar";
import RaisedButton from "material-ui/RaisedButton";
import TextField from "material-ui/TextField";

class LoginForm extends React.Component {
	constructor() {
		super();

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {}

	render() {
		let out = (
			<div>
				<AppBar title='Login' />
				<TextField
					hintText='Enter your Username'
					floatingLabelText='Username'
					onChange={(event, newValue) => this.setState({ username: newValue })}
				/>
				<br />
				<TextField
					type='password'
					hintText='Enter your Password'
					floatingLabelText='Password'
					onChange={(event, newValue) => this.setState({ password: newValue })}
				/>
				<br />
				<RaisedButton
					label='Submit'
					primary={true}
					onClick={event => this.handleClick(event)}
				/>
			</div>
		);
		return out;
	}
}

export default LoginForm;
