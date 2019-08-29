// import React from 'react';
// import { StatusBar, Text } from 'react-native';

// import Routes from './routes';

// import './config/ReactotronConfig';

// export default function App() {
//   return (
//     <>
//       <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
//       <Routes />
//     </>
//   );
// }

// S>----------------------------------------------------------------------------------------<//

// import React from 'react';
// import { PersistGate } from 'redux-persist/integration/react';
// import { Provider } from 'react-redux';
// import { StatusBar } from 'react-native';
// import './config/ReactotronConfig';

// import { store, persistor } from './store';
// import Routes from './routes';

// export default function App() {
//   return (
//     <Provider store={store}>
//       <PersistGate persistor={persistor}>
//         <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
//         <Routes />
//       </PersistGate>
//     </Provider>
//   );
// }

import React from 'react';
import { PersistGate } from 'redux-persist/integration/react';
import { Provider } from 'react-redux';
import { StatusBar } from 'react-native';
import './config/ReactotronConfig';

import { store, persistor } from './store';
import App from './App';

export default function Index() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StatusBar barStyle="light-content" backgroundColor="#7159c1" />
        <App />
      </PersistGate>
    </Provider>
  );
}
