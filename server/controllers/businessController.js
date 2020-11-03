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
const { existsCompetitionSimple, existsCatalogoBusiness } = require('../middlewares/exists');

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
    // console.log(error);
    console.log("error 404");
    return res.status(404).json({
      ok: false,
      err: {
        msg: "El RUC ingresado no existe"
      }
    });
  }
}


module.exports = {
  validarRUC
}