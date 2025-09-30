/* eslint-disable no-trailing-spaces */
import ClientError from '../../exceptions/ClientError.js';
 
export default class CollaborationsHandler {
  constructor(service, validator) {
    this._collaborationsService = service;
    this._validator = validator;

    this.postCollaborationsHandler = this.postCollaborationsHandler.bind(this);
  }
 
  async postCollaborationsHandler(request, h) {
    try {
      this._validator.validateCollaborationsPayload(request.payload);
      const { id: credentialId } = request.auth.credentials;
      const { doctorId } = request.payload;

      const collaborationId = await this._collaborationsService.addCollaboration(doctorId, credentialId);
  
      const response = h.response({
        status: 'success',
        message: 'Kolaborasi berhasil ditambahkan',
        data: {
          collaborationId,
        },
      });
      response.code(201);
      return response;      
    } catch (error) {
      if (error instanceof ClientError) {
        const response = h.response({
          status: 'fail',
          message: error.message,
        });
        response.code(error.statusCode);
        return response;
      }

      // Server ERROR!
      const response = h.response({
        status: 'error',
        message: 'Maaf, terjadi kegagalan pada server kami.',
      });
      response.code(500);
      console.error(error);
      return response;
    }
  }
}