'use strict';

class StatusRequestController {
  // Handle status request
  async statusRequest({ request, response }) {
    const {
      UserId,
      TransactionId,
      GameId,
      ProductFamily,
      SessionId
    } = request.only([
      'UserId',
      'TransactionId',
      'GameId',
      'ProductFamily',
      'SessionId'
    ]);

    // Log incoming data for debugging purposes
    console.log('Received UserId:', UserId);
    console.log('Received TransactionId:', TransactionId);
    console.log('Received GameId:', GameId);
    console.log('Received ProductFamily:', ProductFamily);
    console.log('Received SessionId:', SessionId);

    try {
      // Validate the received data
      if (!UserId || !TransactionId || !GameId || !ProductFamily || !SessionId) {
        return response.status(400).json({ message: 'Missing required parameters' });
      }

      // Dummy response for transaction status
      // In a real implementation, you would check the transaction status in your database or service
      const dummyStatus = 'Completed'; // Example status

      // Return the dummy response
      return response.status(200).json({
        TransactionId: TransactionId,
        Status: dummyStatus // Dummy status
      });
    } catch (error) {
      console.error('Error processing status request:', error);
      return response.status(500).json({ message: 'Error processing status request', error });
    }
  }
}

module.exports = StatusRequestController;
