import * as actionTypes from './task-list.action-types';
import {ITask} from "../../models/task";
import {IAction} from "../../models/action";
import {IFilterChange, TaskFilters} from "../../models/task-filters";

export const fetchTaskListAction = (filters: TaskFilters): IAction<TaskFilters>  => ({
  type: actionTypes.FETCH_TASK_LIST, payload: filters
})

/*export const fetchTaskDetailsAction = (taskId: string): IAction<string>  => ({
  type: actionTypes.FETCH_TASK_DETAILS, payload: taskId
})*/

export const fetchTaskListSuccessAction = (tasks: ITask[]): IAction<ITask[]> => ({
  type: actionTypes.FETCH_TASK_LIST_SUCCESS, payload: tasks
})

export const fetchTaskDetailsSuccessAction = (task: ITask): IAction<ITask> => ({
  type: actionTypes.FETCH_TASK_DETAILS_SUCCESS, payload: task
})

export const addTaskAction = (task: ITask): IAction<ITask>  => ({
  type: actionTypes.ADD_TASK, payload: task
})

export const addTaskSuccessAction = ()  => ({
  type: actionTypes.ADD_TASK_SUCCESS
})

export const updateTaskAction = (task: ITask)  => ({
  type: actionTypes.UPDATE_TASK, payload: task
})

export const deleteTasksAction = (taskIdList: string[]): IAction<string[]> => ({
  type: actionTypes.DELETE_TASKS, payload: taskIdList
})

export const changeTaskFilters = (change: IFilterChange) => ({
  type: actionTypes.CHANGE_FILTERS, payload: change
})
