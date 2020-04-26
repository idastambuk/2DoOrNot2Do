import React from "react";
import {connect} from "react-redux";
import {ICredentials} from "../../store/authentication/authentication.saga";
import {logInAction, signUpAction} from "../../store/authentication/authentication.actions";
import {LoginComponent} from "../../components/login/login.component";
import {CircularProgress} from "@material-ui/core";
import {IAppState} from "../../app-state";
import {ArrowBack} from "@material-ui/icons";

interface IProps {
  route: () => void;
  signUp: () => void;
  logIn: (cred: ICredentials) => void;
  isAuthLoading: boolean;
  isTasksLoading: boolean;
  authError: string;
}

interface IState {
  isSignUp: boolean
}

class LandingPageInner extends React.Component<IProps, IState> {
  public state: IState = {
    isSignUp: false
  };

  render() {
    return (
        <>
          <header><ArrowBack onClick={() => this.toggleSignUp()}/></header>
          {(this.props.isAuthLoading || this.props.isTasksLoading) &&
          <div className="loader"><CircularProgress color="inherit"/></div>}
          <LoginComponent
              isSignUp={this.state.isSignUp}
              authError={this.props.authError}
              logIn={this.props.logIn}
              signUp={this.props.signUp}
              goToSignUp={() => this.toggleSignUp()}/>
        </>
    )
  }

  private toggleSignUp() {
    this.setState({isSignUp: !this.state.isSignUp})
  }
}

export const LandingPage = connect(mapState, mapDispatchToProps)(LandingPageInner);

function mapState(state: IAppState) {
  return {
    authError: state.authentication.authError,
    isAuthLoading: state.authentication.isLoading,
    isTasksLoading: state.taskList.loading
  }
}

function mapDispatchToProps(dispatch: any) {
  return {
    signUp: (credentials: ICredentials) => dispatch(signUpAction(credentials)),
    logIn: (credentials: ICredentials) => dispatch(logInAction(credentials))
  }
}

