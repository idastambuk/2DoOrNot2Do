import {call, put, takeLatest, all, select} from "redux-saga/effects";
import * as actionTypes from "./task-list.action-types";
import * as service from "./task-list.service";
import firebase from "firebase";
import {
  addTaskSuccessAction,
  fetchTaskDetailsSuccessAction,
  fetchTaskListAction,
  fetchTaskListSuccessAction
} from "./task-list.actions";
import {IAction} from "../../models/action";
import {ITask} from "../../models/task";
import {TaskFilters} from "../../models/task-filters";
import {IAppState} from "../../app-state";
import {actions as toastrActions} from 'react-redux-toastr';
import {toastrErrorOptions, toastrSuccessOptions} from "../../constants/toastr-options";

export function* fetchTaskListSaga() {
  try {
    const currentFilters: TaskFilters = yield select((state: IAppState) => state.taskList.taskListActiveFilters);
    const auth =firebase.auth();
    const userId =firebase.auth().currentUser!.uid;
    const tasks = yield call(service.fetchTasksByUid, userId, currentFilters);

    yield put(fetchTaskListSuccessAction(tasks));
  } catch(error) {
    yield put(toastrActions.add(toastrErrorOptions(error)))
  }

}

export function* addTaskSaga(action: IAction<ITask>) {
  try {
    const userId =firebase.auth().currentUser!.uid;
    const task: ITask = {...action.payload, created: new Date().getTime(), isCompleted: false};
    yield call(service.addTask, userId, task);

    yield put(addTaskSuccessAction());
    yield put(toastrActions.add(toastrSuccessOptions("Task added")));

    yield call (fetchTaskListSaga);
  } catch(error) {
    yield put(toastrActions.add(toastrErrorOptions(error)))
  }
}

export function* updateTaskSaga(action: IAction<ITask>) {
  try {
    const userId =firebase.auth().currentUser!.uid;
    const task: ITask = action.payload;

    yield call(service.updateTask, userId, task);
    yield put(toastrActions.add(toastrSuccessOptions("Task successfully updated")));

    yield call (fetchTaskListSaga);
  } catch(error) {
    yield put(toastrActions.add(toastrErrorOptions(error)))
  }
}

export function* deleteTaskSaga(action: IAction<string[]>) {
  try {
    const userId =firebase.auth().currentUser!.uid;
    const ids = action.payload;
    const calls: any[] = [];
    ids.forEach((id: string) => {
      calls.push(call(service.deleteTask, userId, id))
    })
    yield all(calls);
    yield call (fetchTaskListSaga);
    yield put(toastrActions.add(toastrSuccessOptions("Task(s) successfully deleted")));
  } catch(error) {
    yield put(toastrActions.add(toastrErrorOptions(error)))
  }
}

export function* fetchTaskDetailsSaga(taskId: string) {
  try {
    const task = yield select((state: IAppState) => state.taskList.data.find((task: ITask) => task.id === taskId));
    yield put(fetchTaskDetailsSuccessAction(task));
  } catch(error) {
    yield put(toastrActions.add(toastrErrorOptions("Couldn't find the task you were looking for")))
  }
}
export function* watchTaskListSaga() {
 yield takeLatest(actionTypes.FETCH_TASK_LIST, fetchTaskListSaga);
  yield takeLatest(actionTypes.CHANGE_FILTERS, fetchTaskListSaga);
  yield takeLatest(actionTypes.ADD_TASK, addTaskSaga);
 yield takeLatest(actionTypes.UPDATE_TASK, updateTaskSaga);
 yield takeLatest(actionTypes.DELETE_TASKS, deleteTaskSaga);
}
