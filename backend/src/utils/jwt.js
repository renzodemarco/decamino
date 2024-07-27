import jwt from 'jsonwebtoken'
import env from '../config/env.js'

const SECRET = env.JWT_SECRET

export const generateToken = (payload) => jwt.sign(payload, SECRET, { expiresIn: '168h' })

export const verifyToken = (token) => jwt.verify(token, SECRET)