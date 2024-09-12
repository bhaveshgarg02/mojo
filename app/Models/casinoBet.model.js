const mongoose = require("mongoose");

const CasinoBetSchema = new mongoose.Schema({
    eventType: {
        type: String,
        enum : [4, 2,1,-1,-2,-3,-4],
        default: 4,
    },
    casinoBetId: {
        type: String,
        required:false
    },
    platformTxId: {
        type: String,
        required:true
    },
    gameInfo: {
        type: String,
        required:false
    },
    roundId: {
        type: String,
        required:false
    },
    casinoType: {
        type: String,
        enum : ["awc","supernowa"],
        default: "awc",
    },
    casinoId:{
        type:String,
        required:[false,'Please casino ID'],
    },
    casinoName:{
        type:String,
        required:false,
        default:""
    },
    gameType:{
        type:String,
        required:false,
        default:""
    },
    platform:{
        type:String,
        required:false,
        default:""
    },
    currency:{
        type:String,
        required:false,
        default:""
    },
    gameCode:{
        type:String,
        required:false,
        default:""
    },
    isDeclared:{
        type:Boolean,
        default:true
    },
    clientName: {
        type: String,
        required:false
    },
    amount: {
        type: String,
        required:false
    },
    turnover:{
        type: Number,
        default: 0,
    },
    betAmount: {
        type: Number,
        required:0
    },
    timeInserted:{
        type: Date,
        required:false
    },
    timeInsertedDate:{
        type: String,
        default: "",
    },
    settleStatus:{
        type: Number,
        default: 0,
    },
    profitAmount:{
        type: Number,
        default: 0,
    },
    loseAmount:{
        type: Number,
        default: 0,
    },
    realCutAmount:{
        type: Number,
        default: 0,
    },
    playerPL:{
        type: Number,
        default: 0,
    },
    decision:{
        type: Number,
        default: 0,
    },
    commissionType: {
        type: String,
        required:false
    },
    commission: {
        type: String,
        required:false
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"users",
        default: null,
    },
    userID:{
        type: String,
        default: null,
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
    },
    owCutShare:{
        type: Number,
        default: 100,
    },
    sowCutShare:{
        type: Number,
        default: 0,
    },
    suaCutShare:{
        type: Number,
        default: 0,
    },
    adCutShare:{
        type: Number,
        default: 0,
    },
    sadCutShare:{
        type: Number,
        default: 0,
    },
    ssmCutShare:{
        type: Number,
        default: 0,
    },
    saCutShare:{
        type: Number,
        default: 0,
    },
    clCutShare:{
        type: Number,
        default: 0,
    },
    ipAddress: {
        type: String,
        default: null,
    },
    status: {
        type: String,
        enum : ["pending","active","suspend","completed","cancelled","voided","refund"],
        default: "active",
    },
    isDeleted: {
        type:Boolean,
        default:false
    },
    isDeclared:{
        type:Boolean,
        default:false
    },
    jsonData: []
},
{ 
    timestamps: true,
    toObject : {getters: true,setters: true, virtuals: false},
    toJSON : {getters: true, setters: true, virtuals: false}
});

 
const CasinoBet = mongoose.model("casino_bet", CasinoBetSchema);

module.exports = CasinoBet;