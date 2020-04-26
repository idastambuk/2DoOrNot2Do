import {applyMiddleware, createStore} from "redux";
import {createRootReducer} from "./reducers";
import {routerMiddleware} from 'connected-react-router';
import {createBrowserHistory} from 'history';
import createSagaMiddleware from "redux-saga";
import {watchTaskListSaga} from "./store/task-list/task-list.saga";
import {watchAuthenticationSaga} from "./store/authentication/authentication.saga";
import {watchRoutingSaga} from "./store/routing/routing.saga";

let composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ;
const saga = createSagaMiddleware();
export const history = createBrowserHistory();

export const store = createStore(
      createRootReducer(history),
      composeEnhancers(
          applyMiddleware(
              saga,
              routerMiddleware(history)
          ),
      ),
  )

saga.run(watchRoutingSaga);
saga.run(watchAuthenticationSaga);
saga.run(watchTaskListSaga);
