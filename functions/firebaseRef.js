const admin = require('firebase-admin')

module.exports = {
    firestoreRef : admin.firestore,
    userRef : admin.firestore().collection('users'),
    contributionRef : admin.firestore().collection('contributions'),
    paymentRef : admin.firestore().collection('payments'),
    profileRef : admin.firestore().collection('profiles'),
    counterRef: admin.firestore().collection('counters'),
    packageRef: admin.firestore().collection('packages')
}
