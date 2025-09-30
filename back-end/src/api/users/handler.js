import ClientError from '../../exceptions/ClientError.js'

export default class UsersHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;

    this.postUsersHandler = this.postUsersHandler.bind(this);
    this.getLoggedUsersHandler = this.getLoggedUsersHandler.bind(this);
  }

  async postUsersHandler(request, h) {
    try {
      this._validator.validateUserPayload(request.payload);

      await this._service.addUser(request.payload);

      return h.response({
        status: 'success',
        message: 'Pengguna berhasil ditambahkan'
      }).code(200);
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

  async getLoggedUsersHandler(request, h) {
    try {
      const { id } = request.auth.credentials;
      const user = await this._service.getLoggedUsers(id);

      return h.response({
        status: 'success',
        message: 'Pengguna berhasil didapatkan',
        data: {
          user
        }
      }).code(200);
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