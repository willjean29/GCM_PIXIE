/*
  Para dar forma a los archivos json
  y poder ver el detalle de cada uno.
*/

// Importando librerías
const shortId = require('shortid');

const formatJSON = (stream) => {
  let arrayDatos = [];

  for (let item of stream) {
    const atributos = Object.keys(item)[0].split(';');
    const valores = Object.values(item)[0].split(';');
    let objeto = new Object();

    for (let i = 0; i < atributos.length; i++) {
      if(atributos[i] === '' || valores[i] === '') continue;
      objeto[atributos[i]] = valores[i];
    }

    if(Object.keys(objeto).length !== 0){
      objeto['key'] = shortId.generate()
      arrayDatos.push(objeto);
    }
  }
  
  return arrayDatos;
}

module.exports = {
  formatJSON
}