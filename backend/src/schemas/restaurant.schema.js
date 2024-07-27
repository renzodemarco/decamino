import Joi from 'joi';

export const createSchema = Joi.object({
  title: Joi.string().required().messages({
    'string.empty': 'El título del restaurante es requerido',
    'any.required': 'El título del restaurante es requerido'
  }),
  location: Joi.array().items(Joi.number()).length(2).required().messages({
    'array.base': 'La ubicación debe ser un array de números',
    'array.length': 'La ubicación debe contener exactamente dos números (longitud y latitud)',
    'any.required': 'La ubicación del restaurante es requerida'
  }).custom((value, helpers) => {
    const [long, lat] = value;
    if (typeof long !== 'number' || typeof lat !== 'number') {
      return helpers.message('La longitud y la latitud deben ser números');
    }
    return value;
  }),
  description: Joi.string().required().messages({
    'string.empty': 'La descripción del restaurante es requerida',
    'any.required': 'La descripción del restaurante es requerida'
  }),
  cuisine: Joi.array().items(Joi.string()).messages({
    'array.base': 'El tipo de cocina debe ser una lista de cadenas de texto'
  }),
  schedule: Joi.object().pattern(
    Joi.string().valid(
      'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
    ),
    Joi.string().pattern(/^\d{2}:\d{2}-\d{2}:\d{2}$/).messages({
      'string.pattern.base': 'El horario debe tener el formato HH:MM-HH:MM'
    })
  ).messages({
    'object.base': 'El horario debe ser un objeto con días de la semana como claves y horarios como valores'
  }),
  reservationPrice: Joi.number().required().messages({
    'number.base': 'El precio de la reserva por persona debe ser un número',
    'any.required': 'El precio de la reserva por persona es requerido'
  }),
  dineIn: Joi.boolean().default(true).messages({
    'boolean.base': 'El valor de dineIn debe ser booleano'
  }),
  takeAway: Joi.boolean().default(false).messages({
    'boolean.base': 'El valor de takeAway debe ser booleano'
  })
})

export const updateSchema = Joi.object({
  title: Joi.string().messages({
    'string.empty': 'El título del restaurante no puede estar vacío'
  }),
  location: Joi.array().items(Joi.number()).length(2).messages({
    'array.base': 'La ubicación debe ser un array de números',
    'array.length': 'La ubicación debe contener exactamente dos números (longitud y latitud)'
  }).custom((value, helpers) => {
    const [long, lat] = value;
    if (typeof long !== 'number' || typeof lat !== 'number') {
      return helpers.message('La longitud y la latitud deben ser números');
    }
    return value;
  }),
  description: Joi.string().messages({
    'string.empty': 'La descripción del restaurante no puede estar vacía'
  }),
  cuisine: Joi.array().items(Joi.string()).messages({
    'array.base': 'El tipo de cocina debe ser una lista de cadenas de texto'
  }),
  schedule: Joi.object().pattern(
    Joi.string().valid(
      'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'
    ),
    Joi.string().pattern(/^\d{2}:\d{2}-\d{2}:\d{2}$/).messages({
      'string.pattern.base': 'El horario debe tener el formato HH:MM-HH:MM'
    })
  ).messages({
    'object.base': 'El horario debe ser un objeto con días de la semana como claves y horarios como valores'
  }),
  reservationPrice: Joi.number().messages({
    'number.base': 'El precio de la reserva por persona debe ser un número'
  }),
  dineIn: Joi.boolean().messages({
    'boolean.base': 'El valor de dineIn debe ser booleano'
  }),
  takeAway: Joi.boolean().messages({
    'boolean.base': 'El valor de takeAway debe ser booleano'
  })
}).min(1).messages({
  'object.min': 'Debe haber al menos un campo para actualizar'
});