export default (handler) => [
  {
    method: 'POST',
    path: '/register',
    handler: handler.postUsersHandler,
    options: {
      auth: false,
      cors: {
        origin: ['*']
      }
    }
  },
  {
    method: 'GET',
    path: '/user/me',
    handler: handler.getLoggedUsersHandler,
    options: {
      auth: 'JagaSehatApp_JWT',
      cors: {
        origin: ['*']
      }
    }
  }
];