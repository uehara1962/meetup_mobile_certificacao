// import produce from 'immer';

// const INITIAL_STATE = {
//   token: null,
//   signed: false,
//   loading: false,
// };

// export default function auth(state = INITIAL_STATE, action) {
//   switch (action.type) {
//     case '@auth/SIGN_IN_REQUEST':
//       return produce(state, draft => {
//         draft.loading = true;
//       });
//     case '@auth/SIGN_IN_SUCCESS':
//       return produce(state, draft => {
//         draft.token = action.payload.token;
//         draft.signed = true;
//         draft.loading = false;
//       });
//     case '@auth/SIGN_IN_FAILURE':
//       return produce(state, draft => {
//         draft.profile = action.payload.user;
//         draft.loading = false;
//       });

//     default:
//       return state;
//   }
// }

// S>----------------------------------------------------------------------------------------<//

// import produce from 'immer';

// const INITIAL_STATE = {
//   token: null,
//   signed: false,
//   loading: false,
// };

// export default function auth(state = INITIAL_STATE, action) {
//   return produce(state, draft => {
//     switch (action.type) {
//       case '@auth/SIGN_IN_REQUEST': {
//         draft.loading = true;
//         break;
//       }
//       case '@auth/SIGN_IN_SUCCESS': {
//         draft.token = action.payload.token;
//         draft.signed = true;
//         draft.loading = false;
//         break;
//       }
//       case '@auth/SIGN_IN_FAILURE': {
//         draft.loading = false;
//         break;
//       }
//       default:
//     }
//   });
// }

// S>----------------------------------------------------------------------------------------<//

import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
};

export default function auth(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@auth/SIGN_IN_REQUEST': {
        draft.loading = true;
        break;
      }
      case '@auth/SIGN_IN_SUCCESS': {
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_IN_FAILURE': {
        draft.loading = false;
        break;
      }
      case '@auth/SIGN_OUT': {
        draft.token = null;
        draft.signed = false;
        break;
      }
      default:
    }
  });
}
