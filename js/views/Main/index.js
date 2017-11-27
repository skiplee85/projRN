
import { connect } from 'react-redux'
import reducer from './reducer'
import sagas from './sagas'
import View from './view'
import { userLogin } from '../../modules/user/actions'

const key = 'Main';

const mapStateToProps = (state) => ({
})

const mapDispatchToProps = {
}

export default (store) => {
  store.injectReducer(key, reducer)
  store.injectSagas(sagas)
  return connect(mapStateToProps, mapDispatchToProps)(View);
}