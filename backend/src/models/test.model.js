// EN MODELS SE DEFINE UN OBJETO CON LAS PROPIEDADES QUE TENDRÁ CADA INSTANCIA DE LA COLECCIÓN Y SE EXPORTA COMO MODEL PARA PODER UTILIZAR SUS MÉTODOS (find, findById, create, etc) Y ASÍ ACCEDER A LA BASE DE DATOS

import mongoose from 'mongoose'

// Definicion del schema "test"
const testSchema = new mongoose.Schema({
  // Contendrá una propiedad "value" cuyo tipo será un string, será requerida y por defecto dirá "empty"
  value: {
    type: String,
    required: true,
    default: "empty"
  }
  // Acá se podrían seguir agregando propiedades pero en este caso tenemos una sola por ser un objeto de prueba
},
  {
    timestamps: true  // Con esta opción en true defino que se creen automáticamente las propiedades createdAt y updatedAt
})

// Se crea el modelo a partir del schema ya definido
const TestModel = mongoose.model('Test', testSchema)

// Exportación para poder llamarlo y utilizar sus métodos (find, findById, create, etc)
export default TestModel