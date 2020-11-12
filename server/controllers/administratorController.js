/*
  ADMINISTRATORCONTROLLER:
  Controlador de administrador, controlas las
  operaciones de registro, modificación y búsqueda
  de datos del administrador.
*/

const jwt = require('jsonwebtoken');
const cloudinary = require('../config/cloudinary');
const fs = require('fs-extra');

// Importando modelos
const Administrator = require('../models/Administrator');
const Business = require('../models/Business');
const Competition = require('../models/Competition');
const File = require('../models/File');

// Importando middlewares
const { 
  existsCompetitionSimple, 
  existsCatalogoBusiness 
} = require('../middlewares/exists');

const agregarAdministrador = async(req,res) => {
  const data = req.body;
  const {dni,email} = req.body;

  // Validamos que no exista alguien registrado con el mismo DNI
  let admin = await Administrator.findOne({dni: dni});
  if(admin){
    return res.status(400).json({
      ok: false,
      msg: "El DNI ya se encuentra registrado"
    });
  }

  // Validamos que no exista alguien registrado con el mismo correo
  admin = await Administrator.findOne({email: email});
  if(admin) {
    return res.status(400).json({
      ok: false,
      msg: "El correo ya se encuentra registrado"
    });
  }

  // Registramos un nuevo administrador
  const administrator = new Administrator(data);
  await administrator.save().catch((error) => {
    return res.status(400).json({
      ok: false,
      error
    });
  });

  // const token = jwt.sign({id: administrator._id}, process.env.JWT_SECRET);

  res.json({
    ok: true,
    administrator,
    // token,
    msg: "Administrador registrado con exito"
  });
}

const obtenerAdministratorID = async(req,res) => {
  let id = req.params.id;

  const administrator = await Administrator.findById(id).catch((err) => {
    return res.status(401).status({
      ok: false,
      err
    });
  });

  if(!administrator) return res.status(400).json({
    ok: false,
    err: {
      msg: "El administrador no existe"
    }
  });

  res.json({
    ok: true,
    administrator
  });
}

const obtenerAdministradores = async(req,res) => {
    const admins = await Administrator.find().catch((err) => {
        return res.status(401).status({
          ok: false,
          err
        });
      });

    res.json({
      admins
    })
}

module.exports = {
  agregarAdministrador,
  obtenerAdministratorID,
  obtenerAdministradores
}