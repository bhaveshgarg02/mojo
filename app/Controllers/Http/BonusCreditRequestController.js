// app/Controllers/Http/BonusCreditRequestController.js

class BonusCreditRequestController {
    async bonusCreditRequest({ request, response }) {
        const {
            SessionId,
            UserId,
            TransactionId,
            Amount,
            GameId,
            RoundId,
            BonusId,
            BonusType,
            TrnDescription,
            GameplayTags,
            ProductFamily
        } = request.only([
            'SessionId',
            'UserId',
            'TransactionId',
            'Amount',
            'GameId',
            'RoundId',
            'BonusId',
            'BonusType',
            'TrnDescription',
            'GameplayTags',
            'ProductFamily'
        ]);

        console.log('Received SessionId:', SessionId);
        console.log('Received UserId:', UserId);
        console.log('Received TransactionId:', TransactionId);
        console.log('Received Amount:', Amount);
        console.log('Received GameId:', GameId);
        console.log('Received RoundId:', RoundId);
        console.log('Received BonusId:', BonusId);
        console.log('Received BonusType:', BonusType);
        console.log('Received TrnDescription:', TrnDescription);
        console.log('Received GameplayTags:', GameplayTags);
        console.log('Received ProductFamily:', ProductFamily);

        try {
            // Validate the received data
            if (!UserId || !TransactionId || !Amount || !GameId || !RoundId || !BonusId || !BonusType || !TrnDescription || !ProductFamily) {
                return response.status(400).json({ message: 'Missing required parameters' });
            }

            // Dummy balance and response data
            const dummyBalance = 1000.00; // Example balance
            const totalCreditAmount = parseFloat(Amount);
            if (isNaN(totalCreditAmount)) {
                return response.status(400).json({ message: 'Invalid amount format' });
            }
            
            // Simulate new balance
            const newBalance = dummyBalance + totalCreditAmount;

            // Return the dummy response
            return response.status(200).json({
                transactionId: TransactionId,
                balance: newBalance
            });

        } catch (error) {
            console.error('Error processing bonus credit request:', error);
            return response.status(500).json({ message: 'Error processing bonus credit request', error });
        }
    }
}

module.exports = BonusCreditRequestController;
