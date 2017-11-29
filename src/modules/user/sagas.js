import { take, call, put, select, fork, cancel, takeLatest } from 'redux-saga/effects';
import api from '../../api'
import actions from './actions'

export function* loginFlow() {
  while (true) {
    const { payload } = yield take(actions.USER_LOGIN);
    yield fork(authorize, payload.username, payload.password)
    yield take([actions.USER_LOGOUT, actions.USER_LOGIN_ERROR])
  }
}

function* authorize(name, password) {
  try {
    const res = yield call(api.user.login, name, password);
    let actionType = actions.USER_LOGIN_ERROR;
    let data = res.data
    if (res.status === 200) {
      actionType = actions.USER_LOGIN_SUCC;
      data = data.data
    }
    yield put({ type: actionType, payload: data });
  } catch (error) {
    yield put({ type: actions.USER_LOGIN_ERROR, error });
  }
}

export default [
  loginFlow,
];