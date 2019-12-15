import { message } from 'antd'
import querystring from 'querystring'
import _ from 'lodash'
import { all, takeLatest, call, put, select, delay } from 'redux-saga/effects'
import axios from './axios'
import config from '../config'
import {
  FETCH_FILES,
  MOVE_FILE,
  DELETE_FILE,
  RENAME_FILE,
  CREATE_FILE,
  FIND_FILE,
  fetchedFiles,
  fetchedFilesWithError,
  movedFile,
  moveFileWithError,
  deletedFile,
  deleteFileWithError,
  renamedFile,
  renameFileWithError,
  createdFile,
  createFileWithError,
  findedFile,
  findFileWithError
} from '../actions/files-actions'

function* fetchFiles({ payload: { parentId, limit: l } }) {
  try {
    const limit = l || config.defaultLimit
    const skip = yield select(state => console.log(state.files.files.skip) || state.files.files.skip)
    const result = yield call(axios.get, `/api/files/directory?${querystring.stringify(_.omitBy({
      parentId,
      limit,
      skip: skip || 0
    }, o => !o))}`)
    console.log('Fetched', result.data._id)
    yield put(fetchedFiles({
      files: result.data.files,
      hasMore: !(result.data.files.length < limit),
      parentName: result.data.name,
      file: result.data._id ? _.omit(result.data, 'files') : null,
      parentId: result.data.parentId || null
    }))
  } catch (error) {
    yield put(fetchedFilesWithError({ error: message }))
    if (error.response) {
      const { message: msg } = error.response.data
      message.error(msg || `Error fetching the files: "${error.response.data}"`)
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      // TODO: Handle error
      message.error('Something went wrong, reload the page')
      console.log(error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
    }
    console.log(error.config)
  }
}

function* moveFile({ payload: { sourceId, targetId } }) {
  try {
    yield call(axios.put, `/api/files/${sourceId}/move/${targetId}`)
    yield put(movedFile({
      sourceId,
      targetId
    }))
  } catch (error) {
    const file = yield select(state => state.files.moveFile.file)
    yield put(moveFileWithError({ file }))
    if (error.response) {
      const { message: msg } = error.response.data
      message.error(msg || `Error moving the file: "${error.response.data}"`)
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      // TODO: Handle error
      message.error('Something went wrong, moving the file')
      console.log(error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
    }
    console.log(error.config)
  }
}

function* deleteFile({ payload }) {
  try {
    yield call(axios.delete, `/api/files/${payload}`)
    yield put(deletedFile())
  } catch (error) {
    const file = yield select(state => state.files.deleteFile.file)
    yield put(deleteFileWithError({ file }))
    if (error.response) {
      const { message: msg } = error.response.data
      message.error(msg || `Error deleting the file: "${error.response.data}"`)
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      // TODO: Handle error
      message.error('Something went wrong, deleting the file')
      console.log(error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
    }
    console.log(error.config)
  }
}

function* renameFile({ payload }) {
  try {
    yield call(axios.put, `/api/files/${payload.file._id}/rename`, { name: payload.name })
    yield put(renamedFile())
  } catch (error) {
    const file = yield select(state => state.files.renameFile.file)
    yield put(renameFileWithError({ file }))
    if (error.response) {
      const { message: msg } = error.response.data
      message.error(msg || `Error removing the file: "${error.response.data}"`)
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      // TODO: Handle error
      message.error('Something went wrong, removing the file')
      console.log(error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
    }
    console.log(error.config)
  }
}

function* createFile({ payload }) {
  yield delay()
  try {
    const result = yield call(axios.post, `/api/files/create/${payload.type}`, { name: payload.name })
    yield put(createdFile({ file: result.data, id: payload.id }))
  } catch (error) {
    yield put(createFileWithError({ id: payload.id }))
    if (error.response) {
      const { message: msg } = error.response.data
      message.error(msg || `Error creating the file: "${error.response.data}"`)
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      // TODO: Handle error
      message.error('Something went wrong, creating the file')
      console.log(error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
    }
    console.log(error.config)
  }
}

function* findFile({ payload }) {
  yield delay(250)
  try {
    const result = yield call(axios.get, `/api/files?${querystring.stringify({ name: payload })}`)
    yield put(findedFile(result.data.files))
  } catch (error) {
    yield put(findFileWithError({ id: payload.id }))
    if (error.response) {
      const { message: msg } = error.response.data
      message.error(msg || `Error searching files: "${error.response.data}"`)
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
    } else if (error.request) {
      // The request was made but no response was received
      // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      // TODO: Handle error
      message.error('Something went wrong, searching for files')
      console.log(error.request)
    } else {
      // Something happened in setting up the request that triggered an Error
      console.log('Error', error.message)
    }
    console.log(error.config)
  }
}

export function* watch() {
  yield all([
    takeLatest(FETCH_FILES, fetchFiles),
    takeLatest(MOVE_FILE, moveFile),
    takeLatest(DELETE_FILE, deleteFile),
    takeLatest(RENAME_FILE, renameFile),
    takeLatest(CREATE_FILE, createFile),
    takeLatest(FIND_FILE, findFile)
  ])
}
