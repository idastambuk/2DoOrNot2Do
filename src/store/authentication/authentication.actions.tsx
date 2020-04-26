import * as actionTypes from "./authentication.action-types";
import {ICredentials} from "./authentication.saga";
import {IAction} from "../../models/action";

export const signUpAction = (payload: ICredentials): IAction<ICredentials> => ({
  type: actionTypes.SIGN_UP, payload
})

export const signUpSuccessAction = (credentials: ICredentials): IAction<ICredentials> => ({
  type: actionTypes.SIGN_UP_SUCCESS, payload: credentials
})

export const logInAction = (payload: ICredentials): IAction<ICredentials> => ({
  type: actionTypes.LOG_IN, payload
})
export const loginSuccessAction = () => ({
  type: actionTypes.LOG_IN_SUCCESS
})

export const logOutAction = () => ({
  type: actionTypes.LOG_OUT,
})
