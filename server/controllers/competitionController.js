/**
 * COMPETITIONCONTROLLER:
 * Controlador de concursos, gestiona las
 * operaciones de creación y activación
 * de concursos.
 */

const Competition = require("../models/Competition");
const Business = require("../models/Business");
const cloudinary = require("../config/cloudinary");
const { existsCatalogoBusiness } = require("../middlewares/exists");
const fs = require("fs-extra");
const registrarConcurso = async (req, res) => {
  const id = req.administrator._id;
  // conmprobar que el administrador cuente con una empresa asociada
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
      err
    });
  })

  const { name, fechaInicio, fechaFin, soles, puntos, tipo } = req.body;

  const reglas = { parametro: soles, puntos };
  const competition = new Competition({
    name,
    fechaInicio,
    business: business._id,
    fechaFin,
    tipo,
    reglas
  });

  const competitions = [
    {
      idCompetition: competition._id,
    },
  ];

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
};

const obtenerConcurso = async (req, res) => {
  const id = req.administrator._id;
  // conmprobar que el administrador cuente con una empresa asociada
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
      err
    });
  })

  if(!business) return res.status(400).json({
    ok: false,
    err: {
      msg: "El Administrador no cuenta con una empresa asociada"
    }
  });

  const competition = await Competition.findOne({ business: business._id }).populate("business").catch((err) => {
      return res.status(400).json({
        ok: false,
        err
      });
    });

  if (!competition) return res.status(400).json({
      ok: false,
      err: {
        msg: "El Administrador no cuenta con una empresa asociada",
      }
    });
  const existeCatalogo = await existsCatalogoBusiness(id);
  console.log(existeCatalogo);
  if (existeCatalogo) {
    competition.active = true;
    await competition.save();
  }

  res.json({
    ok: true,
    competition,
    msg: "Concurso Actual"
  });
};

const agregarImagenConcurso = async (req, res) => {
  const id = req.administrator._id;

  const business = await Business.findOne({ administrador: id }).catch(
    (err) => {
      return res.status(400).json({
        ok: false,
        err
      });
    });

  if (!business) return res.status(400).json({
    ok: false,
    err: {
      msg: "El empresa no existe",
    },
  });

  const competition = await Competition.findOne({ business: business._id }).populate("business").catch((err) => {
    return res.status(400).json({
      ok: false,
      err
    });
  });

  if (!competition) return res.status(400).json({
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

const modificarConcurso = async (req, res) => {
  const id = req.administrator._id;
  const { soles,puntos } = req.body;
  const reglas = { parametro : soles,puntos };
  const data = {
    ...req.body,
    reglas,
  };

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
        msg: "El administrator no tiene relación con la empresa",
      },
    });

  const competition = await Competition.findOneAndUpdate(
    { business: business._id },
    data,
    { new: true, runValidators: true }
  )
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
        msg: "El concurso no se encuntra registrado",
      },
    });

  res.json({
    ok: true,
    competition,
    msg: "Concurso actualizado",
  });
};

const activarConcurso = async (req, res) => {
  const id = req.params.id;
  const competition = await Competition.findById(id)
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
        msg: "Concurso no se encuentra registrado",
      },
    });

  competition.estado = true;
  await competition.save();

  res.json({
    ok: true,
    competition,
    msg: "Concurso Activado",
  });
};

module.exports = {
  registrarConcurso,
  obtenerConcurso,
  agregarImagenConcurso,
  modificarConcurso,
  activarConcurso,
};
