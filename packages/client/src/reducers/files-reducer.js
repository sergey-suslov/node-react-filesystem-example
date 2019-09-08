import { createSelector } from 'reselect'
import { Record } from 'immutable'
import _ from 'lodash'
import {
  FETCH_FILES,
  FETCHED_FILES,
  FETCHED_FILES_WITH_ERROR,
  MOVE_FILE,
  MOVED_FILE,
  MOVE_FILE_WITH_ERROR,
  DELETE_FILE,
  DELETED_FILE,
  DELETE_FILE_WITH_ERROR,
  RENAME_FILE,
  RENAMED_FILE,
  RENAME_FILE_WITH_ERROR,
  CREATE_FILE,
  CREATED_FILE,
  CREATE_FILE_WITH_ERROR,
  FIND_FILE,
  FINDED_FILE,
  CLEAR_FILES
} from '../actions/files-actions'

export const moduleName = 'files'

export const ReducerRecord = Record({
  files: {
    parent: null,
    parentName: null,
    direactoryId: null,
    files: [],
    skip: 0,
    processing: false,
    hasMore: false
  },
  moveFile: {
    processing: false,
    file: null
  },
  deleteFile: {
    processing: false,
    file: null
  },
  renameFile: {
    processing: false,
    file: null
  },
  createFile: {
    processing: false,
    file: null
  },
  findFile: {
    processing: false,
    files: []
  }
})

export default function reducer(state = new ReducerRecord(), action) {
  const { type, payload } = action
  let result
  switch (type) {
  case FETCH_FILES:
    return state.set('files', {
      files: payload.parentId === state.files.direactoryId ? state.files.files : [],
      parentName: payload.parentId === state.files.direactoryId ? state.files.parentName : null,
      parent: null,
      skip: payload.parentId === state.files.direactoryId ? state.files.skip : 0,
      processing: true,
      hasMore: false,
      direactoryId: payload.parentId
    })
  case FETCHED_FILES:
    return state.set('files', {
      files:
          (payload.file && payload.file._id) === state.files.direactoryId
            ? state.files.files.concat(payload.files)
            : payload.files,
      hasMore: payload.hasMore,
      processing: false,
      parentName: payload.parentName,
      skip: (
        (state.files.direactoryId === (payload.file && payload.file._id) &&
            state.files.files.concat(payload.files)) ||
          []
      ).length,
      parent: payload.parentId || null,
      direactoryId: state.files.direactoryId
    })
  case FETCHED_FILES_WITH_ERROR:
    return state.set('files', {
      parentId: state.files.parentId,
      parentName: state.files.parentName,
      files: state.files.files,
      processing: false,
      skip: 0,
      hasMore: false
    })
  case MOVE_FILE:
    return state
      .updateIn(['files', 'files'], files => files.filter(f => f._id !== payload.sourceId))
      .set('moveFile', {
        processing: true,
        file: state.getIn(['files', 'files'], files => files.filter(f => f._id === payload.sourceId))[0]
      })
  case MOVED_FILE:
    return state.set('moveFile', {
      processing: false
    })
  case MOVE_FILE_WITH_ERROR: // TODO: handle
    result = state.set('moveFile', {
      processing: false
    })
    if ((state.files.parent && state.files.parent._id) === (payload.file.parentId && payload.file.parentId._id)) {
      result = result.updateIn(['files', 'files'], files => _.sortBy([...files, payload.file], 'date').reverse())
    }
    return result.setIn(['moveFile', 'file'], null)
  case DELETE_FILE:
    return state
      .updateIn(['files', 'files'], files => files.filter(f => f._id !== payload))
      .set('deleteFile', {
        processing: true,
        file: _.find(state.getIn(['files', 'files']), f => f._id === payload)
      })
  case DELETED_FILE:
    return state.set('deleteFile', {
      processing: false
    })
  case DELETE_FILE_WITH_ERROR:
    result = state.set('deleteFile', {
      processing: false
    })
    if (state.files.direactoryId === (payload.file.parentId && payload.file.parentId._id)) {
      result = result.updateIn(['files', 'files'], files => _.sortBy([...files, payload.file], 'date').reverse())
    }
    return result.setIn(['deleteFile', 'file'], null)
  case RENAME_FILE:
    return state
      .updateIn(['files', 'files'], files =>
        files.map(f => (f._id === payload.file._id ? { ...f, name: payload.name } : f))
      )
      .set('renameFile', {
        processing: true,
        file: payload.file
      })
  case RENAMED_FILE:
    return state.set('renameFile', {
      processing: false
    })
  case RENAME_FILE_WITH_ERROR:
    result = state.set('renameFile', {
      processing: false
    })
    if (state.files.direactoryId === (payload.file.parentId && payload.file.parentId._id)) {
      result = result.updateIn(['files', 'files'], files =>
        files.map(f => (f._id === payload.file._id ? payload.file : f))
      )
    }
    return result.setIn(['renameFile', 'file'], null)
  case CREATE_FILE:
    return state
      .updateIn(['files', 'files'], files => [
        { _id: payload.id, temporary: true, date: new Date(), name: payload.name, type: payload.type },
        ...files
      ])
      .set('createFile', {
        processing: true
      })
  case CREATED_FILE:
    return state
      .updateIn(['files', 'files'], files => files.map(f => f._id === payload.id ? payload.file : f))
      .set('createFile', {
        processing: false
      })
  case CREATE_FILE_WITH_ERROR:
    result = state.set('createFile', {
      processing: false
    })
    return result.updateIn(['files', 'files'], files => files.filter(f => f._id !== payload.id))
  case FIND_FILE:
    return state
      .updateIn(['findFile', 'processing'], () => true)
  case FINDED_FILE:
    return state
      .updateIn(['findFile', 'processing'], () => false)
      .updateIn(['findFile', 'files'], () => payload)
  case CLEAR_FILES:
    return state
      .updateIn(['findFile', 'files'], () => [])
  default:
    return state
  }
}

/**
 * Selectors
 * */
export const stateSelector = state => state[moduleName]
export const isFetchingFiles = createSelector(
  stateSelector,
  state => state.files.processing
)
export const isFetchingFirstFiles = createSelector(
  stateSelector,
  state => state.files.processing && state.files.skip === 0
)
export const files = createSelector(
  stateSelector,
  state => state.files.files
)
export const hasMoreFiles = createSelector(
  stateSelector,
  state => state.files.hasMore
)
export const parentName = createSelector(
  stateSelector,
  state => state.files.parentName
)
export const parentOfCurrentDirectory = createSelector(
  stateSelector,
  state => state.files.parent
)
export const isSearchingFiles = createSelector(
  stateSelector,
  state => state.findFile.processing
)
export const findedFiles = createSelector(
  stateSelector,
  state => state.findFile.files
)
