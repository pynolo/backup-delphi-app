import React from "react"
import TasktriggerTask from "./TasktriggerTask"

function TasktriggerTaskList(props) {
	console.log(props.taskArray)
	const taskComponents = props.taskArray.map(task => <TasktriggerTask key={task.id} task={task} />)
	console.log(taskComponents);
	
	return (
		<div>
			{taskComponents}
		</div>
	)
}

export default TasktriggerTaskList
