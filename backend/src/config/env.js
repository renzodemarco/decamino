import dotenv from 'dotenv'
import args from './args.js'

dotenv.config({
  path: args.mode === 'dev' ? './.env' : './.env.dev',
})

export default {
  MONGO_URI: process.env.MONGO_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  BASE_URL: process.env.BASE_URL,
  CLOUD_NAME: process.env.CLOUD_NAME,
  CLOUDINARY_KEY: process.env.CLOUDINARY_KEY,
  CLOUDINARY_SECRET: process.env.CLOUDINARY_SECRET,
  STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY
}