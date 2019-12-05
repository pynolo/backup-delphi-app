import React from "react";
import TasktriggerTask from "./TasktriggerTask";

class TasktriggerTaskList extends React.Component {
	constructor() {
		super();
		this.state = {
			status: "waiting",
			response: null,
			taskComponents: null
		};

		this.runTask = this.runTask.bind(this);
		this.processData = this.processData.bind(this);
		this.runTask();
	}

	runTask() {
		let taskEndpoint =
			this.props.constants.apiEndpoint +
			this.props.constants.apiLaunchTaskupdater;
		fetch(taskEndpoint, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			},
			body: ""
		})
			.then(res => res.json())
			.then(data => {
				this.setState({
					status: "running ",
					taskArray: data,
					taskComponents: null
				});
				this.processData();
			})
			.catch(console.log);
	}

	processData() {
		var taskComponents = this.state.taskArray.map(task => (
			<TasktriggerTask
				key={task.id}
				task={task}
				constants={this.props.constants}
			/>
		));
		this.setState({
			status: "running",
			taskArray: null,
			taskComponents: taskComponents
		});
	}

	render() {
		return (
			<table>
				<thead>
					<tr>
						<td>
							<b>Job</b>
						</td>
						<td>
							<b>Workspace</b>
						</td>
						<td>
							<b>Environment</b>
						</td>
					</tr>
				</thead>
				<tbody>{this.state.taskComponents}</tbody>
			</table>
		);
	}
}

export default TasktriggerTaskList;
