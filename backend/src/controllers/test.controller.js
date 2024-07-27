// EN LOS CONTROLLERS SE OBTIENEN LOS DATOS DE LA PETICION (req.params, req.body, etc) Y SE LOS UTILIZA PARA LLAMAR AL SERVICIO. LUEGO SE DEVUELVE LA RESPUESTA CON SU STATUS Y LOS DATOS OBTENIDOS. EN CASO DE HABER ERROR, SE MANEJA CON next(error)

import * as testServices from '../services/test.service.js'

// Declaración del controller que trae toda la colección 'test'
export const GETTest = async (req, res) => {
  try {
    // Se llama al servicio con su método findTests() y se guarda el resultado en la variable response
    const response = await testServices.findTests()

    // Se devuelve un status de éxito y la respuesta en forma de json
    return res.status(200).json(response)
  }
  catch (error) {
    // Si hay un error, se lo envía con next() para que siga corriendo la api, al final lo terminará capturando el manejador de errores
    next(error)
  }
}

// Declaración del controller que trae el resultado de la colección 'test' que coincida con el id proporcionado 
export const GETTestById = async (req, res) => {

  // Se declara la variable "id" con lo que viene en req.params.id

  const { id } = req.params  // esto es lo mismo que decir: const id = req.params.id

  try {
    // Se llama al servicio con el parámetro id para que busque el resultado que coincida con ese id
    const response = await testServices.findTestById(id)

    // Se devuelve un status de éxito y la respuesta en forma de json
    return res.status(200).json(response)
  }
  catch (error) {
    next(error)
  }
}

// Declaración del controller que crea una nueva instancia en la colección 'test'
export const POSTTest = async (req, res) => {

  // Se declara la variable "data" con toda la información que viene desde el body de la petición
  const data = req.body

  try {
    // Se le envía la data al servicio para que cree una nueva instancia en la colección con los datos proporcionados en el body
    const response = await testServices.createTest(data)

    // En este caso se devuelve status 201 que significa que hubo una creación exitosa
    return res.status(201).json(response)
  }
  catch (error) {
    next(error)
  }
}

// Declaración del controller que modifica una instancia de la colección 'test'
export const PUTTest = async (req, res) => {

  // Acá se necesitan ambas variables: el id de la instancia que se quiere modificar y la data nueva con la que se reemplazará
  const { id } = req.params
  const data = req.body
  try {
    // El servicio requiere que se le pasen ambos parámetros, primero el id y luego la data
    const response = await testServices.updateTest(id, data)
    return res.status(200).json(response)
  }
  catch (error) {
    next(error)
  }
}

// Declaración del controller que elimina una instancia de la colección 'test'
export const DELETETest = async (req, res) => {
  const { id } = req.params
  try {
    const response = await testServices.deleteTest(id)
    return res.status(200).json(response)
  }
  catch (error) {
    next(error)
  }
}