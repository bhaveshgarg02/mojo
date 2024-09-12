'use strict'
const mongoose = require('./mongoose')

// start/routes.js




/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| Http routes are entry points to your web application. You can create
| routes for different URL's and bind Controller actions to them.
|
| A complete guide on routing is available here.
| http://adonisjs.com/docs/4.1/routing
|
*/

/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use('Route')
    
Route.on('/').render('welcome')


Route.post('/your-endpoint', 'RequestController.handleRequest');

Route.post('/authenticate', 'AuthController.authenticate');

Route.post('/userinfo', 'UserInfoController.userinfo');

Route.post('/getBalance', 'BalanceController.getBalance');

Route.post('/debitRequest', 'DebitRequestController.debitRequest');

Route.post('/creditRequest', 'CreditRequestController.creditRequest');

Route.post('/cancelRequest', 'CancelRequestController.cancelRequest');

Route.post('/bulkDebit', 'BulkDebitController.bulkDebit');

Route.post('/offlineCredit', 'OfflineCreditController.offlineCredit');

Route.post('/statusRequest', 'StatusRequestController.statusRequest');

Route.post('/resolveRequest', 'ResolveRequestController.resolveRequest');

Route.post('/bonusCreditRequest', 'BonusCreditRequestController.bonusCreditRequest');

Route.get('/games', 'GameController.listGames')