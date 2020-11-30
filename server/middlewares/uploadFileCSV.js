/**
 * Procesa el archivo para que sea subido y luego sea accesible en la función principal
 * Guia: Documentación de multer 
 */
const multer = require('multer'); //multer da el filtro del tamaño para que después se pueda acceder desde otro lado
const path = require('path');
const shortId = require('shortid');
let dir = "";

// Valida la subida del archivo (template)
const uploadCSV = (req, res, next) => {
  dir = req.headers.dir;
  console.log(dir)

  upload(req, res, function (err) { //cb
    if (err) {
      if (err instanceof multer.MulterError) {
        if (err.code == "LIMIT_FILE_SIZE") {
          return res.status(500).json({
            ok: false,
            err: {
              msg: "El archivo es muy pesado : Peso max 500Kb"
            }
          });
        } else {
          return res.status(500).json({
            ok: false,
            err: {
              msg: err.message
            }
          });
        }
      } else {
        return res.status(500).json({
          ok: false,
          err: {
            msg: err
          }
        });
      }
    } else { //cuando no hay errores pasa a la siguiente función o al siguiente middlewares si es que existe
      //console.log("llego");
      return next();
    }
  });
}

//Configuración a tomar en cuenta cuando se sube el archivo
const upload = multer({
  limits: {fieldSize: 500000},
  storage: fileStorage = multer.memoryStorage({
    destination: (req,file,cb) => {
      console.log("procesando csv");
      cb(null,path.join(__dirname,`../public/uploads`))
    },
    filename: (req,file,cb) => {
      cb(null,shortId.generate()+path.extname(file.originalname));
    }
  }),

  fileFilter: (req, file, cb) => {
    console.log(file)
    const filetypes = /csv|vnd.ms-excel|txt|doc/;
    const mimeType = filetypes.test(file.mimetype); //tipo del archivo
    const extname = filetypes.test(path.extname(file.originalname)); //nombre de la extensión del archivo
    if (mimeType && extname) {
      return cb(null, true);
    }
    cb('Error: El archivo debe ser un documento valido');
  }
}).single('csv');

module.exports = {
  uploadCSV
}