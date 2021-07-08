import { take, put, select } from "redux-saga/effects";
import { v1 as uuid } from "uuid";
import axios from "axios";
import { history } from "./history";

import * as actions from "./actions";

const url = "http://localhost:7777";

export function* taskCreationSaga() {
  while (true) {
    const { groupId } = yield take(actions.REQUEST_TASK_CREATION);
    const ownerId = "U1";
    const taskId = uuid();
    let action = actions.createTask(taskId, groupId, ownerId);
    const { res } = yield axios.post(url + `/task/new`, {
      task: {
        id: taskId,
        group: groupId,
        owner: ownerId,
        isComplete: false,
        name: "New task",
      },
    });
    yield put(action);
    console.info("got response", res);
  }
}

export function* taskModificationSaga() {
  while (true) {
    const task = yield take([
      actions.SET_TASK_GROUP,
      actions.SET_TASK_NAME,
      actions.SET_TASK_COMPLETE,
    ]);
    axios.post(url + `/task/update`, {
      task: {
        id: task.taskId,
        group: task.groupId,
        name: task.name,
        isComplete: task.isComplete,
      },
    });
  }
}

export function* userAuthenticationSaga() {
  while (true) {
    const { username, password } = yield take(
      actions.REQUEST_AUTHENTICATE_USER
    );
    try {
      const { data } = yield axios.post(url + `/authenticate`, {
        username,
        password,
      });
      if (!data) {
        throw new Error();
      }
      console.log("Authenticated!", data);
      yield put(actions.setState(data.state));
      yield put(actions.processAuthenticateUser(actions.AUTHENTICATED));
      history.push("/dashboard");
    } catch (e) {
      console.log("can't authenticate");
      yield put(actions.processAuthenticateUser(actions.NOT_AUTHENTICATED));
    }
  }
}
