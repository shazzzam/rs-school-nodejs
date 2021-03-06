const Joi = require('joi');

const createColumnSchema = Joi.object({
  title: Joi.string().required(),
  order: Joi.number().required()
});

const createBoardSchema = Joi.object({
  title: Joi.string().required(),
  columns: Joi.array().items(createColumnSchema)
});

const updateColumnSchema = Joi.object({
  _id: Joi.string(),
  title: Joi.string(),
  order: Joi.number()
});

const updateBoardSchema = Joi.object({
  id: Joi.string(),
  title: Joi.string(),
  columns: Joi.array().items(updateColumnSchema)
});

module.exports = {
  createColumnSchema,
  createBoardSchema,
  updateColumnSchema,
  updateBoardSchema
};
