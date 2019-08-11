import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';

import Dashboard from './pages/App/Dashboard';
import Subscriptions from './pages/App/Subscriptions';
import Profile from './pages/App/Profile';

export default (isSigned = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Auth: createSwitchNavigator({
          SignIn,
          SignUp,
        }),
        App: createBottomTabNavigator({
          Dashboard,
          Subscriptions,
          Profile,
        }),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Auth',
      }
    )
  );
