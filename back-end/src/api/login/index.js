import LoginHandler from "./handler.js";
import routes from "./routes.js";

export default {
  name: 'login',
  version: '1.0.0',
  register: async (server, {
    authenticationsService,
    usersService,
    tokenManager,
    validator
  }) => {
    const loginHandler = new LoginHandler(
      authenticationsService,
      usersService,
      tokenManager,
      validator
    );
    server.route(routes(loginHandler));
  }
};