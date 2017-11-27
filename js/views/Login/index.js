
import { connect } from 'react-redux'
import reducer from './reducer'
import sagas from './sagas'
import View from './view'
import { userLogin } from '../../modules/user/actions'

const key = 'Login';

const mapStateToProps = (state) => ({
  user: state.user
})

const mapDispatchToProps = {
  userLogin
}

export default (store) => {
  store.injectReducer(key, reducer)
  store.injectSagas(sagas)
  return connect(mapStateToProps, mapDispatchToProps)(View);
}