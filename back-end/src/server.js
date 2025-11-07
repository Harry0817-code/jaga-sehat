import 'dotenv/config';

import Hapi from '@hapi/hapi';
import Jwt from '@hapi/jwt';
import { GoogleGenerativeAI } from '@google/generative-ai'

// Users
import users from './api/users/index.js';
import UsersService from './services/UsersService.js';
import UsersValidator from './validator/users/index.js';

// Login
import login from './api/login/index.js';
import AuthenticationsService from './services/AuthenticationsService.js';
import LoginValidator from './validator/login/index.js';

// Doctor
import doctor from './api/doctors/index.js';
import DoctorsService from './services/DoctorsService.js';
import DoctorValidator from './validator/doctor/index.js';

// Collaboration
import collaboration from './api/collaborations/index.js';
import CollaborationsService from './services/CollaborationsService.js'
import CollaborationsValidator from './validator/collaborations/index.js'

// Gemini AI
import PromptGeminiAi from './api/promptGeminiAi/index.js';
import PromptGeminiAiService from './services/PromptGeminiAiService.js';
import PromptGeminiAiValidator from './validator/promptGeminiAi/index.js';

// Token Manager
import TokenManager from './tokenize/TokenManager.js';

const init = async () => {
  const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash-lite" });

  const usersService = new UsersService();
  const authenticationsService = new AuthenticationsService();
  const doctorsService = new DoctorsService();
  const collaborationsService = new CollaborationsService();
  const promptGeminiAiService = new PromptGeminiAiService(model);

  const server = Hapi.server({
    port: process.env.PORT || 3000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
        additionalExposedHeaders: ['cache-Control', 'Content-Length', 'X-Requested-With', 'accept', 'origin', 'authorization', 'content-type'],
      },
    },
  });

  await server.register([
    {
      plugin: Jwt
    }
  ]);

  server.auth.strategy('JagaSehatApp_JWT', 'jwt', {
    keys: process.env.ACCESS_TOKEN_KEY,
    verify: {
      aud: false,
      iss: false,
      sub: false,
      exp: true,
    },
    validate: (artifacts) => ({
      isValid: true,
      credentials: {
        id: artifacts.decoded.payload.id,
      },
    }),
  });
  
  await server.register([
    {
      plugin: users,
      options: {
        service: usersService,
        validator: UsersValidator
      }
    },
    {
      plugin: login,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
        validator: LoginValidator
      }
    },
    {
      plugin: doctor,
      options: {
        service: doctorsService,
        validator: DoctorValidator
      }
    },
    {
      plugin: collaboration,
      options: {
        service: collaborationsService,
        validator: CollaborationsValidator
      }
    },
    {
      plugin: PromptGeminiAi,
      options: {
        promptGeminiAiService,
        validator: PromptGeminiAiValidator
      }
    }
  ]);

  console.log('🚀 Port yang akan digunakan:', process.env.PORT);
  await server.start();
  console.log(`Server is running on ${server.info.uri}`);

  server.table().forEach((route) => {
  console.log(`➡️  ${route.method.toUpperCase()} ${route.path}`);
  });
};

init();