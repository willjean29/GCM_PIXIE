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

router.put('/:id',
  verifyTokenAdmin,
  prizeController.actualizarPremio
);

module.exports = router;