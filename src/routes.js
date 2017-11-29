import { StackNavigator, addNavigationHelpers } from 'react-navigation';
import React from 'react';
import { connect } from 'react-redux'
import Main from './views/Main'
import Login from './views/Login'

const defaultRoute = 'Main'

const routes = (store) => {

  let AppNavigator = StackNavigator({
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
        title: 'Login',
      }),
    },
  }, { initialRouteName: defaultRoute });

  // React Navigation setting
  const initialState = AppNavigator.router.getStateForAction(AppNavigator.router.getActionForPathAndParams(defaultRoute));
  const navReducer = (state = initialState, action) => {
    const nextState = AppNavigator.router.getStateForAction(action, state);
    // Simply return the original `state` if `nextState` is null or undefined.
    return nextState || state;
  };
  store.injectReducer('nav', navReducer)

  class App extends React.Component {
    render() {
      return (
        <AppNavigator navigation={addNavigationHelpers({
          dispatch: this.props.dispatch,
          state: this.props.nav,
        })} />
      );
    }
  }

  const mapStateToProps = (state) => ({
    nav: state.nav
  });

  return connect(mapStateToProps)(App);
}

export default routes
