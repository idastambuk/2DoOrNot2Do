import {IAction} from "../../models/action";
import firebase from "firebase";
import {call, put, takeLatest} from "redux-saga/effects";
import * as actionTypes from "./authentication.action-types";
import {LOG_IN_ERROR, LOG_IN_SUCCESS, SIGN_UP_ERROR} from "./authentication.action-types";
import {RouteInfo} from "../../constants/routes";
import {loginSuccessAction, signUpSuccessAction} from "./authentication.actions";
import {changeRouteAction} from "../routing/routing.actions";

export interface ICredentials {
  email: string;
  password: string;
}

export function* signUpSaga(action: IAction<ICredentials>){
  try {
    const auth = firebase.auth();
    const result = yield call(
        [auth, auth.createUserWithEmailAndPassword],
        action.payload.email,
        action.payload.password
    );
    yield put(signUpSuccessAction(action.payload));
    yield put(changeRouteAction({routeInfo: RouteInfo.taskList()}));
  } catch (error) {
    yield put({ type: LOG_IN_ERROR, payload: error.message });
  }
}

export function* loginSaga(action: IAction<ICredentials>){
  try {
    const auth = firebase.auth();
    const result = yield call(
        [auth, auth.signInWithEmailAndPassword],
        action.payload.email,
        action.payload.password
    );
    yield put(loginSuccessAction());
    yield put(changeRouteAction({routeInfo: RouteInfo.taskList()}));
  } catch (error) {
    yield put({ type: LOG_IN_ERROR, payload: error.message });
  }
}
export function* logOutSaga(isSignup?: boolean){
  try {
    const auth = firebase.auth();
    const result = yield call(
        [auth, auth.signOut]
    );
    if (!isSignup) {
      yield put(changeRouteAction({routeInfo: RouteInfo.landing()}));
    }
  } catch (error) {
    yield put({ type: LOG_IN_ERROR, error });
  }
}



export function* watchAuthenticationSaga() {
  yield takeLatest(actionTypes.SIGN_UP, signUpSaga);
  yield takeLatest(actionTypes.LOG_IN, loginSaga);
  yield takeLatest(actionTypes.LOG_OUT, logOutSaga);}
