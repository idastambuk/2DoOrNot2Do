import * as actionTypes from "./authentication.action-types";
import {IAction} from "../../models/action";

export interface IAuthenticationState {
  isAuthenticated: boolean;
  isLoading: boolean;
  authError: string;
}

const initialState: IAuthenticationState = {
  isAuthenticated: true,
  isLoading: false,
  authError: ""
};
export const authenticationReducer = (state: IAuthenticationState = initialState, action: IAction<string>) => {
  switch (action.type) {
    case actionTypes.LOG_IN:
      return {...state, isLoading: true};
      case actionTypes.LOG_IN_SUCCESS:
      return {...state, isLoading: false};
    case actionTypes.LOG_IN_ERROR:
      return {...state, isLoading: false, authError: action.payload};
    default:
      return state;
  }
};
