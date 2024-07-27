import { updateSchema, createSchema } from '../schemas/restaurant.schema.js';
import * as restaurantServices from '../services/restaurant.service.js'
import * as userServices from '../services/user.service.js'
import fs from 'fs'
import RestaurantDTO from '../utils/restaurant.dto.js';
import CustomError from '../utils/custom.error.js'
import dictionary from '../utils/error.dictionary.js';

export const POSTRestaurant = async (req, res, next) => {
  const data = req.body;
  try {
    if (req.user.restaurant) return CustomError.new(dictionary.hasRestaurant)

    const { error, value } = createSchema.validate(data);

    if (error) return CustomError.new({ status: 400, message: error.details[0].message })

    const restaurant = await restaurantServices.createRestaurant(value);

    await userServices.updateUser(req.user.id, { restaurant: restaurant.id })

    const response = new RestaurantDTO(restaurant)

    return res.status(201).json(response);
  }
  catch (error) {
    next(error);
  }
};

export const POSTRestaurantPhotos = async (req, res, next) => {
  const restaurantId = req.user.restaurant
  try {
    if (!req.files || req.files.length === 0) return CustomError.new(dictionary.missingFile);

    const result = await restaurantServices.uploadRestaurantPhotos(restaurantId, req.files);

    req.files.forEach(file => {
      fs.unlinkSync(file.path);
    });

    return res.status(200).json({ message: 'Imágenes subidas exitosamente', photosUrl: result.photos });
  }
  catch (error) {
    next(error);
  }
}

export const DELETERestaurantPhoto = async (req, res, next) => {
  const restaurantId = req.user.restaurant
  const { photoUrl } = req.body;
  try {
    if (!photoUrl) {
      return CustomError.new(dictionary.missingPhotoUrl)
    }

    const restaurant = await restaurantServices.removePhotoFromRestaurant(restaurantId, photoUrl);

    const response = new RestaurantDTO(restaurant)

    return res.status(200).json({ message: 'Foto eliminada exitosamente', response });
  } 
  catch (error) {
    next(error);
  }
}

export const GETRestaurants = async (req, res, next) => {
  const { cuisine, limit, page } = req.query
  try {
    const restaurants = await restaurantServices.readRestaurants({ cuisine, limit, page });

    const response = restaurants.map(restaurant => new RestaurantDTO(restaurant))

    return res.status(200).json(response);
  }
  catch (error) {
    next(error);
  }
};

export const GETRestaurantById = async (req, res, next) => {
  const { id } = req.params
  try {
    const restaurant = await restaurantServices.readRestaurantById(id)

    const response = new RestaurantDTO(restaurant)

    return res.status(200).json(response);

  }
  catch (error) {
    next(error)
  }
};
export const PUTRestaurant = async (req, res, next) => {
  const data = req.body;
  const restaurantId = req.user.restaurant
  try {
    const { error, value } = updateSchema.validate(data);

    if (error) return CustomError.new({ status: 400, message: error.details[0].message })

    const restaurant = await restaurantServices.updateRestaurant(restaurantId, value);

    const response = new RestaurantDTO(restaurant)

    return res.status(200).json(response);
  }
  catch (error) {
    next(error)
  }
};


export const DELETERestaurant = async (req, res, next) => {
  const restaurantId = req.user.restaurant
  try {
    await restaurantServices.destroyRestaurant(restaurantId)

    await userServices.updateUser(req.user.id, { restaurant: null })

    return res.status(200).json({ response: `Restaurante ${restaurantId} eliminado` });
  }
  catch (error) {
    next(error)
  }
};


