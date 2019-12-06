import React from "react";

import "./App.css";
// MATERIAL UI docs https://material.io/components/
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
//import injectTapEventPlugin from "react-tap-event-plugin";
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
		//					<MuiThemeProvider>
		//						<LoginForm user={this.state.user} constants={appConstants} />
		//					</MuiThemeProvider>
		//				</div>
		//			);
		//		} else {
		out = (
			<div className='App'>
				<MuiThemeProvider>
					<TasktriggerTaskList constants={appConstants} />
				</MuiThemeProvider>
			</div>
		);
		//		}
		return out;
	}
}

export default App;
