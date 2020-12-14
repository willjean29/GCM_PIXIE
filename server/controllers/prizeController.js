/*
  PRIZECONTROLLER:
  Controlador de precios, permite asignar,
  obtener y eliminar los precios de productos.
*/

// Importando modelos
const Prize = require('../models/Prize');
const Business = require('../models/Business');
const Catalog = require('../models/Catalog');
const Category = require('../models/Category');

const obtenerPremios = async(req, res) => {
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
    return res.json({
      ok: true,
      msg: "El administrador no tiene premios registrados",
      premios: [],
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

const eliminarPremio = async(req, res) => {
  const { id } = req.params;
  
  const prize = await Prize.findByIdAndDelete(id).catch((err) => {
    return res.status(400).json({
      ok: false,
      err
    });
  })

  if(!prize) return res.status(400).json({
    ok: false,
    err: {
      msg: "Premio no registrado"
    }
  });

  res.json({
    ok: true,
    prize,
    msg: "Premio eliminado"
  });
}

const actualizarPremio = async(req, res) => {
  const { id } = req.params;
  const data = req.body;
  console.log(data);

  if(data.category) {
    const category = await Category.findOne({name: data.category});
    data.category = category._id;
  }

  const prize = await Prize.findByIdAndUpdate(id,data,{new: true, runValidators: true}).catch((err) => {
    return res.status(400).json({
      ok: false,
      err
    });
  })

  if(!prize) return res.status(400).json({
    ok: false,
    err: {
      msg: "Premio no registrado"
    }
  });

  res.json({
    ok: true,
    prize,
    msg: "Premio actualizado"
  });
}

module.exports = {
  obtenerPremios,
  eliminarPremio,
  actualizarPremio
}