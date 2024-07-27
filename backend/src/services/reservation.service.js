import Reservation from "../models/reservation.model.js"
import CustomError from "../utils/custom.error.js";
import dictionary from "../utils/error.dictionary.js";

export const createReservation = async (data) => {
  try {
    const response = await Reservation.create({ ...data, status: 'pendiente' });
    return response
  }
  catch (error) {
    throw error
  }
}

export const readReservationsByRestaurant = async (id) => {
  try {
    const response = await Reservation.find({ restaurant: id });
    return response
  }
  catch (error) {
    throw error
  }
}

export const readReservationsByUser = async (id) => {
  try {
    const response = await Reservation.find({ user: id });
    return response
  }
  catch (error) {
    throw error
  }
}

export const updateReservation = async (id, data) => {
  try {
    const reservation = await Reservation.findById(id)

    if (!reservation) return CustomError.new(dictionary.reservationNotFound)

    const response = await Reservation.findByIdAndUpdate(id, data, { new: true })

    return response
  }
  catch (error) {
    throw error
  }
}