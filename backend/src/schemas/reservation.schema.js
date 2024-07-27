import Joi from 'joi';

export const createSchema = Joi.object({
  restaurant: Joi.string().regex(/^[0-9a-fA-F]{24}$/).required().messages({
    'string.empty': 'El ID del restaurante es requerido',
    'any.required': 'El ID del restaurante es requerido',
    'string.pattern.base': 'El ID del restaurante debe ser un ObjectId válido'
  }),
  date: Joi.date().required().messages({
    'date.base': 'La fecha debe ser una fecha válida',
    'any.required': 'La fecha es requerida'
  }),
  numberOfPeople: Joi.number().integer().positive().required().messages({
    'number.base': 'El número de personas debe ser un número',
    'number.integer': 'El número de personas debe ser un número entero',
    'number.positive': 'El número de personas debe ser un número positivo',
    'any.required': 'El número de personas es requerido'
  })
});

export const updateSchema = Joi.object({
  status: Joi.string().valid('pendiente', 'confirmada', 'cancelada').required().messages({
    'string.empty': 'El estado es requerido',
    'any.required': 'El estado es requerido',
    'any.only': 'El estado debe ser uno de los siguientes: pendiente, confirmada, cancelada'
  })
});