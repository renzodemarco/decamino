import * as routeServices from '../services/route.service.js'
import { coordsSchema, routeSchema } from '../schemas/route.schema.js';
import CustomError from '../utils/custom.error.js'

export const GETRoute = async (req, res, next) => {
  try {
    const { start, end } = req.query

    const { error, value } = coordsSchema.validate({ start, end });

    if (error) return CustomError.new({ status: 400, message: error.details[0].message })

    const { start: startCoords, end: endCoords } = value;

    const route = await routeServices.readRouteAndRestaurants(startCoords, endCoords);

    const routeSummary = {
      distance: route.features[0].properties.segments[0].distance,
      duration: route.features[0].properties.segments[0].duration,
      start: route.features[0].geometry.coordinates[0],
      end: route.features[0].geometry.coordinates.slice(-1)[0],
      steps: route.features[0].properties.segments[0].steps,
      restaurants: route.restaurants
    };

    res.status(200).json(routeSummary)
  }
  catch (error) {
    next(error)
  }
};

export const GETUserRoutes = async (req, res, next) => {
  const user = req.user.id
  try {
    const response = await routeServices.readUserRoutes(user)
    return res.status(200).json(response)
  }
  catch (error) {
    next(error)
  }
}

export const POSTRoute = async (req, res, next) => {
  const user = req.user.id
  const data = req.body
  try {
    const { error, value } = routeSchema.validate({ user, ...data });

    if (error) return CustomError.new({ status: 400, message: error.details[0].message })

    const response = await routeServices.createRoute(value)

    res.status(200).json(response)
  }
  catch (error) {
    next(error)
  }
};

export const DELETERoute = async (req, res, next) => {
  const { id } = req.params
  try {
    const response = await routeServices.destroyRoute(id)
    res.status(200).json(response)
  }
  catch (error) {
    next(error)
  }
}