import * as actionTypes from "./task-list.action-types";
import {IAction} from "../../models/action";
import {ITask} from "../../models/task";
import {IFilterChange, TaskFilters} from "../../models/task-filters";

export interface ITaskListState {
  data: ITask[];
  loading: boolean;
  taskListActiveFilters: TaskFilters;
  currentTask: ITask|null;
}

const initialState: ITaskListState = {
  data: [],
  loading: false,
  taskListActiveFilters: new TaskFilters(),
  currentTask: null
};
export const taskListReducer = (state: ITaskListState = initialState, action: IAction<IFilterChange|ITask[]|ITask|undefined>) => {
  switch (action.type) {
    case actionTypes.FETCH_TASK_LIST:
        return {...state, loading: true};
    case actionTypes.FETCH_TASK_LIST_SUCCESS:
      return {...state, loading: false, data: action.payload as ITask[]};
    case actionTypes.FETCH_TASK_DETAILS:
        return {...state, loading: true};
    case actionTypes.FETCH_TASK_DETAILS_SUCCESS:
      return {...state, loading: false, currentTask: action.payload as ITask};
      case actionTypes.CHANGE_FILTERS:
        const {field, value} = action.payload as IFilterChange;
      return {
        ...state,
        taskListActiveFilters: { ...state.taskListActiveFilters, [field]: value}
      };
    default:
      return state;
  }
};
