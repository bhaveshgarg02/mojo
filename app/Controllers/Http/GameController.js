'use strict'

const Wallet = require('../../Models/wallet.model'); // Ensure this path is correct
const User = require('../../Models/user.model'); // Ensure this path is correct

class GameController {
    // Fetch the list of games
    async listGames({ response }) {
        try {
            const games = await Wallet.find({});
            return response.status(200).json(games);
        } catch (error) {
            console.error('Error fetching games:', error);
            return response.status(500).json({ code: 0, message: 'Error fetching games' });
        }
    }

    // Authenticate a game based on token and game ID
    async authenticateGame({ request, response }) {
        const { Token, GameId, ProductFamily } = request.only(['Token', 'GameId', 'ProductFamily']);

        try {
            if (!Token || !GameId || ProductFamily === undefined) {
                return response.status(400).json({ code: 1, message: 'Invalid arguments' });
            }

            const user = await User.findOne({ token: Token });

            if (!user) {
                return response.status(404).json({ code: 2, message: 'User not found' });
            }

            const game = await Wallet.findOne({ gameId: GameId, productFamily: ProductFamily });

            if (!game) {
                return response.status(404).json({ code: 3, message: 'Game not found' });
            }

            return response.status(200).json({ code: 0, message: 'Game authenticated', game });

        } catch (error) {
            console.error('Error authenticating game:', error);
            return response.status(500).json({ code: 0, message: 'Unknown error' });
        }
    }
}

module.exports = GameController;
