const express = require('express');
const clientController = require('../controllers/clientController');
const {verifyTokenAdmin} = require('../middlewares/verifyToken');
const router = express.Router();

router.get('/activos',
  verifyTokenAdmin,
  clientController.obtenerClientesActivos
);
router.get('/inactivos',
  verifyTokenAdmin,
  clientController.obtenerClientesInactivos
);

module.exports = router;