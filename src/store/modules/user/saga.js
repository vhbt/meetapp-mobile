import { all, takeLatest, call, put } from 'redux-saga/effects';
import { showMessage } from 'react-native-flash-message';

import api from '~/services/api';

import { updateProfileSuccess } from './actions';

export function* updateProfile({ payload }) {
  try {
    const { name, email, avatar_id, ...rest } = payload;

    const user = Object.assign(
      { name, email, avatar_id },
      rest.oldPassword ? rest : {}
    );

    const response = yield call(api.put, 'users', user);

    yield put(updateProfileSuccess(response.data));

    showMessage({
      message: 'Profile updated with success.',
      type: 'success',
    });
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
  }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
