import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import Main from './views/Main'
import Login from './views/Login'

const routes = (store) => {
  return StackNavigator({
    Main: {
      screen: Main(store),
      path: 'main',
      navigationOptions: ({ navigation }) => ({
        header: null,
      }),
    },
    Login: {
      screen: Login(store),
      path: 'login',
      navigationOptions: ({ navigation }) => ({
        // header: null,
      }),
    },
  }, {
      initialRouteName: 'Main',
    })
}

export default routes
