import Restaurant from "../models/restaurant.model.js"
import Review from "../models/review.model.js"
import Reservation from "../models/reservation.model.js"
import CustomError from "../utils/custom.error.js"
import dictionary from "../utils/error.dictionary.js"
import getRating from "../utils/get.rating.js"
import { uploadRestaurantImages, deleteCloudinaryPhoto } from '../config/cloudinary.js'

export const createRestaurant = async (data) => {
  try {
    const response = await Restaurant.create({
      ...data,
      location: {
        type: 'Point',
        coordinates: data.location  // [long, lat]
      }
    })
    return response
  }
  catch (error) {
    throw error
  }
}

export const uploadRestaurantPhotos = async (id, files) => {
  try {
    const results = await uploadRestaurantImages(files, id)

    const imageUrls = results.map(result => result.secure_url);

    const restaurant = await Restaurant.findByIdAndUpdate(
      id,
      { $push: { photos: { $each: imageUrls } } },
      { new: true }
    );

    return restaurant
  }
  catch (error) {
    throw error
  }
}

export const removePhotoFromRestaurant = async (id, photoUrl) => {
  try {
    const publicId = photoUrl.split('/').slice(7).join('/').split('.')[0];

    const result = await deleteCloudinaryPhoto(publicId);

    if (result.result === 'not found') {
      return CustomError.new(dictionary.photoNotFound)
    }

    const restaurant = await Restaurant.findByIdAndUpdate(
      id,
      { $pull: { photos: photoUrl } },
      { new: true }
    );

    return restaurant;
  }
  catch (error) {
    throw error
  }
};

export const readRestaurants = async ({ cuisine, limit, page }) => {
  try {
    const query = cuisine ? { cuisine } : {};
    const skip = limit && page ? limit * (page - 1) : 0;

    const restaurants = await Restaurant.find(query).skip(skip).limit(limit || 0);

    const response = await Promise.all(
      restaurants.map(async (restaurant) => {
        const rating = await getRating(restaurant._id);
        return { ...restaurant.toObject(), rating };
      })
    );

    return response;
  }
  catch (error) {
    throw error
  }
}

export const readRestaurantById = async (id) => {
  try {
    const restaurant = await Restaurant.findById(id)

    if (!restaurant) return CustomError.new(dictionary.restaurantNotFound)

    const rating = await getRating(restaurant._id);

    return { ...restaurant.toObject(), rating };
  }
  catch (error) {
    throw error
  }
}

export const updateRestaurant = async (id, data) => {
  try {
    const updateData = { ...data };

    if (data.location) {
      updateData.location = {
        type: 'Point',
        coordinates: data.location  // [long, lat]
      };
    }

    const response = await Restaurant.findByIdAndUpdate(id, updateData, { new: true })

    return response;
  }
  catch (error) {
    throw error
  }
}

export const destroyRestaurant = async (id) => {
  try {
    const response = await Restaurant.findByIdAndDelete(id)

    // Eliminar todas las reservas y reviews asociadas
    await Reservation.deleteMany({ restaurant: id });
    await Review.deleteMany({ restaurant: id });

    return response;
  }
  catch (error) {
    throw error
  }
}