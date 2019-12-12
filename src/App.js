import React from "react";
//import ReactDom from "react-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import IndexPage from "./pages/IndexPage";
import TaskListPage from "./pages/TaskListPage";
import LoginPage from "./pages/LoginPage";

import "./App.css";
import DelphiNavBar from "./components/DelphiNavBar.js";
import appConstants from "./etc/appConstants";

class App extends React.Component {
  constructor() {
    super();

    this.updateTasks = this.updateTasks.bind(this);
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

  render() {
    let out = (
      <div className='App'>
        <BrowserRouter>
          <DelphiNavBar />
          <Switch>
            <Route
              path='/tasklist'
              render={props => <TaskListPage {...props} />}
            />
            <Route path='/login' render={props => <LoginPage {...props} />} />
            <Route path='/' render={props => <IndexPage {...props} />} />
          </Switch>
        </BrowserRouter>
      </div>
    );
    return out;
  }
}

export default App;
