import React, {Component} from 'react';
import Registration from './auth/Registration'
import Login from './auth/Login'
import axios from 'axios';

export default class Dashboard extends Component {

  constructor(props){
    super(props);

    this.handleSuccessfulAuth = this.handleSuccessfulAuth.bind(this);
    this.handleLogoutClick = this.handleLogoutClick.bind(this);
  }

  handleSuccessfulAuth(data){
    this.props.handleLogin(data);
    this.props.history.push("/profile")
  }

  handleLogoutClick(){
    axios
      .delete("http://localhost:3001/logout", { withCredentials: true})
      .then(response => {
        this.props.handleLogout();
      })
      .catch( error =>{
        console.log("logout error:", error);
      });
  }

  render() {
		return(
			<div>
        <h1 className="heading" align="center"> Welcome To The Authentication Dashboard </h1>
        
        <h1 align="center" className="status">User Login Status: {this.props.loggedInStatus}</h1>
        
        {
          this.props.loggedInStatus === "LOGGED_IN" ? 
            <button className="logout_button" onClick={() => this.handleLogoutClick()}>Logout</button>:
            <div>
            <Registration handleSuccessfulAuth={this.handleSuccessfulAuth}/>
            <Login handleSuccessfulAuth={this.handleSuccessfulAuth} />
            </div>
        }
        
      </div>
		)
	}
}

