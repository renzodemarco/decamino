// EN LOS SERVICES SE UTILIZAN LOS DATOS PROPORCIONADOS POR EL CONTROLLER PARA HACER LLAMADAS A LA BASE DE DATOS (en este caso con el modelo Test) O PARA REALIZAR OTRAS ACCIONES CON LIBRERÍAS EXTERNAS (mandar mails, buscar localizaciones, etc)

import Test from '../models/test.model.js';

// Declaración del service que trae toda la colección 'test', no recibe ningún parámetro
export const findTests = async () => {
  try {
    // Llama el método find() del modelo Test para traer todas las instancias de la colección
    const response = await Test.find()
    // Se devuelve la respuesta
    return response
  }
  catch (error) {
    // Si hay un error, se dispara con throw, al final lo terminará capturando el manejador de errores
    throw error
  }
}

// Declaración del service que trae el resultado de la colección 'test', recibe la variable id
export const findTestById = async (id) => {
  try {
    // Llama el método findById() del modelo Test para traer la instancia de la colección que coincida con ese id
    const response = await Test.findById(id)
    return response
  }
  catch (error) {
    throw error
  }
}

// Declaración del service que crea una nueva instancia en la colección 'test', recibe la data de la nueva instancia
export const createTest = async (data) => {
  try {
    // Llama el método create() del modelo Test para crear una nueva instancia con la data proporcionada
    const response = await Test.create(data)
    return response
  }
  catch (error) {
    throw error
  }
}

// Declaración del service que modifica una instancia de la colección 'test', recibe el id de la instancia a modificar y la data nueva
export const updateTest = async (id, data) => {
  try {
    // Llama el método findByIdAndUpdate() del modelo Test para obtener la instancia que coincida con el id y modificarla con la data proporcionada
    const response = await Test.findByIdAndUpdate(id, data, { new: true }) // el {new: true} significa que va a devolver los datos de la instancia ya modificada
    return response
  }
  catch (error) {
    throw error
  }
}

// Declaración del service que elimina una instancia de la colección 'test', recibe el id de la instancia a eliminar
export const deleteTest = async (id) => {
  try {
    // Llama el método findByIdandDelete() del modelo Test para eliminar la instancia que coincida con ese id
    const response = await Test.findByIdAndDelete(id)
    return response
  }
  catch (error) {
    throw error
  }
}