import * as userServices from '../services/user.service.js'
import { generateToken } from '../utils/jwt.js';
import { registerSchema, loginSchema, updateSchema } from '../schemas/user.schema.js'
import UserDTO from '../utils/user.dto.js'
import CustomError from '../utils/custom.error.js';
import fs from 'fs'
import dictionary from '../utils/error.dictionary.js';

export const POSTUserRegister = async (req, res, next) => {
  const data = req.body;
  try {
    const { error, value } = registerSchema.validate(data);

    if (error) return CustomError.new({ status: 400, message: error.details[0].message })

    const response = await userServices.registerUser(value);

    return res.status(201).json(response);

  } catch (error) {
    next(error)
  }
}

export const POSTUserLogin = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const { error } = loginSchema.validate({ email, password });

    if (error) return CustomError.new({ status: 400, message: error.details[0].message })

    const user = await userServices.loginUser(email, password)

    const userData = new UserDTO(user);

    const token = generateToken({ ...userData })

    return res.status(200).json({ token })

  } catch (error) {
    next(error)
  }
}

export const POST2faSetup = async (req, res, next) => {
  const { id } = req.user

  try {
    const response = await userServices.create2fa(id)
    return res.status(200).json(response);
  }
  catch (error) {
    next(error)
  }
}

export const PUTProfileImg = async (req, res, next) => {
  const { id } = req.user

  try {
    if (!req.file) {
      return CustomError.new(dictionary.missingFile)
    }

    const result = await userServices.uploadProfileImg(id, req.file)

    fs.unlinkSync(req.file.path);  // Eliminación de la imagen en local

    res.status(200).json({ message: 'Imagen subida exitosamente', url: result.profileImg });
  }
  catch (error) {
    next(error)
  }
}

export const GETUser = async (req, res, next) => {
  const { id } = req.user
  try {
    const user = await userServices.readUser(id)
    return res.status(200).json({ response: new UserDTO(user) });
  }
  catch (error) {
    next(error)
  }
}

export const PUTUser = async (req, res, next) => {
  const { id } = req.user
  const data = req.body
  try {
    const { error, value } = updateSchema.validate(data);

    if (error) return CustomError.new({ status: 400, message: error.details[0].message })

    const response = await userServices.updateUser(id, value)

    return res.status(200).json({ response: new UserDTO(response) });
  }
  catch (error) {
    next(error)
  }
}

export const DELETEUser = async (req, res, next) => {
  const { id } = req.user
  try {
    await userServices.destroyUser(id)
    return res.status(200).json({ response: `Usuario ${id} eliminado` });
  }
  catch (error) {
    next(error)
  }
}

export const POSTFavorite = async (req, res, next) => {
  const { id } = req.user
  const restaurant = req.params.id
  try {
    const response = await userServices.addFavoriteRestaurant(id, restaurant)
    return res.status(200).json({ response: new UserDTO(response) });
  }
  catch (error) {
    next(error)
  }
}

export const DELETEFavorite = async (req, res, next) => {
  const { id } = req.user
  const restaurant = req.params.id
  try {
    const response = await userServices.removeFavoriteRestaurant(id, restaurant)
    return res.status(200).json({ response: new UserDTO(response) });
  }
  catch (error) {
    next(error)
  }
}