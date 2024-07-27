import { Router } from 'express'
import * as reservationController from '../controllers/reservation.controller.js'
import { hasRestaurant } from '../middlewares/restaurant.middlewares.js'
import { isMerchant, isTraveler, requireAuth, validateId, isReservationAuthor } from '../middlewares/auth.middlewares.js'

const router = Router();

router.post('/restaurant/:id', requireAuth, isTraveler, validateId, reservationController.POSTReservation)  // Viajero crea una reserva
  .put('/:id/cancel', requireAuth, isTraveler, validateId, isReservationAuthor, reservationController.PUTReservationCancel)  // Viajero cancela su reserva
  .get('/', requireAuth, isTraveler, reservationController.GETUserReservations)  // Viajero lee sus reservas
  .get('/restaurant/', requireAuth, isMerchant, hasRestaurant, reservationController.GETRestaurantReservations)  // Comerciante lee las reservas de su restaurant
  .put('/:id', requireAuth, isMerchant, validateId, reservationController.PUTReservationStatus)  // Cambia el estado de una reserva

export default router;
