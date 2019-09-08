import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'

import { parentOfCurrentDirectory, isFetchingFiles } from '../../../reducers/files-reducer'
import { moveFile } from '../../../actions/files-actions'
import Location from './location'

const mapStateToProps = state => ({
  parent: parentOfCurrentDirectory(state),
  isFetching: isFetchingFiles(state)
})

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      moveFile
    },
    dispatch
  )

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Location)
)
