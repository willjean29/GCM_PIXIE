const Prize = require('../models/Prize');
const Business = require('../models/Business');
const Catalog = require('../models/Catalog');


const obtenerPremios = async(req,res) => {
  const id = req.administrator._id;
  const business = await Business.findOne({administrador: id});
  if(!business) {
    return res.status(400).json({
      ok: false,
      err: {
        msg: "El administrador no tiene una empresa asociada"
      }
    })
  }
  const catalogo = await Catalog.findOne({business: business._id});
  if(!catalogo) {
    return res.status(400).json({
      ok: false,
      err: {
        msg: "El administrador no tiene premios registrados"
      }
    })
  }

  const premios = await Prize.find({catalog : catalogo._id}).populate('category');
  if(!premios) {
    return res.status(400).json({
      ok: false,
      err: {
        msg: "El administrador no tiene premios registrados"
      }
    })
  }

  res.json({
    ok: true,
    premios
  })
}

module.exports = {
  obtenerPremios
}