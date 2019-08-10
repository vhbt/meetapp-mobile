import { all, takeLatest, call, put } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';
import jwt_decode from 'jwt-decode';
import api from '~/services/api';

import {
  signInSuccess,
  signInFailure,
  tokenInvalid,
  signUpSuccess,
} from './actions';

export function* signUp({ payload }) {
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
    });

    showMessage({
      message: 'Registered with success.',
      type: 'success',
    });

    yield put(signUpSuccess());
  } catch (err) {
    if (err.response) {
      showMessage({
        message: err.response.data.error,
        type: 'danger',
      });
    } else {
      showMessage({
        message: 'Connection error.',
        type: 'danger',
      });
    }

    yield put(signInFailure());
  }
}

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'sessions', {
      email,
      password,
    });

    const { token, user } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(signInSuccess(token, user));
  } catch (err) {
    if (err.response) {
      showMessage({
        message: err.response.data.error,
        type: 'danger',
      });
    } else {
      showMessage({
        message: 'Connection error.',
        type: 'danger',
      });
    }

    yield put(signInFailure());
  }
}

export function* setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;
  if (payload && payload.auth.token) {
    const decoded = jwt_decode(token);

    if (decoded.exp < Date.now() / 1000) {
      yield put(tokenInvalid());
    }
  }

  api.defaults.headers.Authorization = `Bearer ${token}`;
}

export function signOut() {
  // history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_OUT', signOut),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
]);
