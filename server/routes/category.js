const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/categoryController');
const { verifyTokenAdmin } = require('../middlewares/verifyToken');

router.post('/',
  // verifyTokenAdmin,
  categoryController.registrarCategoria
);
router.get('/',
  verifyTokenAdmin,
  categoryController.obtenerCategorias
);

module.exports = router;