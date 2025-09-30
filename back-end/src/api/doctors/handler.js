import ClientError from '../../exceptions/ClientError.js'

export default class DoctorsHandler {
  constructor(service, validator) {
    this._service = service,
    this._validator = validator

    this.postDoctorHandler = this.postDoctorHandler.bind(this);
    this.getAllDoctorHandler = this.getAllDoctorHandler.bind(this);
    this.getHistoryDoctorsHandler = this.getHistoryDoctorsHandler.bind(this);
    this.getDoctorByIdHandler = this.getDoctorByIdHandler.bind(this);
    this.putDoctorHandler = this.putDoctorHandler.bind(this);
    this.deleteDoctorHandler = this.deleteDoctorHandler.bind(this);
  }

  async postDoctorHandler(request, h) {
    try {
      this._validator.validateDoctorPayload(request.payload);
      await this._service.addDoctor(request.payload);

      return h.response({
        status: 'success',
        message: 'Dokter berhasil ditambahkan'
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

  async getAllDoctorHandler(request, h) {
    try {
      const data = await this._service.getAllDoctor();

      return h.response({
        status: 'success',
        data
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

  async getHistoryDoctorsHandler(request, h) {
    try {
      const { id } = request.auth.credentials;
      const data = await this._service.getHistoryDoctors(id);

      return h.response({
        status: 'success',
        data
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

  async getDoctorByIdHandler(request, h) {
    try {
      const { id } = request.params;
      const data = await this._service.getDoctorById(id);

      return h.response({
        status: 'success',
        data
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

  async putDoctorHandler(request, h) {
    try {
      this._validator.validateDoctorPayload(request.payload);
      const { idDoctor } = request.params;
      await this._validator.putDoctor(idDoctor, request.payload);

      return h.response({
        status: 'success',
        message: 'Dokter berhasil diperbarui'
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

  async deleteDoctorHandler(request, h) {
    try {
      const { id } = request.params;
      await this._service.deleteDoctor(id);

      return h.response({
        status: 'success',
        message: 'Dokter berhasil dihapus'
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