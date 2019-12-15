import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { signUpConfirm, signUpConfirmed } from '../../actions/user-actions'
import SignUpConfirm from './sign-up-confirm'

const mapStateToProps = () => ({
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    signUpConfirm,
    signUpConfirmed
  },
  dispatch,
)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpConfirm))
