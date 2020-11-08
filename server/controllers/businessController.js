/*
  BUSINESSCONTROLLER:
  Controlador de empresa, controlas las
  operaciones de registro y modificación
  de información de la empresa.
*/

const axios = require('axios');
const cloudinary = require('../config/cloudinary');
const fs = require('fs-extra');

// Importando modelos
const Business = require('../models/Business');
const Administrator = require('../models/Administrator');

// Importando middlewares
const { 
  existsCompetitionSimple, 
  existsCatalogoBusiness 
} = require('../middlewares/exists');

require('dotenv').config();

const validarRUC = async(req,res) => {
  const {ruc} = req.body;
  const url = `${process.env.LINK_API_RUC}/${ruc}?token=${process.env.API_KEY}`;
  console.log(url);

  try {
    const response = await axios.get(url);
    return res.json({
      ok: true,
      business: response.data
    });
  } catch (error) {
    console.log("Error 404");
    return res.status(404).json({
      ok: false,
      err: {
        msg: "El RUC ingresado no existe"
      }
    });
  }
}

const registrarEmpresa = async(req,res) => {
  //console.log(req.user);
  const rucBusiness = req.body.ruc;

  const administrator = await Administrator.findById(req.body.administrador).catch((err) => {
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

  // Validamos que la empresa sea única
  let business = await Business.findOne({ruc: rucBusiness}).catch((err) => {
    return res.status(400).json({
      ok: false,
      err
    });
  });

  if(business) return res.status(400).json({
    ok: false,
    err: {
      msg: "La empresa ya se encuentra registrada"
    }
  });

  // Se valida y se crea una nueva
  const {administrador,ruc,nombreComercial,razonSocial,tipo,estado,direccion,
    departamento,provincia,distrito,web,facebook,red} = req.body;
  const redes = {web,facebook,red};

  business = new Business({
    administrador,//: req.user._id,
    ruc,
    nombreComercial,
    razonSocial,
    tipo,
    estado,
    direccion,
    departamento,
    provincia,
    distrito,
    redes
  });

  try {
    await business.save()
  } catch (err) {
    return res.status(400).json({
      ok: false,
      err
    });
  }

  // Actualizamos el estado del administrador
  administrator.estado = true;
  try {
    await administrator.save();
  } catch (error) {
    return res.status(400).json({
      ok: false,
      err
    });
  }

  res.json({
    ok: true,
    business
  });
}

module.exports = {
  validarRUC,
  registrarEmpresa
}