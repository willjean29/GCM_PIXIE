/**
 * Subir archivos un formato de información (template) en el sistema
 */

const Logger = require('../config/loggerService');
const logger = new Logger('app');
const microprofiler = require('microprofiler');
//Importa los modelos
const File = require('../models/File');
const Business = require('../models/Business');
const Administrator = require('../models/Administrator');
const Competition = require('../models/Competition');
const Client = require('../models/Client');
//Importa utilidades
const { leerCSV } = require('../utils/leerCSV');
const { puntosSoles } = require('../utils/points');
//Middeleware para limitar vistas según el estado del usuario
const { existsCompetitionSimple, existsCatalogoBusiness } = require('../middlewares/exists');
//Importa función para subir el archivo a S3
const { uploadToS3 } = require("../utils/aws");

//Sube un archivo del registro de ventas y se guarda en S3
const registrarArchivo = async(req, res) => {
    let start = microprofiler.start(); //
    let file;
    const id = req.user._id;
    const business = await Business.findOne({ administrador: id }).catch((err) => {
        logger.error('Error en database', err)
        return res.status(400).json({
            ok: false,
            err
        })
    });

    if (!business) return res.status(400).json({
        ok: false,
        err: {
            msg: "La empresa no se encuentra registrada"
        }
    })

    if (req.file) {
        //Crea el archivo eb la BD
        file = new File({
            name: req.file.filename,
            type: req.file.mimetype,
            business: business._id
        })

        await file.save();

        const { name, data } = req.file;
        const fileName = name.split(".");
        const ext = fileName[fileName.length - 1];

        const fileInfo = {
            name: `${file._id}.${ext}`,
            path: `empresas/${business.id}`,
        };

        const fileSent = await uploadToS3(fileInfo, data);

        if (!fileSent.ok) {
            return res.status(400).send({ message: "Error al subir el archivo" });
        }

        file.link = fileSent.data.Location; //es el link que te bota el aws cuando se sube al s3
        await file.save()
    }

    res.json({
        ok: true,
        file
    })
    let elapsedUs = microprofiler.measureFrom(start, 'code');
    let stats = microprofiler.getStats('code');
    logger.debug('Procesar request registrarArchivo', stats)
}

const obtenerDatosArchivo = async(req, res) => {
    let start = microprofiler.start();
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

    if (!file) return res.status(400).json({
        ok: false,
        err: {
            msg: "Archivo no registrado"
        }
    })

    const datos = leerCSV(file.link);

    res.send({
        title: "Detalles Archivo",
        admin: administrator,
        existeConcursoSimple,
        existeCatalogoBusiness,
        datos
    })
    let elapsedUs = microprofiler.measureFrom(start, 'code');
    let stats = microprofiler.getStats('code');
    logger.debug('Procesar request obtenerDatosArchivo', stats)
}

const cargarDataCliente = async(req, res) => {
    let start = microprofiler.start();
    const id = req.params.id;

    const file = await File.findById(id).catch((err) => {
        return res.status(400).json({
            ok: false,
            err
        })
    })

    if (!file) return res.status(400).json({
        ok: false,
        err: {
            msg: "Archivo no registrado"
        }
    })

    const datos = leerCSV(file.name);

    const business = await Business.findById(file.business);

    const competition = await Competition.findOne({ business: business._id });
    if (!competition) {
        return res.status(404).json({
            ok: false,
            err: {
                msg: "No hay concursos activos"
            }
        })
    }
    const { parametro, puntos } = competition.reglas;

    datos.forEach(async(data, index) => {
        // buscar cliente
        let client = await Client.findOne({ dni: data.DNI });
        // calcular los puntos pore operacion
        let puntosGanados = puntosSoles(parametro, puntos, data.Total_Venta);

        // cliente no registrado
        if (!client) {
            console.log("cliente nuevo ", index)
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
            // cliente registrado , pero nuevo en la empresa
            // cliente registrado, parte de le empresa 
            client.puntuacion.forEach((info) => {
                // actualizamos el puntaje de la empresa actual 
                if (JSON.stringify(info.idBusiness) === JSON.stringify(business._id)) {
                    existeCliente = true;
                    info.puntos += puntosGanados;
                }
            })

            if (!existeCliente) {
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

    let elapsedUs = microprofiler.measureFrom(start, 'code');
    let stats = microprofiler.getStats('code');
    logger.debug('Procesar request cargarDataCliente', stats)
}

const actualizarClientes = async(id) => {
    const business = await Business.findById(id);
    let clientesActuales = [];
    const clients = await Client.find();

    for (let client of clients) {
        let puntuacion = client.puntuacion
        for (info of puntuacion) {
            if (JSON.stringify(info.idBusiness) === JSON.stringify(business._id)) {
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

const eliminarArchivo = async(req, res) => {
    const { id } = req.params;
    const file = await File.findByIdAndDelete(id).catch((err) => {
        return res.status(400).json({
            ok: false,
            err
        });
    })

    if (!file) return res.status(400).json({
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