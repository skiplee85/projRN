import { applyMiddleware, createStore, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga'
import { persistStore, autoRehydrate } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import thunk from 'redux-thunk';
import { reducers, sagas } from '../modules';
import config from '../config'


const sagaMiddleware = createSagaMiddleware();

const middlewares = [
  thunk,
  sagaMiddleware,
];

let enhancer = [
];

if (config.useAsyncStorage) enhancer.push(autoRehydrate());

const persistConfig = {
  keyPrefix: 'primary-',
  storage: AsyncStorage,
}

const configureStore = (initialState = {}) => {
  let store = createStore(
    makeRootReducer(reducers),
    initialState,
    compose(
      applyMiddleware(...middlewares),
      ...enhancer
    )
  );

  if (config.useAsyncStorage) persistStore(store, persistConfig);

  // Reducer注入
  store.injectReducer = (key, reducer) => {
    if (Reflect.has(reducers, key)) return;

    reducers[key] = reducer;
    store.replaceReducer(makeRootReducer(reducers));
  };
  // saga注入
  store.injectSagas = (s) => {
    s.map(sagaMiddleware.run);
  };

  store.injectSagas(sagas);

  return store
}

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    ...asyncReducers
  })
}

export default configureStore
