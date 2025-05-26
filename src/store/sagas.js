import { call, put, takeLatest, select, delay } from 'redux-saga/effects';
import axios from 'axios';
import {
  initializeThread,
  setThreadId,
  sendMessage,
  receiveMessage,
  setProgress,
  setDownloadUrl,
} from './chatSlice';

const SERVER_URL = process.env.REACT_APP_SERVER_URL || 'http://localhost:5000';

function* initThreadSaga() {
  const res = yield call(axios.get, `${SERVER_URL}/thread`);
  yield put(setThreadId(res.data.id));
}

function* sendMessageSaga(action) {
  const threadId = yield select((state) => state.chat.threadId);
  const message = action.payload;

  yield call(axios.post, `${SERVER_URL}/thread/${threadId}/message`, { content: message });

  const runRes = yield call(axios.get, `${SERVER_URL}/thread/${threadId}/run`);
  const runId = runRes.data.id;

  while (true) {
    let statusRes = yield call(axios.get, `${SERVER_URL}/thread/${threadId}/run/${runId}/status`);

    if (statusRes.data.status === 'requires_action') {
      const operation = statusRes.data.operationname;
      while (true) {
        const opRes = yield call(axios.get, `${SERVER_URL}/operation/${encodeURIComponent(operation)}/status`);
        yield put(setProgress(opRes.data.progress));
        if (opRes.data.done) {
          yield put(setProgress(100));
          yield put(setDownloadUrl(`${SERVER_URL}/download/${threadId}`));
          break;
        }
        yield delay(1000);
      }
    } else if (statusRes.data.status === 'completed') {
      break;
    } else {
      yield delay(1000);
    }
  }

  const msgRes = yield call(axios.get, `${SERVER_URL}/messages/${threadId}`);
  yield put(receiveMessage(msgRes.data.lastmessage));
}

export default function* rootSaga() {
  yield takeLatest(initializeThread.type, initThreadSaga);
  yield takeLatest(sendMessage.type, sendMessageSaga);
}
