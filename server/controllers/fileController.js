/*
  FILECONTROLLER:
  Controlador de template, se encarga
  del manejo de archivos.
*/

// Importando modelos
const File = require("../models/File");
const Business = require("../models/Business");
const Administrator = require("../models/Administrator");
const Competition = require("../models/Competition");
const Client = require("../models/Client");
const shortId = require("shortid");
// Importando utilidades
const { leerCSV } = require("../utils/leerCSV");
const { puntosSoles } = require("../utils/points");
const { uploadToS3 } = require("../utils/aws");
// Importando middlewares
const {
  existsCompetitionSimple,
  existsCatalogoBusiness,
} = require("../middlewares/exists");

const registrarArchivo = async (req, res) => {
  let file;
  const id = req.administrator._id;
  const business = await Business.findOne({ administrador: id }).catch(
    (err) => {
      logger.error("Error en database", err);
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
        msg: "La empresa no se encuentra registrada",
      },
    });

  if (req.file) {
    //Crea el archivo eb la BD
    file = new File({
      name: `${shortId.generate()}.csv`,
      type: req.file.mimetype,
      business: business._id,
      key: shortId.generate(),
    });
    console.log(req.file);
    await file.save();

    const { originalname, buffer } = req.file;
    const fileName = originalname.split(".");
    const ext = fileName[fileName.length - 1];

    const fileInfo = {
      name: `${file._id}.${ext}`,
      path: `empresas/${business.id}`,
    };

    const fileSent = await uploadToS3(fileInfo, buffer);

    if (!fileSent.ok) {
      return res.status(400).json({
        ok: false,
        err: {
          msg: "Error al subir el archivo",
        },
      });
    }
    console.log(fileSent);
    file.link = fileSent.data.Location; //es el link que te bota el aws cuando se sube al s3
    await file.save();

    res.json({
      ok: true,
      file,
      msg: "Archivo Registrado",
    });
  }
};

const obtenerArchivos = async (req, res) => {
  let business;
  try {
    business = await Business.findOne({ administrador: req.administrator._id });
  } catch (error) {
    return res.status(500).json({
      ok: false,
      err: {
        msg: "Error del servidor",
      },
    });
  }

  if (!business) {
    return res.status(500).json({
      ok: false,
      err: {
        msg: "La empresa no existe",
      },
    });
  }

  let files = await File.find({ business: business._id });

  if (!files) {
    return res.status(400).json({
      ok: false,
      err: {
        msg: "No existe archivos",
      },
    });
  }

  res.json({
    ok: true,
    msg: "Archivos obtenidos",
    files,
  });
};

const obtenerDatosArchivo = async (req, res) => {
  const administrator = await Administrator.findById(
    req.administrator._id
  ).lean();
  const existeConcursoSimple = await existsCompetitionSimple(
    req.administrator._id
  );
  const existeCatalogoBusiness = await existsCatalogoBusiness(
    req.administrator._id
  );
  const id = req.params.id;

  const file = await File.findById(id).catch((err) => {
    return res.status(400).json({
      ok: false,
      err,
    });
  });

  if (!file)
    return res.status(400).json({
      ok: false,
      err: {
        msg: "Archivo no registrado",
      },
    });

  const datos = leerCSV(file.name);

  res.send({
    title: "Detalles Archivo",
    admin: administrator,
    existeConcursoSimple,
    existeCatalogoBusiness,
    datos,
  });
};

const cargarDataCliente = async (req, res) => {
  const id = req.params.id;

  const file = await File.findById(id).catch((err) => {
    return res.status(400).json({
      ok: false,
      err,
    });
  });

  if (!file)
    return res.status(400).json({
      ok: false,
      err: {
        msg: "Archivo no registrado",
      },
    });

  const datos = leerCSV(file.name);

  const business = await Business.findById(file.business);

  const competition = await Competition.findOne({ business: business._id });

  if (!competition) {
    return res.status(404).json({
      ok: false,
      err: {
        msg: "No hay concursos activos",
      },
    });
  }
  const { parametro, puntos } = competition.reglas;

  datos.forEach(async (data, index) => {
    // Buscamos cliente
    let client = await Client.findOne({ dni: data.DNI });
    // Calculamos los puntos por operación
    let puntosGanados = puntosSoles(parametro, puntos, data.Total_Venta);

    // Si el cliente no está registrado
    if (!client) {
      console.log("Cliente nuevo", index);
      client = new Client({
        dni: data.DNI,
        name: data.Nombres,
        lastName: data.Apellidos,
        sexo: data.Sexo,
      });
      let puntuacion = {
        idBusiness: business._id,
        puntos: puntosGanados,
      };

      client.puntuacion.push(puntuacion);
      await client.save();
    } else {
      let existeCliente = false;
      // Cliente registrado, pero nuevo en la empresa
      // Cliente registrado, parte de la empresa
      client.puntuacion.forEach((info) => {
        // Actualizamos el puntaje de la empresa actual
        if (JSON.stringify(info.idBusiness) === JSON.stringify(business._id)) {
          existeCliente = true;
          info.puntos += puntosGanados;
        }
      });

      if (!existeCliente) {
        let puntuacion = {
          idBusiness: business._id,
          puntos: puntosGanados,
        };
        client.puntuacion.push(puntuacion);
      }

      await client.save();
    }
  });

  file.estado = true;
  await file.save();
  await actualizarClientes(business._id);
  res.json({
    ok: true,
    msg: "Puntajes Cargados",
  });
};

const actualizarClientes = async (id) => {
  const business = await Business.findById(id);
  let clientesActuales = [];
  const clients = await Client.find();

  for (let client of clients) {
    let puntuacion = client.puntuacion;
    for (info of puntuacion) {
      if (JSON.stringify(info.idBusiness) === JSON.stringify(business._id)) {
        let clientes = {
          idCliente: client._id,
        };
        clientesActuales.push(clientes);
      }
    }
  }
  business.clientes = clientesActuales;
  await business.save();
};

const eliminarArchivo = async (req, res) => {
  const { id } = req.params;
  const file = await File.findByIdAndDelete(id).catch((err) => {
    return res.status(400).json({
      ok: false,
      err,
    });
  });

  if (!file)
    return res.status(400).json({
      ok: false,
      err: {
        msg: "Archivo no registrado",
      },
    });

  res.json({
    ok: true,
    file,
  });
};

module.exports = {
  registrarArchivo,
  obtenerDatosArchivo,
  obtenerArchivos,
  cargarDataCliente,
  eliminarArchivo,
};
