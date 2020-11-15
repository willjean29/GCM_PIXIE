/*
  Funcionalidad de cálculo de
  puntos totales.
*/

function puntosSoles (soles, puntos, total){
  let puntosTotal = 0;
  puntosTotal = (total / soles) * puntos;
  return Math.floor(puntosTotal);
}
  
module.exports = {
  puntosSoles
}