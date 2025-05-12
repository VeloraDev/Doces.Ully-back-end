import { MulterError } from "multer";

function multerErrorhandler(error, req, res, next) {
  if(error instanceof MulterError){
    return res.status(400).json({ error: error.field });
  }
  next();
};

export default multerErrorhandler;
