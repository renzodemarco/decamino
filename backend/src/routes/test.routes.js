// EN LAS RUTAS SE ASIGNA UN CONTROLLER A CADA PETICIÓN HTTP DE ACUERDO AL MÉTODO UTLIZADO Y A LOS PARAMS QUE TENGA

import { Router } from 'express'
import * as testController from '../controllers/test.controller.js'

// Declaración de la variable router para poder usar los métodos de ruteo de express
const router = Router()

// Se comienzan a declarar los distintos endpoints con sus métodos y su controller
// El nombre del método será get, post, put o delete. Recibe un primer parámetro con el endpoint sobre el cual se correrá y otro parámetro con el controller que  manejará la petición. En caso de existir middlewares, irán en el medio de estos dos parámetros.
router.get('/', testController.GETTest)
  .get('/:id', testController.GETTestById)
  .post('/', testController.POSTTest)
  .put('/:id', testController.PUTTest)
  .delete('/:id', testController.DELETETest)

// Donde está el "/:id" significa que en ese lugar se encontrará un valor que express reconocerá como req.params.id y al cual tendremos acceso en el controller

export default router

