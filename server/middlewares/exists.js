/*
  Verificación de existencia de
  Concurso Simple y Catalogo
  asociados a la empresa.
*/

// Importando modelos
const Administrator = require('../models/Administrator');
const Business = require('../models/Business');
const Competition = require('../models/Competition');
const Catalog = require('../models/Catalog');

const existsCompetitionSimple = async (idAdministrator) => {
  let existe = false;

  // Buscamos administrador
  const administrator = await Administrator.findById(idAdministrator);
  // console.log(administrator)
  if(!administrator) return existe;

  // Buscamos empresa asociada al administrador
  const business = await Business.findOne({administrador: administrator._id});
  // console.log(business);
  if(!business) return existe;

  // Buscamos concurso simple referente a la empresa del administrador
  const competition = await Competition.findOne({business: business._id});
  if(!competition) return existe;
  
  if(competition.tipo === "simple"){
    existe = true;
    return existe;
  }
  
}

const existsCatalogoBusiness = async(idAdministrator) =>{
  let existe = false;

  // Buscamos administrador
  const administrator = await Administrator.findById(idAdministrator);
  // console.log(administrator)
  if(!administrator) return existe;

  // Buscamos empresa asociada al administrador
  const business = await Business.findOne({administrador: administrator._id});
  // console.log(business);
  if(!business) return existe;

  // Buscamos catalogo referente a la empresa del administrador
  const catalog = await Catalog.findOne({business: business._id});
  if(!catalog) {
    return existe;
  } else {
    existe = true;
    return existe;
  }
  
}

module.exports =  {
  existsCompetitionSimple,
  existsCatalogoBusiness
}