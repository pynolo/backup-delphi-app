import React from "react";
import ExecutablePanel from "./ExecutablePanel";

class TasktriggerTask extends React.Component {
	render() {
		let row = "";
		if (
			this.props.constants.environmentFilter === this.props.task.environmentName
		) {
			row = (
				<tr>
					<td>
						<b>{this.props.task.name}</b>
					</td>
					<td>{this.props.task.workspaceName}</td>
					<td>{this.props.task.environmentName}</td>
					<td>
						<ExecutablePanel
							executable={this.props.task.executable}
							constants={this.props.constants}
						/>
					</td>
				</tr>
			);
		} else {
			row = <tr style={{ display: "none" }}></tr>;
		}
		return row;
	}
}

export default TasktriggerTask;
