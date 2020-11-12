/*
  AUTHCONTROLLER:
  Controlador de autentificación, controla el
  inicio de sesión y validación de datos.
*/

const axios = require('axios');
const jwt = require('jsonwebtoken');

// Importando modelos
const Administrator = require('../models/Administrator');
const WebMaster = require('../models/WebMaster');

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

      // Redireccionar en el sistema
      // return res.redirect('/admin/login'):
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
const autenticarAdministrador = async (req, res) => {

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
  }, process.env.JWT_SECRET, {
    expiresIn: '48h'
  });

  //= res.sent: respuesta al servidor
  res.json({
    ok: true,
    administrator,
    token
  });

}

const validarTokenAdmin = async (req, res) => {
  let { token } = req.body;
  console.log(token)
  let existeToken = false;
  const webmasters = await WebMaster.find({ role: "webMaster" });
  // console.log(webmasters);

  webmasters.forEach((webmaster) => {
    const verificarToken = webmaster.compararPassword(token);
    // console.log(verificarToken);
    if (verificarToken) {
      existeToken = true;
    } else {
      existeToken = false;
    }
  });

  if (existeToken) {
    res.json({
      ok: true,
      msg: 'WebMaster validado'
    });
  } else {
    res.json({
      ok: false,
      msg: 'Token no valido'
    });
  }
}

const registrarTokenAdmin = async (req, res) => {
  console.log(req.body);
  const master = new WebMaster(req.body);
  try {
    await master.save();
    res.json({
      ok: true,
      mag: 'webMaster registrado'
    })
  } catch (error) {
    res.json({
      ok: false,
      err: error
    })
  }
}

module.exports = {
  adminsitradorAutenticado,
  autenticarAdministrador,
  registrarTokenAdmin,
  validarTokenAdmin,
  verificarDNI
}