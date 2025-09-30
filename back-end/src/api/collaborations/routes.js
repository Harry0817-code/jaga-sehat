export default (handler) => [
  {
    method: 'POST',
    path: '/collaborations',
    handler: handler.postCollaborationsHandler,
    options: {
      auth: 'JagaSehatApp_JWT',
      cors: {
        origin: ['*']
      }
    }
  },
];