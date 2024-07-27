// todo req es controladores
import * as reviewServices from '../services/review.service.js'
import { createSchema, updateSchema } from '../schemas/review.schema.js'
import CustomError from '../utils/custom.error.js';

// Crear una nueva reseña
export const POSTReview = async (req, res, next) => {
  const data = req.body; // controller uso info de peticion 
  const restaurantId = req.params.id
  const userId = req.user.id
  try {
    const { error, value } = createSchema.validate({...data, restaurant: restaurantId});

    if (error) return CustomError.new({ status: 400, message: error.details[0].message })

    const response = await reviewServices.createReview({ ...value, user: userId, restaurant: restaurantId })

    return res.status(201).json(response); //json nombre llave = valor 
  }
  catch (error) {
    next(error)
  }
};

// Obtener todas las reseñas
export const GETReviewsByRestaurant = async (req, res, next) => {
  const restaurantId = req.params.id
  try {
    const response = await reviewServices.readReviewsByRestaurant(restaurantId) // me trae todas las reseñas pertenecientes al restaurante
    return res.status(200).json(response);
  }
  catch (error) {
    next(error)
  }
};

// Obtener una reseña por ID
export const GETReviewById = async (req, res, next) => {
  const { id } = req.params
  try {
    const response = await reviewServices.readReviewById(id)
    return res.status(200).json(response);
  }
  catch (error) {
    next(error)
  }
};

// Actualizar una reseña
export const PUTReview = async (req, res, next) => {
  const data = req.body;
  const { id } = req.params
  try {
    const { error, value } = updateSchema.validate(data);

    if (error) return CustomError.new({ status: 400, message: error.details[0].message })

    const response = await reviewServices.updateReview(id, value)

    return res.status(200).json(response);
  }
  catch (error) {
    next(error)
  }
};

// Eliminar una reseña
export const DELETEReview = async (req, res, next) => {
  const { id } = req.params
  try {
    const response = await reviewServices.destroyReview(id) // busca reseña y la elimina
    return res.status(200).json(response);
  }
  catch (error) {
    next(error)
  }
};