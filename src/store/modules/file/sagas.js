import { Alert } from 'react-native';
import { all, takeLatest, call, put } from 'redux-saga/effects';

import api from '~/services/api';

import { includeFileSuccess, includeFileFailure } from './actions';
import { updateProfileRequest } from '../user/actions';

export function* includeFile({ payload }) {
  console.log('includeFile_payload: ', payload);
  try {
    const response = yield call(api.post, 'files', payload.data.file);

    // console.log('includeFile_response: ', response)

    // toast.success('Arquivo incluido com sucesso!')

    const dataProfile = {
      name: payload.data.name,
      email: payload.data.email,
      avatar_id: response.data.id,
    };

    // console.log('includeFile_dataProfile: ', dataProfile)

    // yield put(updateProfileRequest(dataProfile))
    console.log('includeFile_response.data: ', response.data);
    yield put(includeFileSuccess(response.data));
  } catch (err) {
    Alert.alert('Erro ao incluir o arquivo', 'confira seus dados!');
    yield put(includeFileFailure());
  }
}

export default all([takeLatest('@file/INCLUDE_FILE_REQUEST', includeFile)]);
