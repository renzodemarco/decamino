import * as reservationServices from '../services/reservation.service.js'
import { createSchema, updateSchema } from '../schemas/reservation.schema.js';
import CustomError from '../utils/custom.error.js';
import ReservationDTO from '../utils/reservation.dto.js';

export const POSTReservation = async (req, res, next) => {
  const data = req.body
  const restaurantId = req.params.id
  try {
    const { error, value } = createSchema.validate({ ...data, restaurant: restaurantId });

    if (error) return CustomError.new({ status: 400, message: error.details[0].message })

    const reservation = await reservationServices.createReservation({ ...value, user: req.user.id });

    const response = new ReservationDTO(reservation)

    return res.status(201).json(response);
  }
  catch (error) {
    next(error)
  }
};

export const PUTReservationCancel = async (req, res, next) => {
  const { id } = req.params;
  try {
    const reservation = await reservationServices.updateReservation(id, { status: 'cancelada' });

    const response = new ReservationDTO(reservation)

    return res.status(200).json(response);
  }
  catch (error) {
    next(error);
  }
};

export const GETUserReservations = async (req, res, next) => {
  try {
    const reservations = await reservationServices.readReservationsByUser(req.user.id);

    const response = reservations
    .filter(reservation => reservation.restaurant !== null)
    .map(reservation => new ReservationDTO(reservation));

    return res.status(200).json(response);
  }
  catch (error) {
    next(error)
  }
};

export const GETRestaurantReservations = async (req, res, next) => {
  try {
    const reservations = await reservationServices.readReservationsByRestaurant(req.user.restaurant);

    const response = reservations.map(reservation => new ReservationDTO(reservation))

    return res.status(200).json(response);
  }
  catch (error) {
    next(error)
  }
};

export const PUTReservationStatus = async (req, res, next) => {
  const { id } = req.params
  try {
    const { error, value } = updateSchema.validate(req.body);

    if (error) return CustomError.new({ status: 400, message: error.details[0].message })

    const reservation = await reservationServices.updateReservation(id, { status: value.status });

    const response = new ReservationDTO(reservation)

    return res.status(200).json(response);
  }
  catch (error) {
    next(error)
  }
};