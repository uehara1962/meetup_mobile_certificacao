import produce from 'immer';

const INITIAL_STATE = {
  meetup: null,
};

export default function meetup(state = INITIAL_STATE, action) {
  return produce(state, draft => {
    switch (action.type) {
      case '@meetup/UPDATE_MEETUP_SUCCESS': {
        draft.meetup = action.payload.meetup;
        break;
      }
      case '@meetup/CREATE_MEETUP_SUCCESS': {
        draft.meetup = action.payload.meetup;
        break;
      }
      default:
    }
  });
}
