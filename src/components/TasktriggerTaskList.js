import React from "react";
import TasktriggerTask from "./TasktriggerTask";

function TasktriggerTaskList(props) {
	const taskComponents = props.taskArray.map(task => (
		<TasktriggerTask key={task.id} task={task} constants={props.constants} />
	));

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
			<tbody>{taskComponents}</tbody>
		</table>
	);
}

export default TasktriggerTaskList;
