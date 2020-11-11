/**
 * Cuando se registra los registros en soles, con las reglas del concurso
 * Estandarizado por el concurso
 * @param {*Soles} soles  
 * @param {*Puntos} puntos 
 * @param {*Total de venta} total 
 */
function puntosSoles(soles, puntos, total) {
    let puntosTotal = 0;
    puntosTotal = (total / soles) * puntos;
    return Math.floor(puntosTotal);
}

module.exports = {
    puntosSoles
}