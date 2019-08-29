// import { combineReducers } from 'redux';

// import auth from './auth/reducer';

// export default combineReducers({
//   auth,
// });
// S>----------------------------------------------------------------------------------------<//

import { combineReducers } from 'redux';

import auth from './auth/reducer';
import user from './user/reducer';
import meetup from './meetup/reducer';
import subscription from './subscription/reducer';

export default combineReducers({
  auth,
  user,
  meetup,
  subscription,
});
