/*
  Rutas del concurso.
*/

// Importando librerías
const express = require('express');
const router = express.Router();

// Importando controladores
const competitionController = require('../controllers/competitionController');

// Importando middlewares
const {verifyTokenAdmin} = require('../middlewares/verifyToken');
const {uploadImage} = require('../middlewares/uploadImage');

// Para registrar un concurso
router.post('/register',
  verifyTokenAdmin,
  competitionController.registrarConcurso
);

// Para obtener un concurso
router.get('/',
  verifyTokenAdmin,
  competitionController.obtenerConcurso
);

// Para agregar imagen de concurso
router.put('/image',
  verifyTokenAdmin,
  uploadImage,
  competitionController.agregarImagenConcurso
);

// Para modificar parámetros de concurso
router.put('/modify',
  verifyTokenAdmin,
  competitionController.modificarCompetition
);

module.exports = router;