import Joi from 'joi';

const coordinatesValidator = (value, helpers) => {
  try {
    const coordsArray = value.split(',').map(Number);

    if (coordsArray.some(isNaN) || coordsArray.length !== 2) {
      return helpers.error('any.invalid');
    }

    return coordsArray;
  } catch (error) {
    return helpers.error('any.invalid');
  }
}

const coordinatesSchema = Joi.custom(coordinatesValidator)
  .required()
  .messages({
    'any.invalid': 'Las coordenadas deben contener dos números',
    'any.required': 'Las coordenadas son requeridas'
  });

// Esquema de validación para la consulta de rutas
export const coordsSchema = Joi.object({
  start: coordinatesSchema,
  end: coordinatesSchema
});

const coordinateArraySchema = Joi.array().items(
  Joi.number().required()
).length(2).items(
  Joi.number().required()
).required().messages({
  'array.base': 'Las coordenadas deben ser un array',
  'array.length': 'Las coordenadas deben contener exactamente dos elementos',
  'number.base': 'Las coordenadas deben ser números',
  'any.required': 'Las coordenadas son requeridas'
});

export const routeSchema = Joi.object({
  user: Joi.string().required().messages({
    'string.empty': 'El campo de usuario es requerido',
    'any.required': 'El campo de usuario es requerido'
  }),
  start: coordinateArraySchema.messages({
    'array.base': 'El punto de inicio debe ser un array de coordenadas [longitud, latitud]',
    'array.length': 'El punto de inicio debe contener exactamente dos coordenadas',
  }),
  end: coordinateArraySchema.messages({
    'array.base': 'El punto de finalización debe ser un array de coordenadas [longitud, latitud]',
    'array.length': 'El punto de finalización debe contener exactamente dos coordenadas',
  }),
  waypoints: Joi.array().items(Joi.string()).optional().messages({
    'array.base': 'Los puntos de ruta deben ser una lista de IDs de restaurantes',
    'string.base': 'Cada punto de ruta debe ser un ID de restaurante',
  })
});