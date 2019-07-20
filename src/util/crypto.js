import config from 'config'

const generateHash = string => {
  const salt = crypto.randomBytes(config.crypto.hash.length).toString('base64')

  if (string) {
    const hash = crypto.pbkdf2Sync(string, salt, 12000, config.crypto.hash.length, 'sha256').toString('base64')
    return {
      salt,
      hash
    }
  }
  return null
}

const compareHashes = (a, b) => {}

export default {
  generateHash,
  compareHashes
}
