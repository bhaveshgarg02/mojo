const User = require('../../Models/user.model'); // Ensure this path is correct

class UserInfoController {
    async userinfo({ request, response }) {
        const { Token } = request.only(['Token']);

        console.log('Received Token:', Token);

        try {
            // Validate the received token
            if (!Token) {
                return response.status(400).json({ code: 1, message: 'Invalid argument' }); // InvalidArgument
            }

            // Fetch user from the database
            const user = await User.findOne({ token: Token });

            // Check if the user exists
            if (!user) {
                return response.status(404).json({ code: 2, message: 'User not found' }); // UserNotFound
            }

            // Return user details
            return response.status(200).json({
                UserId: user._id,
                Currency: user.currency,
                Balance: user.playerBalance,
                Username: user.username
            });
        } catch (error) {
            console.error('Error fetching user details:', error);
            return response.status(500).json({ code: 0, message: 'Unknown error' }); // Unknown error
        }
    }
}

module.exports = UserInfoController;
