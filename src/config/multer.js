import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default {
  fileFilter: (req, file, cb) => {
    if(!(file.mimetype).startsWith("image/")){
      return cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE", 'Arquivo precisa ser uma imagem'));
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
