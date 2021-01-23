/*
  USERCONTROLLER:
  Controlador de usuarios, controla las operaciones de registro,
  mostrar empresas asociadas, catálogo, filtros de búsqueda, etc.
*/

// Importando librerías
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Importando modelos
const Client = require("../models/Client");
const Category = require("../models/Category");
const Catalog = require("../models/Catalog");
const Business = require("../models/Business");
const Prize = require("../models/Prize");

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
};

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

const autenticarCliente = async(req, res) => {
  // Verificamos usuario y password en la BD
  let { email, password } = req.body;

  const usuario = await Client.findOne({ email: email });
  // Si el usuario no se encuentra registrado
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
  let token = jwt.sign({
    user: usuario,
  },process.env.JWT_SECRET,{
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

const mostrarListadoEmpresas = async(req, res) => {
  // Cargamos las empresas asociadas
  let afiliadas = await actualizarEmpresasAfiliadas(req);
  console.log(afiliadas);

  res.send({
    layout: "user.hbs",
    empresas: afiliadas,
    name: req.user.name,
    Session: true,
  });
};

const actualizarEmpresasAfiliadas = async(req) => {
  let empresas = [];

  for (let puntuacion of req.user.puntuacion) {
    const empresa = await Business.findById(puntuacion.idBusiness);
    const data = {
      id: empresa._id,
      nombre: empresa.razonSocial,
      puntos: puntuacion.puntos,
    };
    empresas.push(data);
  }
  return empresas;
};

const mostrarCatalogoEmpresa = async(req, res) => {
  const categorias = await obtenerCategorias(req.params.id);
  const catalogo = await Catalog.findOne({ business: req.params.id });
  // Premios por pagina
  let premio = 6;
  let paginaActual = req.query.p || 1;
  const filtroPuntos = req.query.puntos || false;
  // Condicionamos la busqueda de premiosTotales
  let premios;
  let premiosTotales;

  if (filtroPuntos) {
    premios = await Prize.find({
      catalog: catalogo._id,
      points: { $gte: 0, $lte: filtroPuntos },
    })
      .skip(premio * paginaActual - premio)
      .limit(premio)
      .sort("points")
      .lean();

    premiosTotales = await Prize.count({
      catalog: catalogo._id,
      points: { $gte: 0, $lte: filtroPuntos },
    });
  } else {
    premios = await Prize.find({ catalog: catalogo._id })
      .skip(premio * paginaActual - premio)
      .limit(premio)
      .sort("points")
      .lean();

    premiosTotales = await Prize.count({ catalog: catalogo._id });
  }

  const paginasTotales = Math.ceil(premiosTotales / premio);
  // Obtenemos los datos de la empresa actual
  // Cargamos las empresas asociadas
  let afiliadas = await actualizarEmpresasAfiliadas(req);
  let empresaActual;

  for (let empresa of afiliadas) {
    if (req.params.id == empresa.id) {
      empresaActual = empresa;
    }
  }

  res.send({
    layout: "user.hbs",
    categorias,
    premios,
    pagination: {
      page: paginaActual, // The current page the user is on
      pageCount: paginasTotales, // The total number of available pages
      parmPuntos: filtroPuntos,
    },
    empresa: empresaActual,
    name: req.user.name,
    Session: true,
    filtroPuntos,
  });
};

const mostrarCategoriaCatalogo = async(req, res) => {
  const categorias = await obtenerCategorias(req.params.id);
  const catalogo = await Catalog.findOne({ business: req.params.id });
  const category = await Category.findOne({ name: req.params.category });
  // Premios por pagina
  let premio = 6;
  let paginaActual = req.query.p || 1;
  const filtroPuntos = req.query.puntos || false;
  // Condicionamos la busqueda de premiosTotales
  let premios;
  let premiosTotales;

  if (filtroPuntos) {
    premios = await Prize.find({
      catalog: catalogo._id,
      category: category._id,
      points: { $gte: 0, $lte: filtroPuntos },
    })
      .skip(premio * paginaActual - premio)
      .limit(premio)
      .sort("points")
      .lean();
    console.log(premios);
    premiosTotales = await Prize.count({
      catalog: catalogo._id,
      category: category._id,
      points: { $gte: 0, $lte: filtroPuntos },
    });
  } else {
    premios = await Prize.find({
      catalog: catalogo._id,
      category: category._id,
    })
      .skip(premio * paginaActual - premio)
      .limit(premio)
      .sort("points")
      .lean();
    console.log(premios);
    premiosTotales = await Prize.count({
      catalog: catalogo._id,
      category: category._id,
    });
  }

  const paginasTotales = Math.ceil(premiosTotales / premio);
  // Obtenemos datos de la empresa actual
  // Cargamos las empresas asociadas
  let afiliadas = await actualizarEmpresasAfiliadas(req);
  let empresaActual;

  for (let empresa of afiliadas) {
    if (req.params.id == empresa.id) {
      empresaActual = empresa;
    }
  }

  res.send({
    layout: "user.hbs",
    categorias,
    premios,
    pagination: {
      page: paginaActual, // The current page the user is on
      pageCount: paginasTotales, // The total number of available pages
      parmPuntos: filtroPuntos,
    },
    empresa: empresaActual,
    name: req.user.name,
    Session: true,
    filtroPuntos,
  });
};

const obtenerCategorias = async(idBusiness) => {
  const catalogo = await Catalog.findOne({ business: idBusiness });
  const premios = await Prize.find({ catalog: catalogo._id });
  let categorias = [];
  let categories = new Set();

  for (let premio of premios) {
    const category = await Category.findById(premio.category);
    categories.add(category.name);
  }

  categories = Array.from(categories).sort();
  for (let category of categories) {
    let data;
    data = {
      name: category,
      empresa: idBusiness,
      catalogo: catalogo._id,
    };
    categorias.push(data);
  }

  return categorias;
};

module.exports = {
  registrarCliente,
  autenticarCliente,
  mostrarListadoEmpresas,
  mostrarCatalogoEmpresa,
  mostrarCategoriaCatalogo,
};
