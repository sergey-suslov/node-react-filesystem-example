import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { profile } from '../../../reducers/user-reducer'
import PrivateAppbar from './private-appbar'

const mapStateToProps = state => ({
  profile: profile(state)
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
  },
  dispatch,
)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(PrivateAppbar))
