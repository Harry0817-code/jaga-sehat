import Joi from 'joi';

export const collaborationsPayloadSchema = Joi.object({
  doctorId: Joi.string().required(),
});