import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import SignUp from './sign-up'
import { signIn } from '../../actions/user-actions'

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    signIn
  },
  dispatch,
)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUp))
