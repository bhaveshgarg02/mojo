'use strict';

const User = require('../../Models/user.model'); // Ensure this path is correct

class CreditRequestController {
    // Handle credit request
    async creditRequest({ request, response }) {
        const {
            SessionId,
            UserId,
            TransactionId,
            DebitTransactionIds,
            Amount,
            GameId,
            RoundId,
            TrnReason,
            TrnDescription,
            BonusId,
            BonusType,
            GameplayTags,
            ProductFamily,
            Bets
        } = request.only([
            'SessionId',
            'UserId',
            'TransactionId',
            'DebitTransactionIds',
            'Amount',
            'GameId',
            'RoundId',
            'TrnReason',
            'TrnDescription',
            'BonusId',
            'BonusType',
            'GameplayTags',
            'ProductFamily',
            'Bets'
        ]);

        console.log('Received SessionId:', SessionId);
        console.log('Received UserId:', UserId);
        console.log('Received TransactionId:', TransactionId);
        console.log('Received Amount:', Amount);
        console.log('Received DebitTransactionIds:', DebitTransactionIds);
        console.log('Received GameId:', GameId);
        console.log('Received RoundId:', RoundId);
        console.log('Received TrnReason:', TrnReason);
        console.log('Received TrnDescription:', TrnDescription);
        console.log('Received BonusId:', BonusId);
        console.log('Received BonusType:', BonusType);
        console.log('Received GameplayTags:', GameplayTags);
        console.log('Received ProductFamily:', ProductFamily);
        console.log('Received Bets:', Bets);

        try {
            // Validation functions
            const isNonEmptyString = (value) => typeof value === 'string' && value.trim() !== '';
            const isValidNumber = (value) => !isNaN(parseFloat(value)) && parseFloat(value) > 0;
            const isValidProductFamily = (value) => [0, 1].includes(parseInt(value, 10));
            const isValidTransactionReason = (value) => [0, 1, 2, 3, 4, 5].includes(parseInt(value, 10)); // Enum values for TrnReason
            const isValidBonusType = (value) => [0, 1, 2].includes(parseInt(value, 10)); // Enum values for BonusType

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

            // Check if DebitTransactionIds is an array of non-empty strings
            if (DebitTransactionIds && (!Array.isArray(DebitTransactionIds) || !DebitTransactionIds.every(id => isNonEmptyString(id)))) {
                return response.status(400).json({ code: 1, message: 'Invalid DebitTransactionIds' }); // InvalidArgument
            }

            // Check if GameplayTags is an array and contains valid values
            if (GameplayTags && (!Array.isArray(GameplayTags) || !GameplayTags.every(tag => [0, 1, 2, 3].includes(tag)))) {
                return response.status(400).json({ code: 1, message: 'Invalid GameplayTags' }); // InvalidArgument
            }

            // Check if Bets is an array of objects with valid properties
            if (Bets && (!Array.isArray(Bets) || !Bets.every(bet => 
                typeof bet === 'object' &&
                [0, 1].includes(parseInt(bet.Type, 10)) &&
                isValidNumber(bet.Amount)
            ))) {
                return response.status(400).json({ code: 1, message: 'Invalid Bets' }); // InvalidArgument
            }

            // Check if BonusId and BonusType are provided if BonusType is valid
            if (BonusType !== undefined && !isValidBonusType(BonusType)) {
                return response.status(400).json({ code: 1, message: 'Invalid BonusType' }); // InvalidArgument
            }
            if (BonusType !== undefined && !isNonEmptyString(BonusId)) {
                return response.status(400).json({ code: 1, message: 'Invalid BonusId' }); // InvalidArgument
            }

            // Fetch the user from the database
            const user = await User.findById(UserId);

            // Check if the user exists
            if (!user) {
                return response.status(404).json({ code: 2, message: 'User not found' }); // UserNotFound
            }

            // Validate the user session and currency
            if (user.sessionId !== SessionId) {
                return response.status(400).json({ code: 3, message: 'Invalid session' }); // InvalidSession
            }

            // Perform the credit operation
            user.playerBalance += Amount;
            await user.save();

            // Record the transaction (add logic for saving transaction details if needed)

            // Return success response with updated balance
            return response.status(200).json({
                TransactionId: TransactionId,
                Balance: user.playerBalance,
                BonusAmount: BonusType ? 100.00 : 0.00 // Example logic for BonusAmount, adjust as needed
            });

        } catch (error) {
            console.error('Error processing credit request:', error);
            return response.status(500).json({ code: 0, message: 'Unknown error' }); // Unknown error
        }
    }
}

module.exports = CreditRequestController;
