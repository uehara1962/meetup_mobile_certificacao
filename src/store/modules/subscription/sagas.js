import { Alert } from 'react-native';
import { all, takeLatest, call, put } from 'redux-saga/effects';

import { parseISO } from 'date-fns';

import api from '~/services/api';

import {
  createSubscriptionSuccess,
  createSubscriptionFailure,
  cancelSubscriptionSuccess,
  cancelSubscriptionFailure,
} from './actions';

export function* createSubscription({ payload }) {
  console.tron.log('sagas_createSubscription_payload :', payload);

  try {
    const response = yield call(
      api.post,
      `meetups/${payload.data.meetupId}/subscriptions`
    );
    Alert.alert('Sucesso', 'Inscrição criado com sucesso!');
    yield put(createSubscriptionSuccess(response.data));
  } catch (error) {
    // console.tron.log('sagas_createSubscription_response :', response);
    // console.tron.log('sagas_createSubscription_error :', error);
    Alert.alert('Erro ao fazer inscrição', 'verifique seus dados');
    yield put(createSubscriptionFailure());
  }
}

export function* cancelSubscription({ payload }) {
  console.tron.log('sagas_cancelSubscription_payload :', payload);

  try {
    const response = yield call(
      api.delete,
      `subscription/${payload.data.subscriptionId}`
    );
    Alert.alert('Sucesso', 'Inscrição cancelada com sucesso!');
    yield put(cancelSubscriptionSuccess(response.data));
  } catch (error) {
    // console.tron.log('sagas_cancelSubscription_response :', response);
    // console.tron.log('sagas_cancelSubscription_error :', error);
    Alert.alert('Erro ao cancelar inscrição', 'verifique seus dados');
    yield put(cancelSubscriptionFailure());
  }
}

export default all([
  takeLatest('@subscription/CREATE_SUBSCRIPTION_REQUEST', createSubscription),
  takeLatest('@subscription/CANCEL_SUBSCRIPTION_REQUEST', cancelSubscription),
]);
