/*
  USERCONTROLLER:
  Controlador de usuarios, controlas las
  operaciones de registro y modificación
  de usuarios.
*/

// Importando librerías
const cloudinary = require('../config/cloudinary');
const fs = require('fs-extra');

// Importando modelos
const Client = require('../models/Client');

const registrarCliente = async(req, res) => {
  const {dni,email,password,sexo} = req.body;

  // Validamos si el cliente ya existe
  console.log(req.body);
  let cliente = await Client.findOne({email: email});
  
  if(cliente){
    return res.status(400).json({
      ok: false,
      msg: "El correo ya se encuentra registrado"
    });
  }
  
  // Registramos o activamos cuenta
  cliente = await Client.findOne({dni: dni});
    
  if(cliente){
    // Activamos cuenta / Actualizamos datos
    cliente.email = email;
    cliente.password = password;
    cliente.sexo = sexo;
    cliente.estado = true;
    await cliente.save();
  
    return res.json({
      ok: true,
      cliente,
      msg: "Cliente actualizado"
    })
  }
  
  // Registramos nuevo cliente
  cliente = new Client(req.body);
  cliente.estado = true;

  await cliente.save().catch((error) => {
    return res.status(400).json({
      ok: false,
      error
    });
  });
  
  res.json({
    ok: true,
    cliente,
    msg: "Cliente registrado"
  })
}

const actualizarCliente = async(req, res) => {
    const id = req.client._id;
    const data = req.body;
    let cliente;
  
    // Buscamos el cliente por su identificados y actualizamos
    try {
      cliente = await Client.findByIdAndUpdate(
        id,
        data,
        {new: true, runValidators: true}
      );
    } catch (err) {
        return res.status(500).json({
          ok: false,
          err
        })
    }
  
    if (!cliente)
      return res.status(400).json({
        ok: false,
        err: {
          msg: "El cliente no se encuentra registrado",
        },
      });
  
    res.json({
      ok: true,
      cliente,
      msg: "Cliente Actualizado",
    });
  };

module.exports = {
  registrarCliente,
  actualizarCliente
}

