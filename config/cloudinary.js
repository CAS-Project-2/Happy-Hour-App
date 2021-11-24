const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

const cloudinaryCloudStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    allowed_formats: ["svg", "png", "jpg"],
    folder: "cloudinary-test",
  },
});

module.exports = cloudinaryCloudStorage;