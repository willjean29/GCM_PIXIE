/*
  ADMINISTRATORCONTROLLER:
  Controlador de empresa, controlas las
  operaciones de registro y modificación
  de información de la empresa.
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
} = require('../middlewares/exists');/*
const {
  premiosTotales, 
  registrosTotales, 
  clientesTotales, 
  concursosActivvos, 
  clientesTop, 
  clientesEstado, 
  productosTop, 
  clientesGeneros
} = require('../utils/statistics');*/

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

  const token = jwt.sign({id: administrator._id}, process.env.JWT_SECRET);

  res.json({
    ok: true,
    administrator,
    token,
    msg: "Administrador registrado con exito"
  });
}

/*
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

const obtenerAdministradorActual = async(req,res) => {
  const administrator = await Administrator.findById(req.administrator._id).catch((err) => {
    return res.status(500).json({
      ok: false,
      err
    });
  });

  if(!administrator) return res.status(400).json({
    ok: false,
    err: {
      msg : "EL administrador no existe"
    }
  });

  res.json({
    ok: true,
    administrator
  });
}

const modificarAdministrador = async(req,res) => {
  const id = req.user._id;
  
  const data = req.body;
  const administrator = await Administrator.findByIdAndUpdate(id,data,{new: true, runValidators: true})
    .catch((err) => {
      return res.status(500).json({
        ok: false,
        err
      });
    })
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

const agregarAvatarAdministrador = async(req,res) => {
  const id = req.user._id;

  const administrator = await Administrator.findById(id).catch((err) => {
    return res.status(400).json({
      ok: false,
      err
    });
  })

  if(!administrator) return res.status(400).json({
    ok: false,
    err: {
      msg: "El administrator no existe o no tiene permisos"
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
    administrator
  });
  // res.redirect('/admin/profile');
}

const obtenerAdministradores = (req,res) => {
  res.json({
    admin : req.administrator
  })
}

const statusGenero = async(req,res) => {
  let generoClientes = await clientesGeneros(req.user._id);
  res.json({
    generoClientes
  })
}

const statusCuenta = async(req,res) => {
  let estadoClientes = await clientesEstado(req.user._id);
  res.json({
    estadoClientes
  })
}

const statusPuntos = async(req,res) => {
  let [infoClientes,puntosClientes] = await clientesTop(req.user._id);
  res.json({
    infoClientes,
    puntosClientes,
  })
}
*/
module.exports = {
  agregarAdministrador
}