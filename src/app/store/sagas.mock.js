import { take, put, select } from "redux-saga/effects";
import * as actions from "./actions";
import { v1 as uuid } from "uuid";

export function* taskCreationSaga() {
  while (true) {
    const { groupId } = yield take(actions.REQUEST_TASK_CREATION);
    const ownerId = "U1";
    const taskId = uuid();
    yield put(actions.createTask(taskId, groupId, ownerId));
    console.log("Got groupd ID", groupId);
  }
}
