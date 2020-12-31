/**
 * USERCONTROLLER
 * Controlador del Cliente, controla las
 * operaciones de registro, login...
 */

const Client = require("../models/Client");
const Category = require("../models/Category");
const Catalog = require("../models/Catalog");
const Business = require("../models/Business");
const Prize = require("../models/Prize");

const jwt = require("jsonwebtoken");
require("dotenv").config(); //Se leen las variables de entorno

const registrarCliente = async (req, res) => {
  const { dni, email, password, sexo } = req.body;
  // validar si ya existe el cliente
  console.log(req.body);
  let cliente = await Client.findOne({ email: email });

  if (cliente) {
    return res.status(400).json({
      ok: false,
      msg: "El correo ya se encuentra registrado",
    });
  }

  // registrar o activar cuenta
  cliente = await Client.findOne({ dni: dni });

  if (cliente) {
    // activar cuenta / actualizar datos
    cliente.email = email;
    cliente.password = password;
    cliente.sexo = sexo;
    cliente.estado = true;
    await cliente.save();

    return res.json({
      ok: true,
      cliente,
      msg: "Cliente actualizado",
    });
  }

  // registrar nuevo clientes
  cliente = new Client(req.body);
  cliente.estado = true;
  await cliente.save().catch((error) => {
    return res.status(400).json({
      ok: false,
      error,
    });
  });

  let token = jwt.sign(
    {
      user: cliente,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "48h",
    }
  );

  res.json({
    ok: true,
    cliente,
    token,
    msg: "Cliente registrado",
  });
};

const autenticarCliente = async (req, res) => {
  // Verificamos usuario y password en la BD
  let { email, password } = req.body;

  const usuario = await Client.findOne({ email: email });
  // el usuario no se encuentra registrado
  if (!usuario)
    return res.status(400).json({
      ok: false,
      err: {
        msg: "Cliente no registrado",
      },
    });

  if (!usuario.compararPassword(password))
    return res.status(400).json({
      ok: false,
      err: {
        msg: "Usuario o Contraseña incorrecto",
      },
    });
  let token = jwt.sign(
    {
      user: usuario,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "48h",
    }
  );

  res.json({
    ok: true,
    usuario,
    token,
    msg: `Bienvenid@ ${usuario.name}`,
  });
};

module.exports = {
  registrarCliente,
  autenticarCliente,
};
