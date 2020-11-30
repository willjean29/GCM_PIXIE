/*
  Funcionalidad de lectura de archivos
  excel desde un url.
*/

const XLSX = require('xlsx');

const leerCSV = (url) => {
  const excel = XLSX.readFile(url);
  const nombre = excel.SheetNames;
  let datos = XLSX.utils.sheet_to_json(excel.Sheets[nombre[0]]);
  return datos;
}

module.exports = {
  leerCSV
}