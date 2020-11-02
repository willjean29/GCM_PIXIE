/*
  FILECONTROLLER:
  Controlador de template, de
  inicio de sesión y validación de datos.
*/

// Importando modelos
const File = require('../models/File');
const Business = require('../models/Business');
const Administrator = require('../models/Administrator');
const Competition = require('../models/Competition');
const Client = require('../models/Client');

// Importando utilidades
const { leerCSV } = require('../utils/leerCSV');
const { puntosSoles } = require('../utils/points');

// Importando middlewares
const { existsCompetitionSimple, existsCatalogoBusiness } = require('../middlewares/exists');

const registrarArchivo = async(req,res) => {
  let file;
  const id = req.user._id;
  const business = await Business.findOne({administrador: id}).catch((err) => {
    return res.status(400).json({
      ok: false,
      err: {
          msg: "Error en database"
      }
    })
  });

  if(!business) return res.status(400).json({
    ok: false,
    err: {
      msg: "La empresa no se encuentra registrada"
    }
  })

  if(req.file){
    // Crea el archivo en la BD
    file = new File({
      name: req.file.filename,
      type: req.file.mimetype,
      business: business._id
    })
    // Guarda el archivo en la BD
    await file.save();
  }

  res.json({
    ok: true,
    file
  })
}

const obtenerDatosArchivo = async(req,res) => {
  const administrator = await Administrator.findById(req.user._id).lean();
  const existeConcursoSimple = await existsCompetitionSimple(req.user._id);
  const existeCatalogoBusiness = await existsCatalogoBusiness(req.user._id);
  const id = req.params.id;

  const file = await File.findById(id).catch((err) => {
    return res.status(400).json({
      ok: false,
      err
    })
  })

  if(!file) return res.status(400).json({
    ok: false,
    err: {
      msg: "Archivo no registrado"
    }
  })

  const datos = leerCSV(file.name);

  res.send({
    title: "Detalles Archivo",
    admin: administrator,
    existeConcursoSimple,
    existeCatalogoBusiness,
    datos
  })
}

const cargarDataCliente = async (req,res) => {
  const id = req.params.id;

  const file = await File.findById(id).catch((err) => {
    return res.status(400).json({
      ok: false,
      err
    })
  })

  if(!file) return res.status(400).json({
    ok: false,
    err: {
      msg: "Archivo no registrado"
    }
  })

  const datos = leerCSV(file.name);

  const business = await Business.findById(file.business);

  const competition = await Competition.findOne({business: business._id});
  if(!competition){
    return res.status(404).json({
      ok: false,
      err: {
        msg: "No hay concursos activos"
      }
    })
  }
  const { parametro, puntos } = competition.reglas;

  datos.forEach(async(data, index) => {
    // Buscamos cliente
    let client = await Client.findOne({dni: data.DNI});
    // Calculamos los puntos por operación
    let puntosGanados = puntosSoles(parametro, puntos, data.Total_Venta);

    // Si el cliente no está registrado
    if(!client){
      console.log("Cliente nuevo", index)
      client = new Client({
        dni: data.DNI,
        name: data.Nombres,
        lastName: data.Apellidos,
        sexo: data.Sexo
      })
      let puntuacion = {
        idBusiness: business._id,
        puntos: puntosGanados
      }

      client.puntuacion.push(puntuacion);
      await client.save();

    } else {
      let existeCliente = false;
      // Cliente registrado, pero nuevo en la empresa
      // Cliente registrado, parte de la empresa 
      client.puntuacion.forEach((info) => {
        // Actualizamos el puntaje de la empresa actual 
        if(JSON.stringify(info.idBusiness) === JSON.stringify(business._id)){
          existeCliente = true;
          info.puntos += puntosGanados;
        }
      })

      if(!existeCliente){
        let puntuacion = {
          idBusiness: business._id,
          puntos: puntosGanados
        }
        client.puntuacion.push(puntuacion);
      }

      await client.save();
    }
  })

  file.estado = true;
  await file.save();
  await actualizarClientes(business._id);
  res.json({
    ok: true,
    msg: "Puntajes Cargados"
  })
}

const actualizarClientes = async(id) => {
  const business = await Business.findById(id);
  let clientesActuales = [];
  const clients = await Client.find();

  for (let client of clients) {
    let puntuacion = client.puntuacion 
    for (info of puntuacion) {
      if(JSON.stringify(info.idBusiness) === JSON.stringify(business._id)){
        let clientes = {
          idCliente: client._id
        }
        clientesActuales.push(clientes);
      }
    }
  }
  business.clientes = clientesActuales;
  await business.save();
}

const eliminarArchivo = async (req,res) => {
  const {id} = req.params;
  const file = await File.findByIdAndDelete(id).catch((err) => {
    return res.status(400).json({
      ok: false,
      err
    });
  })

  if(!file) return res.status(400).json({
    ok: false,
    err: {
      msg: "Archivo no registrado"
    }
  });

  res.json({
    ok: true,
    file
  });
}

module.exports = {
  registrarArchivo,
  obtenerDatosArchivo,
  cargarDataCliente,
  eliminarArchivo
}