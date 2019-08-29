import produce from 'immer';

const INITIAL_STATE = {
  subscription: null,
};

export default function subscription(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@subscription/CREATE_SUBSCRIPTION_SUCCESS': {
        draft.subscription = action.payload.subscription;
        break;
      }
      case '@subscription/CANCEL_SUBSCRIPTION_SUCCESS': {
        draft.subscription = action.payload.subscription;
        break;
      }
      default:
    }
  });
}
