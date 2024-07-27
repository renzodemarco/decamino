export default class ReservationDTO {
  constructor(reservation) {
    this.id = reservation._id
    this.user = reservation.user
    this.restaurant = reservation.restaurant.title
    this.restaurantId =  reservation.restaurant._id
    this.date = reservation.date
    this.numberOfPeople = reservation.numberOfPeople
    this.status = reservation.status
    this.paymentId = reservation.paymentId
    this.createdAt = reservation.createdAt
  }
}