const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../configs/cloudinary");

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "assignment-submissions",
        resource_type: "raw",
        allowed_formats: ["pdf", "zip", "doc", "docx", "txt"]
    }
});

module.exports = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});
