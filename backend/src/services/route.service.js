import OpenRouteService from 'openrouteservice-js'
import Restaurant from '../models/restaurant.model.js'
import Route from '../models/route.models.js'
import simplify from 'simplify-js';

const Directions = new OpenRouteService.Directions({
  api_key: process.env.TOKEN_ROUTES
});

export const readRouteAndRestaurants = async (start, end) => {
  try {
    const route = await Directions.calculate({
      coordinates: [start, end],
      profile: 'driving-car',
      format: 'geojson'
    });

    const coordinates = route.features[0].geometry.coordinates;

    // Convertir las coordenadas a un formato adecuado para simplify-js
    const points = coordinates.map(coord => ({ x: coord[0], y: coord[1] }));

    // Simplificar la ruta
    const tolerance = 0.0001
    const simplifiedPoints = simplify(points, tolerance)

    // Convertir de nuevo a coordenadas
    const simplifiedCoordinates = simplifiedPoints.map(point => [point.y, point.x]);

    const bufferDistance = 8000  // Distancia en metros
    const earthRadiusInMeters = 6378137  // Radianes de la Tierra}
    const bufferInRadians = bufferDistance / earthRadiusInMeters

    let restaurants = [];

    for (let coord of simplifiedCoordinates) {
      const nearbyRestaurants = await Restaurant.find({
        location: {
          $geoWithin: {
            $centerSphere: [coord, bufferInRadians]
          }
        }
      });
      restaurants.push(...nearbyRestaurants);
    }

    // Eliminar duplicados
    restaurants = Array.from(new Set(restaurants.map(r => r._id.toString())))
      .map(id => restaurants.find(r => r._id.toString() === id));

    return { ...route, restaurants }
  }
  catch (error) {
    throw error
  }
}

export const readUserRoutes = async (id) => {
  try {
    const response = await Route.find({ user: id })
    return response
  }
  catch (error) {
    throw error
  }
}

export const createRoute = async (data) => {
  try {
    const response = await Route.create(data)
    return response
  }
  catch (error) {
    throw error
  }
}

export const destroyRoute = async (id) => {
  try {
    const response = await Route.findByIdAndDelete(id)
    return response
  }
  catch (error) {
    throw error
  }
}
