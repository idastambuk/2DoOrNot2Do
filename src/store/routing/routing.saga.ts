import {LOCATION_CHANGE, LocationChangePayload, push, replace} from "connected-react-router";
import {IRouteInfo} from "../../models/route";
import {select, takeLatest} from "@redux-saga/core/effects";
import * as actionTypes from "./routing.action-types";
import {IAction} from "../../models/action";
import {call, put} from "redux-saga/effects";
import {LANDING, RouteInfo, TASK_DETAILS, TASKS} from "../../constants/routes";
import firebase from "firebase";
import {changeRouteAction} from "./routing.actions";
import {LOG_IN_ERROR} from "../authentication/authentication.action-types";
import {fetchTaskListSaga} from "../task-list/task-list.saga";
import {IAppState} from "../../app-state";

export interface IChangeRoutePayload {
  routeInfo: IRouteInfo;
  isPush?: boolean;
}

export function* changeRouteSaga(action: IAction<IChangeRoutePayload>) {
  try {
    if (action.payload) {
      if (action.payload.routeInfo.initData) {
        yield call(action.payload.routeInfo.initData);
      }
      if (action.payload.isPush) {
        yield put(push(action.payload.routeInfo.path));
      } else {
        yield put(replace(action.payload.routeInfo.path));
      }
    }
  } catch (error) {
    yield put(push(LANDING));
  }
}

export function* routeInitSaga(action: IAction<LocationChangePayload>){
  try {
    console.log('route saga', action.payload.location.pathname);
    if(action.payload.isFirstRendering) {
      switch(action.payload.location.pathname) {
        case TASKS: {
          console.log('task route');
          const isLoggedIn = firebase.auth().currentUser?.uid;
          if (!isLoggedIn) {
            yield put(changeRouteAction({routeInfo: RouteInfo.landing()}))
          }  else {
            yield call(fetchTaskListSaga)
          }
        }
        break;
        case TASK_DETAILS: {
          console.log('task details route');
          const isLoggedIn = firebase.auth().currentUser?.uid;
          const currentTask = yield select((state: IAppState) => state.taskList.currentTask);
          if (!isLoggedIn || currentTask) {
            yield put(changeRouteAction({routeInfo: RouteInfo.landing()}))
          }
        }
        break;
        case LANDING: {
          console.log('ladngin route');
          const isLoggedIn = firebase.auth().currentUser?.uid;
          if (isLoggedIn) {
            yield put(changeRouteAction({routeInfo: RouteInfo.taskList()}))
          }
        }
      }
    }
  } catch (error) {
    yield put({ type: LOG_IN_ERROR, error });
  }
}

export function* watchRoutingSaga() {
  yield takeLatest(actionTypes.CHANGE_ROUTE, changeRouteSaga);
  yield takeLatest(LOCATION_CHANGE, routeInitSaga);
}
