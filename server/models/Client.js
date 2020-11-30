const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const clientSchema = mongoose.Schema({
  name: {
    type: String,
    trim : true,
    // required: true
  },
  lastName: {
    type: String,
    trim : true,
    // required: true
  },
  dni: {
    type: String,
    trim : true,
    required: true
  },
  sexo: {
    type: String,
    trim : true,
  },
  // Identificación
  email: {
    type: String,
    trim : true,
    // required: true
  },
  password: {
    type: String,
    trim : true,
    // required: true
  },
  image: {
    type: String,
    trim : true
  },
  token: {
    type: String,
    trim : true,
  },
  estado:{
    type: Boolean,
    default: false
  },
  puntuacion:[{
    idBusiness:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business"
    },
    puntos:{
      type: Number,
      default: 0
    }
  }],
  premios:[{
    idBusiness:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Business"
    },
    idPremio:{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Prize'
    }
  }],
  role:{
    type: String,
    trim : true,
    default: "CLIENT"
  },
  registro:{
    type: Date,
    default: Date.now()
  },
  expire: Date
})

// Hashear el password
clientSchema.pre('save',function(next) {
  // Si el password ya esta hasheado
  if(!this.isModified('password')){
    return next();
  }
  // Si el password no esta hasheado
  const password = bcrypt.hashSync(this.password,bcrypt.genSaltSync(10));
  this.password = password;
  next();
});

// Métodos para el cliente
clientSchema.methods = {
  compararPassword: function(password) {
    return bcrypt.compareSync(password,this.password);
  }
}

module.exports = mongoose.model('Client',clientSchema);