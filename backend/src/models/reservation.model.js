import mongoose, { Schema } from "mongoose"

// Definir el esquema de la reserva
const reservationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant',
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  numberOfPeople: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['pendiente', 'confirmada', 'cancelada'],
    required: true
  },
  paymentId: {
    type: Schema.Types.ObjectId,
    ref: 'Payment'
  }
},
  {
    timestamps: true
  });

const populateRestaurant = function (next) {
  this.populate('restaurant');
  next();
};

reservationSchema.pre('find', populateRestaurant);
reservationSchema.pre('findOne', populateRestaurant);
reservationSchema.pre('findById', populateRestaurant);
reservationSchema.pre('findOneAndUpdate', populateRestaurant);
reservationSchema.pre('findByIdAndUpdate', populateRestaurant);

// Crear el modelo de la reserva
const Reservation = mongoose.model('Reservation', reservationSchema);

// Exportar el modelo
export default Reservation;
