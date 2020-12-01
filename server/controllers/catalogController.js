const Administrator = require('../models/Administrator');

const {existsCompetitionSimple,existsCatalogoBusiness} = require('../middlewares/exists');

const mostrarCrearCatalogo = async(req,res) => {
  const administrator = await Administrator.findById(req.user._id).lean();
  const existeConcursoSimple = await existsCompetitionSimple(req.user._id);
  const existeCatalogoBusiness = await existsCatalogoBusiness(req.user._id);
  res.send({
    title: 'Adminstrador',
    admin: administrator,
    existeConcursoSimple,
    existeCatalogoBusiness
  });
}

module.exports = {
  mostrarCrearCatalogo,
}