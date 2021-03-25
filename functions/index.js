const admin = require('firebase-admin')
admin.initializeApp();

const UserActions = require('./actions/userActions')
const ContributionActions = require('./actions/contributionActions')
const PaymentActions = require('./actions/paymentsActions')
const Counters = require('./counters')
const ProfileActions = require('./actions/profileActions')
const RequestActions = require('./actions/requestActions')

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

exports.addUserProfile = UserActions.addUserProfile;
exports.attachUserToUpliner = ContributionActions.attachUserToUpliner;
exports.confirmPayment = PaymentActions.confirmPayment;
exports.purgeUser = ProfileActions.purgeUser;
exports.requestStatus = RequestActions.requestStatus
// Counters
exports.addUserCounter = Counters.addUserCounter;
exports.addContribCounter = Counters.addContribCounter;
exports.subUserCounter = Counters.subUserCounter;
exports.subContribCounter = Counters.subContribCounter