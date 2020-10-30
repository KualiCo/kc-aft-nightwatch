const AWS = require('aws-sdk')
const fs = require('fs')

const S3 = new AWS.S3({
  region: 'us-west-2'
})

const Bucket = 'res-pdf-dev'

const saveToS3 = (sourcePath, destinationPath) => {
  const sourceStream = fs.createReadStream(sourcePath)
  return S3.putObject({
    Bucket,
    Key: destinationPath,
    Body: sourceStream,
    ACL: 'public-read'
  }).promise()
}

const getFromS3 = (sourcePath, destinationPath) =>
  new Promise(resolve => {
    const destinationStream = fs.createWriteStream(destinationPath)
    let error = null
    const s3Stream = S3.getObject({
      Bucket,
      Key: sourcePath
    }).createReadStream()
    s3Stream.on('error', err => {
      error = err
      resolve(false)
    })
    s3Stream.pipe(destinationStream)
      .on('error', err => {
        error = err
        resolve(false)
      })
      .on('close', () => {
        if (!error) resolve(true)
      })
  })

const deleteFromS3 = path => S3.deleteObject({
  Bucket,
  Key: path
}).promise()



module.exports = {
  saveToS3, getFromS3, deleteFromS3
}