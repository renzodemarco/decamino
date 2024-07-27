import { Router } from "express";
import * as restaurantController from '../controllers/restaurant.controller.js';
import { requireAuth, isMerchant, validateId } from "../middlewares/auth.middlewares.js";
import { hasRestaurant } from '../middlewares/restaurant.middlewares.js'
import { uploadMultiple } from "../middlewares/multer.middleware.js";

const router = Router();

router.post('/', requireAuth, isMerchant, restaurantController.POSTRestaurant)
  .post('/photos', requireAuth, isMerchant, hasRestaurant, uploadMultiple, restaurantController.POSTRestaurantPhotos)
  .get('/', restaurantController.GETRestaurants)
  .get('/:id', validateId, restaurantController.GETRestaurantById)
  .put('/', requireAuth, isMerchant, hasRestaurant, restaurantController.PUTRestaurant)
  .delete('/', requireAuth, isMerchant, hasRestaurant, restaurantController.DELETERestaurant)
  .delete('/photos', requireAuth, isMerchant, hasRestaurant, restaurantController.DELETERestaurantPhoto)

export default router;