const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const webMasterSchema = mongoose.Schema({
  name: {
    type: String,
    trimn: true,
    required: true
  },
  clave: {
    type: String,
    trim: true,
    required: true
  },
  role:{
    type: String,
    default: 'webMaster'
  },
  registro: {
    type: Date,
    default: Date.now()
  }
});

// Hashear el password
webMasterSchema.pre('save',function(next) {
  // Si el password ya esta hasheado
  if(!this.isModified('clave')){
    return next();
  }
  // Si el password no esta hasheado
  const clave = bcrypt.hashSync(this.clave,bcrypt.genSaltSync(10));
  this.clave = clave;
  next();
});

webMasterSchema.methods = {
  compararPassword: function(clave) {
    return bcrypt.compareSync(clave,this.clave);
  }
}

module.exports = mongoose.model('WebMaster',webMasterSchema);