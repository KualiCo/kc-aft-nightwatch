const fs = require('fs')

const findMatching = path => {
  const pathParts = path.split('/')
  const filePattern = pathParts.pop()
  const dir = pathParts.join('/')
  try {
    const files = fs.readdirSync(dir)
    return files.filter(f => f.match(filePattern)).map(f => `${dir}/${f}`)
  } catch (e) {
    return []
  }
}

const checkFileExists = (path, timeLeft = 30000) => {
  const delay = 100
  return new Promise((resolve, reject) => {
    if (timeLeft < 0) {
      return reject(new Error(`File ${path} not found`))
    }

    const matchingFiles = findMatching(path)
    if (matchingFiles.length) {
      return resolve(matchingFiles[0])
    }

    setTimeout(() => {
      checkFileExists(path, timeLeft - delay).then(resolve, reject)
    }, delay)
  })
}

const deleteFile = (path, failOnNotExists = false) => {
  const files = findMatching(path)
  return Promise.all(files.map(file => 
    new Promise((resolve, reject) => {
      fs.unlink(file, err => {
        if (err && failOnNotExists) reject(`Unable to delete ${file}`)
        resolve(true)
      })
    })
  ))
}

module.exports = {
  checkFileExists, deleteFile
}