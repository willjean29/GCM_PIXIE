const express = require("express");
const router = express.Router();
const catalogController = require("../controllers/catalogController");

const { uploadImage } = require("../middlewares/uploadMultiImages");
const { verifyTokenAdmin } = require("../middlewares/verifyToken");

router.get(
  "/register",
  verifyTokenAdmin,
  catalogController.mostrarCrearCatalogo
);

router.post(
  "/register",
  verifyTokenAdmin,
  uploadImage,
  catalogController.registrarCatalogoPremios
);

router.get(
  "/list", 
  verifyTokenAdmin, 
  catalogController.mostrarListaCatalogo);

module.exports = router;