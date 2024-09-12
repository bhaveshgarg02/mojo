const mongoose = require('mongoose');

const WalletSchema = new mongoose.Schema({
    gameId: String,
    productFamily: Number,
    gameName: String
});

const WalletModel = mongoose.model("wallet", WalletSchema);

module.exports = WalletModel;