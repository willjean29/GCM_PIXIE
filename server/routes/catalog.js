const express = require('express');
const router = express.Router();
const catalogController = require('../controllers/catalogController');
// const {} = require('../middlewares/')
const {verifyTokenAdmin} = require('../middlewares/verifyToken');

// router.post('/register',
//   verifyTokenAdmin
// );

module.exports = router;