import Joi from 'joi';

export const createSchema = Joi.object({
  restaurant: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
    'string.empty': 'El ID del restaurante es requerido',
    'any.required': 'El ID del restaurante es requerido',
    'string.pattern.base': 'El ID del restaurante debe ser un ObjectId válido'
  }),
  rating: Joi.number().min(1).max(10).required().messages({
    'number.base': 'El rating debe ser un número',
    'number.min': 'El rating debe ser al menos 1',
    'number.max': 'El rating no puede ser mayor a 10',
    'any.required': 'El rating es requerido'
  }),
  comment: Joi.string().required().messages({
    'string.empty': 'El comentario no puede estar vacío',
    'any.required': 'El comentario es requerido'
  })
});

export const updateSchema = Joi.object({
  rating: Joi.number().min(1).max(10).messages({
    'number.base': 'El rating debe ser un número',
    'number.min': 'El rating debe ser al menos 1',
    'number.max': 'El rating no puede ser mayor a 10'
  }),
  comment: Joi.string().messages({
    'string.empty': 'El comentario no puede estar vacío'
  })
}).or('rating', 'comment').messages({
  'object.missing': 'Al menos un campo debe ser proporcionado para la actualización'
});