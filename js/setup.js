/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { addNavigationHelpers } from 'react-navigation';
import configureStore from './store/configureStore';
import routes from './routes'

class Root extends Component<{}> {

  render() {
    let store = configureStore();
    let Routes = routes(store);
    console.log(store.getState());
    // React Navigation setting
    const initialState = Routes.state;
    const navReducer = (state = initialState, action) => {
      console.log(state);
      const nextState = Routes.router.getStateForAction(action, state);
      // Simply return the original `state` if `nextState` is null or undefined.
      return nextState || state;
    };
    store.injectReducer('nav', navReducer)

    let navigation = addNavigationHelpers({
      dispatch: store.dispatch,
      state: store.getState().nav,
    })

    return (
      <Provider store={store}>
        <Routes navigation={navigation} />
      </Provider>
    );
  }
}

setup = () => {
  return Root
}

export default setup
