export default class UserDTO {
  constructor(user) {
    this.id = user.id
    this.username = user.username
    this.email = user.email
    this.twoFactorEnabled = user.twoFactorEnabled
    this.role = user.role
    this.phoneNumber = user.phoneNumber
    this.profileImg = user.profileImg
    this.history = user.history
    this.role === 'traveler' ? this.favorites = user.favorites : null
    this.role === 'merchant' ? this.restaurant = user.restaurant : null
  }
}