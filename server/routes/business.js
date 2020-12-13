/*
  Rutas de la empresa.
*/

// Importando librerías
const express = require('express');
const router = express.Router();

// Importando controladores
const businessController = require('../controllers/businessController');
const authController = require('../controllers/authController');

const { verifyTokenAdmin } = require('../middlewares/verifyToken');
const { uploadImage } = require('../middlewares/uploadImage');

// Para obtener empresa actual
router.get('/',
  verifyTokenAdmin,
  businessController.obtenerEmpresa
);

// Para validar RUC
router.post('/verificar-ruc',
  verifyTokenAdmin,
  businessController.validarRUC
);

// Para registar empresa
router.post('/registrar',
  verifyTokenAdmin,
  businessController.registrarEmpresa
);

// Para actualizar empresa
router.put('/',
  verifyTokenAdmin,
  businessController.actualizarEmpresa
);

// Para agregar/actualizar avatar de la empresa
router.put('/avatar',
  verifyTokenAdmin,
  uploadImage,
  businessController.agregarAvatarEmpresa
);

module.exports = router;