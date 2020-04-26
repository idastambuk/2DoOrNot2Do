import {changeRouteAction} from "../../store/routing/routing.actions";
import React from 'react';
import {connect} from 'react-redux';
import {RouteInfo} from "../../constants/routes";
import firebase from "firebase";

interface IProps {
  goToLanding: () => void;
}
export const authenticate = (Component: any) => {
  const auth = firebase.auth().currentUser?.uid;
  class Authenticate extends React.Component<IProps> {
    public componentWillMount() {
      if (!auth) {
        this.props.goToLanding();
      }
    }
    render() {
      return (<Component {...this.props}/>)
    }
  }
  return connect(undefined, mapDispatch)(Authenticate);
}

function mapDispatch(dispatch: any) {
  return {
    goToLanding:  dispatch(changeRouteAction({routeInfo: RouteInfo.landing()})),
  }
}

