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

router.put('/',
  verifyTokenAdmin,
  competitionController.modificarConcurso
);

router.post('/active/:id',
  verifyTokenAdmin,
  competitionController.activarConcurso
);
module.exports = router;