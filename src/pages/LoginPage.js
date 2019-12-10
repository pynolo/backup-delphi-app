import React from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

class LoginForm extends React.Component {
	constructor() {
		super();

		this.handleClick = this.handleClick.bind(this);
	}

	handleClick() {}

	render() {
		let out = (
			<Form>
				<Form.Group controlId='formUsername'>
					<Form.Label>Nome utente</Form.Label>
					<Form.Control type='username' placeholder='n.cognome' />
					<Form.Text className='text-muted'>
						Il tuo nome utente nella rete Giunti
					</Form.Text>
				</Form.Group>

				<Form.Group controlId='formPassword'>
					<Form.Label>Password</Form.Label>
					<Form.Control type='password' placeholder='password' />
				</Form.Group>
				<Button variant='primary' type='submit'>
					Submit
				</Button>
			</Form>
		);
		return out;
	}
}

export default LoginForm;
