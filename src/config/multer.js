import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  fileFilter: (req, file, cb) => {
    if(file.mimetype !== "image/png" && file.mimetype !== "image/jpeg"){
      return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", 'Arquivo precisa ser JPG, JPEG ou PNG'));
    }
    cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.resolve(__dirname, "..", "..", "uploads", "images"));
    },
    filename: (req, file, cb) => {
      const uniqueName = `${Date.now()}-${Math.floor(Math.random() * 10000)}${path.extname(file.originalname)}`;
      cb(null, uniqueName);
    },
  })
};
