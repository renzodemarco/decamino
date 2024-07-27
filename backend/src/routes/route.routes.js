import express from 'express';
import * as routeController from '../controllers/route.controller.js';
import { isRouteAuthor, isTraveler, requireAuth, validateId } from '../middlewares/auth.middlewares.js';
import { waypointsExist } from '../middlewares/restaurant.middlewares.js'

const router = express.Router();

router.get('/', routeController.GETRoute)
.get('/user', requireAuth, isTraveler, routeController.GETUserRoutes)
.post('/', requireAuth, isTraveler, waypointsExist, routeController.POSTRoute)
.delete('/:id', requireAuth, validateId, isRouteAuthor, routeController.DELETERoute)

export default router;