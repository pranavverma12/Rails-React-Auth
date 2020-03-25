import React from "react";
import axios from 'axios';
import {Link} from 'react-router-dom'

const UserProfilePage = props => {
  function  handleLogoutClick(){
    axios
      .delete("http://localhost:3001/logout", { withCredentials: true})
      .then(response => {
        props.handleLogout();
      })
      .catch( error =>{
        console.log("logout error:", error);
      });
  }

  const {
    email,
    created_at,
    updated_at
  } = props.handleUserDetails;

  return (
    <div>
      <div>
        <center>
          <h1 className="heading">User Profile Page</h1>
        
          <h1 className="status">User Login Status: {props.loggedInStatus}</h1>
        </center>
      </div>

      {
        props.loggedInStatus === "LOGGED_IN" ?
          <div className='UserCard'>
            <div className='UserCardTop'>
              <img src={"https://source.unsplash.com/ebvCsRypmxM/1600x900"} />
            </div>
            <div className='UserCardBottom'>
              <h3>{email}</h3>
              <h5>Created At:</h5>
              <p>{created_at}</p>
              <h5>Last Updated:</h5>
              <p>{updated_at}</p>
            </div>
            <button className="logout_button" onClick={() => handleLogoutClick()}>Logout</button>
          </div> : ""
      }
      <Link to="">
       <button className="logout_button" type="button" style={{width: '98%', 'backgroundColor': '#e7e7e7', color: 'black', margin: '15px'}}>
          Dashboard
       </button>
      </Link>
    </div>
  );
};

export default UserProfilePage;