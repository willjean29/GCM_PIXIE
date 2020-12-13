/*
  ADMINISTRATORCONTROLLER:
  Controlador de administrador, controlas las
  operaciones de registro, modificación y búsqueda
  de datos del administrador.
*/

// Importando librerías
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

const agregarAdministrador = async(req, res) => {
  const data = req.body;
  const { dni, email } = req.body;

  // Validamos que no exista alguien registrado con el mismo DNI
  let admin = await Administrator.findOne({dni: dni});
  if(admin){
    return res.status(400).json({
      ok: false,
      err: {
        msg: "El DNI ya se encuentra registrado"
      }
    });
  }

  // Validamos que no exista alguien registrado con el mismo correo
  admin = await Administrator.findOne({email: email});
  if(admin) {
    return res.status(400).json({
      ok: false,
      err: {
        msg: "El correo ya se encuentra registrado"
      }
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

  res.json({
    ok: true,
    administrator,
    msg: "Administrador registrado con exito"
  });
}

const obtenerAdministratorID = async(req, res) => {
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

const obtenerAdministradores = async(req, res) => {
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

const actualizarAdministrador = async(req, res) => {
  const id = req.administrator._id;
  const data = req.body;
  let administrator;

  try {
    administrator = await Administrator.findByIdAndUpdate(id,data,{new: true, runValidators: true}).populate('empresa');
  } catch (err) {
    return res.status(500).json({
      ok: false,
      err
    })
  }

  if(!administrator) return res.status(400).json({
    ok: false,
    err: {
      msg: "El administrador no existe"
    }
  });

  res.json({
    ok: true,
    msg: "Administrador Actualizado",
    administrator
  });
}

const agregarAvatar = async(req, res) => {
  const id = req.administrator._id;
  let administrator;

  // Buscamos al administrador por su número de identificación
  try {
    administrator = await Administrator.findById(id).populate('empresa');
  } catch (err) {
    return res.status(400).json({
      ok: false,
      err
    })
  }

  if(!administrator) return res.status(400).json({
    ok: false,
    err: {
      msg: "El administrador no existe o no tiene permisos"
    }
  });

  if(req.file){
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    administrator.image = result.secure_url;
    await fs.unlink(req.file.path);
  }

  try {
    await administrator.save();
  } catch (err) {
    return res.status(400).json({
      ok: false,
      err: {
        msg: "No se pudo guardar la imagen"
      }
    }); 
  }

  res.json({
    ok: true,
    msg: "Avatar Actualizado",
    administrator
  });
}

module.exports = {
  agregarAdministrador,
  obtenerAdministratorID,
  obtenerAdministradores,
  actualizarAdministrador,
  agregarAvatar
}