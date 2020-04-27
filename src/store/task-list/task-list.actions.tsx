import * as actionTypes from './task-list.action-types';
import {ITask} from "../../models/task";
import {IAction} from "../../models/action";
import {IFilterChange, TaskFilters} from "../../models/task-filters";

export interface IUpdateTaskActionPayload {
  task: ITask,
  successCallback: () => void;
}
export interface IDeleteTaskActionPayload {
  taskIds: string[],
  successCallback?: () => void;
}
export const fetchTaskListAction = (filters: TaskFilters): IAction<TaskFilters>  => ({
  type: actionTypes.FETCH_TASK_LIST, payload: filters
})

export const fetchTaskListSuccessAction = (tasks: ITask[]): IAction<ITask[]> => ({
  type: actionTypes.FETCH_TASK_LIST_SUCCESS, payload: tasks
})

export const fetchTaskDetailsSuccessAction = (task: ITask): IAction<ITask> => ({
  type: actionTypes.FETCH_TASK_DETAILS_SUCCESS, payload: task
})

export const addTaskAction = (task: ITask, successCallback: () => void): IAction<IUpdateTaskActionPayload>  => ({
  type: actionTypes.ADD_TASK, payload: {task, successCallback}
})

export const addTaskSuccessAction = ()  => ({
  type: actionTypes.ADD_TASK_SUCCESS
})

export const updateTaskAction = (task: ITask, successCallback: () => void): IAction<IUpdateTaskActionPayload>  => ({
  type: actionTypes.UPDATE_TASK, payload: {task, successCallback}
})

export const updateTaskSuccessAction = (task: ITask|null): IAction<ITask|null>  => ({
  type: actionTypes.UPDATE_TASK_SUCCESS, payload: task
})

export const deleteTasksAction = (taskIds: string[], successCallback?: () => void): IAction<IDeleteTaskActionPayload> => ({
  type: actionTypes.DELETE_TASKS, payload: {taskIds, successCallback}
})

export const changeTaskFilters = (change: IFilterChange) => ({
  type: actionTypes.CHANGE_FILTERS, payload: change
})
