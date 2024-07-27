import mongoose, { Schema } from "mongoose";
import bcrypt from 'bcrypt'

const userSchema = new Schema({
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  twoFactorSecret: {
    type: String,
  },
  twoFactorEnabled: {
    type: Boolean,
    default: false,
  },
  role: {
    type: String,
    enum: ['merchant', 'traveler'],
    required: true
  },
  phoneNumber: {
    type: String
  },
  profileImg: {
    type: String,
    default: "https://res.cloudinary.com/dw7nvkjxx/image/upload/v1717541551/Empleos-Formosa/Profile-IMG/T10_ajkdtb.png"
  },
  history: [{
    type: Schema.Types.ObjectId,
    ref: 'history',
    default: []
  }],
  favorites: [{
    type: Schema.Types.ObjectId,
    ref: 'Restaurant'
  }],
  restaurant: {
    type: Schema.Types.ObjectId,
    ref: 'Restaurant'
  }
},
  {
    timestamps: true
  });

userSchema.pre('save', async function (next) {
  if (this.isModified('password') || this.isNew) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  this.username = this.username.trim();
  this.email = this.email.trim();
  next();
});

userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

export default User;