const Joi = require('joi');

const createTaskSchema = Joi.object({
  title: Joi.string().required(),
  order: Joi.number().required(),
  description: Joi.string().required(),
  userId: Joi.string()
    .required()
    .allow(null),
  boardId: Joi.string()
    .required()
    .allow(null),
  columnId: Joi.string()
    // .required()
    .allow(null)
});

const updateTaskSchema = Joi.object({
  id: Joi.string(),
  title: Joi.string(),
  order: Joi.number(),
  description: Joi.string(),
  userId: Joi.string().allow(null),
  boardId: Joi.string().allow(null),
  columnId: Joi.string().allow(null)
});

module.exports = {
  createTaskSchema,
  updateTaskSchema
};
