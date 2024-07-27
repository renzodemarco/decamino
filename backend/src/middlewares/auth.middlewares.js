import { verifyToken } from '../utils/jwt.js'
import { isValidObjectId } from 'mongoose';
import User from '../models/user.model.js'
import Review from '../models/review.model.js';
import Reservation from '../models/reservation.model.js';
import Route from '../models/route.models.js'
import CustomError from '../utils/custom.error.js'
import dictionary from '../utils/error.dictionary.js'

// Middleware para inyección de info de usuario en req.user
export const injectUser = async (req, res, next) => {

  // Toma la propiedad 'Authorization' del header de la petición
  const token = req.header('Authorization')?.split(' ')[1];

  // En caso de no existir, el req.user quedará vacío y se seguirá corriendo la api de esa manera
  if (!token) {
    req.user = null;
    return next();
  }

  try {
    // Con este método se lee el jwt (ya que nos trae la info criptada y se debe usar el JWT_SECRET para desencriptarla)
    const data = verifyToken(token, process.env.JWT_SECRET);

    // El jwt contiene un id, acá se busca en la base de datos la info del usuario con ese id
    const user = await User.findById(data.id);

    if (!user) {
      // En caso de no existir, el req.user quedará vacío y se seguirá corriendo la api de esa manera
      req.user = null;
    }
    else {
      // Si existe, se inyecta la data del usuario en el req.user para que se pueda acceder posteriormente
      req.user = user;
    }
  }
  catch (err) {
    // Ante cualquier error, el req.user quedará vacío
    req.user = null;
  }

  // Se continúa corriendo la api
  next();
};

// Middleware para verificar que el usuario esté registrado
export const requireAuth = (req, res, next) => {
  try {
    if (!req.user) {
      // Si req.user no existe, se devuelve un error de autenticación (status 401)
      return CustomError.new(dictionary.authentication)
    }
    // De lo contrario, se sigue corriendo la api
    next();
  }
  catch (error) {
    // Si hay un error, se lo envía con next() para que siga corriendo la api, al final lo terminará capturando el manejador de errores
    next(error)
  }
};

export const isMerchant = async (req, res, next) => {
  try {
    const isMerchant = req.user.role === 'merchant'

    if (!isMerchant) return CustomError.new(dictionary.authorization)

    next();
  }
  catch (error) {
    next(error)
  }
}

export const isTraveler = async (req, res, next) => {
  try {
    const isMerchant = req.user.role === 'traveler'

    if (!isMerchant) return CustomError.new(dictionary.authorization)

    next();
  }
  catch (error) {
    next(error)
  }
}

export const validateId = (req, res, next) => {
  const { id } = req.params;
  try {
    if (!isValidObjectId(id)) return CustomError.new(dictionary.invalidId)
    next();
  }
  catch (error) {
    next(error)
  }
};

export const isReviewAuthor = async (req, res, next) => {
  const reviewId = req.params.id
  try {
    const review = await Review.findById(reviewId)

    if (!review) return CustomError.new(dictionary.reviewNotFound)

    const isAuthor = req.user._id.toString() === review.user.toString()

    if (!isAuthor) return CustomError.new(dictionary.authorization)

    next();
  }
  catch (error) {
    next(error)
  }
}

export const isReservationAuthor = async (req, res, next) => {
  const reservationId = req.params.id
  try {
    const reservation = await Reservation.findById(reservationId)

    if (!reservation) return CustomError.new(dictionary.reservationNotFound)

    const isAuthor = req.user._id.toString() === reservation.user.toString()

    if (!isAuthor) return CustomError.new(dictionary.authorization)

    next();
  }
  catch (error) {
    next(error)
  }
}

export const isRouteAuthor = async (req, res, next) => {
  const routeId = req.params.id
  try {
    const route = await Route.findById(routeId)

    if (!route) return CustomError.new(dictionary.routeNotFound)

    const isAuthor = req.user._id.toString() === route.user.toString()

    if (!isAuthor) return CustomError.new(dictionary.authorization)

    next();
  }
  catch (error) {
    next(error)
  }
}