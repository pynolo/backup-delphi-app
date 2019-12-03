import React from "react";
import "./App.css";
import TasktriggerTaskList from "./components/TasktriggerTaskList";
import appConstants from "./etc/appConstants";
import taskArray from "./viewalltasks";

class App extends React.Component {
	render() {
		return (
			<div className='App'>
				<TasktriggerTaskList taskArray={taskArray} constants={appConstants} />
			</div>
		);
	}
}

export default App;
