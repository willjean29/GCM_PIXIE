const express = require('express');
const router = express.Router();
const competitionController = require('../controllers/competitionController');
const {verifyTokenAdmin} = require('../middlewares/verifyToken');

router.post('/register',
  verifyTokenAdmin,
  competitionController.registrarConcurso
);

module.exports = router;