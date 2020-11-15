/*
  Rutas de la subida de archivos.
*/

const express = require('express');
const router = express.Router();

// Importando controladores
const fileController = require('../controllers/fileController');
const authController = require('../controllers/authController');

const { uploadCSV } = require('../middlewares/uploadFileCSV');
const { verifyTokenAdmin } = require('../middlewares/verifyToken');

// Para subir el archivo
router.post('/upload',
  verifyTokenAdmin,
  uploadCSV,
  fileController.registrarArchivo
);

// Para obtener datos del archivo
router.get('/ventas/:id',
  verifyTokenAdmin,
  fileController.obtenerDatosArchivo
);

// Para cargar datos de los clientes
router.get('/clientes/:id',
  verifyTokenAdmin,
  fileController.cargarDataCliente
);

// Para eliminar archivos
router.delete('/:id',
  verifyTokenAdmin,
  fileController.eliminarArchivo
);

module.exports = router;