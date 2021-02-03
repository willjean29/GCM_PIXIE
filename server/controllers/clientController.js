const Administrator = require('../models/Administrator');
const Business = require('../models/Business');
const Client = require('../models/Client');

const obtenerClientesActivos = async(req,res) => {
  const id = req.administrator._id;
  const activos = await clientesActivos(id);
  res.json({
    ok: true,
    clientesActivos: activos
  })
}
const obtenerClientesInactivos = async(req,res) => {
  const id = req.administrator._id;
  const activos = await clientesInactivos(id);
  res.json({
    ok: true,
    clientesInactivos: activos
  })
}

const clientesActivos = async(id) => {
  let clientesActuales = [];
  const business = await Business.findOne({administrador: id});
  const {clientes} = business;
  for (let cliente of clientes) {
    let clienteInfo = await Client.findById(cliente.idCliente).lean();
    if(clienteInfo.estado){
      for (let puntuacion of clienteInfo.puntuacion) {
        if(JSON.stringify(puntuacion.idBusiness) === JSON.stringify(business._id)){
          clienteInfo.puntuacion = puntuacion.puntos;
        }
      }
      clientesActuales.push(clienteInfo);
    }
  }
  return clientesActuales;
}

const clientesInactivos = async(id) => {
  let clientesActuales = [];
  const business = await Business.findOne({administrador: id});
  const {clientes} = business;
  for (let cliente of clientes) {
    let clienteInfo = await Client.findById(cliente.idCliente).lean();
    if(!clienteInfo.estado){
      for (let puntuacion of clienteInfo.puntuacion) {
        if(JSON.stringify(puntuacion.idBusiness) === JSON.stringify(business._id)){
          clienteInfo.puntuacion = puntuacion.puntos;
        }
      }
      clientesActuales.push(clienteInfo);
    }
  }
  return clientesActuales;
}

module.exports = {
  obtenerClientesActivos,
  obtenerClientesInactivos
}