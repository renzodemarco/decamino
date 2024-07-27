import { Router } from 'express'
import * as reviewsController from '../controllers/review.controller.js'
import { requireAuth, isTraveler, isReviewAuthor, validateId } from '../middlewares/auth.middlewares.js'

const router = Router();

// Rutas para las reviews
router.post('/restaurant/:id', requireAuth, isTraveler, validateId, reviewsController.POSTReview)
  .get('/restaurant/:id', validateId, reviewsController.GETReviewsByRestaurant)
  .get('/:id', validateId, reviewsController.GETReviewById)
  .put('/:id', requireAuth, isTraveler, validateId, isReviewAuthor, reviewsController.PUTReview)
  .delete('/:id', requireAuth, isTraveler, validateId, isReviewAuthor, reviewsController.DELETEReview)

export default router;