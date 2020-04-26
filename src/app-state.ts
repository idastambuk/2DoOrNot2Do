import {IAuthenticationState} from "./store/authentication/authentication.reducer";
import {ITaskListState} from "./store/task-list/task-list.reducer";
import {FirebaseReducer} from "react-redux-firebase";
import {ToastrState} from "react-redux-toastr";
import Reducer = FirebaseReducer.Reducer;

export interface IAppState {
   authentication: IAuthenticationState,
   firebase: Reducer,
   taskList: ITaskListState,
   toastr: ToastrState
}
