/*
  COMPETITIONCONTROLLER:
  Controlador de concursos, gestiona las
  operaciones de creación y activación
  de concursos.
*/

const cloudinary = require('../config/cloudinary');
const fs = require('fs-extra');

// Importando modelos
const Competition = require('../models/Competition');
const Business = require('../models/Business');

const registrarConcurso = async(req, res) => {
  const id = req.administrator._id;

  // Comprobamos que el administrador cuente con una empresa asociada
  const business = await Business.findOne({administrador: id}).catch((err) => {
    return res.status(400).json({
      ok: false,
      err
    });
  })

  if(!business) return res.status(400).json({
    ok: false,
    err: {
      msg: "El Administrador no cuenta con una empresa asociada"
    }
  });

  const {name,fechaInicio,fechaFin,soles,puntos,tipo} = req.body;
  const reglas = {
    parametro : soles,puntos
  };
  const competition = new Competition({
    name,
    fechaInicio,
    business: business._id,
    fechaFin,
    tipo,
    reglas
  });
  const competitions = [{
    idCompetition: competition._id
  }];

  await competition.save().catch((err) => {
    return res.status(400).json({
      ok: false,
      err
    });
  });

  business.concursos = competitions;
  await business.save().catch((err) => {
    return res.status(400).json({
      ok: false,
      err
    });
  });

  res.json({
    ok: true,
    competition,
    msg: "Concurso Registrado"
  });
}

const obtenerConcurso = async(req, res) => {
  const id = req.administrator._id;

  // Comprobamos que el administrador cuente con una empresa asociada
  const business = await Business.findOne({administrador: id}).catch((err) => {
    return res.status(400).json({
      ok: false,
      err
    });
  })

  if(!business) return res.status(400).json({
    ok: false,
    err: {
      msg: "El Administrador no cuenta con una empresa asociada"
    }
  });

  const competition = await Competition.findOne({business: business._id}).populate('business').catch((err) => {
    return res.status(400).json({
      ok: false,
      err
    });
  })

  if(!competition) return res.status(400).json({
    ok: false,
    err: {
      msg: "El Administrador no cuenta con una empresa asociada"
    }
  });

  res.json({
    ok: true,
    competition,
    msg: "Concurso Actual"
  })
}

const agregarImagenConcurso = async(req, res) => {
  const id = req.administrator._id;

  const business = await Business.findOne({administrador: id}).catch((err) => {
    return res.status(400).json({
      ok: false,
      err
    });
  });

  if(!business) return res.status(400).json({
    ok: false,
    err: {
      msg: "El empresa no existe"
    }
  });

  const competition = await Competition.findOne({business: business._id}).populate('business').catch((err) => {
    return res.status(400).json({
      ok: false,
      err
    });
  })

  if(!competition) return res.status(400).json({
    ok: false,
    err: {
      msg: "No se ha encontrado ningún concurso"
    }
  });

  if(req.file){
    const result = await cloudinary.v2.uploader.upload(req.file.path);
    competition.image = result.secure_url;
    await fs.unlink(req.file.path);
  }

  try {
    await competition.save();
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
    competition,
    msg: "Imagen Registrada"
  });
}

module.exports = {
  registrarConcurso,
  obtenerConcurso,
  agregarImagenConcurso
}