import {IRouteInfo} from "../models/route";
import {fetchTaskDetailsSaga, fetchTaskListSaga} from "../store/task-list/task-list.saga";
import {logOutSaga} from "../store/authentication/authentication.saga";

export const LANDING = '/';
export const SIGN_UP = '/signup';
export const TASKS = '/tasks';
export const TASK_DETAILS = '/tasks/edit';

export class RouteInfo {
  public static taskList = (): IRouteInfo => ({
    path: TASKS,
    initData: fetchTaskListSaga
  });

  public static taskDetails = (taskId: string): IRouteInfo => ({
    path: TASK_DETAILS,
    initData: () => fetchTaskDetailsSaga(taskId)
  });

  public static signUp = (): IRouteInfo => ({
    path: SIGN_UP,
    initData: () => logOutSaga(true)
  });

  public static landing = (): IRouteInfo => ({
    path: LANDING
  });
}
