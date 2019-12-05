import React from "react";

import "./App.css";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import TasktriggerTaskList from "./components/TasktriggerTaskList";
import LoginForm from "./components/LoginForm";
import appConstants from "./etc/appConstants";

class App extends React.Component {
	constructor() {
		super();
		this.state = { user: null };
	}

	render() {
		let out = "Loading app...";
		if (this.state.user === null) {
			out = (
				<div className='App'>
					<MuiThemeProvider>
						<LoginForm user={this.state.user} constants={appConstants} />
					</MuiThemeProvider>
				</div>
			);
		} else {
			out = (
				<div className='App'>
					<MuiThemeProvider>
						<TasktriggerTaskList constants={appConstants} />
					</MuiThemeProvider>
				</div>
			);
		}
		return out;
	}
}

export default App;
