const Joi = require('joi');

const createUserSchema = Joi.object({
  name: Joi.string().required(),
  login: Joi.string().required(),
  password: Joi.string().required()
});

const updateUserSchema = Joi.object({
  id: Joi.string(),
  name: Joi.string(),
  login: Joi.string(),
  password: Joi.string()
});

module.exports = {
  createUserSchema,
  updateUserSchema
};
