const mongoose = require('mongoose');
const moment = require('moment');
const competitionSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true
  },
  fechaInicio: {
    type: Date
  },
  fechaFin: {
    type: Date
  },
  estado: {
    type: Boolean,
    default: false
  },
  business: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Business'
  },
  tipo: {
    type: String,
    trim: true,
    required: true
  },
  image: {
    type: String,
    trim: true
  },
  reglas: {
    parametro: {
      type: Number
    },
    puntos: {
      type: Number
    }
  },
  active: {
    type: Boolean,
    default: false
  }
});

module.exports = mongoose.model('Competition', competitionSchema);