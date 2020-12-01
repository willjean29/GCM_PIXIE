/**
 * CATALOGCONTROLLER
 * Controlador de catálogo, controla las operaciones
 * de crear y mostrar catálogos y premios 
 */

 // Importando librerias
const fs = require("fs-extra");

// Importando modelos
const Catalog = require("../models/Catalog");
const Administrator = require("../models/Administrator");
const Prize = require("../models/Prize");
const Business = require("../models/Business");
const Category = require("../models/Category");

// Importando funciones para subir archivos
const cloudinary = require("../config/cloudinary");

//Importando middlewares
const {
  existsCompetitionSimple,
  existsCatalogoBusiness,
} = require("../middlewares/exists");

// Función para mostrar la vista de crear catálogo
const mostrarCrearCatalogo = async (req, res) => {
  const administrator = await Administrator.findById(req.user._id).lean();
  const existeConcursoSimple = await existsCompetitionSimple(req.user._id);
  const existeCatalogoBusiness = await existsCatalogoBusiness(req.user._id);
  res.send({
    title: "Adminstrador",
    admin: administrator,
    existeConcursoSimple,
    existeCatalogoBusiness,
  });
};

// Función para mostrar la lista de premios
const mostrarListaCatalogo = async (req, res) => {
  const administrator = await Administrator.findById(req.user._id).lean();
  const business = await Business.findOne({
    administrador: administrator._id,
  }).lean();
  const catalog = await Catalog.findOne({ business: business._id }).lean();
  const prizes = await Prize.find({ catalog: catalog._id })
    .populate("category", "name")
    .lean();
  const existeConcursoSimple = await existsCompetitionSimple(req.user._id);
  const existeCatalogoBusiness = await existsCatalogoBusiness(req.user._id);
  const categories = await Category.find().sort("name").lean();

  res.send({
    title: "Adminstrador",
    admin: administrator,
    premios: prizes,
    existeConcursoSimple,
    existeCatalogoBusiness,
    categories,
  });
};

// Función para registrar catálogos de premios
const registrarCatalogoPremios = async (req, res) => {
  console.log(req.body);
  console.log(req.files);
  const id = req.user._id;
  // return;
  const business = await Business.findOne({ administrador: id }).catch(
    (err) => {
      return res.status(500).json({
        ok: false,
        err,
      });
    }
  );

  if (!business)
    return res.status(400).json({
      ok: false,
      err: {
        msg: "No tiene una empresa registrada",
      },
    });

  // Revisar si ya existe un catalog de la empresa
  let catalog = await Catalog.findOne({ business: business._id });
  if (!catalog) {
    // Crear catalogo de premios
    catalog = new Catalog({
      name: "Cátalogo de Premios",
      description: "Lista de premios a canjear",
      business: business._id,
    });
    await catalog.save();
  }

  if (req.files) {
    if (req.files.length > 1) {
      console.log(req.files);
      req.files.forEach(async (file, index) => {
        const result = await cloudinary.v2.uploader.upload(file.path);
        const dataPremio = {
          name: req.body.nombre[index],
          image: file.filename,
          description: req.body.descripcion[index],
          points: req.body.puntos[index],
          price: req.body.precio[index],
          category: req.body.categoria[index],
          catalog: catalog._id,
          url: result.secure_url,
        };
        registrarPremio(dataPremio);
        await fs.unlink(file.path);
      });
    } else {
      console.log(req.files);
      const result = await cloudinary.v2.uploader.upload(req.files[0].path);
      console.log(result);
      const dataPremio = {
        name: req.body.nombre,
        image: req.files[0].filename,
        description: req.body.descripcion,
        points: req.body.puntos,
        price: req.body.precio,
        category: req.body.categoria,
        catalog: catalog._id,
        url: result.secure_url,
      };
      registrarPremio(dataPremio);
      await fs.unlink(req.files[0].path);
    }
  }
  res.json({
    ok: true,
    msg: "Se registro con exito",
  });
};

// Función para registrar un premio
const registrarPremio = async (dataPremio) => {
  console.log(dataPremio);
  const categoryName = dataPremio.category;
  const category = await Category.findOne({ name: categoryName });
  dataPremio.category = category._id;
  const prize = new Prize(dataPremio);
  await prize.save();
};

module.exports = {
  mostrarCrearCatalogo,
  mostrarListaCatalogo,
  registrarCatalogoPremios,
};
