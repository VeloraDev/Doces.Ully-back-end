import { MulterError } from "multer";

function multerErrorhandler(error, req, res, next) {
  if(error instanceof MulterError){
    return res.status(400).json({ errors: [error.field] });
  }
  next(error);
};

export default multerErrorhandler;
