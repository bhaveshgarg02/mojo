'use strict';

class OfflineCreditController {
  // Handle offline credit request
  async offlineCredit({ request, response }) {
    const {
      UserId,
      TransactionId,
      DebitTransactionIds,
      GameId,
      RoundId,
      Amount,
      Currency,
      TrnReason,
      TrnDescription,
      GameplayTags,
      ProductFamily,
      OriginalSessionId
    } = request.only([
      'UserId',
      'TransactionId',
      'DebitTransactionIds',
      'GameId',
      'RoundId',
      'Amount',
      'Currency',
      'TrnReason',
      'TrnDescription',
      'GameplayTags',
      'ProductFamily',
      'OriginalSessionId'
    ]);

    // Log incoming data for debugging purposes
    console.log('Received UserId:', UserId);
    console.log('Received TransactionId:', TransactionId);
    console.log('Received DebitTransactionIds:', DebitTransactionIds);
    console.log('Received GameId:', GameId);
    console.log('Received RoundId:', RoundId);
    console.log('Received Amount:', Amount);
    console.log('Received Currency:', Currency);
    console.log('Received TrnReason:', TrnReason);
    console.log('Received TrnDescription:', TrnDescription);
    console.log('Received GameplayTags:', GameplayTags);
    console.log('Received ProductFamily:', ProductFamily);
    console.log('Received OriginalSessionId:', OriginalSessionId);

    try {
      // Validate the received data
      if (!UserId || !TransactionId || !Amount || !Currency || !TrnReason || !TrnDescription || !ProductFamily) {
        return response.status(400).json({ message: 'Missing required parameters' });
      }

      // Dummy balance and providerTransactionId
      const dummyBalance = 1000.0; // Example balance
      const dummyProviderTransactionId = `GS_${TransactionId}`; // Simulated provider transaction ID

      // Return the dummy response
      return response.status(200).json({
        TransactionId: TransactionId,
        Balance: dummyBalance, // Dummy balance
      });
    } catch (error) {
      console.error('Error processing offline credit request:', error);
      return response.status(500).json({ message: 'Error processing offline credit request', error });
    }
  }
}

module.exports = OfflineCreditController;
