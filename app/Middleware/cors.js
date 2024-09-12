// app/Middleware/Cors.js
class Cors {
    async handle ({ request, response }, next) {
      // Set CORS headers
      response.header('Access-Control-Allow-Origin', '*');
      response.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
      response.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
      // If the request method is OPTIONS, return an empty response
      if (request.method() === 'OPTIONS') {
        return response.status(200).send();
      }
  
      // Continue to the next middleware
      await next();
    }
  }
  
  module.exports = Cors;
  