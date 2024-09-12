const mongoose = require('mongoose');
const User = require('../../Models/user.model'); // Import the actual User model

class BalanceController {
    // Fetch the player's current balance
    async getBalance({ request, response }) {
        const { SessionId, UserId, Currency, ProductFamily } = request.only([
            'SessionId', 'UserId', 'Currency', 'ProductFamily'
        ]);

        console.log('Received SessionId:', SessionId);
        console.log('Received UserId:', UserId);
        console.log('Received Currency:', Currency);
        console.log('Received ProductFamily:', ProductFamily);

        try {
            // Validation functions
            const isNonEmptyString = (value) => typeof value === 'string' && value.trim() !== '';
            const isValidProductFamily = (value) => {
                const parsedValue = parseInt(value, 10);
                return parsedValue === 0 || parsedValue === 1;
            };

            // Validate required parameters
            if (!isNonEmptyString(SessionId) ||
                !isNonEmptyString(UserId) ||
                !isNonEmptyString(Currency) ||
                !isValidProductFamily(ProductFamily)) {
                return response.status(400).json({ code: 1 }); // InvalidArgument
            }

            // Fetch user from the database
            const user = await User.findOne({ _id: UserId, sessionId: SessionId, currency: Currency });

            console.log('User Record:', user);

            // Check if the user exists
            if (!user) {
                return response.status(404).json({
                    code: 0 // Unknown
                });
            }

            // Return the user’s balance
            return response.status(200).json({
                Balance: user.playerBalance
            });

        } catch (error) {
            console.error('Error fetching balance:', error);
            return response.status(500).json({ code: 0 }); // Unknown
        }
    }
}

module.exports = BalanceController;
