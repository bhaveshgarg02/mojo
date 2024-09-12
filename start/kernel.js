const Server = use('Server')

const globalMiddleware = [
  'Adonis/Middleware/BodyParser',
  'Adonis/Middleware/Cors',
  'Adonis/Middleware/Session',
  'Adonis/Middleware/AuthInit',
];

const namedMiddleware = {
  auth: 'Adonis/Middleware/Auth',
};

Server
  .registerGlobal(globalMiddleware)
  .registerNamed(namedMiddleware);
