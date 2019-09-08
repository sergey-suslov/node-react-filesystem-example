import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { files, isFetchingFiles, hasMoreFiles } from '../../../reducers/files-reducer'

import Files from './files'

const mapStateToProps = state => ({
  isFetchingFiles: isFetchingFiles(state),
  hasMoreFiles: hasMoreFiles(state),
  files: files(state)
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
  },
  dispatch,
)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Files))
