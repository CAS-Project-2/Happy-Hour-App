const multer = require("multer")

const cloudinaryCloudStorage = require("../config/cloudinary")

module.exports = multer({storage: cloudinaryCloudStorage})