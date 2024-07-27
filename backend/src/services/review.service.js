import Review from "../models/review.model.js"
import Restaurant from '../models/restaurant.model.js'
import CustomError from "../utils/custom.error.js"
import dictionary from "../utils/error.dictionary.js"

export const createReview = async (data) => {
  try {
    // Chequeo que el restaurant exista
    const restaurant = await Restaurant.findById(data.restaurant)

    if (!restaurant) return CustomError.new(dictionary.restaurantNotFound)

    // Chequeo que este usuario no haya reseñado este restaurant anteriormente
    const hasReviewed = await Review.findOne({ user: data.user, restaurant: data.restaurant });

    if (hasReviewed) return CustomError.new(dictionary.alreadyReviewed);

    const response = await Review.create(data);

    return response
  }
  catch (error) {
    throw error
  }
}

export const readReviewsByRestaurant = async (id) => { // metodo que trae a todas las reseñas de un mismo restaurant
  try {
    const restaurant = await Restaurant.findById(id)

    if (!restaurant) return CustomError.new(dictionary.restaurantNotFound)

    const response = await Review.find({ restaurant: id });

    return response
  }
  catch (error) {
    throw error
  }
}

export const readReviews = async () => {
  try {
    const response = await Review.find(); // metodo que trae todas las reseñas
    return response
  }
  catch (error) {
    throw error
  }
}

export const readReviewById = async (id) => {  //metodo que trae una sola reseña
  try {
    const response = await Review.findById(id); //recibe un id devolviendo reseña que coincida con id

    if (!response) return CustomError.new(dictionary.reviewNotFound)

    return response
  }
  catch (error) {
    throw error
  }
}

export const updateReview = async (id, data) => {
  try {
    const response = await Review.findByIdAndUpdate(id, data, { new: true }) //me devuelve una resp con el obj ya modificado

    return response
  }
  catch (error) {
    throw error
  }
}

export const destroyReview = async (id) => {
  try {
    const response = await Review.findByIdAndDelete(id) // buscar por id y eliminar

    return response
  }
  catch (error) {
    throw error
  }
}
