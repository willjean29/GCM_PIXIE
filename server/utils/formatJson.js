const formatJSON = (stream) => {
  let arrayDatos = [];
  for (let item of stream) {
    const atributos = Object.keys(item)[0].split(';');
    const valores = Object.values(item)[0].split(';');
    let objeto = new Object(); 
    for (let i = 0; i < atributos.length; i++) {
      if(atributos[i] === '') continue;
      objeto[atributos[i]] = valores[i];
    }
    arrayDatos.push(objeto);
  }
  return arrayDatos;
}

module.exports = {
  formatJSON
}