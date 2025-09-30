import DoctorsHandler from './handler.js';
import routes from './routes.js';

export default {
  name: 'doctors',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const doctorsHandler = new DoctorsHandler(service, validator);
    server.route(routes(doctorsHandler));
  }
};