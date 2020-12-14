const express = require('express');
const router = express.Router();
const catalogController = require('../controllers/catalogController');
const {uploadImage} = require('../middlewares/uploadMultiImages');
const {verifyTokenAdmin} = require('../middlewares/verifyToken');

router.post('/register',
  verifyTokenAdmin,
  uploadImage,
  catalogController.registrarCatalogoPremios
);

module.exports = router;