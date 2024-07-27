import CustomError from '../utils/custom.error.js'
import dictionary from '../utils/error.dictionary.js'
import Restaurant from '../models/restaurant.model.js';

export const hasRestaurant = async (req, res, next) => {
  try {
    const id = req.user.restaurant

    if (!id) return next(CustomError.new(dictionary.noRestaurant))

    const restaurant = await Restaurant.findById(id)

    if (!restaurant) return CustomError.new(dictionary.noRestaurant)

    next();
  }
  catch (error) {
    next(error)
  }
}

export const waypointsExist = async (req, res, next) => {
  const { waypoints } = req.body
  try {
    if (!waypoints || waypoints.length === 0) return next()

    const restaurants = await Restaurant.find({ _id: { $in: waypoints } });

    if (restaurants.length !== waypoints.length) return CustomError.new(dictionary.waypointsNotFound)

    next();
  }
  catch (error) {
    next(error)
  }
}

export const restaurantExist = async (req, res, next) => {
  const { id } = req.params
  try {
    const restaurant = await Restaurant.findById(id);

    if (!restaurant) return CustomError.new(dictionary.restaurantNotFound)

    next();
  }
  catch (error) {
    next(error)
  }
}