import React from "react";

class TasktriggerTask extends React.Component {
	render() {
		let row = "";
		if (
			this.props.constants.environmentFilter == this.props.task.environmentName
		) {
			row = (
				<tr>
					<td>
						<a href={this.props.constants.backendEndpoint}>
							{this.props.task.name}
						</a>
					</td>
					<td>{this.props.task.workspaceName}</td>
					<td>{this.props.task.environmentName}</td>
					<td>
						<button
							onClick={() => {
								console.log("puppa");
							}}>
							Esegui
						</button>
					</td>
				</tr>
			);
		}
		return row;
	}
}

export default TasktriggerTask;
