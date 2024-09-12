'use strict';

class BulkDebitController {
  // Handle bulk debit request
  async bulkDebit({ request, response }) {
    // Extract relevant fields from the request body
    const { SessionId, UserId, ProductFamily, Transactions } = request.only([
      'SessionId',
      'UserId',
      'ProductFamily',
      'Transactions',
    ]);

    // Log incoming data for debugging purposes
    console.log('Received SessionId:', SessionId);
    console.log('Received UserId:', UserId);
    console.log('Received ProductFamily:', ProductFamily);
    console.log('Received Transactions:', Transactions);

    try {
      // Validate the received data
      if (!SessionId || !UserId || !ProductFamily || !Transactions || Transactions.length === 0) {
        return response.status(400).json({ message: 'Missing required parameters' });
      }

      // Process each transaction and prepare a dummy response
      const successfulTransactions = Transactions.map((transaction) => {
        // Log each transaction
        console.log('Processing Transaction:', transaction.TransactionId);
        console.log('Amount:', transaction.Amount);
        console.log('GameId:', transaction.GameId);
        console.log('RoundId:', transaction.RoundId);
        console.log('TrnReason:', transaction.TrnReason);
        console.log('TrnDescription:', transaction.TrnDescription);
        console.log('GameplayTags:', transaction.GameplayTags);

        // Dummy providerTransactionId and bonusAmount for each transaction
        return {
          transactionId: transaction.TransactionId,
          providerTransactionId: `GS_${transaction.TransactionId}`, // Simulated ProviderTransactionId
          bonusAmount: 0, // Dummy bonus amount
        };
      });

      // Return the dummy response with a static balance and successful transactions
      return response.status(200).json({
        Balance: 900.0, // Dummy balance after debits
        SuccessfulTransactions: successfulTransactions,
      });
    } catch (error) {
      console.error('Error processing bulk debit request:', error);
      return response.status(500).json({ message: 'Error processing bulk debit request', error });
    }
  }
}

module.exports = BulkDebitController;
