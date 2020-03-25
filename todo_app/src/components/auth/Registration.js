import React, {Component} from 'react';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default class Registration extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: "",
      password: "",
      password_confirmation: "",
      registrationErrors: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event){
    const {
      email,
      password,
      password_confirmation
    } = this.state;

    axios
      .post(
        "http://localhost:3001/registrations", 
        {
          user: {
            email: email,
            password: password,
            password_confirmation: password_confirmation
          }
        }, 
        { withCredentials: true}
      )
      .then(response => {
        if(response.data.status === 'created'){
          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch(error => {
        console.log("registration errors", error);
      });
    event.preventDefault();
  }

  handleChange(event){
    this.setState({
      [event.target.name]: event.target.value
    })

    event.preventDefault();
  }

  render() {
    return(
      <div className="registration_form">
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>

        <form className="form" onSubmit = {this.handleSubmit}>
          <TextField
            type="email"
            name="email"
            placeholder="Email"
            value={this.state.email}
            onChange={this.handleChange}
            variant="outlined"
            margin="normal"
            label="Email Address"
            value={this.state.email}
            onChange={this.handleChange}
            required
            fullWidth
            autoFocus
          />

          <TextField
            variant="outlined"
            margin="normal"
            name="password"
            label="Password"
            type="password"
            placeholder="Password"
            value={this.state.password}
            onChange={this.handleChange}
            required
            fullWidth
          />

          <TextField
            variant="outlined"
            margin="normal"
            type="password"
            name="password_confirmation"
            label="Password Confirmation"
            id="Password_confirmation"
            placeholder="Password Confirmation"
            value={this.state.password_confirmation}
            onChange={this.handleChange}
            required
            fullWidth
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit"
          >
            Register
          </Button>

          <Grid container>
            <Grid item>
              <Link href="#" variant="body2">
                {"Login"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

