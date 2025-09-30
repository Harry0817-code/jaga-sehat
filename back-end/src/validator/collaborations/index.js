import InvariantError from '../../exceptions/InvariantError.js';
import { collaborationsPayloadSchema } from './schema.js';

const collaborationsValidator = {
  validateCollaborationsPayload: (payload) => {
    const validationResult = collaborationsPayloadSchema.validate(payload);

    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

export default collaborationsValidator;