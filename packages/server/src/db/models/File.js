import mongoose from 'mongoose'
import _ from 'lodash'

const schema = new mongoose.Schema({
  name: { type: String, required: true },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: 'File', required: false, default: null },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: false },
  date: { type: Date, default: Date.now }
})

schema.index({ name: 'text' })

schema.statics.createDirectory = async function(userId, name = 'untitled', parentId = null) {
  const directory = await this.create({
    name,
    parentId,
    userId,
    type: 'directory'
  })
  return directory
}

schema.statics.createProfile = async function(userId, name = 'untitled', parentId = null) {
  const profile = await this.create({
    name,
    parentId,
    userId,
    type: 'profile'
  })
  return profile
}

schema.query.findByName = function(userId, name = '') {
  return this.where({ userId,
    // name: new RegExp(name, 'i'),
    $text: { $search: name }
  })
}

schema.methods.isDirectory = function() {
  return this.type === 'directory'
}

schema.methods.getParents = async function() {
  const fileExtended = await this.model('File').aggregate([
    {
      $match: { _id: this._id }
    },
    {
      $graphLookup: {
        from: 'files',
        startWith: '$parentId',
        connectFromField: 'parentId',
        connectToField: '_id',
        as: 'parents'
      }
    }
  ])
  return fileExtended[0] ? fileExtended[0].parents || [] : []
}

schema.methods.getChildren = function() {
  return this.model('File').find({ parentId: this._id })
}

const getChildrenHeight = (directoy, tree) => {
  if (tree[directoy._id] && tree[directoy._id].length) {
    const counts = tree[directoy._id].map(child => getChildrenHeight(child, tree))
    return _.max(counts) + 1
  }
  return 0
}

const groupByParentId = directories => {
  const dirs = {}
  const parents = _.chain(directories)
    .map(child => String(child.parentId))
    .uniq()
    .value()
  parents.forEach(id => dirs[id] = [])
  for (const dir of directories) {
    dirs[dir.parentId].push(dir)
  }
  return dirs
}

schema.methods.getHeight = async function() {
  const fileExtended = await this.model('File').aggregate([
    {
      $match: { _id: this._id }
    },
    {
      $graphLookup: {
        from: 'files',
        startWith: '$_id',
        connectFromField: '_id',
        connectToField: 'parentId',
        as: 'children',
        restrictSearchWithMatch: { type: 'directory' }
      }
    }
  ])
  const fileTree = groupByParentId(fileExtended[0].children)
  const height = getChildrenHeight(fileExtended[0], fileTree)
  return height
}

schema.methods.hasChild = async function(childId) {
  const child = await this.model('File').findById(childId)
  const childParents = await child.getParents()
  return _.some(childParents, c => c._id.equals(this._id))
}

schema.methods.move = async function(destenationDirectoryId) {
  this.parentId = destenationDirectoryId === 'null' ? null : destenationDirectoryId
  await this.save()
}

schema.methods.delete = async function() {
  if (this.type === 'directory') {
    // TODO: implement files deleting
    const directories = await this.model('File').aggregate([{
      $match: { _id: mongoose.Types.ObjectId(this._id) }
    },
    {
      $graphLookup: {
        from: 'files',
        startWith: '$_id',
        connectFromField: '_id',
        connectToField: 'parentId',
        as: 'children',
        restrictSearchWithMatch: { type: 'directory' }
      }
    }])
    console.log('dirs', directories[0].children)
    if (directories[0].children.length > 0) {
      await this.model('File')
        .deleteMany({ $or: directories[0].children.map(child => ({ _id: child._id })) })
    }
  }
  await this.model('File').deleteOne({ _id: this._id })
}

schema.methods.rename = async function(name = '') {
  this.name = name.trim()
  await this.save()
}

const File = mongoose.model('File', schema)
export default File
