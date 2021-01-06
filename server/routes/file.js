/**
 * Rutas de la subida de archivos
 */
const express = require('express');
const fileController = require('../controllers/fileController');
const { uploadCSV } = require('../middlewares/uploadFileCSV');
const { verifyTokenAdmin } = require('../middlewares/verifyToken');
const authController = require('../controllers/authController');
const router = express.Router();

router.post('/upload',
  verifyTokenAdmin,
  uploadCSV,
  fileController.registrarArchivo
);

router.get('/all',
  verifyTokenAdmin,
  fileController.obtenerArchivos
);

router.get('/ventas/:id',
  verifyTokenAdmin,
  fileController.obtenerDatosArchivo
);
router.post('/clientes/:id',
  verifyTokenAdmin,
  fileController.cargarDataCliente
);
router.delete('/:id',
  verifyTokenAdmin,
  fileController.eliminarArchivo
);

module.exports = router;