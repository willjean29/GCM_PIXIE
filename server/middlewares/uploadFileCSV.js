/*
  Procesa el archivo para ser subido y luego
  estar accesible en la función principal.
  Guia: Documentación de multer.
*/

const multer = require('multer'); // Da el filtro del tamaño para que después se pueda acceder desde otro lado
const path = require('path');

let dir = "";

// Validamos la subida del archivo (template)
const uploadCSV = (req, res, next) => {
  dir = req.headers.dir;
  console.log(dir)

  upload(req, res, function(err) {
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
    } else { 
      // Cuando no hay errores pasa a la siguiente función 
      // o al siguiente middleware, si es que existe
      return next();
    }
  });
}

// Configuración a tomar en cuenta cuando se suba el archivo
const upload = multer({
  limits: { fieldSize: 500000 },

  fileFilter: (req, file, cb) => {
    console.log(file)
    const filetypes = /csv|vnd.ms-excel|txt|doc/;
    const mimeType = filetypes.test(file.mimetype); // Tipo del archivo
    const extname = filetypes.test(path.extname(file.originalname)); // Nombre de la extensión del archivo
    if (mimeType && extname) {
      return cb(null, true);
    }
    cb('Error: El archivo debe ser un documento valido');
  }
}).single('csv');

module.exports = {
    uploadCSV
}