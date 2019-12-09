import React from "react";
// Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

import "./App.css";
import TasktriggerTaskList from "./components/TasktriggerTaskList";
//import LoginForm from "./components/LoginForm";
import appConstants from "./etc/appConstants";

class App extends React.Component {
	constructor() {
		super();
		this.state = { user: null };

		this.updateTasks = this.updateTasks.bind(this);
		this.updateTasks();
	}

	updateTasks() {
		let taskEndpoint = appConstants.apiEndpoint + appConstants.apiUpdateTasks;
		fetch(taskEndpoint, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: "{}"
		})
			.then(res => res.json())
			.catch(console.log);
	}

	render() {
		let out = "Loading app...";
		//		if (this.state.user === null) {
		//			out = (
		//				<div className='App'>
		//						<LoginForm user={this.state.user} constants={appConstants} />
		//				</div>
		//			);
		//		} else {
		out = (
			<Container>
				<Row>
					<Col sm={1}>&nbsp;</Col>
					<Col md='auto'>
						<div className='App'>
							<TasktriggerTaskList constants={appConstants} />
						</div>
					</Col>
				</Row>
			</Container>
		);
		//		}
		return out;
	}
}

export default App;
