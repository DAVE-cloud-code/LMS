const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("../configs/cloudinary");

console.log("Cloudinary upload middleware loaded");
console.log("Cloudinary config:", {
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY ? "SET" : "MISSING",
    api_secret: process.env.CLOUDINARY_SECRET ? "SET" : "MISSING"
});

const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "assignment-submissions",
        resource_type: "raw"
    }
});

const uploadAssignment = multer({
    storage,
    limits: {
        fileSize: 10 * 1024 * 1024
    }
});

module.exports = uploadAssignment;