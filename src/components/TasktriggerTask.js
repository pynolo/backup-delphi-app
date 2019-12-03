import React from "react"

function TasktriggerTask(props) {
  return (
		<div>
			<ul>
				<li>{props.task.name}</li>
				<li>{props.task.executable}</li>
				<li>{props.task.description}</li>
				<li>{props.task.workspaceName}</li>
				<li>{props.task.environmentName}</li>
			</ul>
		</div>
	)
}

export default TasktriggerTask
