/*
  BUSINESSCONTROLLER:
  Controlador de empresa, controlas las
  operaciones de registro y modificación
  de información de la empresa.
*/

const axios = require("axios");
const cloudinary = require("../config/cloudinary");
const fs = require("fs-extra");

// Importando modelos
const Business = require("../models/Business");
const Administrator = require("../models/Administrator");

// Importando middlewares
const {
  existsCompetitionSimple,
  existsCatalogoBusiness,
} = require("../middlewares/exists");

require("dotenv").config();

const agregarAvatarEmpresa = async (req, res) => {
  const id = req.administrator._id;
  const administrator = await Administrator.findById(id).catch((err) => {
    //Respuesta al servidor
    return res.status(400).json({
      ok: false,
      err,
    });
  });

  if (!administrator)
    return res.status(400).json({
      ok: false,
      err: {
        msg: "El administrator no existe o no tiene permisos",
      },
    });

  //Valida que el administrador tenga una empresa asociada
  //Busca
  const business = await Business.findOne({
    administrador: administrator._id,
  }).catch((err) => {
    return res.status(400).json({
      ok: false,
      err,
    });
  });

  //Condición
  if (!business)
    return res.status(400).json({
      ok: false,
      err: {
        msg: "El administrator no tiene relación con la empresa",
      },
    });

  //Valida que exista un archivo y sube el archivo
  if (req.file) {
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    console.log(result);
    console.log(req.file);
    business.imagen = result.secure_url; //Asigna el link al business y lo guarde en la bd
    await fs.unlink(req.file.path);
  }

  try {
    await business.save(); //guarda todos los cambios del modelo
  } catch (err) {
    return res.status(400).json({
      ok: false,
      err: {
        msg: "No se pudo guardar la imagen",
      },
    });
  }

  res.json({
    ok: true,
    business,
    msg: "Imagen Registrada",
  });
};

const validarRUC = async (req, res) => {
  const { ruc } = req.body;
  const url = `${process.env.LINK_API_RUC}/${ruc}?token=${process.env.API_KEY}`;
  console.log(url);

  try {
    const response = await axios.get(url);
    return res.json({
      ok: true,
      business: response.data,
      msg: "RUC validado",
    });
  } catch (error) {
    console.log("Error 404");
    return res.status(404).json({
      ok: false,
      err: {
        msg: "El RUC ingresado no existe",
      },
    });
  }
};

const registrarEmpresa = async (req, res) => {
  //console.log(req.user);
  const rucBusiness = req.body.ruc;

  const administrator = await Administrator.findById(
    req.administrator._id
  ).catch((err) => {
    return res.status(400).json({
      ok: false,
      err,
    });
  });

  if (!administrator)
    return res.status(400).json({
      ok: false,
      err: {
        msg: "El administrator no existe o no tiene permisos",
      },
    });

  // Validamos que la empresa sea única
  let business = await Business.findOne({ ruc: rucBusiness }).catch((err) => {
    return res.status(400).json({
      ok: false,
      err,
    });
  });

  if (business)
    return res.status(400).json({
      ok: false,
      err: {
        msg: "La empresa ya se encuentra registrada",
      },
    });

  // Se valida y se crea una nueva
  const {
    administrador,
    ruc,
    nombreComercial,
    razonSocial,
    tipo,
    estado,
    direccion,
    departamento,
    provincia,
    distrito,
    web,
    facebook,
    red,
  } = req.body;
  const redes = { web, facebook, red };

  business = new Business({
    administrador: administrator._id, //: req.user._id,
    ruc,
    nombreComercial,
    razonSocial,
    tipo,
    estado,
    direccion,
    departamento,
    provincia,
    distrito,
    redes,
  });

  try {
    await business.save();
  } catch (err) {
    return res.status(400).json({
      ok: false,
      err,
    });
  }

  // Actualizamos el estado del administrador
  administrator.estado = true;
  administrator.empresa = business._id;
  try {
    await administrator.save();
  } catch (error) {
    return res.status(400).json({
      ok: false,
      err,
    });
  }

  res.json({
    ok: true,
    business,
    msg: "Emnpresa Registrada",
  });
};

const obtenerEmpresa = async (req, res) => {
  const idBusiness = req.administrator._id;
  let business;
  try {
    business = await Business.findOne({ administrador: idBusiness });
  } catch (error) {
    return res.status(400).json({
      ok: false,
      err: {
        msg: "Error del servidor",
      },
    });
  }

  if (!business) {
    return res.status(400).json({
      ok: false,
      err: {
        msg: "La empresa no existe",
      },
    });
  }

  res.json({
    ok: true,
    business,
    msg: "Empresa Actual",
  });
};

const actualizarEmpresa = async (req, res) => {
  const id = req.administrator._id;
  const { web, facebook, red } = req.body;
  const redes = { web, facebook, red };
  const data = {
    redes: redes,
  };

  const business = await Business.findOneAndUpdate(
    { administrador: id },
    data,
    { new: true, runValidators: true }
  ).catch((err) => {
    return res.status(400).json({
      ok: false,
      err,
    });
  });

  if (!business)
    return res.status(400).json({
      ok: false,
      err: {
        msg: "La empresa no se encuentra registrada",
      },
    });

  res.json({
    ok: true,
    business,
    msg: "Empresa Actualizada",
  });
};

const actualizarUbicacionEmpresa = async (req, res) => {
  const id = req.administrator._id;
  const { lat, lng } = req.body;
  const data = {
    ubicacion: {coordinates: [lng, lat]},
  };

  const business = await Business.findOneAndUpdate(
    { administrador: id },
    data,
    { new: true, runValidators: true }
  ).catch((err) => {
    return res.status(400).json({
      ok: false,
      err,
    });
  });

  if (!business)
    return res.status(400).json({
      ok: false,
      err: {
        msg: "La empresa no se encuentra registrada",
      },
    });

  res.json({
    ok: true,
    business,
    msg: "Empresa Actualizada",
  });
};

module.exports = {
  agregarAvatarEmpresa,
  actualizarEmpresa,
  validarRUC,
  registrarEmpresa,
  obtenerEmpresa,
  actualizarUbicacionEmpresa,
};
