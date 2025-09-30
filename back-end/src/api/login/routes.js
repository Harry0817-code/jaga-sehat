export default (handler) => [
  {
    method: 'POST',
    path: '/login',
    handler: handler.postLoginHandler,
    options: {
      auth: false,
      cors: {
        origin: ['*']
      }
    }
  }
];