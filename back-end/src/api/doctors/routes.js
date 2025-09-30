export default (handler) => [
  {
    method: 'POST',
    path: '/doctor',
    handler: handler.postDoctorHandler,
    options: {
      auth: false,
      cors: {
        origin: ['*']
      }
    }
  },
  {
    method: 'GET',
    path: '/doctor',
    handler: handler.getAllDoctorHandler,
    options: {
      auth: false,
      cors: {
        origin: ['*']
      }
    }
  },
  {
    method: 'GET',
    path: '/doctor/me',
    handler: handler.getHistoryDoctorsHandler,
    options: {
      auth: 'JagaSehatApp_JWT',
      cors: {
        origin: ['*']
      }
    }
  },
  {
    method: 'GET',
    path: '/doctor/{id}',
    handler: handler.getDoctorByIdHandler,
    options: {
      auth: false,
      cors: {
        origin: ['*']
      }
    }
  },
  {
    method: 'PUT',
    path: '/doctor/{id}',
    handler: handler.putDoctorHandler,
    options: {
      auth: false,
      cors: {
        origin: ['*']
      }
    }
  },
  {
    method: 'DELETE',
    path: '/doctor/{id}',
    handler: handler.deleteDoctorHandler,
    options: {
      auth: false,
      cors: {
        origin: ['*']
      }
    }
  }
]