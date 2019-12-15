// flow
export const FETCH_FILES = 'FILES:FETCH_FILES'
export const FETCHED_FILES = 'FILES:FETCHED_FILES'
export const FETCHED_FILES_WITH_ERROR = 'FILES:FETCHED_FILES_WITH_ERROR'

export const MOVE_FILE = 'FILES:MOVE_FILE'
export const MOVED_FILE = 'FILES:MOVED_FILE'
export const MOVE_FILE_WITH_ERROR = 'FILES:MOVE_FILE_WITH_ERROR'

export const DELETE_FILE = 'FILES:DELETE_FILE'
export const DELETED_FILE = 'FILES:DELETED_FILE'
export const DELETE_FILE_WITH_ERROR = 'FILES:DELETE_FILE_WITH_ERROR'

export const RENAME_FILE = 'FILES:RENAME_FILE'
export const RENAMED_FILE = 'FILES:RENAMED_FILE'
export const RENAME_FILE_WITH_ERROR = 'FILES:RENAME_FILE_WITH_ERROR'

export const CREATE_FILE = 'FILES:CREATE_FILE'
export const CREATED_FILE = 'FILES:CREATED_FILE'
export const CREATE_FILE_WITH_ERROR = 'FILES:CREATED_FILE_WITH_ERROR'

export const FIND_FILE = 'FILES:FIND_FILE'
export const FINDED_FILE = 'FILES:FINDED_FILE'
export const FIND_FILE_WITH_ERROR = 'FILES:FIND_FILE_WITH_ERROR'

export const CLEAR_FILES = 'FILES:CLEAR_FILES'

const actionFactory = type => payload => ({
  type,
  payload
})

export const fetchFiles = actionFactory(FETCH_FILES)
export const fetchedFiles = actionFactory(FETCHED_FILES)
export const fetchedFilesWithError = actionFactory(FETCHED_FILES_WITH_ERROR)

export const moveFile = actionFactory(MOVE_FILE)
export const movedFile = actionFactory(MOVED_FILE)
export const moveFileWithError = actionFactory(MOVE_FILE_WITH_ERROR)

export const deleteFile = actionFactory(DELETE_FILE)
export const deletedFile = actionFactory(DELETED_FILE)
export const deleteFileWithError = actionFactory(DELETE_FILE_WITH_ERROR)

export const renameFile = actionFactory(RENAME_FILE)
export const renamedFile = actionFactory(RENAMED_FILE)
export const renameFileWithError = actionFactory(RENAME_FILE_WITH_ERROR)

export const createFile = actionFactory(CREATE_FILE)
export const createdFile = actionFactory(CREATED_FILE)
export const createFileWithError = actionFactory(CREATE_FILE_WITH_ERROR)

export const findFile = actionFactory(FIND_FILE)
export const findedFile = actionFactory(FINDED_FILE)
export const findFileWithError = actionFactory(FIND_FILE_WITH_ERROR)

export const clearFiles = actionFactory(CLEAR_FILES)
