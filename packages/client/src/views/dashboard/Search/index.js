import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { isSearchingFiles, findedFiles } from '../../../reducers/files-reducer'
import { findFile, clearFiles } from '../../../actions/files-actions'

import Search from './search'

const mapStateToProps = state => ({
  isSearchingFiles: isSearchingFiles(state),
  files: findedFiles(state)
})

const mapDispatchToProps = dispatch => bindActionCreators(
  {
    findFile,
    clearFiles
  },
  dispatch,
)

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(Search))
