import userReducer from './user/reducer';
import userActions from './user/actions'; 
import userSagas from './user/sagas'

export const reducers = {
  'user': userReducer,
};

export const sagas = [].concat(
  userSagas  
);

export const actions = {
  ...userActions,
};