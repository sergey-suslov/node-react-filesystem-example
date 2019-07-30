import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { isSignedIn } from '../../../reducers/user-reducer'
import RefreshTokenService from './refresh-token-service'

const mapStateToProps = state => ({
  isSignedIn: isSignedIn(state),
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
  },
  dispatch,
)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(RefreshTokenService))
