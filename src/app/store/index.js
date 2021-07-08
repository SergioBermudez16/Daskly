import { createStore, applyMiddleware, combineReducers } from "redux";
import { defaultState } from "../../server/defaultState";
import { createLogger } from "redux-logger";
import createSagaMiddleWare from "redux-saga";
import * as sagas from "./sagas";
import * as actions from "./actions";

const sagaMiddleware = createSagaMiddleWare();

export const store = createStore(
  combineReducers({
    session(userSession = defaultState.session || {}, action) {
      let { type, authenticated, session } = action;
      switch (type) {
        case actions.SET_STATE:
          return { ...userSession, id: action.state.session.id };
        case actions.REQUEST_AUTHENTICATE_USER:
          return { ...userSession, authenticated: actions.AUTHENTICATING };

        case actions.PROCESSING_AUTHENTICATE_USER:
          return { ...userSession, authenticated };
        default:
          return userSession;
      }
    },
    tasks(tasks = [], action) {
      switch (action.type) {
        case actions.SET_STATE:
          return action.state.tasks;
        case actions.CREATE_TASK:
          return [
            ...tasks,
            {
              id: action.taskId,
              name: "new Task",
              group: action.groupId,
              owner: action.ownerId,
              isComplete: false,
            },
          ];

        case actions.SET_TASK_COMPLETE:
          return tasks.map((task) => {
            return task.id == action.taskId
              ? { ...task, isComplete: action.isComplete }
              : task;
          });

        case actions.SET_TASK_NAME:
          return tasks.map((task) => {
            return task.id == action.taskId
              ? { ...task, name: action.name }
              : task;
          });

        case actions.SET_TASK_GROUP:
          return tasks.map((task) => {
            return task.id == action.taskId
              ? { ...task, group: action.groupId }
              : task;
          });
      }
      return tasks;
    },
    comments(comments = []) {
      return comments;
    },
    groups(groups = [], action) {
      switch (action.type) {
        case actions.SET_STATE:
          return action.state.groups;
      }
      return groups;
    },
    users(users = []) {
      return users;
    },
  }),
  applyMiddleware(createLogger(), sagaMiddleware)
);

for (let saga in sagas) {
  sagaMiddleware.run(sagas[saga]);
}
