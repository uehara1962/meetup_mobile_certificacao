// import createSagaMiddleware from 'redux-saga';
// import createStore from './createStore';

// import rootReducer from './modules/rootReducer';
// import rootSaga from './modules/rootSaga';

// const sagaMonitor =
//   process.env.NODE_ENV === 'development'
//     ? console.tron.createSagaMonitor()
//     : null;

// const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

// const middlewares = [sagaMiddleware];

// const store = createStore(rootReducer, middlewares);

// sagaMiddleware.run(rootSaga);

// export default store;

// S>----------------------------------------------------------------------------------------<//

import { persistStore } from 'redux-persist';
import createSagaMiddleware from 'redux-saga';
import createStore from './createStore';
import persistReducers from './persistReducers';

import rootReducer from './modules/rootReducer';
import rootSaga from './modules/rootSaga';

const sagaMonitor = __DEV__ ? console.tron.createSagaMonitor() : null;

const sagaMiddleware = createSagaMiddleware({ sagaMonitor });

const middlewares = [sagaMiddleware];

// const store = createStore(rootReducer, middlewares);
const store = createStore(persistReducers(rootReducer), middlewares);
const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

// export default store;
export { store, persistor };

// S>----------------------------------------------------------------------------------------<//

// import { persistStore } from 'redux-persist'
// import createSagaMiddleware from 'redux-saga'

// import createStore from './createStore'
// import persistReducers from './persistReducers'

// import rootReducer from './modules/rootReducer'
// import rootSaga from './modules/rootSaga'

// const sagaMonitor = process.env.NODE_ENV === 'development'
//   ? console.tron.createSagaMonitor()
//   : null

// const sagaMiddleware = createSagaMiddleware({ sagaMonitor })

// const middlewares = [sagaMiddleware]

// const store = createStore(persistReducers(rootReducer), middlewares)
// const persistor = persistStore(store)

// sagaMiddleware.run(rootSaga)

// export { store, persistor }
