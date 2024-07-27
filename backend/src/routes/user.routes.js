import { Router } from "express";
import * as userController from '../controllers/user.controller.js';
import { isTraveler, requireAuth, validateId } from "../middlewares/auth.middlewares.js";
import { upload } from "../middlewares/multer.middleware.js";
import { restaurantExist } from "../middlewares/restaurant.middlewares.js";

const router = Router();

router.post('/register', userController.POSTUserRegister)
  .post('/login', userController.POSTUserLogin)
  .post('/2fa/setup', requireAuth, userController.POST2faSetup)
  .put('/profile-img/upload', requireAuth, upload.single('profileImg'), userController.PUTProfileImg)
  .get('/profile', requireAuth, userController.GETUser)
  .put('/profile', requireAuth, userController.PUTUser)
  .delete('/destroy', requireAuth, userController.DELETEUser)
  .post('/favorites/:id', requireAuth, isTraveler, validateId, restaurantExist, userController.POSTFavorite)
  .delete('/favorites/:id', requireAuth, isTraveler, validateId, restaurantExist, userController.DELETEFavorite)


export default router;
