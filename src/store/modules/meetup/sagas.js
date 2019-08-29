import { Alert } from 'react-native';
import { all, takeLatest, call, put } from 'redux-saga/effects';

import { parseISO } from 'date-fns';

import api from '~/services/api';

import {
  createMeetupSuccess,
  createMeetupFailure,
  updateMeetupSuccess,
  updateMeetupFailure,
} from './actions';

export function* createMeetup({ payload }) {
  // console.log('sagas_createMeetup_payload: ', payload);
  // alert(payload.data);
  try {
    const {
      title,
      file_id,
      description,
      location,
      dateFormatted,
    } = payload.data;

    const date = parseISO(dateFormatted);
    const meetup = { title, file_id, description, location, date };

    console.tron.log('createMeetupSuccess_meetup :', meetup);
    const response = yield call(api.post, 'meetups/', meetup);
    Alert.alert('Sucesso', 'Meetup creado com sucesso!');
    yield put(createMeetupSuccess(response.data));
  } catch (err) {
    Alert.alert('Erro ao criar meetup', 'confira seus dados!');
    yield put(createMeetupFailure());
  }
}

export function* updateMeetup({ payload }) {
  // console.log('sagas_updateMeetup_payload: ', payload);
  // alert(payload.data);
  try {
    const {
      id,
      title,
      file_id,
      description,
      location,
      dateFormatted,
    } = payload.data;
    const date = parseISO(dateFormatted);
    const meetup = { title, file_id, description, location, date };
    console.tron.log('updateMeetup_meetup :', meetup);
    console.tron.log('updateMeetup_id :', id);
    const response = yield call(api.put, 'meetups/', meetup, {
      params: {
        id,
      },
    });
    // const response = yield call(api.put, 'meetup', meetup);
    Alert.alert('Sucesso', 'Meetup atualizado com sucesso!');
    yield put(updateMeetupSuccess(response.data));
  } catch (err) {
    Alert.alert('Erro ao atualizar meetup', 'confira seus dados!');
    yield put(updateMeetupFailure());
  }
}

export default all([
  takeLatest('@meetup/CREATE_MEETUP_REQUEST', createMeetup),
  takeLatest('@meetup/UPDATE_MEETUP_REQUEST', updateMeetup),
]);
