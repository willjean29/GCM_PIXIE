/*
  Validación de la subida de imágenes.
*/

const multer = require('multer');
const path = require('path');
const shortId = require('shortid');

const uploadImage = (req, res, next) => {
  upload(req, res, function(err){
    if(err){
      if(err instanceof multer.MulterError){
        if(err.code == "LIMIT_FILE_SIZE"){
          return res.status(500).json({
            ok: false,
            err: {
              msg: "El archivo es muy pesado: Peso max 500kb"
            }
          })
        } else {
          return res.status(500).json({
            ok: false,
            err: {
              msg: err.message
            }
          })
        }
      } else {
        return res.status(500).json({
          ok: false,
          err: {
            msg: err
          }
        })
      }
    } else {
      next();
    }
  })
}

const upload = multer({
  limits: {fieldSize: 500000},
  storage: fileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname,'../uploads/img'));
    },
    filename: (req, file, cb) => {
      cb(null,shortId.generate() + path.extname(file.originalname));
    }
  }),
  fileFilter: (req, file, cb) => {
    const filesTypes = /jpeg|jpg|png/;
    const mimeType = filesTypes.test(file.mimetype);
    const extname = filesTypes.test(path.extname(file.originalname));
    if(mimeType && extname){
      return cb(null, true);
    }
    cb('El archivo debe ser una imagen válida')
  }
}).single('image');

module.exports = {
  uploadImage
};