import * as Joi from 'joi';

export const validateSchema = Joi.object({
  NODE_ENV: Joi.string().valid('development', 'production'),
  PORT: Joi.number().port().default(3000),
});
