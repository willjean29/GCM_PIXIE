const shortId = require('shortid');
const formatJSON = (stream) => {
  let arrayDatos = [];
  let isValid = true;
  const dataColumn = ["ID,DNI,Sexo,Nombres,Apellidos,Metodo_Pago,Total_Venta,Fecha_Venta,,","ID,DNI,Sexo,Nombres,Apellidos,Metodo_Pago,Total_Venta,Fecha_Venta"];

  for (let item of stream) {
    const atributos = Object.keys(item)[0].split(';');
    const valores = Object.values(item)[0].split(';');
    if (!dataColumn.includes(atributos.toString())) {
      isValid = false;
    }else{
      isValid = true;
    }
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
  return {arrayDatos,isValid};
}

module.exports = {
  formatJSON
}