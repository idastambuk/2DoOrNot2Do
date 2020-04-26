import * as actionTypes from "./routing.action-types";
import {IChangeRoutePayload} from "./routing.saga";

export const changeRouteAction = (payload: IChangeRoutePayload) => ({
  type: actionTypes.CHANGE_ROUTE, payload
})
