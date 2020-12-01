const Catalog = require("../models/Catalog");
const Administrator = require("../models/Administrator");
const Prize = require("../models/Prize");
const Business = require("../models/Business");
const Category = require("../models/Category");

const {
  existsCompetitionSimple,
  existsCatalogoBusiness,
} = require("../middlewares/exists");

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

  // console.log(categories);
  // console.log(existeCatalogoBusiness);
  // console.log(prizes)
  res.send({
    title: "Adminstrador",
    admin: administrator,
    premios: prizes,
    existeConcursoSimple,
    existeCatalogoBusiness,
    categories,
  });
};

module.exports = {
  mostrarCrearCatalogo,
  mostrarListaCatalogo,
};
