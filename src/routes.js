// import { createAppContainer, createSwitchNavigator } from 'react-navigation';

// import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';

// export default createAppContainer(
//   createSwitchNavigator({
//     SignIn,
//     SignUp,
//   })
// );

// S>----------------------------------------------------------------------------------------<//

// import {
//   createAppContainer,
//   createBottomTabNavigator,
//   createSwitchNavigator,
// } from 'react-navigation';

// import SignIn from './pages/SignIn';
// import SignUp from './pages/SignUp';
// import Dashboard from './pages/Dashboard';
// import Subscription from './pages/Subscription';
// import Profile from './pages/Profile';

// export default (isSigned = false) =>
//   createAppContainer(
//     createSwitchNavigator(
//       {
//         Sign: createSwitchNavigator({
//           SignIn,
//           SignUp,
//         }),
//         App: createBottomTabNavigator({
//           Dashboard,
//           Subscription,
//           Profile,
//         }),
//       },
//       {
//         initialRouteName: isSigned ? 'App' : 'Sign',
//       }
//     )
//   );

// S>----------------------------------------------------------------------------------------<//

import {
  createAppContainer,
  createBottomTabNavigator,
  createSwitchNavigator,
} from 'react-navigation';

import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Meetups from './pages/Meetups';
import Subscription from './pages/Subscription';
import Profile from './pages/Profile';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Sign: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createBottomTabNavigator(
          {
            Meetups,
            Subscription,
            Profile,
          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
              activeTintColor: '#FFF',
              inactiveTintColor: 'rgba(255,255,255,0.6)',
              style: {
                backgroundColor: '#281E24',
              },
            },
          }
        ),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Sign',
      }
    )
  );
