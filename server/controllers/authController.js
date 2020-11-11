/*
  AUTHCONTROLLER:
  Controlador de autentificación, controla el
  inicio de sesión y validación de datos.
*/

const axios = require('axios');
const jwt = require('jsonwebtoken');

// Importando modelos
const Administrator = require('../models/Administrator');

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

const verificarDNI = async(req,res) => {
  const {dni} = req.body;
  const url = `${process.env.LINK_API_DNI}/${dni}?token=${process.env.API_KEY}`;
  console.log(url);

  try {
    const response = await axios.get(url);
    return res.json({
      ok: true,
      user : response.data
    });
  } catch (error) {
    console.log("Error 404");
    return res.status(404).json({
      ok: false,
      err: {
        msg: "El DNI ingresado no existe"
      }
    });
  }
}

module.exports = {
  adminsitradorAutenticado,
  verificarDNI
}