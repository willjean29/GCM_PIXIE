/**
 * Rutas de la empresa
 */
const express = require('express');
const router = express.Router();
const businessController = require('../controllers/businessController');
const authController = require('../controllers/authController');
const { uploadImage } = require('../middlewares/uploadImage');


// agregar/actualizar avatar de la empresa
router.post('/avatar',
    authController.adminsitradorAutenticado,
    uploadImage,
    businessController.agregarAvatarEmpresa
);

module.exports = router;