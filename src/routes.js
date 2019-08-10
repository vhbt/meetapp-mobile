import { createAppContainer, createSwitchNavigator } from 'react-navigation';

import SignIn from './pages/Auth/SignIn';
import SignUp from './pages/Auth/SignUp';

export default createAppContainer(
  createSwitchNavigator({
    SignIn,
    SignUp,
  })
);
