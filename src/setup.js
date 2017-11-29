/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React from 'react';
import { Provider } from 'react-redux';
import configureStore from './store/configureStore';
import routes from './routes'

class Root extends React.Component {

  render() {
    let store = configureStore();
    let Routes = routes(store)
    
    return (
      <Provider store={store}>
        <Routes />
      </Provider>
    );
  }
}

setup = () => {
  return Root
}

export default setup
