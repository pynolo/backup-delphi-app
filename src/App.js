import React from "react";
//import ReactDom from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import TaskListPage from "./pages/TaskListPage";
import LoginPage from "./pages/LoginPage";
import { getUsername } from "./components/LoginCookie";

import "./App.css";
import appConstants from "./etc/appConstants";

class App extends React.Component {
  constructor() {
    super();

    let usernameObj = getUsername();
    let username = null;
    if (usernameObj != null) username = usernameObj.username;
    this.state = {
      username: username
    };
    this.updateTasks = this.updateTasks.bind(this);
    this.refreshPage = this.refreshPage.bind(this);
    this.updateTasks();
  }

  updateTasks() {
    let taskEndpoint = appConstants.apiEndpoint + appConstants.apiUpdateTasks;
    fetch(taskEndpoint, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: "{}"
    })
      .then(res => res.json())
      .catch(console.log);
  }

  refreshPage() {
    window.location.reload();
  }

  render() {
    let out = (
      <div className='App'>
        <BrowserRouter>
          <Switch>
            <Route path='/login' render={props => <LoginPage {...props} />} />
            if (this.state.username != null)
            {
              <Route
                path='/tasklist'
                render={props => <TaskListPage {...props} />}
              />
            }
            else {<Redirect from='*' to='/login' />}
          </Switch>
        </BrowserRouter>
      </div>
    );
    return out;
  }
}

export default App;
