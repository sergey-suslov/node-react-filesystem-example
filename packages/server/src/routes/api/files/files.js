import Boom from 'boom'
import Joi from 'joi'
import _ from 'lodash'
import mongoose from 'mongoose'

const fileExistsById = async(fileId, userId) => {
  const isValidId = mongoose.Types.ObjectId.isValid(fileId)
  if (!isValidId) {
    return false
  }
  const file = await mongoose.model('File').findById(fileId)
  if (!file || !file.userId.equals(userId)) {
    return false
  }
  return file
}

const fileExists = async(ctx, next) => {
  const { _id: userId } = ctx.state.user
  const { fileId } = ctx.params
  const exists = await fileExistsById(fileId, userId)
  if (!exists) {
    return ctx.throw(Boom.notFound('Sorry, there is no such file'))
  }
  ctx.state.file = exists
  await next()
}

const getFilesOfDirectoryValidate = async(ctx, next) => {
  const { parentId } = ctx.query
  if (parentId === undefined) return next()
  const isValidId = mongoose.Types.ObjectId.isValid(parentId)
  if (!isValidId) {
    return false
  }
  const file = await ctx.db
    .model('File')
    .findById(parentId)
    .populate('parentId')
  if (!file) {
    return ctx.throw(Boom.notFound('Sorry, there is no such file'))
  }
  ctx.state.file = file
  await next()
}

const getFilesOfDirectory = async ctx => {
  const { parentId, limit, skip } = ctx.query
  const { _id: userId } = ctx.state.user
  const files = await ctx.db
    .model('File')
    .find(
      {
        parentId,
        userId
      },
      null,
      { limit: +limit, skip: +skip }
    )
    .populate('parentId')
    .sort('-date')
  let file
  let parents
  if (ctx.state.file) {
    file = ctx.state.file
    parents = await file.getParents()
    ctx.log.info('Parents', parents)
  }
  ctx.body = {
    ...(file ? file.toJSON() : {}),
    files,
    parents
  }
}

const getFile = async ctx => {
  const {
    params: { fileId }
  } = ctx
  const file = await ctx.db.model('File').findById(fileId)
  const parents = await file.getParents()
  ctx.body = {
    ...file.toObject(),
    parents
  }
}

const moveTo = async ctx => {
  const {
    params: { fileId, destenationDirectoryId }
  } = ctx
  const file = await ctx.db.model('File').findById(fileId)
  await file.move(destenationDirectoryId)
  ctx.body = ''
}

const rename = async ctx => {
  const {
    params: { fileId }
  } = ctx
  const {
    body: { name }
  } = ctx.request
  const file = await ctx.db.model('File').findById(fileId)
  await file.rename(name)
  ctx.body = ''
}

const destenationDirectoryExists = async(ctx, next) => {
  const { _id: userId } = ctx.state.user
  const { destenationDirectoryId } = ctx.params
  if (destenationDirectoryId === 'null') {
    return next()
  }
  const exists = await fileExistsById(destenationDirectoryId, userId)
  if (!exists || !exists.isDirectory()) {
    return ctx.throw(Boom.notFound('Sorry, there is no such destenation directory'))
  }
  await next()
}

const parentDirectoryExists = async(ctx, next) => {
  const { _id: userId } = ctx.state.user
  const { parentDirectoryId } = ctx.request.body
  if (parentDirectoryId) {
    const exists = await fileExistsById(parentDirectoryId, userId)
    if (!exists || !exists.isDirectory()) {
      return ctx.throw(Boom.notFound('Sorry, there is no such parent directory'))
    }
  }
  await next()
}

const validateMaxDepthOf = depth => async(ctx, next) => {
  const { _id: userId } = ctx.state.user
  const { parentDirectoryId } = ctx.request.body
  if (parentDirectoryId) {
    const exists = await fileExistsById(parentDirectoryId, userId)
    const parents = await exists.getParents()
    if (parents.length + 1 >= depth) {
      return ctx.throw(Boom.conflict('Sorry, maximum nesting exceeded'))
    }
  }
  await next()
}

