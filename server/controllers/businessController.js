/**
 * Controlador de manejo de empresa
 */

 //Importa los modelos, paquetes y módulos
const Business = require('../models/Business');
const Administrator = require('../models/Administrator');
const cloudinary = require('../config/cloudinary');
const fs = require('fs-extra');
require('dotenv').config();

const agregarAvatarEmpresa = async (req, res) => {
  const id = req.user._id;
  const administrator = await Administrator.findById(id).catch((err) => {
    //Respuesta al servidor
    return res.status(400).json({
      ok: false,
      err
    });
  })

  if (!administrator) return res.status(400).json({
    ok: false,
    err: {
      msg: "El administrator no existe o no tiene permisos"
    }
  });

  //Valida que el administrador tenga una empresa asociada
  //Busca
  const business = await Business.findOne({ administrador: administrator._id }).catch((err) => {
    return res.status(400).json({
      ok: false,
      err
    });
  });

//Condición
  if (!business) return res.status(400).json({
    ok: false,
    err: {
      msg: "El administrator no tiene relación con la empresa"
    }
  });

  //Valida que exista un archivo y sube el archivo
  if (req.file) {
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    console.log(result)
    console.log(req.file)
    business.imagen = result.secure_url; //Asigna el link al business y lo guarde en la bd
    await fs.unlink(req.file.path);
  }

  try {
    await business.save(); //guarda todos los cambios del modelo
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
    business
  });
}

module.exports = {
  agregarAvatarEmpresa,
}