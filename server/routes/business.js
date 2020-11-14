/**
 * Rutas de la empresa
 */
const express = require('express');
const router = express.Router();

// Importando controladores
const businessController = require('../controllers/businessController');
const authController = require('../controllers/authController');

const { verifyTokenAdmin } = require('../middlewares/verifyToken');
const { uploadImage } = require('../middlewares/uploadImage');

router.get('/',
  verifyTokenAdmin,
  businessController.obtenerEmpresa
);

// Para validar RUC
router.post('/verificar-ruc',
  // authController.adminsitradorAutenticado,
  verifyTokenAdmin,
  businessController.validarRUC
);

// Para registar empresa
router.post('/registrar',
  verifyTokenAdmin,
  businessController.registrarEmpresa
);

// actualizar empresa
router.put('/',
  verifyTokenAdmin,
  businessController.actualizarEmpresa
);

// agregar/actualizar avatar de la empresa
router.put('/avatar',
  verifyTokenAdmin,
  uploadImage,
  businessController.agregarAvatarEmpresa
);

module.exports = router;