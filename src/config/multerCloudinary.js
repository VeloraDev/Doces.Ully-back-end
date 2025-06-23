import {v2 as cloudinary} from "cloudinary";
import dotenv from "dotenv";
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "uploads",
    allowed_formats: ["jpg", "jpeg", "png"],
  },
});

const fileFilter = (req, file, cb) => {
  if(!file.mimetype.startsWith("image/")){
    return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", 'Arquivo precisa ser uma imagem'));
  }
  cb(null, true);
};

export default {storage, fileFilter};
