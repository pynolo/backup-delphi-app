import React from "react";

class ExecutablePanel extends React.Component {
	constructor() {
		super();
		this.state = {
			status: "waiting",
			response: null
		};

		this.runTask = this.runTask.bind(this);
	}

	runTask() {
		let taskEndpoint =
			this.props.constants.apiEndpoint +
			this.props.constants.apiLaunchExecution;
		let bodyObj = { executable: this.props.executable };
		fetch(taskEndpoint, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(bodyObj)
		})
			.then(res => res.json())
			.then(data => {
				this.setState({
					status: "running ",
					response: data
				});
			})
			.catch(console.log);
	}

	render() {
		let row = "loading";
		if (this.state.status === "waiting") {
			row = <button onClick={this.runTask}>Esegui</button>;
		} else {
			row = <div>Esecuzione lanciata: {this.state.response.executionId}</div>;
		}
		return row;
	}
}

export default ExecutablePanel;
