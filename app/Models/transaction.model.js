const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema({
    gameType: {
        type: String,
        default: "casino",
    },
    transactionType: {
        type: String,
        enum : ["debit","credit"],
        default: "credit",
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'users',
        default:null
    },
    betId:{
        type:String,
        default:false
    },
    eventType: {
        type: String,
        enum : [4, 2,1,-1,-2,-3,-4], // 4 for cricket 2 for tennis 1 for soccer and -1 for awc casino and -2 for aura and -3 for egt and -4 for jetx
        default: -1,
    },
    gameId:{
        type:String,
        required:[false,'Please game ID'],
    },
    gameName:{
        type:String,
        required:false,
        default:""
    },
    selectionId:{
        type:String,
        required:[false,'Please selection ID'],
    },
    stake: {
        type:Number,
        default:0
    },
    isRollback:{
        type:Boolean,
        default:false
    },
    roundId:{
        type:String,
        default:""
    },
    amount: {
        type: Number,
        trim:true,
        required:[true,'Please add amount'],
    },
    realCutAmount: {
        type: Number,
        default: 0
    },
    oldBalance: {
        type: Number,
        default: 0,
    },
    newBalance: {
        type: Number,
        required:[true,'Please update new balance'],
        default: 0,
    },
    status: {
        type: String,
        enum : ["success","failed","completed","voided"],
        default: "failed",
    },
    ip:{
        type:String,
        required:false
    },
    remark: {
        type: String,
        default: null,
    },
    geolocation: {
        type: {
            type: String,
            default: 'Point',
        },
        coordinates: [Number], // [longitude, latitude]
    },
    userAgent:{
        type:String,
        required:false
    },
    forBet:{
        type:Number,
        default:0
    },
    isDeclared:{
        type:Boolean,
        default:false
    },
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
    }
},
{ 
    timestamps: { createdAt: true, updatedAt: true }
});

const TransactionModel = mongoose.model("transaction_log", TransactionSchema);

module.exports = TransactionModel;