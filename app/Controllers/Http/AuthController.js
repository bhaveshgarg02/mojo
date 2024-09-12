'use strict';

const HashUtil = use('App/Utils/HashUtil');
const Env = use('Env');
const User = require('../../Models/user.model'); // Update with the correct path to your User model

class AuthController {
    async authenticate({ request, response }) {
        // Extract Token, GameId, and ProductFamily from the request
        const { Token, GameId, ProductFamily } = request.only(['Token', 'GameId', 'ProductFamily']);
        const passKey = Env.get('PASS_KEY');
        const receivedHash = request.input('hash');

        // Validation functions
        const isNonEmptyString = (value) => typeof value === 'string' && value.trim() !== '';
        const isValidProductFamily = (value) => {
            const parsedValue = parseInt(value, 10);
            return parsedValue === 0 || parsedValue === 1;
        };

        // Validate required parameters
        if (!isNonEmptyString(Token) || !isNonEmptyString(GameId) || !isValidProductFamily(ProductFamily)) {
            return response.status(400).json({ code: 1, message: 'Invalid argument' }); // InvalidArgument
        }

        // Construct the request body as an object
        const requestBody = { Token, GameId, ProductFamily };

        // Validate the hash
        if (!HashUtil.decode(requestBody, receivedHash, passKey)) {
            return response.status(400).json({ code: 2, message: 'Invalid hash' });
        }

        try {
            // Query the user based on the token
            const user = await User.findOne({ token: Token, gameID: GameId });

            // If user is not found, return an error
            if (!user) {
                return response.status(404).json({ code: 4, message: 'Authentication Denied' });
            }

            // Return the required user data
            return response.status(200).json({
                SessionId: user._id.toString(),  // Ensure _id is converted to string
                UserId: user.userId.toString(),
                Currency: user.currency,
                Balance: user.totalCoins,
                Username: user.username,
            });

        } catch (error) {
            console.error('Error during authentication:', error);
            return response.status(500).json({ code: 0, message: 'Error during authentication', error });
        }
    }
}

module.exports = AuthController;
