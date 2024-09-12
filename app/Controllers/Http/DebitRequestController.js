'use strict';

const User = require('../../Models/user.model'); // Ensure this path is correct

class DebitRequestController {
    // Handle debit request
    async debitRequest({ request, response }) {
        const {
            SessionId,
            UserId,
            TransactionId,
            Amount,
            GameId,
            RoundId,
            TrnReason,
            TrnDescription,
            GameplayTags,
            ProductFamily,
            Bets
        } = request.only([
            'SessionId',
            'UserId',
            'TransactionId',
            'Amount',
            'GameId',
            'RoundId',
            'TrnReason',
            'TrnDescription',
            'GameplayTags',
            'ProductFamily',
            'Bets'
        ]);

        console.log('Received SessionId:', SessionId);
        console.log('Received UserId:', UserId);
        console.log('Received TransactionId:', TransactionId);
        console.log('Received Amount:', Amount);
        console.log('Received GameId:', GameId);    
        console.log('Received RoundId:', RoundId);
        console.log('Received TrnReason:', TrnReason);
        console.log('Received TrnDescription:', TrnDescription);
        console.log('Received GameplayTags:', GameplayTags);
        console.log('Received ProductFamily:', ProductFamily);
        console.log('Received Bets:', Bets);

        try {
            // Validation functions
            const isNonEmptyString = (value) => typeof value === 'string' && value.trim() !== '';
            const isValidNumber = (value) => !isNaN(parseFloat(value)) && parseFloat(value) > 0;
            const isValidProductFamily = (value) => [0, 1].includes(parseInt(value, 10));
            const isValidTransactionReason = (value) => [0, 1, 2, 3, 4, 5].includes(parseInt(value, 10)); // Enum values for TrnReason

            // Validate required parameters
            if (!isNonEmptyString(SessionId) || 
                !isNonEmptyString(UserId) ||
                !isNonEmptyString(TransactionId) ||
                !isValidNumber(Amount) ||
                !isNonEmptyString(GameId) ||
                !isNonEmptyString(RoundId) ||
                !isValidTransactionReason(TrnReason) ||
                !isNonEmptyString(TrnDescription) ||
                !isValidProductFamily(ProductFamily)) {
                return response.status(400).json({ code: 1, message: 'Invalid argument' }); // InvalidArgument
            }

            // Check if GameplayTags is an array and contains valid values
            if (!Array.isArray(GameplayTags) || !GameplayTags.every(tag => [0, 1, 2, 3].includes(tag))) {
                console.error('Invalid GameplayTags:', GameplayTags);
                return response.status(400).json({ code: 1, message: 'Invalid GameplayTags' }); // InvalidArgument
            }

            // Check if Bets is an array of objects with valid properties
            if (Bets && (!Array.isArray(Bets) || !Bets.every(bet => 
                typeof bet === 'object' &&
                [0, 1].includes(parseInt(bet.Type, 10)) &&
                isValidNumber(bet.Amount)
            ))) {
                console.error('Invalid Bets:', Bets);
                return response.status(400).json({ code: 1, message: 'Invalid Bets' }); // InvalidArgument
            }

            // Fetch the user from the database
            const user = await User.findById(UserId);

            // Check if the user exists
            if (!user) {
                return response.status(404).json({ code: 0, message: 'User not found' }); // UserNotFound
            }

            // Validate the user session and currency
            if (user.sessionId !== SessionId || user.currency !== Currency) {
                return response.status(400).json({ code: 0, message: 'Identifier Not recognized' }); // InvalidSession
            }

            // Check if the user has sufficient balance
            if (user.playerBalance < Amount) {
                return response.status(400).json({ code: 3, message: 'Insufficient funds' }); // InsufficientBalance
            }

            // Perform the debit operation
            user.playerBalance -= Amount;
            await user.save();

            // Record the transaction (add logic for saving transaction details if needed)

            // Return success response with updated balance
            return response.status(200).json({
                TransactionId: TransactionId,
                Balance: user.playerBalance,
                BonusAmount: 0.00 // Adjust if you have bonus logic
            });

        } catch (error) {
            console.error('Error processing debit request:', error);
            return response.status(500).json({ code: 0, message: 'Unknown error' }); // Unknown error
        }
    }
}

module.exports = DebitRequestController;
