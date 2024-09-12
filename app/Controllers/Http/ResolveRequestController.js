'use strict';

class ResolveRequestController {
  // Handle resolve request
  async resolveRequest({ request, response }) {
    const { OriginalRequest, ErrorDescription } = request.only([
      'OriginalRequest',
      'ErrorDescription'
    ]);

    // Log incoming data for debugging purposes
    console.log('Received OriginalRequest:', OriginalRequest);
    console.log('Received ErrorDescription:', ErrorDescription);

    try {
      // Validate the received data
      if (!OriginalRequest || !ErrorDescription) {
        return response.status(400).json({ message: 'Missing required parameters' });
      }

      // You can further process the original request and error description as needed
      // For now, we will return a dummy response

      return response.status(200).json({
        message: 'Resolve request received and processed',
        OriginalRequest: OriginalRequest,
        ErrorDescription: ErrorDescription
      });
    } catch (error) {
      console.error('Error processing resolve request:', error);
      return response.status(500).json({ message: 'Error processing resolve request', error });
    }
  }
}

module.exports = ResolveRequestController;
