const Competition = require('../models/Competition');
const Business = require('../models/Business');

const registrarConcurso = async(req,res) => {
  const id = req.administrator._id;
  // conmprobar que el administrador cuente con una empresa asociada
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

  const reglas = {parametro : soles,puntos}
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
  }]

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

module.exports = {
  registrarConcurso
}