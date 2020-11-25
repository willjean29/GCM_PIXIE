const express = require('express');
const router = express.Router();
const competitionController = require('../controllers/competitionController');
const {verifyTokenAdmin} = require('../middlewares/verifyToken');
const {uploadImage} = require('../middlewares/uploadImage');
router.post('/register',
  verifyTokenAdmin,
  competitionController.registrarConcurso
);

router.get('/',
  verifyTokenAdmin,
  competitionController.obtenerConcurso
);

router.put('/image',
  verifyTokenAdmin,
  uploadImage,
  competitionController.agregarImagenConcurso
);

module.exports = router;