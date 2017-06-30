//
// Dependencies
//
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const router = express.Router();
const users = require('./controllers/users');
const transactions = require('./controllers/transactions');

//
// Set up server
//
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.set('port', process.env.PORT || 5000);
// serve all files in public as static files.
// since public/index.html looks for ../dist/index.js,
// giving the dist files the path prefix of dist ensures that they can be found.
app.use(express.static(__dirname + '/public'));
app.use('/dist', express.static('dist'));

//
// Assume client side routing.
// unless route is defined below, serve this default
//
router.route('*', function(request, response) {
  response.render('index.html');
});

//
// Define JSON routes
//
router.route('/users').get(users.getAllUsers).post(users.addUser);
router
  .route('/transactions/:userId')
  .get(transactions.getTransactionsByUserId)
  .post(transactions.addTransaction)
  .put(transactions.updateTransaction);

//
// Use the router as the default
//
app.use('/', router);

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