const validateMaxChildren = count => async(ctx, next) => {
  const { _id: userId } = ctx.state.user
  const { parentDirectoryId } = ctx.request.body
  if (parentDirectoryId) {
    const exists = await fileExistsById(parentDirectoryId, userId)
    const parents = await exists.getChildren()
    if (parents.length >= count) {
      return ctx.throw(Boom.conflict('Sorry, maximum count of children exceeded'))
    }
  }
  await next()
}

const validateSumDepth = (childKey, parentKey, depth) => async(ctx, next) => {
  const { _id: userId } = ctx.state.user
  const { [parentKey]: parentFileId, [childKey]: childFileId } = ctx.params
  if (parentFileId === 'null' || parentFileId === null) {
    return next()
  }
  const parentFile = await fileExistsById(parentFileId, userId)
  const childFile = await fileExistsById(childFileId, userId)
  const parentsOfParent = await parentFile.getParents()
  if (parentsOfParent.length + 1 >= depth) {
    return ctx.throw(Boom.conflict('Sorry, maximum nesting exceeded'))
  }
  const childHeight = await childFile.getHeight()
  if (childHeight.length + parentsOfParent.length >= depth) {
    return ctx.throw(Boom.conflict('Sorry, maximum nesting exceeded'))
  }
  await next()
}

const validateFileDestenationIsNotFileChild = (fileKey, destenationKey) => async(ctx, next) => {
  const { _id: userId } = ctx.state.user
  const { [destenationKey]: destenationFileId, [fileKey]: fileId } = ctx.params
  if (destenationFileId === 'null' || destenationFileId === null) {
    return next()
  }
  const destenationFile = await fileExistsById(destenationFileId, userId)
  const file = await fileExistsById(fileId, userId)
  const includes = await file.hasChild(destenationFile._id)
  if (includes) {
    return ctx.throw(Boom.conflict('Destenation must not be a child of a moving file'))
  }
  await next()
}

const validateCreateDirectory = async(ctx, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().max(250),
    parentDirectoryId: Joi.string().allow(null)
  })
  if (Joi.validate(_.pick(ctx.request.body, ['name', 'parentDirectoryId']), schema).error !== null) {
    throw Boom.badRequest('Invalid body!')
  }
  await next()
}

const validateRename = async(ctx, next) => {
  const schema = Joi.object().keys({
    name: Joi.string().max(250)
  })
  if (Joi.validate(_.pick(ctx.request.body, ['name']), schema).error !== null) {
    throw Boom.badRequest('Invalid body!')
  }
  await next()
}

const createDirectory = async ctx => {
  const { name, parentDirectoryId } = ctx.request.body
  const { _id: userId } = ctx.state.user
  const directory = await ctx.db.model('File').createDirectory(userId, name, parentDirectoryId)
  ctx.body = directory.toObject()
}

const createProfile = async ctx => {
  const { name, parentDirectoryId } = ctx.request.body
  const { _id: userId } = ctx.state.user
  const profile = await ctx.db.model('File').createProfile(userId, name, parentDirectoryId)
  ctx.body = profile.toObject()
}

const getFilesByName = async ctx => {
  const { name } = ctx.request.query
  const { _id: userId } = ctx.state.user
  const files = await ctx.db.model('File').find().findByName(userId, name)
  ctx.body = {
    files
  }
}

const deleteFile = async ctx => {
  await ctx.state.file.delete()
  ctx.body = ''
}

export default {
  fileExists,
  getFile,
  destenationDirectoryExists,
  validateCreateDirectory,
  parentDirectoryExists,
  validateFileDestenationIsNotFileChild,
  moveTo,
  createDirectory,
  createProfile,
  getFilesOfDirectoryValidate,
  getFilesOfDirectory,
  validateRename,
  validateMaxDepthOf,
  validateMaxChildren,
  rename,
  delete: deleteFile,
  validateSumDepth,
  getFilesByName
}
