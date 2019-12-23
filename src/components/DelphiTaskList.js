import React from "react";
import DelphiTask from "./DelphiTask";
import { getUsername } from "./LoginCookie";

class DelphiTaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskArray: null,
      username: null
    };

    this.loadData = this.loadData.bind(this);
  }

  componentDidMount() {
    let username = getUsername();
    this.setState({ username: username.username }, function() {
      this.loadData();
    }); //asyncronous call to this.loadData()
  }

  loadData() {
    if (this.state.username !== null) {
      let taskEndpoint =
        this.props.constants.apiEndpoint +
        this.props.constants.apiViewAllTasks +
        "/" +
        this.state.username;
      taskEndpoint = encodeURI(taskEndpoint);
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
            taskArray: data
          });
        })
        .catch(console.log);
    }
  }

  render() {
    if (this.state.username !== null && this.state.taskArray !== null) {
      var taskComponents = this.state.taskArray.map(task => (
        <DelphiTask
          key={task.id}
          task={task}
          constants={this.props.constants}
        />
      ));
      return (
        <table>
          <thead>
            <tr>
              <td>
                <h3>&nbsp;</h3>
              </td>
              <td>
                <h3>Task</h3>
              </td>
              <td>
                <h3>Area</h3>
              </td>
            </tr>
          </thead>
          <tbody>{taskComponents}</tbody>
        </table>
      );
    } else return <div></div>;
  }
}

export default DelphiTaskList;
