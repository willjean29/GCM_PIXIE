/**
 * Controlador de la sesión
 * Inicio de sesión y su validación
 */

const jwt = require('jsonwebtoken');
const Administrator = require('../models/Administrator');
require('dotenv').config();

// verificar si el administrador esta esta autenticado
const adminsitradorAutenticado = (req, res, next) => {
  let token = req.get('token');

  jwt.verify(token, process.env.SEED_JWT, (err, decoded) => {
    if (err) {
      // pruebas en Rest API 
      return res.status(401).json({
        ok: false,
        err: {
          msg: "'Token no valido"
        }
      })

      // Redireccionar en el sistema
      // return res.redirect('/admin/login'):
    }

    req.administrator = decoded.administrator;
    next();
  })
}

const autenticarAdministrador2 = async (req, res) => {

  // verificar usuario y password en la DB
  let { email, password } = req.body;
  console.log(req.body)
  const administrator = await Administrator.findOne({ email: email }).catch((err) => {
    return res.status(500).json({
      ok: false,
      err
    })
  });

  if (!administrator) return res.status(400).json({
    ok: false,
    err: {
      msg: "(Usuario) o Contraseña invalidos"
    }
  });

  if (!administrator.compararPassword(password)) return res.status(400).json({
    ok: false,
    err: {
      msg: "Usuario o (Contraseña) invalidos"
    }
  })

  let token = jwt.sign({
    administrator: administrator
  }, process.env.SEED_JWT, {
    expiresIn: '48h'
  });

  res.json({
    ok: true,
    administrator,
    token
  });

}

module.exports = {
  adminsitradorAutenticado,
}