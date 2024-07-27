import mongoose from 'mongoose'

export default class MongoSingleton {

  static #instance

  constructor() {
    if (!MongoSingleton.#instance) {
      MongoSingleton.#instance = this;
      this.connect();
    }
    return MongoSingleton.#instance;
  }

  async connect() {
    try {
      await mongoose.connect(process.env.MONGO_URI);
      console.log('Connected to MongoDB');
    } catch (error) {
      console.error('Error connecting to MongoDB', error);
      process.exit(1);
    }
  }

  static getInstance() {
    if (this.#instance) {
      console.log('MongoDB already connected')
    } else {
      this.#instance = new MongoSingleton()
      console.log('Connecting to MongoDB...')
    }
    return this.#instance
  }
}