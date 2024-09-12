\'use strict';

const User = require('../../Models/user.model'); // Ensure this path is correct

class CancelRequestController {
    // Handle cancel request
    async cancelRequest({ request, response }) {
        const {
            TransactionId,
            UserId,
            Amount,
            RoundId,
            GameId,
            Reason,
            TransactionType,
            ProductFamily,
            SessionId
        } = request.only([
            'TransactionId',
            'UserId',
            'Amount',
            'RoundId',
            'GameId',
            'Reason',
            'TransactionType',
            'ProductFamily',
            'SessionId'
        ]);

        console.log('Received TransactionId:', TransactionId);
        console.log('Received UserId:', UserId);
        console.log('Received Amount:', Amount);
        console.log('Received RoundId:', RoundId);
        console.log('Received GameId:', GameId);
        console.log('Received Reason:', Reason);
        console.log('Received TransactionType:', TransactionType);
        console.log('Received ProductFamily:', ProductFamily);
        console.log('Received SessionId:', SessionId);

        try {
            // Validation functions
            const isNonEmptyString = (value) => typeof value === 'string' && value.trim() !== '';
            const isValidNumber = (value) => !isNaN(parseFloat(value)) && parseFloat(value) >= 0;
            const isValidEnum = (value, validValues) => validValues.includes(parseInt(value, 10));

            // Valid Enum Values
            const validReasons = [0, 1, 2]; // Cancel Reasons
            const validTransactionTypes = [0, 1]; // 0 for Debit, 1 for Credit
            const validProductFamilies = [0, 1]; // 0 for Slot Games, 1 for Live Casino Games

            // Validate required parameters
            if (!isNonEmptyString(TransactionId) ||
                !isNonEmptyString(UserId) ||
                !isValidNumber(Amount) ||
                !isNonEmptyString(RoundId) ||
                !isNonEmptyString(GameId) ||
                !isValidEnum(Reason, validReasons) ||
                !isValidEnum(TransactionType, validTransactionTypes) ||
                !isValidEnum(ProductFamily, validProductFamilies) ||
                !isNonEmptyString(SessionId)) {
                return response.status(400).json({ code: 1, message: 'Invalid argument' }); // InvalidArgument
            }

            // Fetch the user from the database
            const user = await User.findById(UserId);

            // Check if the user exists
            if (!user) {
                return response.status(404).json({ code: 2, message: 'User not found' }); // UserNotFound
            }

            // Validate the user session
            if (user.sessionId !== SessionId) {
                return response.status(400).json({ code: 3, message: 'Invalid session' }); // InvalidSession
            }

            // Adjust the balance based on the transaction type
            if (TransactionType === 0) { // Debit
                user.playerBalance += Amount;
            } else if (TransactionType === 1) { // Credit
                user.playerBalance -= Amount;
            } else {
                return response.status(400).json({ code: 4, message: 'Invalid transaction type' }); // InvalidTransactionType
            }

            // Save the updated user data
            await user.save();

            // Record the cancel request (add logic for saving cancel request details if needed)

            // Return success response with updated balance
            return response.status(200).json({
                Balance: user.playerBalance
            });

        } catch (error) {
            console.error('Error processing cancel request:', error);
            return response.status(500).json({ code: 0, message: 'Unknown error' }); // Unknown error
        }
    }
}

module.exports = CancelRequestController;
