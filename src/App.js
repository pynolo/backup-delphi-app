import React from "react";
//import ReactDom from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TaskListPage from "./pages/TaskListPage";
import UserListPage from "./pages/UserListPage";
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
    let routeSwitch = "";
    if (this.state.username != null) {
      routeSwitch = (
        <Switch>
          <Redirect from='/login' to='/tasklist' />
          <Route
            path='/tasklist'
            render={props => (
              <TaskListPage username={this.state.username} {...props} />
            )}
          />
          <Route
            path='/userlist'
            render={props => (
              <UserListPage username={this.state.username} {...props} />
            )}
          />
          <Route
            path='/filters'
            render={props => (
              <TaskListPage username={this.state.username} {...props} />
            )}
          />
        </Switch>
      );
    } else {
      routeSwitch = (
        <Switch>
          <Route path='/login' render={props => <LoginPage {...props} />} />
          <Redirect from='*' to='/login' />
        </Switch>
      );
    }
    let out = (
      <div className='App'>
        <BrowserRouter>{routeSwitch}</BrowserRouter>
      </div>
    );
    return out;
  }
}

export default App;
