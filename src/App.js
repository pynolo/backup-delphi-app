import React from "react";
//import ReactDom from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TaskListPage from "./pages/TaskListPage";
import UserListPage from "./pages/UserListPage";
import MatchListPage from "./pages/MatchListPage";
import { getUsername } from "./comp/LoginCookie";

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
    //this.refreshPage = this.refreshPage.bind(this);
  }

  componentDidMount() {
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
      body: "{nulla: niente}"
    });
    /*.then(res => res.json())
      .then(restData => {
        if (restData.status >= 400) {
          this.setState({ errorMessage: "Aggiornamento task non riuscito" });
        } else {
          console.log("Task aggiornati correttamente da Talend verso Delphi");
        }
      })
      .catch(
        this.setState({ errorMessage: "Aggiornamento task non riuscito" })
      );*/
  }

  /*refreshPage() {
    window.location.reload();
  }*/

  render() {
    let routeSwitch = "";
    if (this.state.username != null) {
      // LOGGED IN
      routeSwitch = (
        <Switch>
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
            path='/matchlist'
            render={props => (
              <MatchListPage username={this.state.username} {...props} />
            )}
          />
          <Redirect from='/login' to='/tasklist' />
          <Redirect from='/' to='/tasklist' />
        </Switch>
      );
    } else {
      // LOGGED OUT
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
