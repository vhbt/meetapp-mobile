import React from 'react';
import {
  createAppContainer,
  createSwitchNavigator,
  createBottomTabNavigator,
} from 'react-navigation';

import Header from '~/components/Header';

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
        App: createBottomTabNavigator(
          {
            Dashboard,
            Subscriptions,
            Profile,
          },
          {
            tabBarOptions: {
              keyboardHidesTabBar: true,
            },
          }
        ),
      },
      {
        initialRouteName: isSigned ? 'App' : 'Auth',
      }
    )
  );
