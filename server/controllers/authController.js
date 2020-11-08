/*
  AUTHCONTROLLER:
  Controlador de autentificación, controla el
  inicio de sesión y validación de datos.
*/

// Importando modelos
const Administrator = require('../models/Administrator');

const jwt = require('jsonwebtoken');

require('dotenv').config();

// Para verificar si el administrador esta autenticado
const adminsitradorAutenticado = (req, res, next) => {
  //let token = req.get('token');
  let token = req.headers['access-token'];

  jwt.verify(token, process.env.SEED_JWT, (err, decoded) => {
    if (err) {
      // Pruebas en Rest API 
      return res.status(401).json({
        ok: false,
        err: {
          msg: "Token no valido"
        }
      })
    }
    req.administrator = decoded.administrator;
    next();
  })
}

module.exports = {
  adminsitradorAutenticado
}