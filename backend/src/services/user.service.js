import speakeasy from 'speakeasy'
import qrcode from 'qrcode'
import User from '../models/user.model.js';
import CustomError from '../utils/custom.error.js';
import dictionary from '../utils/error.dictionary.js'
import { uploadProfileImage } from '../config/cloudinary.js';
import Restaurant from '../models/restaurant.model.js';

export const registerUser = async (data) => {
  try {
    const user = await User.findOne({ email: data.email })

    if (user) return CustomError.new(dictionary.emailExists)

    const response = await User.create(data)

    return response
  }
  catch (error) {
    throw error
  }
}

export const loginUser = async (email, password, otpToken) => {
  console.log("Servicio Login: " + email + password + otpToken)
  try {
    const user = await User.findOne({ email })

    if (!user) {
      return CustomError.new(dictionary.userNotFound)
    }

    const isMatch = await user.comparePassword(password, user.password)

    if (!isMatch) {
      return CustomError.new(dictionary.userOrPassword)
    }

    if (user.twoFactorEnabled) {
      if (!otpToken) return CustomError.new(dictionary.requiresTOTP)

      const verified = speakeasy.totp.verify({
        secret: user.twoFactorSecret,
        encoding: 'base32',
        token: otpToken,
        window: 1
      });

      if (!verified) return CustomError.new(dictionary.invalidTOTP)
    }

    return user
  }
  catch (error) {
    throw error
  }
}

export const create2fa = async (id) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      return CustomError.new(dictionary.userNotFound)
    }

    const secret = speakeasy.generateSecret({ length: 20 });

    user.twoFactorSecret = secret.base32;
    user.twoFactorEnabled = true
    await user.save();

    const otpauth_url = speakeasy.otpauthURL({
      secret: secret.base32,
      label: 'deCamino',
      issuer: 'deCamino'
    })
    const data_url = await qrcode.toDataURL(otpauth_url);

    return { userId: user._id, secret: secret.base32, qrCode: data_url };
  }
  catch (error) {
    throw error
  }
}

export const uploadProfileImg = async (id, file) => {
  try {
    const result = await uploadProfileImage(file, id)

    const user = await User.findByIdAndUpdate(id, { profileImg: result.secure_url }, { new: true })

    return user
  }
  catch (error) {
    throw error
  }
}

export const readUser = async (id) => {
  try {
    const user = await User.findById(id)

    if (!user) {
      return CustomError.new(dictionary.userNotFound)
    }

    return user
  }
  catch (error) {
    throw (error)
  }
}

export const updateUser = async (id, data) => {
  try {
    const user = await User.findById(id)

    if (!user) {
      return CustomError.new(dictionary.userNotFound)
    }

    const updatedUser = await User.findByIdAndUpdate(id, data, { new: true })

    return updatedUser
  }
  catch (error) {
    throw error
  }
}

export const destroyUser = async (id) => {
  try {
    const user = await User.findById(id)

    if (!user) {
      return CustomError.new(dictionary.userNotFound)
    }

    if (user.restaurant) await Restaurant.findByIdAndDelete(user.restaurant)

    const response = await User.findByIdAndDelete(id)

    return response
  }
  catch (error) {
    throw error
  }
}

export const addFavoriteRestaurant = async (userId, restaurantId) => {
  try {
    const user = await User.findById(userId);

    if (user.favorites.includes(restaurantId)) return CustomError.new(dictionary.alreadyInFavorites)

    user.favorites.push(restaurantId);
    await user.save();
    return user;
  }
  catch (error) {
    throw error
  }
}

export const removeFavoriteRestaurant = async (userId, restaurantId) => {
  try {
    const user = await User.findById(userId);

    const index = user.favorites.indexOf(restaurantId);

    if (index === -1) return CustomError.new(dictionary.notInFavorites)

    user.favorites.splice(index, 1);
    await user.save();
    return user;
  }
  catch (error) {
    throw error
  }
}