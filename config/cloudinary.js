const multer = require('multer')
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage} = require('multer-storage-cloudinary')

cloudinary.config(
  {
    cloud_name: process.env.CLOUDINARY_NAME, // add details to .env
    api_key: process.env.CLOUDINARY_KEY, // add details to .env
    api_secret: process.env.CLOUDINARY_SECRET // add details to .env
  }
)

const cloudinaryCloudStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    allowed_formats: ['svg', 'png', 'jpg'],
    folder: 'cloudinary-test' // change Folder name on the Cloudinary disk
  }
})

module.exports = cloudinaryCloudStorage  // Multer will be responsible for reading the form and store on the cloud