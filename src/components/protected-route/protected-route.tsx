import * as React from "react";
import {Redirect, Route, RouteProps} from "react-router";
import {LANDING} from "../../constants/routes";

interface IProps extends RouteProps {
  isUserAuthenticated: boolean;
}

export class ProtectedRoute extends Route<IProps> {
  public render() {
    if (this.props.isUserAuthenticated) {
      return <Route {...this.props}/>
    } else {
      const renderComponent = () => (<Redirect to={{pathname: LANDING}}/>);
      return <Route {...this.props} component={renderComponent} render={undefined}/>
    }
  }
}
