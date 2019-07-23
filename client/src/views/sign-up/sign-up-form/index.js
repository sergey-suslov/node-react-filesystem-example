import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import SignUpForm from './sign-up-form'

const mapStateToProps = state => ({
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
  },
  dispatch,
)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(SignUpForm))
