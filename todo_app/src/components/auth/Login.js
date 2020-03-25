import React, {Component} from 'react';
import axios from 'axios'
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

export default class Login extends Component {
  constructor(props){
    super(props);

    this.state = {
      email: "",
      password: "",
      loginErrors: ""
    }

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleSubmit(event){
    const {
      email,
      password
    } = this.state;

    axios
      .post(
        "http://localhost:3001/sessions", 
        {
          user: {
            email: email,
            password: password
          }
        }, 
        { withCredentials: true}
      )
      .then(response => {
        if(response.data.logged_in){
          this.props.handleSuccessfulAuth(response.data);
        }
      })
      .catch(error => {
        console.log("login errors", error);
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
      <div className="login_form">
        <Typography component="h1" variant="h5">
          Login
        </Typography>

        <form className="form" onSubmit = {this.handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={this.state.email}
            onChange={this.handleChange}
            autoFocus
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={this.state.password}
            onChange={this.handleChange}
            autoComplete="current-password"
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className="submit"
          >
            Sign In
          </Button>

          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    );
  }
}

