/**
 * Cuando se registra los registros en soles, con las reglas del concurso
 * Estandarizado por el concurso
 * @param {*} soles  
 * @param {*} puntos 
 * total de venta
 * @param {*} total 
 */
function puntosSoles(soles, puntos, total) {
  let puntosTotal = 0;
  puntosTotal = (total / soles) * puntos;
  return Math.floor(puntosTotal);
}

module.exports = {
  puntosSoles
}