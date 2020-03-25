import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom';
import Dashboard from './Dashboard'
import UserProfilePage from './UserProfilePage'
import axios from 'axios';

export default class App extends Component {
  constructor() {
    super();

    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    }

    this.handleLogin = this.handleLogin.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
  }

  checkLoginStatus(){
    axios.get("http://localhost:3001/login", { withCredentials: true})
    .then( response => {
      if(response.data.logged_in && this.state.loggedInStatus === "NOT_LOGGED_IN"){
        this.setState({
          loggedInStatus: "LOGGED_IN",
          user: response.data.user
        })
      } else if (!response.data.logged_in && this.state.loggedInStatus === "LOGGED_IN") {
        this.setState({
          loggedInStatus: "NOT_LOGGED_IN",
          user: {}
        }) 
      }
    }).catch(error =>{
      console.log(" login error", error);
    });
  }

  componentDidMount(){
    this.checkLoginStatus();
  }

  handleLogin(data) {
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    })
  }

  handleLogout(data){
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN",
      user: {}
    })
  }

  handleUserProfile(data){
    console.log("data", data)
    this.setState({
      loggedInStatus: "LOGGED_IN",
      user: data.user
    })
  }

  render() {
    return (
      <div className='app'>
        <BrowserRouter>
          <Switch>            
            <Route 
              exact 
              path={"/"}
              render={props => (
                <Dashboard 
                  {...props}
                  handleLogin={this.handleLogin}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.loggedInStatus} />
              )}
            />
            
            <Route 
              exact 
              path={"/profile"}
              render={props => (
                <UserProfilePage
                  {...props}
                  handleUserDetails={this.state.user}
                  handleLogout={this.handleLogout}
                  loggedInStatus={this.state.loggedInStatus} />
              )}
            />
          </Switch>
        </BrowserRouter>
      </div>
    );
  }
}
