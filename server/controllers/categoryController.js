/*
  CATEGORYCONTROLLER:
  Controlador de categoría de productos, gestiona 
  las operaciones de registro y obtención del
  las categorías del catalogo de premios.
*/

// Importando modelos
const Category = require('../models/Category');

const registrarCategoria = async(req, res) => {
  const data = req.body;
  console.log(data);
  const category = new Category(data);
  await category.save().catch((err) => {
    return res.status(400).json({
      ok: false,
      err
    })
  })

  res.json({
    ok: true,
    category
  });
}

const obtenerCategorias = async(req, res) =>{
  const categories = await Category.find()
    .sort('name');

  if(!categories) return res.status(400).json({
    ok: false,
    err: {
      msg: "No hay categorias registradas"
    }
  });

  res.json({
    ok: true,
    categories
  });
}
module.exports = {
  registrarCategoria,
  obtenerCategorias
}