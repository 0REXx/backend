const Joi = require('joi');

const createListSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  members: Joi.array().items(
    Joi.object({
      userId: Joi.string().required(),
      role: Joi.string().valid('owner', 'member').required(),
    })
  ).optional(),
});

module.exports = createListSchema;