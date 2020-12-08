/*
  COMPETITIONCONTROLLER:
  Controlador de concursos, gestiona las
  operaciones de creación y activación
  de concursos.
*/

//Importando librerías
const cloudinary = require("../config/cloudinary");
const fs = require("fs-extra");

// Importando modelos
const Competition = require("../models/Competition");
const Business = require("../models/Business");
const Administrator = require("../models/Administrator");

const registrarConcurso = async (req, res) => {
  const id = req.administrator._id;
  
  // Comprobamos que el administrador cuente con una empresa asociada
  const business = await Business.findOne({ administrador: id }).catch(
    (err) => {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
  );

  if (!business)
    return res.status(400).json({
      ok: false,
      err: {
        msg: "El Administrador no cuenta con una empresa asociada",
      },
    });

  const { name, fechaInicio, fechaFin, soles, puntos, tipo } = req.body;
  const reglas = {
    parametro: soles,
    puntos,
  };
  const competition = new Competition({
    name,
    fechaInicio,
    business: business._id,
    fechaFin,
    tipo,
    reglas,
  });
  const competitions = [
    {
      idCompetition: competition._id,
    },
  ];

  await competition.save().catch((err) => {
    return res.status(400).json({
      ok: false,
      err,
    });
  });

  business.concursos = competitions;
  await business.save().catch((err) => {
    return res.status(400).json({
      ok: false,
      err,
    });
  });

  res.json({
    ok: true,
    competition,
    msg: "Concurso Registrado",
  });
};

const obtenerConcurso = async (req, res) => {
  const id = req.administrator._id;

  // Comprobamos que el administrador cuente con una empresa asociada
  const business = await Business.findOne({ administrador: id }).catch(
    (err) => {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
  );

  if (!business)
    return res.status(400).json({
      ok: false,
      err: {
        msg: "El Administrador no cuenta con una empresa asociada",
      },
    });

  const competition = await Competition.findOne({ business: business._id })
    .populate("business")
    .catch((err) => {
      return res.status(400).json({
        ok: false,
        err,
      });
    });

  if (!competition)
    return res.status(400).json({
      ok: false,
      err: {
        msg: "El Administrador no cuenta con una empresa asociada",
      },
    });

  res.json({
    ok: true,
    competition,
    msg: "Concurso Actual",
  });
};

const agregarImagenConcurso = async (req, res) => {
  const id = req.administrator._id;

  const business = await Business.findOne({ administrador: id }).catch(
    (err) => {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
  );

  if (!business)
    return res.status(400).json({
      ok: false,
      err: {
        msg: "El empresa no existe",
      },
    });

  const competition = await Competition.findOne({ business: business._id })
    .populate("business")
    .catch((err) => {
      return res.status(400).json({
        ok: false,
        err,
      });
    });

  if (!competition)
    return res.status(400).json({
      ok: false,
      err: {
        msg: "No se ha encontrado ningún concurso",
      },
    });

  if (req.file) {
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
        msg: "No se pudo guardar la imagen",
      },
    });
  }

  res.json({
    ok: true,
    competition,
    msg: "Imagen Registrada",
  });
};

const modificarCompetition = async (req, res) => {
  const id = req.administrator._id;
  const { soles, puntos } = req.body;
  const reglas = { parametro: soles, puntos };
  const data = {
    ...req.body,
    reglas,
  };
  const administrator = await Administrator.findById(id).catch((err) => {
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

  const business = await Business.findOne({
    administrador: administrator._id,
  }).catch((err) => {
    return res.status(400).json({
      ok: false,
      err,
    });
  });

  if (!business)
    return res.status(400).json({
      ok: false,
      err: {
        msg: "El administrator no tiene relación con la empresa",
      },
    });

  const competition = await Competition.findOneAndUpdate(
    { business: business._id },
    data,
    { new: true, runValidators: true }
  ).catch((err) => {
    return res.status(400).json({
      ok: false,
      err,
    });
  });

  if (!competition)
    return res.status(400).json({
      ok: false,
      err: {
        msg: "El concurso no se encuntra registrado",
      },
    });

  res.json({
    ok: true,
    competition,
  });
};

module.exports = {
  registrarConcurso,
  obtenerConcurso,
  agregarImagenConcurso,
  modificarCompetition,
};
