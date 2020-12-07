const express = require('express');
const router = express.Router();
const {verifyTokenAdmin} = require('../middlewares/verifyToken');
const prizeController = require('../controllers/prizeController');

router.get('/',
  verifyTokenAdmin,
  prizeController.obtenerPremios
);

router.delete('/:id',
  verifyTokenAdmin,
  prizeController.eliminarPremio
);

module.exports = router;