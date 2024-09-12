const mongoose = require("mongoose");

const BlockCasinoMarketSchema = new mongoose.Schema({
    ownerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        default: null,
    },
    subOwnerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        default: null,
    },
    adminId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        default: null,
    }, 
    superAdminId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        default: null,
    },
    subAdminId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        default: null,
    },
    superSeniorId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        default: null,
    },
    superAgentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        default: null,
    },
    agentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        default: null,
    },
    gameType: {
        type: String,
    },
    gameName: {
        type: String,
    },
    gameCode: {
        type: String,
    },
    platForm: {
        type: String,
    },
    status: {
        type: String,
        enum : ["on","off"],
        default: "on",
    },
    blockId:{
        type: String,
    }
},
{ 
    timestamps: true,
});

 
const BlockCasinoMarket = mongoose.model("block_casino_market", BlockCasinoMarketSchema);

module.exports = BlockCasinoMarket;