import {combineReducers} from "redux";
import {connectRouter} from "connected-react-router";
import {history} from "./store";
import { firebaseReducer } from 'react-redux-firebase'
import {taskListReducer} from "./store/task-list/task-list.reducer";
import {authenticationReducer} from "./store/authentication/authentication.reducer";
import {reducer as toastrReducer} from 'react-redux-toastr'

export const createRootReducer = (history: any) => combineReducers({
  ...reducers,
  router: connectRouter(history),
})

export const reducers = {
  authentication: authenticationReducer,
  taskList: taskListReducer,
  firebase: firebaseReducer,
  toastr: toastrReducer
};
