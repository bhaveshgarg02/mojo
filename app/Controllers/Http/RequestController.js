'use strict';

const HashUtil = use('App/Utils/HashUtil');
const Env = use('Env');

class RequestController {
    async handleRequest({ request, response }) {
        const { body } = request;
        const receivedHash = request.input('hash');
        const passKey = Env.get('PASS_KEY');

        // Validate the hash
        if (!HashUtil.validateMD5Hash(JSON.stringify(body), passKey, receivedHash)) {
            return response.status(400).json({ error: 'InvalidHash' });
        }

        // Process the request (e.g., save data, perform actions)
        // Check for session ID or user ID if needed
        // For example:
        const sessionId = request.header('SessionId');
        const userId = request.header('UserId');
        
        if (sessionId) {
            // Handle requests with session ID
        } else if (userId) {
            // Handle requests with user ID (e.g., bonus credit)
        } else {
            return response.status(400).json({ error: 'MissingSessionOrUserId' });
        }

        return response.json({ success: true });
    }
}

module.exports = RequestController;
