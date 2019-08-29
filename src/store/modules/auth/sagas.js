// import { takeLatest, call, put, all } from 'redux-saga/effects';

// import history from '~/services/history';
// import api from '~/services/api';

// import { signInSuccess } from './actions';

// export function* signIn({ payload }) {
//   const { email, password } = payload;

//   // console.tron.log('sagas_signIn: ', email)

//   const response = yield call(api.post, 'sessions', {
//     email,
//     password,
//   });

//   // console.tron.log('sagas_signIn_response: ', response)

//   const { token, user } = response.data;

//   yield put(signInSuccess(token, user));

//   history.push('/dashboard');
// }

// export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);

// S>----------------------------------------------------------------------------------------<//

// import { takeLatest, call, put, all } from 'redux-saga/effects';

// import history from '~/services/history';
// import api from '~/services/api';

// import { signInSuccess, signFailure } from './actions';

// export function* signIn({ payload }) {
//   try {
//     const { email, password } = payload;

//     const response = yield call(api.post, 'sessions', {
//       email,
//       password,
//     });

//     const { token, user } = response.data;

//     api.defaults.headers.Authorization = `Bearer ${token}`;

//     yield put(signInSuccess(token, user));

//     history.push('/dashboard');
//   } catch (err) {
//     yield put(signFailure());
//   }
// }

// export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);

// S>----------------------------------------------------------------------------------------<//

// import { takeLatest, call, put, all } from 'redux-saga/effects';

// import history from '~/services/history';
// import api from '~/services/api';

// import { signInSuccess, signFailure } from './actions';

// export function* signIn({ payload }) {
//   try {
//     const { email, password } = payload;

//     const response = yield call(api.post, 'sessions', {
//       email,
//       password,
//     });

//     const { token, user } = response.data;

//     api.defaults.headers.Authorization = `Bearer ${token}`;

//     yield put(signInSuccess(token, user));

//     history.push('/dashboard');
//   } catch (err) {
//     yield put(signFailure());
//   }
// }

// export default all([takeLatest('@auth/SIGN_IN_REQUEST', signIn)]);

// S>----------------------------------------------------------------------------------------<//

// import { takeLatest, call, put, all } from 'redux-saga/effects';
// import { toast } from 'react-toastify';

// import history from '~/services/history';
// import api from '~/services/api';

// import { signInSuccess, signFailure } from './actions';

// export function* signIn({ payload }) {
//   try {
//     const { email, password } = payload;

//     const response = yield call(api.post, 'sessions', {
//       email,
//       password,
//     });

//     const { token, user } = response.data;

//     yield put(signInSuccess(token, user));

//     history.push('/dashboard');
//   } catch (err) {
//     toast.error('Falha na autenticação, verifique seus dados');
//     yield put(signFailure());
//   }
// }

// export function* signUp({ payload }) {
//   try {
//     const { name, email, password } = payload;

//     yield call(api.post, 'users', {
//       name,
//       email,
//       password,
//     });

//     history.push('/');
//   } catch (err) {
//     toast.error('Falha no cadastro, verifique seus dados!');

//     yield put(signFailure());
//   }
// }

// export default all([
//   takeLatest('@auth/SIGN_IN_REQUEST', signIn),
//   takeLatest('@auth/SIGN_UP_REQUEST', signUp),
// ]);

// S>----------------------------------------------------------------------------------------<//

// import { takeLatest, call, put, all } from 'redux-saga/effects';
// import { toast } from 'react-toastify';

// import history from '~/services/history';
// import api from '~/services/api';

// import { signInSuccess, signFailure } from './actions';

// export function* signIn({ payload }) {
//   try {
//     const { email, password } = payload;

//     const response = yield call(api.post, 'sessions', {
//       email,
//       password,
//     });

//     const { token, user } = response.data;

//     api.defaults.headers.Authorization = `Bearer ${token}`;

//     yield put(signInSuccess(token, user));

//     history.push('/dashboard');
//   } catch (err) {
//     toast.error('Falha na autenticação, verifique seus dados');
//     yield put(signFailure());
//   }
// }

// export function* signUp({ payload }) {
//   try {
//     const { name, email, password } = payload;

//     yield call(api.post, 'users', {
//       name,
//       email,
//       password,
//     });

//     history.push('/');
//   } catch (err) {
//     toast.error('Falha no cadastro, verifique seus dados!');

//     yield put(signFailure());
//   }
// }

// export default all([
//   takeLatest('@auth/SIGN_IN_REQUEST', signIn),
//   takeLatest('@auth/SIGN_UP_REQUEST', signUp),
// ]);

// S>----------------------------------------------------------------------------------------<//

import { Alert } from 'react-native';
import { takeLatest, call, put, all } from 'redux-saga/effects';

import api from '~/services/api';

import { signInSuccess, signFailure } from './actions';

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

    // history.push('/dashboard');
  } catch (err) {
    Alert.alert(
      'Falha na autenticação',
      'Houve um erro no login, verifique seus dados'
    );
    yield put(signFailure());
  }
}

export function* signUp({ payload }) {
  console.tron.log('saga_signUp_payload :', payload);
  try {
    const { name, email, password } = payload;

    yield call(api.post, 'users', {
      name,
      email,
      password,
      // provider: true,
    });

    // history.push('/');
  } catch (err) {
    Alert.alert(
      'Falha no cadastro',
      'Houve um erro no cadastro, verifique seus dados'
    );

    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export function signOut() {
  console.log('signOut: ');
  // history.push('/');
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),
  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
  takeLatest('@auth/SIGN_UP_REQUEST', signUp),
  takeLatest('@auth/SIGN_OUT', signOut),
]);
