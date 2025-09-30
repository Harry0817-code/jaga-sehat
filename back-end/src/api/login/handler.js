import ClientError from '../../exceptions/ClientError.js'

export default class LoginHandler {
  constructor(authenticationsService, usersService, tokenManager, validator) {
    this._authenticationsService = authenticationsService;
    this._usersService = usersService;
    this._tokenManager = tokenManager;
    this._validator = validator;
    
    this.postLoginHandler = this.postLoginHandler.bind(this);
  }

  async postLoginHandler(request , h) {
    try {
      this._validator.validatePostAuthenticationPayload(request.payload);

      const id = await this._usersService.verifyUserCredential(request.payload);

      const accessToken = await this._tokenManager.generateAccessToken({ id });
      const refreshToken = await this._tokenManager.generateRefreshToken({ id });

      await this._authenticationsService.addRefreshToken(refreshToken);

      return h.response({
        status: 'success',
        message: 'Authentication berhasil ditambahkan',
        data: {
          accessToken,
          refreshToken
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