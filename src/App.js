import React from 'react'
import './App.css'
import TasktriggerTaskList from './components/TasktriggerTaskList'
import taskArray from "./viewalltasks"

function App() {
	return (
		<div className="App">
			<TasktriggerTaskList taskArray={taskArray} />
		</div>
	)
}

export default App
