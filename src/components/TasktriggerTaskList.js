import React from "react";
import TasktriggerTask from "./TasktriggerTask";

class TasktriggerTaskList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			status: "waiting",
			response: null,
			taskComponents: null
		};

		this.loadData = this.loadData.bind(this);
		this.formatData = this.formatData.bind(this);
		this.loadData();
	}

	loadData() {
		let taskEndpoint =
			this.props.constants.apiEndpoint + this.props.constants.apiViewAllTasks;
		fetch(taskEndpoint, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json"
			}
		})
			.then(res => res.json())
			.then(data => {
				this.setState({
					status: "running",
					taskArray: data,
					taskComponents: null
				});
				this.formatData();
			})
			.catch(console.log);
	}

	formatData() {
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
