const mongoose = require('mongoose');

const ProductModel = new mongoose.Schema({
  nombre: { type: String, required: true },
  precio: { type: Number, required: true },
  descripcion: { type: String, require:true },
  imagen: { type: String }
})

module.exports = mongoose.model('Productos', ProductModel);