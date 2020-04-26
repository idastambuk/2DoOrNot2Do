import React from 'react';
import './App.scss';
import {LANDING, TASK_DETAILS, TASKS} from "./constants/routes";
import {Route, Switch} from "react-router";
import {ConnectedRouter} from "connected-react-router";
import {history, store} from "./store";
import {Provider} from "react-redux";
import {LandingPage} from "./pages/landing-page/landing-page";
import {TaskListPage} from "./pages/task-list/task-list-page";
import {firebaseConfig} from "./firebase/firebase";
import {ReactReduxFirebaseProvider} from "react-redux-firebase";
import firebase from 'firebase/app'
import 'firebase/auth'
import ReduxToastr from "react-redux-toastr";
import {TaskDetailsPage} from "./pages/task-details-page/task-details-page";

const rrfConfig = {userProfile: 'users'} // react-redux-firebase config

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);

const rrfProps = {
  firebase,
  config: rrfConfig,
  dispatch: store.dispatch,
}

// todo lock packages
function App() {
  return (
        <Provider store={store}>
          <ReduxToastr
              timeOut={3000}
              newestOnTop={false}
              preventDuplicates
              position="top-center"
              transitionIn="fadeIn"
              transitionOut="fadeOut"
              closeOnToastrClick/>
          <ReactReduxFirebaseProvider {...rrfProps}>
            <ConnectedRouter history={history}>
              <Switch>
                <Route exact={true} path={LANDING} component={LandingPage}/>
                <Route exact={true} path={TASKS} component={TaskListPage}/>
                <Route exact={true} path={TASK_DETAILS} component={TaskDetailsPage}/>
              </Switch>
            </ConnectedRouter>
          </ReactReduxFirebaseProvider>
        </Provider>
  );
}

export default App;
