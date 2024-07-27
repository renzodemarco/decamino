import mongoose, { Schema } from "mongoose";

const restaurantSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      default: 'Point',
      required: true
    },
    coordinates: {
      type: [Number], // Coordenadas en formato [longitud, latitud]
      index: '2dsphere',
      required: true
    }
  },
  photos: [{
    type: String
  }],
  description: {
    type: String,
    required: true
  },
  cuisine: [{
    type: String
  }],
  schedule: {
    type: Map,
    of: String
  },
  reservationPrice: {
    type: Number,
    required: true
  },
  dineIn: {
    type: Boolean,
    default: true
  },
  takeAway: {
    type: Boolean,
    default: false
  }
},
  {
    timestamps: true
  });

restaurantSchema.index({ location: '2dsphere' })

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

export default Restaurant;