import React from "react";
import {ICredentials} from "../../store/authentication/authentication.saga";
import {Avatar, Button, Container, CssBaseline, Grid, Link, TextField, Typography} from "@material-ui/core";
import {LockOutlined} from "@material-ui/icons";
import {signUpAction} from "../../store/authentication/authentication.actions";

interface IProps {
  isSignUp: boolean;
  goToSignUp: () => void;
  logIn: (cred: ICredentials) => void;
  signUp: (credentials: ICredentials) => void
  authError: string;
}

interface IState {
  email: string;
  password: string;
}

export class LoginComponent extends React.Component<IProps, IState> {

  public state: IState = {
    email: "",
    password: ""
  }

  render() {
    return (
        <Container style={{display: 'flex', justifyContent: 'center'}}>
          <CssBaseline/>
          <div className="login-container">
            <Avatar className="avatar">
              <LockOutlined/>
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                inputProps={{
                  maxLength: 100
                }}
                label="Email Address"
                InputLabelProps={{className: "input-label"}}
                name="email"
                autoComplete="email"
                autoFocus
                value={this.state.email}
                onChange={(event: any) => this.fieldChange(event, "email")}
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
                inputProps={{
                  maxLength: 20
                }}
                autoComplete="current-password"
                value={this.state.password}
                onChange={(event: any) => this.fieldChange(event, "password")}
            />
            <p className="auth-error">{this.props.authError ?? ""}</p>
            <button
                className="theme-button"
                onClick={() => this.props.isSignUp ? this.props.signUp(this.state) : this.props.logIn(this.state)}
            >
              {this.props.isSignUp ? "Register" : "Log In"}
            </button>
            {!this.props.isSignUp &&
            <Grid container>
                <Grid item>
                    <p className="sign-up" onClick={() => this.props.goToSignUp()}>
                        Don't have an account? <strong>Sign Up</strong>
                    </p>
                </Grid>
            </Grid>
            }
          </div>
        </Container>
    )
  }

  private fieldChange(event: any, field: keyof IState) {
    this.setState({...this.state, [field]: event.target.value})
  }
}

